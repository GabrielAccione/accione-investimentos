import { Link } from "react-router-dom";
import PageHero from "@/components/ui/PageHero";
import ProductCard from "@/components/ui/ProductCard";
import { PRODUCTS } from "@/data/products";

export default function InvestimentosPage() {
  return (
    <>
      <PageHero
        eyebrow="Investimentos Financeiros"
        title={
          <>
            Estruturas com leitura de risco,
            <span className="text-gradient"> lastro e propósito.</span>
          </>
        }
        description="A Accione trabalha com teses em que o retorno faz sentido porque a estrutura também faz. Selecione um produto para conhecer em detalhe."
        actions={
          <Link to="/contato" className="btn-accent">
            Quero conhecer melhor
          </Link>
        }
      />

      <section className="py-20 sm:py-24">
        <div className="section-container">
          <div className="grid gap-8 sm:grid-cols-2">
            {PRODUCTS.map((item, index) => (
              <ProductCard key={item.slug} item={item} index={index} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
