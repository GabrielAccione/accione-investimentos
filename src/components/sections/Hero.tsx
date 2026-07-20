import { motion } from "framer-motion";
import { useCountUp } from "@/hooks/useCountUp";
import { useInView } from "@/hooks/useInView";
import WhatsAppButton from "@/components/ui/WhatsAppButton";
import backgroundImg from "@/assets/imagem-fundo.jpg";
import gabrielImg from "@/assets/gabriel.jpg";
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
      className="rounded-2xl border border-[#E5E5E5] bg-white p-3 text-left dark:border-white/10 dark:bg-white/[0.04]"
    >
      <p className="text-lg font-semibold leading-tight text-[#041A2A] dark:text-white">
        {prefix}
        {count}
        <span className="text-[var(--accent)]">{suffix}</span>
      </p>
      <p className="mt-1 text-[11px] leading-tight text-[var(--text-muted)]">{label}</p>
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
      {/* Background Image with Gradient Overlay */}
      <div className="absolute inset-0 -z-10">
        <img
          src={backgroundImg}
          alt="Accione Background"
          className="h-full w-full object-cover object-center"
        />
        {/* Soft theme-aware gradient overlay to ensure text readability and theme blending */}
        <div className="absolute inset-0 bg-gradient-to-b from-white/10 via-white/80 to-[var(--bg-primary)] dark:from-[#041A2A]/40 dark:via-[#041A2A]/85 dark:to-[#041a2a]" />
      </div>

      <div className="absolute left-[8%] top-28 h-56 w-56 rounded-full bg-[var(--accent)]/15 blur-3xl" />
      <div className="absolute right-[10%] top-20 h-64 w-64 rounded-full bg-white/5 blur-3xl" />

      <div className="section-container relative z-10 grid min-h-[calc(100vh-5rem)] items-center gap-12 py-14 lg:grid-cols-[minmax(0,1fr)_420px]">
        <div>
          <motion.span
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: PREMIUM_EASE }}
            className="section-tag"
          >
            Accione Investimentos
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 20 }} //reduzido de 24 para 20 para movimento mais sofisticado
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: PREMIUM_EASE, delay: 0.05 }}
            className="mt-4 max-w-4xl text-5xl font-semibold leading-[0.96] text-[#041A2A] dark:text-white sm:text-5xl lg:text-5xl"
          >
            Entregamos a investidores oportunidades criteriosamente criadas.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: PREMIUM_EASE, delay: 0.12 }}
            className="mt-4 max-w-2xl text-base leading-relaxed text-[var(--text-secondary)] sm:text-lg"
          >
            Desenvolvemos investimentos a partir da leitura qualificada dos
            cenários econômicos, com ênfase em resultados acima da média,
            qualitativa e quantitativamente.
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
          </motion.div>
        </div>

        <motion.div
          ref={countersRef}
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: PREMIUM_EASE, delay: 0.15 }}
          className="surface-card p-5"
        >
          <div className="mb-5 flex justify-center border-b border-[#484949]/15 pb-5">
            <img
              src={gabrielImg}
              alt="Gabriel Rodrigues"
              className="h-28 w-28 rounded-full object-cover sm:h-32 sm:w-32"
            />
          </div>

          <div className="grid grid-cols-3 gap-2">
            <CounterCard
              prefix="R$ +"
              target={100}
              suffix="M"
              label="em negócios desenvolvidos"
              inView={countersInView}
            />
            <CounterCard
              prefix="+"
              target={5}
              label="anos de atuação"
              inView={countersInView}
            />
            <CounterCard
              prefix=" +"
              target={100}
              label="investimentos financeiros alternativos"
              inView={countersInView}
            />
          </div>

          <p className="mt-4 text-sm leading-relaxed text-[var(--text-secondary)]">
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
