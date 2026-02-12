import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import ParticleBackground from "@/components/ParticleBackground";
import HeroSection from "@/components/sections/HeroSection";
import AboutSection from "@/components/sections/AboutSection";
import ProjectsSection from "@/components/sections/ProjectsSection";
import SkillsSection from "@/components/sections/SkillsSection";
import ExperienceSection from "@/components/sections/ExperienceSection";
import ContactSection from "@/components/sections/ContactSection";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        {/* Zone 1: Hero — red particles, RTL */}
        <HeroSection />

        {/* Zone 2: About + Projects — dark particles on maroon, LTR */}
        <div className="relative overflow-hidden bg-card/50">
          <ParticleBackground theme="dark" direction="ltr" />
          <AboutSection />
          <ProjectsSection />
        </div>

        {/* Zone 3: Skills — red particles, RTL */}
        <div className="relative overflow-hidden bg-background">
          <ParticleBackground theme="red" direction="rtl" />
          <SkillsSection />
        </div>

        {/* Zone 4: Experience — dark particles on maroon, LTR */}
        <div className="relative overflow-hidden bg-card/50">
          <ParticleBackground theme="dark" direction="ltr" />
          <ExperienceSection />
        </div>

        {/* Zone 5: Contact — red particles, RTL */}
        <div className="relative overflow-hidden bg-background">
          <ParticleBackground theme="red" direction="rtl" />
          <ContactSection />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Index;
