import { Button } from "@/components/ui/button";
import { Mail } from "lucide-react";
import ParticleBackground from "@/components/ParticleBackground";
import { useTheme } from "@/contexts/ThemeContext";

const HeroSection = () => {
  const { theme } = useTheme();

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Animated canvas background */}
      <ParticleBackground theme="red" direction="rtl" mode={theme} />
      <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/40 to-background" />
      
      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 text-center">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Badge */}
          <div className="opacity-0 animate-fade-in-down stagger-1">
            



          </div>

          {/* Name */}
          <h1 className="opacity-0 animate-fade-in-up stagger-2 text-5xl md:text-7xl lg:text-8xl font-bold font-display tracking-tight text-foreground">
            Fabio Pita
          </h1>
          <p className="opacity-0 animate-fade-in-up stagger-2 text-2xl md:text-3xl text-primary font-medium">
            Full Stack Developer
          </p>

          {/* Tagline */}
          <p className="opacity-0 animate-fade-in-up stagger-3 text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            4+ years building enterprise-grade web applications.
          </p>

          {/* Tech Stack Pills */}
          <div className="opacity-0 animate-fade-in stagger-4 flex flex-wrap justify-center gap-3">
            {["Python", "React", "TypeScript", "PostgreSQL", "Docker"].map((tech, index) =>
            <span
              key={tech}
              className="px-4 py-2 bg-secondary/20 border border-secondary/30 text-secondary-foreground text-sm font-mono hover:border-primary/50 hover:bg-primary/10 transition-all duration-200 ease-out cursor-default"
              style={{ animationDelay: `${0.4 + index * 0.1}s` }}>

                {tech}
              </span>
            )}
          </div>

          {/* CTA Buttons */}
          <div className="opacity-0 animate-slide-up stagger-5 flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <Button
              size="lg"
              className="group hover-glow hover:scale-105 transition-all duration-200 ease-out"
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}>

              <Mail className="w-4 h-4 mr-2 group-hover:rotate-12 transition-transform duration-200 ease-out" />
              Get in Touch
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="hover:scale-105 transition-all duration-200 ease-out hover:border-primary"
              onClick={() => document.getElementById('experience')?.scrollIntoView({ behavior: 'smooth' })}>

              View Experience
            </Button>
          </div>
        </div>

      </div>
    </section>);

};

export default HeroSection;