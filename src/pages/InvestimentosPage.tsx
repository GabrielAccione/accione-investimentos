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

      <section className="py-20 sm:py-24">
        <div className="section-container">
          <div className="grid gap-6 sm:grid-cols-2">
            {CARDS.map(
              ({ image, title, subtitle, description, badge, href }, i) => (
                <ScrollReveal key={href} delay={i * 0.1}>
                  <Link to={href} className="group block h-full">
                    <article className="surface-card flex h-full flex-col overflow-hidden transition-transform duration-300 group-hover:-translate-y-1">
                      <div className="relative h-48 overflow-hidden">
                        <img
                          src={image}
                          alt={title}
                          className="h-48 w-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#041A2A] via-[#041A2A]/60 to-transparent" />
                        <div className="absolute bottom-0 p-6">
                          <span className="mb-3 inline-flex rounded-full bg-[#A26547]/90 px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-white">
                            {badge}
                          </span>
                          <h2 className="text-xl font-bold text-white">{title}</h2>
                          <p className="mt-1 text-sm text-white/70">{subtitle}</p>
                        </div>
                      </div>
                      <div className="flex flex-1 flex-col p-6 sm:p-7">
                        <p className="flex-1 text-sm leading-relaxed text-[var(--text-secondary)]">
                          {description}
                        </p>
                        <span className="mt-7 inline-flex self-start rounded-full border border-[#041A2A] px-6 py-2.5 text-sm font-medium text-[#041A2A] transition-colors group-hover:border-[#A26547] group-hover:text-[#A26547] dark:border-white dark:text-white">
                          Conhecer produto
                        </span>
                      </div>
                    </article>
                  </Link>
                </ScrollReveal>
              ),
            )}
          </div>
        </div>
      </section>
    </>
  );
}
