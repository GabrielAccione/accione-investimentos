import PageHero from "@/components/ui/PageHero";
import { EMPREENDIMENTOS } from "@/data/empreendimentos";
import EmpreendimentoCard from "@/components/ui/EmpreendimentoCard";

export default function Empreendimentos() {
  return (
    <>
      <PageHero
        eyebrow="Empreendimentos Imobiliários"
        title={
          <>
            Nossos <span className="text-gradient">Empreendimentos</span>
          </>
        }
        description="Invista em imóveis a preço de custo através do modelo SPE — seguro, rentável e gerido profissionalmente."
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
