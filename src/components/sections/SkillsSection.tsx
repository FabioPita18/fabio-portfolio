import useScrollAnimation from "@/hooks/useScrollAnimation";

const skillCategories = [
  { title: "Languages", skills: ["Python", "TypeScript", "JavaScript", "SQL", "HTML", "CSS", "Bash"] },
  { title: "Backend", skills: ["FastAPI", "Django", "Django REST Framework", "SQLAlchemy", "Pydantic", "Alembic", "Uvicorn"] },
  { title: "Frontend", skills: ["React 18", "Material UI", "Tailwind CSS", "React Router", "TanStack React Query", "Vite"] },
  { title: "Databases", skills: ["PostgreSQL", "Redis"] },
  { title: "Auth", skills: ["JWT", "OAuth2 (Google, GitHub)", "bcrypt"] },
  { title: "DevOps", skills: ["Docker", "Docker Compose", "GitHub Actions", "nginx", "Railway", "Vercel"] },
  { title: "APIs", skills: ["REST", "GraphQL", "WebSockets", "OpenAPI/Swagger"] },
  { title: "Testing", skills: ["pytest", "Jest", "Vitest"] },
  { title: "Tools", skills: ["Git", "GitHub CLI", "ESLint", "Black", "Ruff", "mypy"] },
];

const SkillsSection = () => {
  const { ref: headerRef, isVisible: headerVisible } = useScrollAnimation();
  const { ref: skillsRef, isVisible: skillsVisible } = useScrollAnimation({ threshold: 0.1 });

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
              Technologies and tools I use to build production applications.
            </p>
          </div>

          {/* Skills Grid */}
          <div ref={skillsRef} className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {skillCategories.map((category, categoryIndex) => (
              <div
                key={category.title}
                className={`p-6 bg-card border border-border card-hover transition-all duration-500 ${
                  skillsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
                style={{ transitionDelay: skillsVisible ? '0ms' : `${categoryIndex * 60}ms` }}
              >
                <h3 className="text-lg font-semibold text-foreground mb-4 pb-2 border-b border-border relative">
                  {category.title}
                  <span className={`absolute bottom-0 left-0 h-0.5 bg-primary transition-all duration-700 ${
                    skillsVisible ? 'w-10' : 'w-0'
                  }`} style={{ transitionDelay: skillsVisible ? '0ms' : `${categoryIndex * 60 + 200}ms` }} />
                </h3>
                <div className="flex flex-wrap gap-2">
                  {category.skills.map((skill, skillIndex) => (
                    <span
                      key={skill}
                      className={`px-3 py-1.5 bg-muted/20 text-sm text-muted-foreground font-mono transition-all duration-300 cursor-default ${
                        skillsVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-90'
                      }`}
                      style={{ transitionDelay: skillsVisible ? '0ms' : `${categoryIndex * 60 + skillIndex * 40 + 300}ms` }}
                    >
                      {skill}
                    </span>
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
