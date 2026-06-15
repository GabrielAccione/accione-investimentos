import { useState } from "react";
import { CheckCircle2, ChevronDown, ChevronLeft, Wheat } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import ScrollReveal from "@/components/ui/ScrollReveal";
import WhatsAppButton from "@/components/ui/WhatsAppButton";
import cprfImage from "@/assets/Investimentos/cpr-f.png";

const STEPS = [
  {
    num: "01",
    title: "Emissor capta recursos",
    desc: "Produtores rurais e cooperativas emitem a CPR-F para financiar sua produção.",
  },
  {
    num: "02",
    title: "Você investe",
    desc: "Adquire o título com prazo e rentabilidade definidos no momento da compra.",
  },
  {
    num: "03",
    title: "Recebe o retorno",
    desc: "Ao vencimento, recebe o valor investido acrescido da rentabilidade acordada.",
  },
];

const CARACTERISTICAS = [
  { label: "Prazo típico", value: "12 a 36 meses" },
  { label: "Rentabilidade", value: "Muito acima do CDI" },
  { label: "Perfil:", value: "Moderado a sofisticado" },
  {
    label: "Lastro",
    value: "Produção agrícola com muita rentabilidade acima do CDI",
  },
  { label: "Registro", value: "Câmara de liquidação e custódia" },
  { label: "Amparo legal", value: "Lei 8.929/94" },
];

const DIFERENCIAIS = [
  "Rentabilidade acima do CDI — perfil moderado a sofisticado",
  "Lastro em produção agrícola com muita rentabilidade acima do CDI, um dos setores mais sólidos do Brasil",
  "Registro formal em câmara de custódia com segurança jurídica",
  "Prazo previsível e retorno acordado no momento da compra",
  "Amparo legal consolidado pela Lei 8.929/94",
];

const FAQ = [
  {
    q: "Qual o valor mínimo para investir em CPR-F?",
    a: "Entre em contato via WhatsApp para consultar as oportunidades disponíveis e valores mínimos atuais.",
  },
  {
    q: "CPR-F tem garantia do FGC?",
    a: "A CPR-F não conta com garantia do FGC, mas é lastreada em produção agrícola com muita rentabilidade acima do CDI e registrada em câmara de custódia, o que confere segurança jurídica ao investidor.",
  },
  {
    q: "A CPR-F é indicada para qual perfil de investidor?",
    a: "A CPR-F é recomendada para perfil moderado a sofisticado. Trata-se de um ativo estruturado do agronegócio com prazo definido e retorno acordado. Consulte nossos especialistas para entender como essa tese se encaixa no seu perfil.",
  },
  {
    q: "Posso resgatar antes do vencimento?",
    a: "A CPR-F é um título com prazo definido. Consulte nossos especialistas para entender as condições de liquidez de cada operação disponível.",
  },
];

