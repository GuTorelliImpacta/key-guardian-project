import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const MIN_FILL_TIME_MS = 3000;

const leadInputSchema = z.object({
  property: z.string().max(60).default(""),
  needs: z.array(z.string().max(80)).max(10).default([]),
  name: z.string().max(120),
  phone: z.string().max(30),
  email: z.string().max(255).optional().default(""),
  cep: z.string().max(12).optional().default(""),
  consent: z.boolean(),
  page: z.string().max(300).optional().default(""),
  utm: z.record(z.string().max(120)).optional().default({}),
  // honeypot: campo oculto que um humano nunca preenche
  website: z.string().max(200).optional().default(""),
  // tempo (ms) entre a montagem do formulário e o envio
  elapsedMs: z
    .number()
    .nonnegative()
    .max(24 * 60 * 60 * 1000)
    .optional()
    .default(0),
});

export type LeadInput = z.input<typeof leadInputSchema>;

function stripControlAndHtml(input: string): string {
  return (
    input
      // eslint-disable-next-line no-control-regex -- remoção intencional de caracteres de controle
      .replace(/[\u0000-\u001F\u007F]/g, "")
      .replace(/<[^>]*>/g, "")
      .trim()
  );
}

function isValidEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export const submitLead = createServerFn({ method: "POST" })
  .validator((data: unknown) => leadInputSchema.parse(data))
  .handler(async ({ data }) => {
    const isBot = data.website.length > 0 || data.elapsedMs < MIN_FILL_TIME_MS;
    if (isBot) {
      // Não revela ao bot que foi detectado: responde sucesso sem enviar e-mail.
      return { ok: true as const };
    }

    const name = stripControlAndHtml(data.name).slice(0, 100);
    const phoneDigits = data.phone.replace(/\D/g, "");
    const property = stripControlAndHtml(data.property).slice(0, 60);
    const cep = stripControlAndHtml(data.cep).slice(0, 12);
    const email = stripControlAndHtml(data.email).slice(0, 255);
    const needs = data.needs.map((n) => stripControlAndHtml(n).slice(0, 80)).filter(Boolean);
    const page = stripControlAndHtml(data.page).slice(0, 300);

    if (name.length < 2 || phoneDigits.length < 10 || data.consent !== true) {
      throw new Error("invalid_lead_data");
    }
    if (email && !isValidEmail(email)) {
      throw new Error("invalid_email");
    }

    const toEmail = process.env["LEAD_TO_EMAIL"];
    const fromEmail = process.env["LEAD_FROM_EMAIL"];
    const apiKey = process.env["RESEND_API_KEY"];
    if (!apiKey || !toEmail || !fromEmail) {
      console.error(
        "[submitLead] Envio de e-mail não configurado: defina RESEND_API_KEY, LEAD_TO_EMAIL e LEAD_FROM_EMAIL.",
      );
      throw new Error("email_not_configured");
    }

    const now = new Date();
    const utmLines = Object.entries(data.utm)
      .filter(([, v]) => typeof v === "string" && v.length > 0)
      .map(([k, v]) => `${k}: ${stripControlAndHtml(v).slice(0, 120)}`);

    const bodyLines = [
      `Nome: ${name}`,
      `WhatsApp/Telefone: ${data.phone}`,
      email ? `E-mail: ${email}` : "E-mail: (não informado)",
      `Tipo de imóvel: ${property || "(não informado)"}`,
      `Interesse: ${needs.length ? needs.join(", ") : "(não informado)"}`,
      cep ? `CEP: ${cep}` : "CEP: (não informado)",
      "",
      `Página de origem: ${page || "(não informada)"}`,
      ...(utmLines.length ? ["Parâmetros UTM:", ...utmLines] : []),
      `Data/hora: ${now.toLocaleString("pt-BR", { timeZone: "America/Sao_Paulo" })}`,
    ];

    const subject = `Novo lead do site — ${property || "Tipo não informado"} — ${name}`;

    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: fromEmail,
        to: [toEmail],
        ...(email ? { reply_to: email } : {}),
        subject,
        text: bodyLines.join("\n"),
      }),
    });

    if (!response.ok) {
      const errorText = await response.text().catch(() => "");
      console.error("[submitLead] Falha ao enviar e-mail via Resend", response.status, errorText);
      throw new Error("email_send_failed");
    }

    return { ok: true as const };
  });
