import Hero from "@/components/sections/Hero";
import Benefits from "@/components/sections/Benefits";
import Products from "@/components/sections/Products";
import EmpreendimentosSection from "@/components/sections/EmpreendimentosSection";
import About from "@/components/sections/About";
import Testimonials from "@/components/sections/Testimonials";

export default function HomePage() {
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
