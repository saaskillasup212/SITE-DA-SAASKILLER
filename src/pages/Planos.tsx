import Header from "@/components/Header";
import Pricing from "@/components/Pricing";
import ProblemSection from "@/components/ProblemSection";
import TeamSection from "@/components/TeamSection";
import FAQ from "@/components/FAQ";
import Footer from "@/components/Footer";

const Planos = () => {
  return (
    <div className="min-h-screen" style={{ background: "var(--bg-void)" }}>
      <Header />
      <main className="pt-24">
        {/* We add pt-24 so the header doesn't overlap the pricing section */}
        <Pricing />
        <ProblemSection />
        <TeamSection />
        <FAQ />
      </main>
      <Footer />
    </div>
  );
};

export default Planos;