export default function CprFPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden pt-24">
        <img
          src={cprfImage}
          alt="CPR-F"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#041A2A] via-[#041A2A]/75 to-[#041A2A]/20" />
        <div className="section-container relative z-10 py-16 sm:py-20">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55 }}
          >
            <Link
              to="/investimentos"
              className="inline-flex items-center gap-1 text-sm text-white/70 transition-colors hover:text-white"
            >
              <ChevronLeft size={15} />
              Investimentos
            </Link>
            <div className="mt-4 flex flex-wrap items-center gap-3">
              <span className="section-tag">Perfil moderado a sofisticado</span>
            </div>
            <h1 className="mt-4 max-w-3xl text-4xl font-semibold leading-tight text-white sm:text-5xl lg:text-6xl">
              CPR-F — Cédula de Produto Rural Financeira
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-relaxed text-white/75 sm:text-lg">
              Invista no agronegócio brasileiro com segurança jurídica e
              rentabilidade acima do CDI.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Como funciona */}
      <section className="py-20 sm:py-24">
        <div className="section-container">
          <ScrollReveal>
            <h2 className="text-3xl font-semibold text-[var(--text-primary)]">
              Como funciona
            </h2>
          </ScrollReveal>
          <div className="mt-10 grid gap-6 sm:grid-cols-3">
            {STEPS.map(({ num, title, desc }, i) => (
              <ScrollReveal key={num} delay={i * 0.1}>
                <div className="surface-card h-full p-6">
                  <p className="text-4xl font-semibold text-[var(--accent)]/30">
                    {num}
                  </p>
                  <h3 className="mt-3 text-base font-semibold text-[var(--text-primary)]">
                    {title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-[var(--text-secondary)]">
                    {desc}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Características */}
      <section className="py-20 sm:py-24">
        <div className="section-container">
          <ScrollReveal>
            <h2 className="text-3xl font-semibold text-[var(--text-primary)]">
              Características
            </h2>
          </ScrollReveal>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {CARACTERISTICAS.map(({ label, value }, i) => (
              <ScrollReveal key={label} delay={i * 0.07}>
                <div className="surface-card p-5">
                  <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--text-muted)]">
                    {label}
                  </p>
                  <p className="mt-2 text-lg font-semibold text-[var(--text-primary)]">
                    {value}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Diferenciais */}
      <section className="py-20 sm:py-24">
        <div className="section-container">
          <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_260px] lg:items-center">
            <div>
              <ScrollReveal>
                <h2 className="text-3xl font-semibold text-[var(--text-primary)]">
                  Por que CPR-F?
                </h2>
              </ScrollReveal>
              <ul className="mt-8 space-y-4">
                {DIFERENCIAIS.map((d, i) => (
                  <ScrollReveal key={i} delay={i * 0.07}>
                    <li className="flex items-start gap-3 text-sm leading-relaxed text-[var(--text-secondary)]">
                      <CheckCircle2
                        size={18}
                        className="mt-0.5 shrink-0 text-[var(--accent)]"
                      />
                      {d}
                    </li>
                  </ScrollReveal>
                ))}
              </ul>
            </div>
            <ScrollReveal direction="left">
              <div className="mx-auto flex h-56 w-56 items-center justify-center rounded-[32px] border border-[var(--accent)]/20 bg-gradient-to-br from-[var(--accent)]/20 to-transparent text-[var(--accent)]">
                <Wheat size={96} strokeWidth={1.2} />
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 sm:py-24">
        <div className="section-container">
          <ScrollReveal>
            <h2 className="text-3xl font-semibold text-[var(--text-primary)]">
              Perguntas frequentes
            </h2>
          </ScrollReveal>
          <div className="mt-10 max-w-3xl space-y-3">
            {FAQ.map(({ q, a }, i) => (
              <ScrollReveal key={i} delay={i * 0.06}>
                <div className="surface-card overflow-hidden">
                  <button
                    type="button"
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    className="flex w-full items-center justify-between gap-4 p-5 text-left"
                  >
                    <span className="text-sm font-medium text-[var(--text-primary)]">
                      {q}
                    </span>
                    <ChevronDown
                      size={18}
                      className={`shrink-0 text-[var(--accent)] transition-transform duration-300 ${
                        openFaq === i ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                  {openFaq === i && (
                    <p className="border-t border-black/5 dark:border-white/5 px-5 pb-5 pt-4 text-sm leading-relaxed text-[var(--text-secondary)]">
                      {a}
                    </p>
                  )}
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA final */}
      <section className="hero-gradient py-20 sm:py-24">
        <div className="section-container text-center">
          <ScrollReveal>
            <h2 className="text-3xl font-semibold text-[var(--text-primary)] sm:text-4xl">
              Pronto para investir em CPR-F?
            </h2>
            <p className="mt-4 text-[var(--text-secondary)]">
              Fale com um especialista da Accione e entenda como essa tese se
              encaixa no seu portfólio.
            </p>
            <div className="mt-8 flex justify-center">
              <WhatsAppButton
                mensagem="Olá! Tenho interesse em investir em CPR-F. Pode me enviar mais informações?"
                label="Quero investir em CPR-F"
                size="lg"
              />
            </div>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
