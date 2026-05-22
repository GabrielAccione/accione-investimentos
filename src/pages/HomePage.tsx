import Hero from "@/components/sections/Hero";
import EconomicIndicatorsSection from "@/components/sections/EconomicIndicatorsSection";
import Benefits from "@/components/sections/Benefits";
import Products from "@/components/sections/Products";
import HowItWorks from "@/components/sections/HowItWorks";
import About from "@/components/sections/About";
import Testimonials from "@/components/sections/Testimonials";

export default function HomePage() {
  return (
    <>
      <Hero />
      <EconomicIndicatorsSection />
      <Benefits />
      <Products />
      <HowItWorks />
      <About />
      <Testimonials />
    </>
  );
}
