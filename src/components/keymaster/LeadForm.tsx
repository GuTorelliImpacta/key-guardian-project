import { useRef, useState } from "react";
import { Building2, Check, Factory, Home, MessageCircle, Warehouse } from "lucide-react";
import { Button } from "@/components/ui/button";
import { company, trackEvent, whatsappUrl } from "@/config/company";
import { submitLead } from "@/lib/submitLead";

const properties = [
  { n: "Casa", i: Home },
  { n: "Apartamento", i: Building2 },
  { n: "Comércio/Escritório", i: Warehouse },
  { n: "Condomínio", i: Building2 },
  { n: "Indústria/Galpão", i: Factory },
];
const needs = [
  "Alarme monitorado",
  "Câmeras/CFTV",
  "Monitoramento de imagens",
  "Cerca elétrica",
  "Storage de imagens",
  "Não sei, quero uma visita técnica",
];
const phoneMask = (v: string) =>
  v
    .replace(/\D/g, "")
    .slice(0, 11)
    .replace(/^(\d{2})(\d)/, "($1) $2")
    .replace(/(\d{5})(\d)/, "$1-$2");
const cepMask = (v: string) =>
  v
    .replace(/\D/g, "")
    .slice(0, 8)
    .replace(/(\d{5})(\d)/, "$1-$2");

const UTM_KEYS = ["utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content"];

