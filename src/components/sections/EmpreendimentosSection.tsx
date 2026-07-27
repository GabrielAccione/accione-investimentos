import { Link } from "react-router-dom";
import SectionHeading from "@/components/ui/SectionHeading";
import EmpreendimentoCard from "@/components/ui/EmpreendimentoCard";
import { EMPREENDIMENTOS } from "@/data/empreendimentos";

export default function EmpreendimentosSection() {
  return (
    <section id="empreendimentos" className="py-20 sm:py-24">
      <div className="section-container">
        <SectionHeading
          eyebrow="Empreendimentos Imobiliários"
          title="Invista em imóveis pelo modelo SPE a preço de custo."
          description="Participe da construção de empreendimentos selecionados, com estrutura, gestão profissional e acompanhamento de ponta a ponta."
          align="left"
        />

        <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-3">
          {EMPREENDIMENTOS.map((item, index) => (
            <EmpreendimentoCard key={item.slug} item={item} index={index} />
          ))}
        </div>

        <div className="mt-10">
          <Link
            to="/empreendimentos"
            className="btn-ghost inline-flex items-center gap-2 group"
          >
            Ver todos os empreendimentos
          </Link>
        </div>
      </div>
    </section>
  );
}
