import SectionHeading from "@/components/ui/SectionHeading";
import ProductCard from "@/components/ui/ProductCard";
import { PRODUCTS } from "@/data/products";

export default function Products() {
  return (
    <section id="produtos" className="py-20 sm:py-24">
      <div className="section-container">
        <SectionHeading
          eyebrow="Investimentos Financeiros"
          title="Teses selecionadas para diversificar com eficácia."
          description="Dois blocos centrais da atuação da Accione, com racional claro de retorno, risco e acompanhamento."
          align="left"
        />

        <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2">
          {PRODUCTS.map((item, index) => (
            <ProductCard key={item.slug} item={item} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
