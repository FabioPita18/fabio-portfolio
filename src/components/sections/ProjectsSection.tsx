import { useRef, useState } from "react";
import { Github, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import useScrollAnimation from "@/hooks/useScrollAnimation";

const projects = [
  {
    title: "Multi-Tenant ERP",
    description: "Enterprise resource planning system with isolated tenant data, invoicing, and inventory management.",
    repoUrl: "https://github.com/example/erp-system"
  },
  {
    title: "CRM Platform",
    description: "Customer relationship management tool with pipeline tracking, analytics, and automated follow-ups.",
    repoUrl: "https://github.com/example/crm-platform"
  },
  {
    title: "REST API Gateway",
    description: "Centralized API gateway built with FastAPI, featuring rate limiting, auth, and request routing.",
    repoUrl: "https://github.com/example/api-gateway"
  },
  {
    title: "React Dashboard",
    description: "Interactive admin dashboard with real-time charts, data tables, and role-based access control.",
    repoUrl: "https://github.com/example/react-dashboard"
  },
  {
    title: "Task Automation Engine",
    description: "Background task processing system using Celery and Redis for scheduled and event-driven jobs.",
    repoUrl: "https://github.com/example/task-engine"
  },
  {
    title: "Auth Microservice",
    description: "JWT-based authentication service with OAuth2 support, MFA, and session management.",
    repoUrl: "https://github.com/example/auth-service"
  }
];

const ProjectsSection = () => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const { ref: headerRef, isVisible: headerVisible } = useScrollAnimation();
  const { ref: carouselRef, isVisible: carouselVisible } = useScrollAnimation({ threshold: 0.1 });
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  const scroll = (direction: "left" | "right") => {
    if (!scrollContainerRef.current) return;
    const scrollAmount = 340;
    scrollContainerRef.current.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth"
    });
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!scrollContainerRef.current) return;
    setIsDragging(true);
    setStartX(e.pageX - scrollContainerRef.current.offsetLeft);
    setScrollLeft(scrollContainerRef.current.scrollLeft);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !scrollContainerRef.current) return;
    e.preventDefault();
    const x = e.pageX - scrollContainerRef.current.offsetLeft;
    const walk = (x - startX) * 1.5;
    scrollContainerRef.current.scrollLeft = scrollLeft - walk;
  };

  const handleMouseUp = () => setIsDragging(false);

  return (
    <section id="projects" className="py-24 bg-card/50">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div
            ref={headerRef}
            className={`text-center mb-16 transition-all duration-700 ${
              headerVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <h2 className="text-3xl md:text-4xl font-bold font-display text-foreground mb-4">
              Projects
            </h2>
            <div
              className={`w-20 h-1 bg-accent mx-auto mb-4 transition-all duration-700 delay-200 ${
                headerVisible ? "scale-x-100" : "scale-x-0"
              }`}
            />
            <p
              className={`text-muted-foreground max-w-2xl mx-auto transition-all duration-700 delay-300 ${
                headerVisible ? "opacity-100" : "opacity-0"
              }`}
            >
              A selection of projects I've built and contributed to.
            </p>
          </div>

          {/* Carousel */}
          <div ref={carouselRef} className="relative">
            {/* Arrow Buttons */}
            <Button
              variant="outline"
              size="icon"
              className="absolute -left-4 top-1/2 -translate-y-1/2 z-10 bg-background/80 backdrop-blur-sm border-primary hover:bg-accent hover:text-accent-foreground hidden md:flex"
              onClick={() => scroll("left")}
            >
              <ChevronLeft className="w-5 h-5" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="absolute -right-4 top-1/2 -translate-y-1/2 z-10 bg-background/80 backdrop-blur-sm border-primary hover:bg-accent hover:text-accent-foreground hidden md:flex"
              onClick={() => scroll("right")}
            >
              <ChevronRight className="w-5 h-5" />
            </Button>

            {/* Scrollable Container */}
            <div
              ref={scrollContainerRef}
              className="flex gap-6 overflow-x-auto scrollbar-hide pb-4 cursor-grab active:cursor-grabbing select-none"
              style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              onMouseLeave={handleMouseUp}
            >
              {projects.map((project, index) => (
                <a
                  key={project.title}
                  href={project.repoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`flex-shrink-0 w-[300px] p-6 rounded-2xl border-[3px] border-primary bg-card hover:border-accent transition-all duration-500 group ${
                    carouselVisible
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-8"
                  }`}
                  style={{ transitionDelay: `${index * 100}ms` }}
                  onClick={(e) => {
                    if (isDragging) e.preventDefault();
                  }}
                >
                  <div className="flex items-start justify-between mb-4">
                    <h3 className="text-lg font-bold text-foreground group-hover:text-accent transition-colors duration-300">
                      {project.title}
                    </h3>
                    <Github className="w-5 h-5 text-muted-foreground group-hover:text-accent group-hover:scale-110 transition-all duration-300 flex-shrink-0 ml-2" />
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {project.description}
                  </p>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
