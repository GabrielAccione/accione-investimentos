import EconomicIndicatorsSection from "@/components/sections/EconomicIndicatorsSection";
import { useSeo } from "@/hooks/useSeo";

export default function IndicadoresPage() {
  useSeo({
    title: "Indicadores Econômicos — Selic, CDI, IPCA, IGP-M e INCC",
    description:
      "Acompanhe Selic, CDI, IPCA, IPCA-15, IGP-M, IGP-DI, INCC, Ibovespa e Bitcoin com atualização periódica e fontes abertas (BCB, IBGE, FGV e B3).",
    path: "/indicadores",
  });

  return (
    <div className="pt-16 sm:pt-20">
      <EconomicIndicatorsSection showPageLink={false} />
    </div>
  );
}
