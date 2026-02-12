import useScrollAnimation from "@/hooks/useScrollAnimation";
import { useEffect, useState } from "react";

const skillCategories = [
  {
    title: "Backend",
    skills: [
      { name: "Python", level: 95 },
      { name: "Django", level: 90 },
      { name: "FastAPI", level: 85 },
      { name: "PostgreSQL", level: 88 },
      { name: "REST APIs", level: 92 }
    ]
  },
  {
    title: "Frontend",
    skills: [
      { name: "React", level: 85 },
      { name: "TypeScript", level: 80 },
      { name: "JavaScript", level: 90 },
      { name: "HTML/CSS", level: 88 },
      { name: "Tailwind CSS", level: 82 }
    ]
  },
  {
    title: "Learning",
    skills: [
      { name: "Docker", level: 60 },
      { name: "CI/CD", level: 55 },
      { name: "Testing", level: 65 },
      { name: "Kubernetes", level: 40 },
      { name: "AWS", level: 50 }
    ]
  }
];

const SkillBar = ({ name, level, isVisible, delay }: { name: string; level: number; isVisible: boolean; delay: number }) => {
  const [width, setWidth] = useState(0);

  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => setWidth(level), delay);
      return () => clearTimeout(timer);
    }
  }, [isVisible, level, delay]);

  return (
    <div className="group">
      <div className="flex justify-between mb-2">
        <span className="text-sm font-medium text-foreground group-hover:text-primary transition-colors duration-300">
          {name}
        </span>
        <span className={`text-sm text-muted-foreground font-mono transition-all duration-500 ${
          isVisible ? 'opacity-100' : 'opacity-0'
        }`}>
          {level}%
        </span>
      </div>
      <div className="h-2 bg-muted/30 overflow-hidden relative">
        <div 
          className="h-full bg-primary transition-all duration-1000 ease-out relative overflow-hidden"
          style={{ width: `${width}%` }}
        >
          {/* Shimmer effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary-foreground/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
        </div>
      </div>
    </div>
  );
};

const SkillsSection = () => {
  const { ref: headerRef, isVisible: headerVisible } = useScrollAnimation();
  const { ref: skillsRef, isVisible: skillsVisible } = useScrollAnimation({ threshold: 0.2 });

  return (
    <section id="skills" className="py-24 bg-background">
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
              Technical Skills
            </h2>
            <div className={`w-20 h-1 bg-primary mx-auto mb-4 transition-all duration-700 delay-200 ${
              headerVisible ? 'scale-x-100' : 'scale-x-0'
            }`} />
            <p className={`text-muted-foreground max-w-2xl mx-auto transition-all duration-700 delay-300 ${
              headerVisible ? 'opacity-100' : 'opacity-0'
            }`}>
              Core competencies and technologies I work with daily, plus areas I'm actively improving.
            </p>
          </div>

          {/* Skills Grid */}
          <div ref={skillsRef} className="grid md:grid-cols-3 gap-8">
            {skillCategories.map((category, categoryIndex) => (
              <div 
                key={category.title}
                className={`p-6 bg-card border border-border card-hover transition-all duration-500 ${
                  skillsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
                style={{ transitionDelay: `${categoryIndex * 150}ms` }}
              >
                <h3 className="text-xl font-semibold text-foreground mb-6 pb-2 border-b border-border relative">
                  {category.title}
                  <span className={`absolute bottom-0 left-0 h-0.5 bg-primary transition-all duration-700 ${
                    skillsVisible ? 'w-12' : 'w-0'
                  }`} style={{ transitionDelay: `${categoryIndex * 150 + 300}ms` }} />
                </h3>
                <div className="space-y-5">
                  {category.skills.map((skill, skillIndex) => (
                    <SkillBar 
                      key={skill.name}
                      name={skill.name}
                      level={skill.level}
                      isVisible={skillsVisible}
                      delay={categoryIndex * 150 + skillIndex * 100 + 400}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
