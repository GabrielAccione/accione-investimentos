import { motion } from "framer-motion";
import WhatsAppButton from "@/components/ui/WhatsAppButton";
import backgroundImg from "@/assets/imagem-fundo.jpg";
import gabrielBgImg from "@/assets/gabriel-fundo.jpg";
//define assinatura de curva
const PREMIUM_EASE = [0.16, 1, 0.3, 1];

export default function Hero() {
  return (
    <section id="inicio" className="relative overflow-hidden pt-20">
      {/* Background Image with Gradient Overlay */}
      <div className="absolute inset-0 -z-10">
        <img
          src={backgroundImg}
          alt="Accione Background"
          className="h-full w-full object-cover object-center"
        />
        {/* Gabriel à direita, fundido no cenário (só desktop) */}
        <img
          src={gabrielBgImg}
          alt=""
          aria-hidden="true"
          className="absolute inset-y-0 right-0 hidden h-full w-[40%] object-cover object-top opacity-100 xl:block"
          style={{
            maskImage: "linear-gradient(to left, black 55%, transparent 92%)",
            WebkitMaskImage:
              "linear-gradient(to left, black 55%, transparent 82%)",
          }}
        />
        {/* Soft theme-aware gradient overlay to ensure text readability and theme blending */}
        <div className="absolute inset-0 bg-gradient-to-b from-white/10 via-white/80 to-[var(--bg-primary)] dark:from-[#041A2A]/40 dark:via-[#041A2A]/85 dark:to-[#041a2a]" />
      </div>

      <div className="absolute left-[8%] top-28 h-56 w-56 rounded-full bg-[var(--accent)]/15 blur-3xl" />
      <div className="absolute right-[10%] top-20 h-64 w-64 rounded-full bg-white/5 blur-3xl" />

      <div className="section-container relative z-10 grid min-h-[calc(100vh-5rem)] items-center py-14 lg:grid-cols-[minmax(0,560px)] lg:justify-start">
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
      </div>
    </section>
  );
}
