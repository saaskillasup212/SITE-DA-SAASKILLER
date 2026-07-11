import { useParams } from "react-router-dom";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Benefits from "@/components/Benefits";
import HowItWorks from "@/components/HowItWorks";
import Stats from "@/components/Stats";
import Pricing from "@/components/Pricing";
import ExtensionSection from "@/components/ExtensionSection";
import FinalCTA from "@/components/FinalCTA";
import FAQ from "@/components/FAQ";
import Footer from "@/components/Footer";
import { useAffiliate } from "@/hooks/use-affiliate";

const Index = () => {
  const { afiliado } = useParams<{ afiliado?: string }>();
  const { links, isLoading } = useAffiliate(afiliado);

  return (
    <div className="min-h-screen overflow-x-hidden" style={{ background: "var(--bg-void)" }}>
      <Header />
      <main>
        <Hero />
        <Benefits />
        <HowItWorks />
        <Stats />
        <Pricing affiliateLinks={links} isLoading={isLoading} />
        <ExtensionSection />
        <FAQ />
        <FinalCTA />
      </main>
      <Footer />
    </div>
  );
};

export default Index;