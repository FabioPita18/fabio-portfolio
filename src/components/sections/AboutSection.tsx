import { Code2, Database, Server, Layers } from "lucide-react";
import useScrollAnimation from "@/hooks/useScrollAnimation";

const highlights = [
  {
    icon: Layers,
    title: "Full Stack",
    description: "End-to-end development from database architecture to polished React UIs"
  },
  {
    icon: Database,
    title: "Multi-Tenant ERP",
    description: "183k-line monorepo with multi-schema PostgreSQL and licence-based access control"
  },
  {
    icon: Server,
    title: "Backend Focus",
    description: "FastAPI, SQLAlchemy, Django — robust REST APIs across 15+ business modules"
  },
  {
    icon: Code2,
    title: "Modern Frontend",
    description: "React 18, TypeScript, Material UI, and TanStack React Query"
  }
];

const AboutSection = () => {
  const { ref: headerRef, isVisible: headerVisible } = useScrollAnimation();
  const { ref: contentRef, isVisible: contentVisible } = useScrollAnimation();
  const { ref: cardsRef, isVisible: cardsVisible } = useScrollAnimation();

  return (
    <section id="about" className="relative py-24">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div 
            ref={headerRef}
            className={`text-center mb-16 transition-all duration-700 ${
              headerVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            <h2 className="text-3xl md:text-4xl font-bold font-display text-foreground mb-4">
              About Me
            </h2>
            <div className={`w-20 h-1 bg-primary mx-auto transition-all duration-700 delay-200 ${
              headerVisible ? 'scale-x-100' : 'scale-x-0'
            }`} />
          </div>

          {/* Content Grid */}
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Text Content */}
            <div 
              ref={contentRef}
              className={`space-y-6 transition-all duration-700 ${
                contentVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'
              }`}
            >
              <p className="text-lg text-muted-foreground leading-relaxed">
                I'm a full-stack software engineer with 4+ years of experience building
                enterprise and production web applications. Currently I'm developing a
                multi-tenant ERP platform handling authentication, access control,
                licensing, and business operations across a 183,000-line codebase.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                I'm proficient across the full stack — Python backend services,
                React/TypeScript frontends, PostgreSQL database architecture, and Docker
                containerisation. Based in Johannesburg with EU citizenship, I'm open to
                local and remote opportunities.
              </p>
            </div>

            {/* Highlights Grid */}
            <div 
              ref={cardsRef}
              className="grid sm:grid-cols-2 gap-6"
            >
              {highlights.map((item, index) => (
                <div 
                  key={item.title}
                  className={`p-6 bg-background border border-border card-hover group transition-all duration-300 ease-out ${
                    cardsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                  }`}
                  style={{ transitionDelay: cardsVisible ? '0ms' : `${index * 100}ms` }}
                >
                  <div className="relative">
                    <item.icon className="w-10 h-10 text-primary mb-4 group-hover:scale-110 group-hover:rotate-3 transition-all duration-200 ease-out" />
                    <div className="absolute -inset-2 bg-primary/10 rounded-full opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-200 ease-out" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-2 group-hover:text-primary transition-colors duration-200 ease-out">
                    {item.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
