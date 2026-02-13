import { useRef, useState, useEffect, useCallback } from "react";
import { Github, ExternalLink, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import useScrollAnimation from "@/hooks/useScrollAnimation";

const projects = [
  {
    title: "Books API",
    description: "Full-featured REST API with user auth, reviews/ratings, real-time WebSocket updates, GraphQL endpoint, Redis caching, rate limiting, and 253+ passing tests.",
    tech: ["FastAPI", "PostgreSQL", "Redis", "SQLAlchemy", "GraphQL", "WebSockets", "JWT", "OAuth", "Docker"],
    repoUrl: "https://github.com/FabioPita18/books-api-fastapi",
    demoUrl: "https://books-api-fastapi-production-4ebc.up.railway.app/docs"
  },
  {
    title: "Developer Dashboard",
    description: "Visualises GitHub contributions, language breakdown, top repos, and activity heatmaps with PostgreSQL-backed caching. 49 tests.",
    tech: ["FastAPI", "React 18", "TypeScript", "Tailwind CSS", "PostgreSQL", "TanStack Query", "Recharts"],
    repoUrl: "https://github.com/FabioPita18/developer-dashboard",
    demoUrl: "https://frontend-production-fdcb.up.railway.app/login"
  },
  {
    title: "E-Commerce Product Catalog",
    description: "Product catalog with categories, advanced search/filtering, shopping cart with session persistence, order management, JWT auth, and admin panel.",
    tech: ["Django 5.0", "DRF", "React 18", "TypeScript", "Material UI", "PostgreSQL", "Docker"],
    repoUrl: "https://github.com/FabioPita18/ecommerce-product-catalog",
    demoUrl: "https://frontend-production-945d.up.railway.app"
  }
];

const ProjectsSection = () => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const { ref: headerRef, isVisible: headerVisible } = useScrollAnimation();
  const { ref: carouselRef, isVisible: carouselVisible } = useScrollAnimation({ threshold: 0.1 });
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [canScroll, setCanScroll] = useState(false);

  const checkOverflow = useCallback(() => {
    const el = scrollContainerRef.current;
    if (!el) return;
    setCanScroll(el.scrollWidth > el.clientWidth + 1);
  }, []);

  useEffect(() => {
    checkOverflow();
    window.addEventListener("resize", checkOverflow);
    return () => window.removeEventListener("resize", checkOverflow);
  }, [checkOverflow]);

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
    <section id="projects" className="relative py-24">
      <div className="container mx-auto px-4 sm:px-6">
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
            {/* Arrow Buttons — only when scrollable */}
            {canScroll && (
              <>
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
              </>
            )}

            {/* Scrollable Container */}
            <div
              ref={scrollContainerRef}
              className={`flex gap-6 pb-4 select-none ${
                canScroll
                  ? "overflow-x-auto scrollbar-hide cursor-grab active:cursor-grabbing"
                  : "justify-center flex-wrap"
              }`}
              style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
              onMouseDown={canScroll ? handleMouseDown : undefined}
              onMouseMove={canScroll ? handleMouseMove : undefined}
              onMouseUp={canScroll ? handleMouseUp : undefined}
              onMouseLeave={canScroll ? handleMouseUp : undefined}
            >
              {projects.map((project, index) => (
                <div
                  key={project.title}
                  className={`flex-shrink-0 w-[280px] sm:w-[300px] p-6 rounded-2xl border-[3px] border-primary bg-card hover:border-accent transition-all duration-300 ease-out group flex flex-col ${
                    carouselVisible
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-8"
                  }`}
                  style={{ transitionDelay: carouselVisible ? '0ms' : `${index * 100}ms` }}
                >
                  <h3 className="text-lg font-bold text-foreground group-hover:text-accent transition-colors duration-200 ease-out mb-4">
                    {project.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-1.5 mb-5">
                    {project.tech.map((t) => (
                      <span key={t} className="px-2 py-0.5 bg-muted/20 text-muted-foreground text-xs font-mono">
                        {t}
                      </span>
                    ))}
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-3 mt-auto">
                    <a
                      href={project.repoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1"
                      onClick={(e) => { if (isDragging) e.preventDefault(); }}
                    >
                      <Button
                        variant="outline"
                        size="sm"
                        className="w-full border-primary text-foreground hover:bg-primary hover:text-primary-foreground transition-all duration-200 ease-out"
                      >
                        <Github className="w-4 h-4 mr-1.5" />
                        Code
                      </Button>
                    </a>
                    {project.demoUrl && (
                      <a
                        href={project.demoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1"
                        onClick={(e) => { if (isDragging) e.preventDefault(); }}
                      >
                        <Button
                          variant="outline"
                          size="sm"
                          className="w-full border-primary text-foreground hover:bg-primary hover:text-primary-foreground transition-all duration-200 ease-out"
                        >
                          <ExternalLink className="w-4 h-4 mr-1.5" />
                          Demo
                        </Button>
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
