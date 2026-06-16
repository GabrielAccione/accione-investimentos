import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useCountUp } from "@/hooks/useCountUp";
import { useInView } from "@/hooks/useInView";
import WhatsAppButton from "@/components/ui/WhatsAppButton";
//define assinatura de curva
const PREMIUM_EASE = [0.16, 1, 0.3, 1];
const METRICAS = [
  { valor: "2x", label: "Até o dobro da média de mercado" },
  { valor: "3", label: "Empreendimentos imobilíarios" },
  { valor: "100%", label: "Transparência nas operações" },
];

interface CounterCardProps {
  target: number;
  prefix?: string;
  suffix?: string;
  label: string;
  inView: boolean;
}

function CounterCard({
  target,
  prefix = "",
  suffix = "",
  label,
  inView,
}: CounterCardProps) {
  const count = useCountUp(target, 1800, inView);

  return (
    <motion.div
      whileHover={{ y: -4, scale: 1.01 }}
      whileTap={{ scale: 0.99 }}
      transition={{ duration: 0.3, ease: PREMIUM_EASE }}
      className="rounded-2xl border border-[#E5E5E5] bg-white p-4 text-left dark:border-white/10 dark:bg-white/[0.04]"
    >
      <p className="text-2xl font-semibold text-[#041A2A] dark:text-white sm:text-3xl">
        {prefix}
        {count}
        <span className="text-[var(--accent)]">{suffix}</span>
      </p>
      <p className="mt-2 text-sm text-[var(--text-muted)]">{label}</p>
    </motion.div>
  );
}

export default function Hero() {
  const [countersRef, countersInView] = useInView({ threshold: 0.25 });
  const containerVariantes = {
    hidden: { opacity: 0, y: 16 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.3 },
    },
  };
  const itemVariantes = {
    hidden: { opacity: 0, y: 16 },
    visible: {
      opcacity: 1,
      transition: { duration: 0.5, ease: PREMIUM_EASE },
    },
  };
  return (
    <section id="inicio" className="relative overflow-hidden pt-20">
      <div className="absolute left-[8%] top-28 h-56 w-56 rounded-full bg-[var(--accent)]/15 blur-3xl" />
      <div className="absolute right-[10%] top-20 h-64 w-64 rounded-full bg-white/5 blur-3xl" />

      <div className="section-container relative z-10 grid min-h-[calc(100vh-5rem)] items-center gap-12 py-14 lg:grid-cols-[minmax(0,1fr)_420px]">
        <div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }} //reduzido de 24 para20 para movimento mais sofisticado
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: PREMIUM_EASE, delay: 0.05 }}
            className="mt-6 max-w-4xl text-5xl font-semibold leading-[0.96] text-[#041A2A] dark:text-white sm:text-6xl lg:text-7xl"
          >
            Entregamos a investidores oportunidades criteriosamente criadas.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: PREMIUM_EASE, delay: 0.12 }}
            className="mt-6 max-w-2xl text-base leading-relaxed text-[var(--text-secondary)] sm:text-lg"
          >
            Somos uma empresa de investimentos multiestratégia. Identificamos as
            melhores oportunidades considerando seus interesses e buscando
            retornos acima da média de mercado.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: PREMIUM_EASE, delay: 0.2 }}
            className="mt-10 flex flex-wrap gap-4"
          >
            <WhatsAppButton
              mensagem="Olá! Vim pelo site da Accione e gostaria de conhecer as oportunidades disponíveis."
              label="Falar pelo WhatsApp"
              size="md"
            />
            <Link
              to="/investimentos"
              className="btn-ghost active:scale-95 transition-transform duration 200"
            >
              Conhecer oportunidades
            </Link>
          </motion.div>
        </div>

        <motion.div
          ref={countersRef}
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: PREMIUM_EASE, delay: 0.15 }}
          className="surface-card p-6 sm:p-8"
        >
          <div className="flex items-center justify-between gap-4 border-b border-[#E5E5E5] pb-5 dark:border-white/10">
            <div>
              <p className="text-sm uppercase tracking-[0.22em] text-[var(--text-muted)]">
                ACCIONE INVESTIMENTOS
              </p>
              <h2 className="mt-2 text-3xl font-semibold text-[#041A2A] dark:text-white">
                Nossos números
              </h2>
            </div>
            <div className="hidden h-16 w-16 items-center justify-center rounded-full bg-[var(--accent)]/10 text-[var(--accent)] sm:flex"></div>
          </div>

          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <CounterCard
              prefix="R$ "
              target={100}
              suffix="M+"
              label="em negócios desenvolvidos"
              inView={countersInView}
            />
            <CounterCard
              target={5}
              suffix=" +"
              label="anos de atuação"
              inView={countersInView}
            />
            <CounterCard
              target={100}
              suffix=" +"
              label="investimentos financeiros alternativos"
              inView={countersInView}
            />
          </div>

          <p className="mt-6 text-sm leading-relaxed text-[var(--text-secondary)]">
            Trabalhamos com estrutura, explicação e acompanhamento. A proposta é
            ampliar horizontes, andando lado a lado.
          </p>
        </motion.div>
      </div>

      <motion.div
        variants={containerVariantes}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-60px" }}
        className="relative z-10 border-none bg-transparent"
      >
        <div className="section-container py-8 ">
          <div className="grid grid-cols-2 lg:grid-cols-4 bg-transparent border-none shadow-none">
            {METRICAS.map((m, i) => (
              <motion.div
                key={m.label}
                variants={itemVariantes}
                className={[
                  "px-6 py-4",
                  i % 2 !== 0 ? "border-l border-[var(--accent)]/35" : "",
                  i === 2 ? "lg:border-l lg:border-[var(--accent)]/35" : "",
                ].join(" ")}
              >
                <p className="font-display text-4xl font-semibold text-[var(--text-primary)] sm:text-5xl">
                  {m.valor}
                </p>
                <p className="mt-1 text-xs uppercase tracking-[0.16em] text-[var(--text-muted)]">
                  {m.label}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
}
