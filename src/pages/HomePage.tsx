import Hero from "@/components/sections/Hero";
import Benefits from "@/components/sections/Benefits";
import Products from "@/components/sections/Products";
import EmpreendimentosSection from "@/components/sections/EmpreendimentosSection";
import About from "@/components/sections/About";
import Testimonials from "@/components/sections/Testimonials";
import { useSeo } from "@/hooks/useSeo";

export default function HomePage() {
  useSeo({
    title: "Investimentos e Empreendimentos em Santa Maria/RS",
    description:
      "A Accione entrega a investidores oportunidades financeiras e imobiliárias criteriosamente criadas: CPR-F, crédito privado e empreendimentos no modelo SPE a preço de custo.",
    path: "/",
  });

  return (
    <>
      <Hero />
      <Benefits />
      <Products />
      <EmpreendimentosSection />
      <About />
      <Testimonials />
    </>
  );
}
