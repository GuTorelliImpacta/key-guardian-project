import { Link, useRouterState } from "@tanstack/react-router";
import { Menu, MessageCircle, Phone, X } from "lucide-react";
import { useEffect, useState, type ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { company, trackEvent, whatsappUrl } from "@/config/company";
import { QuoteCta } from "./Shared";

const navLinks = [
  { to: "/", label: "Início" },
  { to: "/servicos", label: "Serviços" },
  { to: "/sobre", label: "Sobre" },
  { to: "/contato", label: "Contato" },
] as const;

export function SiteChrome({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [fontScale, setFontScale] = useState(100);
  const path = useRouterState({ select: (s) => s.location.pathname });
  useEffect(() => {
    setOpen(false);
  }, [path]);
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 30);
    fn();
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);
  useEffect(() => {
    document.documentElement.style.fontSize = `${fontScale}%`;
  }, [fontScale]);
  useEffect(() => {
    if (!open) return;
    const fn = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", fn);
    return () => window.removeEventListener("keydown", fn);
  }, [open]);

  const onHeroDark = !scrolled && path === "/";

  return (
    <>
      <a
        href="#conteudo"
        className="fixed left-2 top-2 z-[100] -translate-y-24 rounded-md bg-background px-4 py-2 text-sm font-semibold text-primary shadow-soft transition-transform focus:translate-y-0"
      >
        Pular para o conteúdo
      </a>
      <header className="fixed inset-x-0 top-0 z-50">
        <div
          className={`hidden bg-primary-dark text-hero-foreground transition-all md:block ${scrolled ? "h-0 overflow-hidden" : "h-9"}`}
        >
          <div className="mx-auto flex h-9 max-w-7xl items-center justify-between px-6 text-xs">
            <span className="flex items-center gap-2">
              <i className="pulse-status size-2 rounded-full bg-success" />
              Central de Monitoramento online 24h — Já é cliente?{" "}
              <a
                href={`tel:${company.phones.central.tel}`}
                className="font-bold"
                onClick={() => trackEvent("click_phone", { placement: "topbar" })}
              >
                Ligue {company.phones.central.display}
              </a>
            </span>
            <div className="flex items-center gap-3">
              <span className="text-silver">Tamanho do texto</span>
              <button
                aria-label="Diminuir tamanho do texto"
                onClick={() => setFontScale(90)}
                className="min-h-8 min-w-8"
              >
                A−
              </button>
              <button
                aria-label="Aumentar tamanho do texto"
                onClick={() => setFontScale(110)}
                className="min-h-8 min-w-8"
              >
                A+
              </button>
            </div>
          </div>
        </div>
        <div
          className={`border-b transition-all ${scrolled || path !== "/" ? "border-border bg-background/95 shadow-sm backdrop-blur" : "border-hero-foreground/10 bg-primary-dark/80 backdrop-blur"}`}
        >
          <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 lg:px-6">
            <Link
              to="/"
              aria-label="Key Master — início"
              className="rounded-lg bg-background/95 px-2 py-1"
            >
              <img
                src="/images/key-master-logo.png"
                alt="Key Master Monitoramento 24 Horas"
                width={900}
                height={469}
                className="h-12 w-auto max-w-44 object-contain"
              />
            </Link>
            <nav
              aria-label="Navegação principal"
              className={`hidden items-center gap-6 lg:flex ${onHeroDark ? "[&_a]:text-hero-foreground" : ""}`}
            >
              {navLinks.map((l) => (
                <Link
                  key={l.to}
                  to={l.to}
                  activeOptions={{ exact: l.to === "/" }}
                  activeProps={{
                    "aria-current": "page",
                    className: "font-bold underline underline-offset-4",
                  }}
                  className="text-sm font-medium"
                >
                  {l.label}
                </Link>
              ))}
            </nav>
            <div className="hidden items-center gap-3 xl:flex">
              <a
                href={`tel:${company.phones.central.tel}`}
                onClick={() => trackEvent("click_phone", { placement: "header" })}
                className={`flex items-center gap-2 text-sm font-semibold ${onHeroDark ? "text-hero-foreground" : "text-primary"}`}
              >
                <Phone className="size-4" />
                {company.phones.central.label}
                <br />
                {company.phones.central.display}
              </a>
              <QuoteCta>{company.cta.quote}</QuoteCta>
            </div>
            <Button
              variant="ghost"
              size="icon"
              className={`lg:hidden ${onHeroDark ? "text-hero-foreground" : "text-primary"}`}
              aria-label="Abrir menu"
              onClick={() => setOpen(true)}
            >
              <Menu />
            </Button>
          </div>
        </div>
      </header>
      {open && (
        <div className="fixed inset-0 z-[60] bg-primary-dark/60" onMouseDown={() => setOpen(false)}>
          <aside
            role="dialog"
            aria-modal="true"
            aria-label="Menu"
            className="ml-auto flex h-dvh w-[88%] max-w-sm flex-col overflow-y-auto bg-background p-5"
            onMouseDown={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between">
              <img
                src="/images/key-master-logo.png"
                alt=""
                width={900}
                height={469}
                className="h-12 w-auto"
              />
              <Button
                variant="ghost"
                size="icon"
                aria-label="Fechar menu"
                onClick={() => setOpen(false)}
              >
                <X />
              </Button>
            </div>
            <nav className="mt-7 flex flex-col gap-1">
              {navLinks.map((l) => (
                <Link
                  key={l.to}
                  to={l.to}
                  activeOptions={{ exact: l.to === "/" }}
                  activeProps={{ "aria-current": "page", className: "text-primary" }}
                  className="flex min-h-12 items-center border-b border-border font-semibold"
                >
                  {l.label}
                </Link>
              ))}
            </nav>
            <div className="mt-auto grid gap-2 pt-6">
              <Button asChild variant="outline">
                <a
                  href={`tel:${company.phones.central.tel}`}
                  onClick={() => trackEvent("click_phone", { placement: "drawer" })}
                >
                  <Phone />
                  Ligar
                </a>
              </Button>
              <Button asChild variant="whatsapp">
                <a
                  href={whatsappUrl()}
                  onClick={() => trackEvent("click_whatsapp", { placement: "drawer" })}
                >
                  <MessageCircle />
                  WhatsApp
                </a>
              </Button>
              <QuoteCta>{company.cta.quote}</QuoteCta>
            </div>
          </aside>
        </div>
      )}
      {children}
      <MobileActions />
    </>
  );
}

function MobileActions() {
  return (
    <div
      className="fixed inset-x-0 bottom-0 z-40 grid grid-cols-3 border-t border-border bg-background p-2 shadow-soft md:hidden"
      style={{ paddingBottom: "max(0.5rem, env(safe-area-inset-bottom))" }}
    >
      <Button asChild variant="ghost">
        <a
          href={`tel:${company.phones.central.tel}`}
          onClick={() => trackEvent("click_phone", { placement: "mobile_bar" })}
        >
          <Phone />
          Ligar
        </a>
      </Button>
      <Button asChild variant="whatsapp">
        <a
          href={whatsappUrl()}
          onClick={() => trackEvent("click_whatsapp", { placement: "mobile_bar" })}
        >
          <MessageCircle />
          WhatsApp
        </a>
      </Button>
      <QuoteCta>{company.cta.quote}</QuoteCta>
    </div>
  );
}
