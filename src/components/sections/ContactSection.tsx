import { Button } from "@/components/ui/button";
import { Mail, MapPin, Linkedin, Github, Globe, Send } from "lucide-react";
import useScrollAnimation from "@/hooks/useScrollAnimation";

const ContactSection = () => {
  const { ref: headerRef, isVisible: headerVisible } = useScrollAnimation();
  const { ref: cardRef, isVisible: cardVisible } = useScrollAnimation({ threshold: 0.2 });

  return (
    <section id="contact" className="relative py-24">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto">
          {/* Section Header */}
          <div 
            ref={headerRef}
            className={`text-center mb-16 transition-all duration-700 ${
              headerVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            <h2 className="text-3xl md:text-4xl font-bold font-display text-foreground mb-4">
              Let's Connect
            </h2>
            <div className={`w-20 h-1 bg-primary mx-auto mb-4 transition-all duration-700 delay-200 ${
              headerVisible ? 'scale-x-100' : 'scale-x-0'
            }`} />
            <p className={`text-muted-foreground max-w-2xl mx-auto transition-all duration-700 delay-300 ${
              headerVisible ? 'opacity-100' : 'opacity-0'
            }`}>
              Open to opportunities in South Africa or remote positions with EU-based companies. 
              Let's discuss how I can contribute to your team.
            </p>
          </div>

          {/* Contact Card */}
          <div 
            ref={cardRef}
            className={`bg-card border border-border p-8 md:p-12 card-hover transition-all duration-300 ease-out ${
              cardVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            <div className="grid md:grid-cols-2 gap-12">
              {/* Info */}
              <div className={`space-y-6 transition-all duration-500 ${
                cardVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'
              }`}>
                <h3 className="text-2xl font-bold font-display text-foreground">
                  Get in Touch
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  Whether you have a project in mind, want to discuss opportunities, 
                  or just want to say hello—I'd love to hear from you.
                </p>
                
                <div className="space-y-4">
                  <div className="flex items-center gap-3 text-muted-foreground group cursor-default">
                    <MapPin className="w-5 h-5 text-primary group-hover:scale-110 transition-transform duration-200 ease-out" />
                    <span className="group-hover:text-foreground transition-colors duration-200 ease-out">Johannesburg, South Africa</span>
                  </div>
                  <div className="flex items-center gap-3 text-muted-foreground group cursor-default">
                    <Globe className="w-5 h-5 text-primary group-hover:rotate-12 transition-transform duration-200 ease-out" />
                    <span className="group-hover:text-foreground transition-colors duration-200 ease-out">EU Citizen • Open to Remote</span>
                  </div>
                </div>

                {/* Social Links */}
                <div className="flex gap-4 pt-4">
                  {[
                    { icon: Github, label: "GitHub", href: "https://github.com/FabioPita18" },
                    { icon: Linkedin, label: "LinkedIn", href: "https://www.linkedin.com/in/fabio-pita-455b83212/" },
                    { icon: Mail, label: "Email", href: "mailto:fabiopita267@gmail.com" }
                  ].map((social, index) => (
                    <a 
                      key={social.label}
                      href={social.href}
                      className={`p-3 bg-muted/20 border border-border hover:border-primary hover:bg-primary/10 transition-all duration-200 ease-out hover:-translate-y-1 hover:shadow-lg ${
                        cardVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                      }`}
                      style={{ transitionDelay: cardVisible ? '0ms' : `${400 + index * 100}ms` }}
                      aria-label={social.label}
                    >
                      <social.icon className="w-5 h-5 text-foreground" />
                    </a>
                  ))}
                </div>
              </div>

              {/* CTA */}
              <div className={`flex flex-col justify-center items-center text-center p-8 bg-muted/10 border border-border relative overflow-hidden group transition-all duration-500 ${
                cardVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'
              }`}>
                {/* Animated background gradient */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200 ease-out" />
                
                <div className="relative z-10">
                  <div className="relative mb-4">
                    <Mail className="w-12 h-12 text-primary group-hover:scale-110 transition-transform duration-200 ease-out" />
                    <Send className="w-5 h-5 text-primary/60 absolute -top-1 -right-1 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-200 ease-out" />
                  </div>
                  <h4 className="text-xl font-semibold text-foreground mb-2">
                    Send me an email
                  </h4>
                  <p className="text-sm text-muted-foreground mb-6">
                    I typically respond within 24 hours
                  </p>
                  <Button
                    size="lg"
                    asChild
                    className="w-full sm:w-auto hover:scale-105 hover-glow transition-all duration-200 ease-out"
                  >
                    <a href="mailto:fabiopita267@gmail.com">
                      <Mail className="w-4 h-4 mr-2" />
                      fabiopita267@gmail.com
                    </a>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
