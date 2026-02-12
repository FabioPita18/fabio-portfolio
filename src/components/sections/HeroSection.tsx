import { Button } from "@/components/ui/button";
import { ArrowDown, MapPin, Mail, Sparkles } from "lucide-react";
import heroBg from "@/assets/hero-bg.jpg";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat scale-105 animate-[scale-in_1.5s_ease-out_forwards]"
        style={{ backgroundImage: `url(${heroBg})` }} />

      <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/60 to-background" />
      
      {/* Animated background particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(6)].map((_, i) =>
        <div
          key={i}
          className="absolute w-2 h-2 bg-primary/20 rounded-full animate-float"
          style={{
            left: `${15 + i * 15}%`,
            top: `${20 + i % 3 * 25}%`,
            animationDelay: `${i * 0.5}s`,
            animationDuration: `${3 + i * 0.5}s`
          }} />

        )}
      </div>
      
      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 text-center">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Badge */}
          <div className="opacity-0 animate-fade-in-down stagger-1">
            



          </div>

          {/* Name */}
          <h1 className="opacity-0 animate-fade-in-up stagger-2 text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight text-foreground">
            <span className="inline-block hover:scale-105 transition-transform duration-300">Full Stack</span>
            <span className="block text-primary relative">
              Developer
              <Sparkles className="absolute -top-2 -right-8 w-6 h-6 text-primary/60 animate-pulse-glow" />
            </span>
          </h1>

          {/* Tagline */}
          <p className="opacity-0 animate-fade-in-up stagger-3 text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            4+ years building enterprise-grade ERP/CRM systems. 
            <span className="block mt-2">Passionate about scalable architecture and clean code.</span>
          </p>

          {/* Tech Stack Pills */}
          <div className="opacity-0 animate-fade-in stagger-4 flex flex-wrap justify-center gap-3">
            {["Django", "FastAPI", "React", "TypeScript", "PostgreSQL"].map((tech, index) =>
            <span
              key={tech}
              className="px-4 py-2 bg-secondary/20 border border-secondary/30 text-secondary-foreground text-sm font-mono hover-lift hover:border-primary/50 hover:bg-primary/10 cursor-default"
              style={{ animationDelay: `${0.4 + index * 0.1}s` }}>

                {tech}
              </span>
            )}
          </div>

          {/* CTA Buttons */}
          <div className="opacity-0 animate-slide-up stagger-5 flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <Button
              size="lg"
              className="group hover-glow hover:scale-105 transition-all duration-300"
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}>

              <Mail className="w-4 h-4 mr-2 group-hover:rotate-12 transition-transform duration-300" />
              Get in Touch
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="hover:scale-105 transition-all duration-300 hover:border-primary"
              onClick={() => document.getElementById('experience')?.scrollIntoView({ behavior: 'smooth' })}>

              View Experience
            </Button>
          </div>
        </div>

      </div>
    </section>);

};

export default HeroSection;