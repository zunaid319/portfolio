import { Header } from "@/components/sections/Header";
import { Hero } from "@/components/sections/Hero";
import { Journey } from "@/components/sections/Journey";
import { Skills } from "@/components/sections/Skills";
import { TechLogos } from "@/components/sections/TechLogos";
import { Projects } from "@/components/sections/Projects";
import { Testimonials } from "@/components/sections/Testimonials";
import { CareerAdvisor } from "@/components/sections/CareerAdvisor";
import { Contact } from "@/components/sections/Contact";
import { Footer } from "@/components/sections/Footer";

export default function Home() {
  return (
    <div className="bg-black min-h-screen text-white overflow-hidden selection:bg-primary selection:text-primary-foreground">
      <Header />
      <Hero />
      <Journey />
      <Skills />
      <TechLogos />
      <Projects />
      <Testimonials />
      <CareerAdvisor />
      <Contact />
      <Footer />
    </div>
  );
}
