import Header from "@/components/Header";
import Hero from "@/components/Hero";
import ProblemSection from "@/components/ProblemSection";
import Benefits from "@/components/Benefits";
import InternationalProspecting from "@/components/InternationalProspecting";
import HowItWorks from "@/components/HowItWorks";
import Compatibility from "@/components/Compatibility";
import OperationTransition from "@/components/OperationTransition";
import TeamSection from "@/components/TeamSection";
import Audience from "@/components/Audience";
import Stats from "@/components/Stats";
import Pricing from "@/components/Pricing";
import FinalCTA from "@/components/FinalCTA";
import SocialProof from "@/components/SocialProof";
import FAQ from "@/components/FAQ";
import Footer from "@/components/Footer";
import { useAffiliate } from "@/contexts/AffiliateContext";

const Index = () => {
  const { autoDiscount } = useAffiliate();

  return (
    <div className={`min-h-screen ${autoDiscount ? "has-announcement" : ""}`} style={{ background: "var(--bg-void)" }}>
      <Header />
      <main>
        <Hero />
        <ProblemSection />
        <Benefits />
        <InternationalProspecting />
        <HowItWorks />
        <Compatibility />
        <OperationTransition />
        <TeamSection />
        <Audience />
        <SocialProof />
        <Stats />
        <Pricing />
        <FAQ />
        <FinalCTA />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
