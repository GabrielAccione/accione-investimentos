import { useState } from "react";
import { CheckCircle2, ChevronDown, ChevronLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import ScrollReveal from "@/components/ui/ScrollReveal";
import WhatsAppButton from "@/components/ui/WhatsAppButton";
import cprfImage from "@/assets/Investimentos/cpr-f.png";
import { useSeo } from "@/hooks/useSeo";

const STEPS = [
  {
    num: "01",
    title: "Emissor demanda recursos",
    desc: "Produtores rurais e cooperativas emitem a CPR-F para financiar sua produção, atribuindo garantias, prazo e taxas.",
  },
  {
    num: "02",
    title: "Você investe",
    desc: "Adquire o título com prazo, rentabilidade e garantias definidos no momento da compra. A CPR-F é registrada na B3.",
  },
  {
    num: "03",
    title: "Operação é monitorada",
    desc: "Acompanhamos a evolução do negócio e você tem contato direto conosco caso tenha dúvidas.",
  },
  {
    num: "04",
    title: "Operação é concluída",
    desc: "Ao vencimento, o investidor recebe o valor investido acrescido da rentabilidade acordada.",
  },
];

const CARACTERISTICAS = [
  { label: "Prazo típico", value: "12 a 36 meses" },
  { label: "Tributação", value: "Possível isenção de IR para pessoa física" },
  { label: "Rentabilidade", value: "Historicamente acima do CDI" },
  { label: "Perfil", value: "Moderado a sofisticado" },
  {
    label: "Lastro",
    value: "Produção agrícola e/ou garantia real",
  },
  { label: "Liquidez", value: "No vencimento" },
  { label: "Registro", value: "B3" },
  { label: "Amparo legal", value: "Lei 8.929/94" },
];

const DIFERENCIAIS = [
  "Isenção de Imposto de Renda para pessoa física, elevando o retorno líquido frente a aplicações tributadas.",
  "Rentabilidade historicamente acima do CDI.",
  "Lastro em produção agrícola e/ou garantia real, em um dos setores mais sólidos do Brasil.",
  "Registro formal na B3 com segurança jurídica.",
  "Prazo previsível e retorno acordado no momento da operação.",
  "Amparo legal consolidado pela Lei 8.929/94.",
];

const FAQ = [
  {
    q: "Qual o valor mínimo para investir em CPR-F?",
    a: "Entre em contato via WhatsApp para consultar as oportunidades disponíveis e valores mínimos atuais.",
  },
  {
    q: "O CPR-F é isento de Imposto de Renda?",
    a: "Sim. Para pessoa física, os rendimentos da CPR-F podem ser isentos de Imposto de Renda — o que aumenta o retorno líquido em relação a aplicações tributadas, como CDB e Tesouro Direto. Para pessoa jurídica, a tributação segue o regime da empresa.",
  },
  {
    q: "CPR-F tem garantia do FGC?",
    a: "A CPR-F não conta com garantia do FGC, mas é lastreada em produção agrícola e pode ter garantias reais (imóveis) na operação. Ela também é registrada na B3, o que confere segurança jurídica à operação.",
  },
  {
    q: "A CPR-F é indicada para qual perfil de investidor?",
    a: "A CPR-F é recomendada para perfil moderado a sofisticado. Trata-se de um ativo estruturado do agronegócio com prazo definido e retorno acordado. Consulte nossos especialistas para entender se essa tese é adequada para você.",
  },
  {
    q: "Posso resgatar antes do vencimento?",
    a: "A CPR-F é um título com prazo definido. Normalmente não permite encerramento antes do prazo acordado.",
  },
];

export default function CprFPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  useSeo({
    title: "CPR-F — Cédula de Produto Rural Financeira",
    description:
      "Invista no agronegócio brasileiro com isenção de IR para pessoa física, lastro em produção agrícola, registro na B3 e amparo na Lei 8.929/94.",
    path: "/investimentos/cpr-f",
  });

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden pt-24">
        <img
          src={cprfImage}
          alt="CPR-F"
          className="absolute inset-0 h-full w-full object-cover"
          style={{ objectPosition: "center 30%" }}
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
            <h1 className="mt-4 max-w-3xl text-3xl font-semibold leading-tight text-white sm:text-4xl lg:text-5xl">
              CPR-F — Cédula de Produto Rural Financeira
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-relaxed text-white/75 sm:text-lg">
              Invista no agronegócio brasileiro com isenção de IR para pessoa
              física, segurança jurídica e rentabilidade historicamente acima do
              CDI.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Como funciona */}
      <section className="pt-20 pb-10 sm:pt-24 sm:pb-12">
        <div className="section-container">
          <ScrollReveal>
            <h2 className="text-3xl font-semibold text-[var(--text-primary)]">
              Como funciona
            </h2>
          </ScrollReveal>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {STEPS.map(({ num, title, desc }, i) => (
              <ScrollReveal key={num} delay={i * 0.1}>
                <div className="surface-card h-full p-6">
                  <p className="text-4xl font-bold text-[var(--accent)]/40">
                    {num}
                  </p>
                  <h3 className="mt-3 text-base font-semibold text-[var(--accent)]">
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
      <section className="pt-10 pb-10 sm:pt-12 sm:pb-12">
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
                  <p className="mt-2 text-base font-medium text-[var(--text-primary)]">
                    {value}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Diferenciais */}
      <section className="pt-10 pb-10 sm:pt-12 sm:pb-12">
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
                    <li className="flex items-start gap-3 text-base leading-relaxed text-[var(--text-secondary)]">
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
              <div className="mx-auto overflow-hidden h-56 w-56 rounded-[32px] border border-[var(--accent)]/20 shadow-lg">
                <img
                  src={cprfImage}
                  alt="Cultivo de soja"
                  className="h-full w-full object-cover"
                />
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="pt-10 pb-20 sm:pt-12 sm:pb-24">
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

          <ScrollReveal>
            <p className="mt-10 max-w-3xl text-xs leading-relaxed text-[var(--text-muted)]">
              Investimento sujeito a riscos, inclusive de crédito do emissor.
              Não conta com garantia do Fundo Garantidor de Créditos (FGC).
              Prazo, taxa e garantias são definidos em cada operação, no momento
              da contratação. Rentabilidade passada não representa garantia de
              rentabilidade futura. Conteúdo informativo — não constitui
              recomendação de investimento. Não substitui a análise criteriosa e
              o profundo entendimento por parte de qualquer investidor.
            </p>
          </ScrollReveal>
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