export function LeadForm({
  compact = false,
  preselectedProperty,
  preselectedNeeds = [],
}: {
  compact?: boolean;
  preselectedProperty?: string | undefined;
  preselectedNeeds?: string[] | undefined;
}) {
  const initialStep =
    preselectedProperty && preselectedNeeds.length ? 3 : preselectedProperty ? 2 : 1;
  const [step, setStep] = useState(initialStep);
  const [done, setDone] = useState(false);
  const [error, setError] = useState("");
  const [submitFailed, setSubmitFailed] = useState(false);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({
    property: preselectedProperty ?? "",
    needs: preselectedNeeds,
    name: "",
    phone: "",
    email: "",
    cep: "",
    consent: false,
    website: "", // honeypot
  });
  const mountedAt = useRef(Date.now());

  const next = () => {
    if (step === 1 && !data.property) return setError("Escolha o tipo de imóvel para continuar.");
    if (step === 2 && !data.needs.length) return setError("Selecione pelo menos uma opção.");
    setError("");
    setStep(step + 1);
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (loading) return;
    if (data.name.trim().length < 2 || data.phone.replace(/\D/g, "").length < 10 || !data.consent) {
      setError("Preencha nome, WhatsApp e aceite a Política de Privacidade.");
      return;
    }
    setError("");
    setSubmitFailed(false);
    setLoading(true);

    const params =
      typeof window !== "undefined" ? new URLSearchParams(window.location.search) : null;
    const utm: Record<string, string> = {};
    if (params) {
      for (const key of UTM_KEYS) {
        const value = params.get(key);
        if (value) utm[key] = value;
      }
    }

    try {
      const result = await submitLead({
        data: {
          property: data.property,
          needs: data.needs,
          name: data.name,
          phone: data.phone,
          email: data.email,
          cep: data.cep,
          consent: data.consent,
          page: typeof window !== "undefined" ? window.location.pathname : "",
          utm,
          website: data.website,
          elapsedMs: Date.now() - mountedAt.current,
        },
      });
      if (!result?.ok) throw new Error("unexpected_response");
      trackEvent("lead_submit", { property: data.property });
      setDone(true);
    } catch {
      setSubmitFailed(true);
      setError("Não conseguimos enviar seu pedido agora. Tente novamente ou fale no WhatsApp.");
    } finally {
      setLoading(false);
    }
  };

  const message = `Olá! Vim pelo site e solicitei um orçamento. Imóvel: ${data.property}. Interesse: ${data.needs.join(", ")}. Nome: ${data.name}. CEP: ${data.cep}.`;

  if (done)
    return (
      <div className="py-10 text-center" role="status">
        <span className="mx-auto flex size-14 items-center justify-center rounded-full bg-success text-success-foreground">
          <Check />
        </span>
        <h3 className="mt-5 text-2xl font-bold text-primary">Recebemos seu pedido!</h3>
        <p className="mt-2 text-muted-foreground">
          Nosso time comercial entrará em contato em breve.
        </p>
        <Button asChild variant="whatsapp" size="lg" className="mt-6">
          <a
            href={whatsappUrl(message)}
            target="_blank"
            rel="noreferrer"
            onClick={() => trackEvent("click_whatsapp", { placement: "lead_success" })}
          >
            <MessageCircle />
            Quer agilizar? Fale agora no WhatsApp
          </a>
        </Button>
      </div>
    );

  return (
    <form
      onSubmit={submit}
      className={
        compact ? "" : "mx-auto max-w-3xl rounded-2xl bg-background p-5 shadow-soft md:p-9"
      }
      noValidate
    >
      {/* honeypot: campo invisível para humanos, capturado por bots que preenchem tudo */}
      <div className="hidden" aria-hidden="true">
        <label>
          Não preencha este campo
          <input
            type="text"
            name="website"
            tabIndex={-1}
            autoComplete="off"
            value={data.website}
            onChange={(e) => setData({ ...data, website: e.target.value })}
          />
        </label>
      </div>
      <div className="mb-7">
        <div className="flex justify-between text-xs font-bold text-primary">
          <span>ETAPA {step} DE 3</span>
          <span>{Math.round((step / 3) * 100)}%</span>
        </div>
        <div className="mt-2 h-2 overflow-hidden rounded-full bg-primary-soft">
          <div
            className="h-full bg-accent transition-all"
            style={{ width: `${(step / 3) * 100}%` }}
          />
        </div>
      </div>
      {step === 1 && (
        <fieldset>
          <legend className="mb-5 font-display text-xl font-bold">Qual tipo de imóvel?</legend>
          <div className="grid gap-3 sm:grid-cols-2">
            {properties.map(({ n, i: Icon }) => (
              <button
                key={n}
                type="button"
                aria-pressed={data.property === n}
                onClick={() => setData({ ...data, property: n })}
                className={`flex min-h-16 items-center gap-3 rounded-xl border p-4 text-left font-semibold transition ${data.property === n ? "border-accent bg-primary-soft text-primary" : "border-border hover:border-accent"}`}
              >
                <Icon className="text-accent" />
                {n}
              </button>
            ))}
          </div>
        </fieldset>
      )}
      {step === 2 && (
        <fieldset>
          <legend className="mb-5 font-display text-xl font-bold">O que você precisa?</legend>
          <div className="grid gap-3 sm:grid-cols-2">
            {needs.map((n) => (
              <label
                key={n}
                className="flex min-h-14 cursor-pointer items-center gap-3 rounded-xl border border-border p-4 hover:border-accent"
              >
                <input
                  type="checkbox"
                  className="size-5 accent-primary"
                  checked={data.needs.includes(n)}
                  onChange={() =>
                    setData({
                      ...data,
                      needs: data.needs.includes(n)
                        ? data.needs.filter((x) => x !== n)
                        : [...data.needs, n],
                    })
                  }
                />
                <span>{n}</span>
              </label>
            ))}
          </div>
        </fieldset>
      )}
      {step === 3 && (
        <fieldset>
          <legend className="mb-5 font-display text-xl font-bold">Seus dados</legend>
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="grid gap-2 text-sm font-semibold">
              Nome
              <input
                required
                maxLength={100}
                value={data.name}
                onChange={(e) => setData({ ...data, name: e.target.value })}
                className="min-h-12 rounded-xl border border-input bg-background px-4 font-normal"
              />
            </label>
            <label className="grid gap-2 text-sm font-semibold">
              WhatsApp
              <input
                required
                inputMode="tel"
                placeholder="(11) 99999-9999"
                value={data.phone}
                onChange={(e) => setData({ ...data, phone: phoneMask(e.target.value) })}
                className="min-h-12 rounded-xl border border-input bg-background px-4 font-normal"
              />
            </label>
            <label className="grid gap-2 text-sm font-semibold">
              E-mail (opcional)
              <input
                type="email"
                maxLength={255}
                value={data.email}
                onChange={(e) => setData({ ...data, email: e.target.value })}
                className="min-h-12 rounded-xl border border-input bg-background px-4 font-normal"
              />
            </label>
            <label className="grid gap-2 text-sm font-semibold">
              CEP
              <input
                inputMode="numeric"
                placeholder="00000-000"
                value={data.cep}
                onChange={(e) => setData({ ...data, cep: cepMask(e.target.value) })}
                className="min-h-12 rounded-xl border border-input bg-background px-4 font-normal"
              />
            </label>
          </div>
          <label className="mt-5 flex cursor-pointer items-start gap-3 text-sm text-muted-foreground">
            <input
              type="checkbox"
              checked={data.consent}
              onChange={(e) => setData({ ...data, consent: e.target.checked })}
              className="mt-1 size-5 accent-primary"
            />
            Concordo em ser contatado e com a Política de Privacidade.
          </label>
        </fieldset>
      )}
      {error && (
        <p className="mt-4 text-sm font-semibold text-destructive" role="alert">
          {error}
        </p>
      )}
      {submitFailed && (
        <Button asChild variant="whatsapp" className="mt-4">
          <a
            href={whatsappUrl(message)}
            target="_blank"
            rel="noreferrer"
            onClick={() => trackEvent("click_whatsapp", { placement: "lead_error" })}
          >
            <MessageCircle />
            Falar no WhatsApp agora
          </a>
        </Button>
      )}
      <div className="mt-7 flex justify-between gap-3">
        {step > 1 ? (
          <Button
            type="button"
            variant="outline"
            onClick={() => {
              setError("");
              setStep(step - 1);
            }}
          >
            Voltar
          </Button>
        ) : (
          <span />
        )}
        {step < 3 ? (
          <Button type="button" onClick={next}>
            Continuar
          </Button>
        ) : (
          <Button type="submit" disabled={loading} aria-busy={loading}>
            {loading ? "Enviando…" : company.cta.quote}
          </Button>
        )}
      </div>
    </form>
  );
}
