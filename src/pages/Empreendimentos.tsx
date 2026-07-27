import PageHero from "@/components/ui/PageHero";
import { EMPREENDIMENTOS } from "@/data/empreendimentos";
import EmpreendimentoCard from "@/components/ui/EmpreendimentoCard";
import { useSeo } from "@/hooks/useSeo";

export default function Empreendimentos() {
  useSeo({
    title: "Empreendimentos Imobiliários em Santa Maria/RS",
    description:
      "Invista em imóveis pelo modelo SPE a preço de custo: Avenue Residence, Sync Conde e Sync Floriano, com gestão profissional da Accione e construção Zacon Zanini.",
    path: "/empreendimentos",
  });

  return (
    <>
      <PageHero
        eyebrow="Empreendimentos Imobiliários"
        title={
          <>
            Nossos <span className="text-gradient">Empreendimentos</span>
          </>
        }
        description="Invista em imóveis através do modelo SPE a preço de custo — seguro, rentável e gerido profissionalmente."
      />

      {/* Cards */}
      <section className="py-20">
        <div className="section-container">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {EMPREENDIMENTOS.map((item, index) => (
              <EmpreendimentoCard key={item.slug} item={item} index={index} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
