import { Briefcase, Calendar, CheckCircle2 } from "lucide-react";
import useScrollAnimation from "@/hooks/useScrollAnimation";

const experiences = [
  {
    title: "Full Stack Developer",
    company: "Multi-Tenant ERP/CRM Development",
    period: "2020 - Present",
    duration: "4+ years",
    description: "Built and maintained a comprehensive multi-tenant ERP/CRM system from the ground up, serving multiple business clients with isolated data and customizable workflows.",
    achievements: [
      "Architected multi-tenant database schema with PostgreSQL",
      "Developed RESTful APIs using Django and FastAPI",
      "Built responsive React frontend with TypeScript",
      "Implemented complex business logic for invoicing, inventory, and CRM",
      "Designed scalable authentication and authorization system",
      "Optimized database queries reducing load times by 60%"
    ],
    technologies: ["Django", "FastAPI", "React", "TypeScript", "PostgreSQL", "Redis"]
  }
];

const ExperienceSection = () => {
  const { ref: headerRef, isVisible: headerVisible } = useScrollAnimation();
  const { ref: timelineRef, isVisible: timelineVisible } = useScrollAnimation({ threshold: 0.1 });

  return (
    <section id="experience" className="py-24 bg-card/50">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto">
          {/* Section Header */}
          <div 
            ref={headerRef}
            className={`text-center mb-16 transition-all duration-700 ${
              headerVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Experience
            </h2>
            <div className={`w-20 h-1 bg-primary mx-auto transition-all duration-700 delay-200 ${
              headerVisible ? 'scale-x-100' : 'scale-x-0'
            }`} />
          </div>

          {/* Timeline */}
          <div ref={timelineRef} className="relative">
            {/* Timeline Line - animated */}
            <div 
              className={`absolute left-0 md:left-1/2 top-0 w-px bg-border md:-translate-x-1/2 transition-all duration-1000 ease-out ${
                timelineVisible ? 'h-full' : 'h-0'
              }`}
            />

            {experiences.map((exp, index) => (
              <div 
                key={index} 
                className={`relative pl-8 md:pl-0 mb-12 transition-all duration-700 ${
                  timelineVisible ? 'opacity-100 translate-x-0' : 'opacity-0 md:translate-x-8'
                }`}
                style={{ transitionDelay: '300ms' }}
              >
                {/* Timeline Dot - animated pulse */}
                <div className={`absolute left-0 md:left-1/2 top-0 w-4 h-4 bg-primary border-4 border-background md:-translate-x-1/2 -translate-x-1/2 transition-all duration-500 ${
                  timelineVisible ? 'scale-100 opacity-100' : 'scale-0 opacity-0'
                }`} style={{ transitionDelay: '500ms' }}>
                  <div className="absolute inset-0 bg-primary animate-ping opacity-20" />
                </div>

                {/* Content Card */}
                <div className={`md:w-[calc(50%-2rem)] md:ml-auto bg-background border border-border p-6 md:p-8 card-hover transition-all duration-700 ${
                  timelineVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`} style={{ transitionDelay: '400ms' }}>
                  {/* Header */}
                  <div className="flex items-start gap-4 mb-4">
                    <div className="p-3 bg-primary/10 shrink-0 group-hover:bg-primary/20 transition-colors duration-300">
                      <Briefcase className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-foreground">
                        {exp.title}
                      </h3>
                      <p className="text-primary font-medium">
                        {exp.company}
                      </p>
                    </div>
                  </div>

                  {/* Duration */}
                  <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
                    <Calendar className="w-4 h-4" />
                    <span>{exp.period}</span>
                    <span className="px-2 py-0.5 bg-secondary/20 text-secondary-foreground text-xs font-medium animate-pulse-glow">
                      {exp.duration}
                    </span>
                  </div>

                  {/* Description */}
                  <p className="text-muted-foreground mb-6 leading-relaxed">
                    {exp.description}
                  </p>

                  {/* Achievements */}
                  <div className="mb-6">
                    <h4 className="text-sm font-semibold text-foreground uppercase tracking-wide mb-3">
                      Key Achievements
                    </h4>
                    <ul className="space-y-2">
                      {exp.achievements.map((achievement, i) => (
                        <li 
                          key={i} 
                          className={`flex items-start gap-2 text-sm text-muted-foreground group transition-all duration-500 ${
                            timelineVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'
                          }`}
                          style={{ transitionDelay: `${600 + i * 100}ms` }}
                        >
                          <CheckCircle2 className="w-4 h-4 text-primary shrink-0 mt-0.5 group-hover:scale-110 transition-transform duration-300" />
                          <span className="group-hover:text-foreground transition-colors duration-300">{achievement}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Technologies */}
                  <div className="flex flex-wrap gap-2">
                    {exp.technologies.map((tech, i) => (
                      <span 
                        key={tech}
                        className={`px-3 py-1 bg-muted/20 text-muted-foreground text-xs font-mono hover:bg-primary/20 hover:text-primary transition-all duration-300 cursor-default ${
                          timelineVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-90'
                        }`}
                        style={{ transitionDelay: `${900 + i * 50}ms` }}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;
