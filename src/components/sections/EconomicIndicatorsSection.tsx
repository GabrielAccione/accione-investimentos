import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useEconomicIndicators } from "@/context/EconomicIndicatorsContext";
import IndicatorCard from "@/components/indicators/IndicatorCard";
import SectionHeading from "@/components/ui/SectionHeading";

interface EconomicIndicatorsSectionProps {
  showPageLink?: boolean;
}

function SkeletonCard() {
  return (
    <div className="h-56 animate-pulse rounded-2xl border border-[#E5E5E5] bg-white dark:border-white/10 dark:bg-white/[0.03]" />
  );
}

export default function EconomicIndicatorsSection({
  showPageLink = true,
}: EconomicIndicatorsSectionProps) {
  const { indicators, isLoading, error, lastUpdated } = useEconomicIndicators();

  return (
    <section id="indicadores-home" className="py-20 sm:py-24">
      <div className="section-container">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            eyebrow="Indicadores econômicos"
            title={
              <>
                Leituras que ajudam a contextualizar o
                <span className="text-gradient"> cenário atual</span>
              </>
            }
            description="Acompanhamento em tempo real para juros, inflação, mercado e referência imobiliária, com atualização periódica e fontes abertas."
            align="left"
          />

          <div className="flex flex-wrap items-center gap-3">
            {showPageLink ? (
              <Link to="/indicadores" className="btn-accent text-sm">
                Ver página completa
              </Link>
            ) : null}
          </div>
        </div>

        {error ? (
          <div className="mt-10 rounded-2xl border border-rose-400/20 bg-rose-400/10 p-5 text-sm text-rose-100">
            {error}
          </div>
        ) : null}

        <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {isLoading
            ? Array.from({ length: 6 }).map((_, index) => (
                <SkeletonCard key={index} />
              ))
            : indicators.map((indicator, index) => (
                <motion.div
                  key={indicator.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.1 }}
                  transition={{ duration: 0.4, delay: index * 0.07 }}
                >
                  <IndicatorCard indicator={indicator} />
                </motion.div>
              ))}
        </div>

        {lastUpdated ? (
          <p className="mt-6 text-right text-xs uppercase tracking-[0.16em] text-[var(--text-muted)]">
            Última atualização: {lastUpdated}
          </p>
        ) : null}
      </div>
    </section>
  );
}
