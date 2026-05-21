import { ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import PageHero from "@/components/ui/PageHero";
import ScrollReveal from "@/components/ui/ScrollReveal";
import cprfImage from "@/assets/Investimentos/cpr-f.png";
import creditoPrivadoImage from "@/assets/Investimentos/credito-privado.png";

const CARDS = [
  {
    image: cprfImage,
    title: "CPR-F",
    subtitle: "Cédula de Produto Rural Financeira",
    description:
      "Título lastreado na produção agrícola brasileira com rentabilidade acima do CDI e isenção de IR para pessoa física.",
    badge: "Isenção de IR · PF",
    href: "/investimentos/cpr-f",
  },
  {
    image: creditoPrivadoImage,
    title: "Crédito Privado",
    subtitle: "Renda fixa corporativa",
    description:
      "Empréstimo a empresas com retorno contratual, prazo definido e fluxo de caixa previsível.",
    badge: "Renda Fixa",
    href: "/investimentos/credito-privado",
  },
];

export default function InvestimentosPage() {
  return (
    <>
      <PageHero
        eyebrow="Investimentos"
        title={
          <>
            Estruturas com leitura de risco,
            <span className="text-gradient"> lastro e propósito.</span>
          </>
        }
        description="A Accione trabalha com teses em que o retorno faz sentido porque a estrutura também faz. Selecione um produto para conhecer em detalhe."
        actions={
          <Link to="/contato" className="btn-accent">
            Quero conversar sobre meu perfil
          </Link>
        }
      />

      <section className="bg-[var(--bg-secondary)] py-20 sm:py-24">
        <div className="section-container">
          <div className="grid gap-6 sm:grid-cols-2">
            {CARDS.map(
              ({ image, title, subtitle, description, badge, href }, i) => (
                <ScrollReveal key={href} delay={i * 0.1}>
                  <div className="surface-card flex h-full flex-col p-7 sm:p-8">
                    <div className="flex items-center justify-between">
                      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[var(--accent)]/12">
                        <img
                          src={image}
                          alt={title}
                          className="h-8 w-8 object-contain"
                        />
                      </div>
                      <span className="section-tag">{badge}</span>
                    </div>
                    <h2 className="mt-5 text-2xl font-semibold text-white">
                      {title}
                    </h2>
                    <p className="mt-0.5 text-sm text-[var(--text-muted)]">
                      {subtitle}
                    </p>
                    <p className="mt-4 flex-1 text-sm leading-relaxed text-[var(--text-secondary)]">
                      {description}
                    </p>
                    <Link
                      to={href}
                      className="mt-7 inline-flex items-center gap-2 self-start rounded-full border border-[var(--accent)]/45 px-6 py-2.5 text-sm font-medium text-[var(--accent)] transition-all duration-300 hover:bg-[var(--accent)]/10 hover:scale-105 active:scale-95"
                    >
                      Conhecer produto
                      <ChevronRight size={16} />
                    </Link>
                  </div>
                </ScrollReveal>
              ),
            )}
          </div>
        </div>
      </section>
    </>
  );
}
