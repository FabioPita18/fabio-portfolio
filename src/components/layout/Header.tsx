import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X, Sun, Moon } from "lucide-react";
import { useTheme } from "@/contexts/ThemeContext";

const navLinks = [
  { label: "About", href: "#about" },
  { label: "Projects", href: "#projects" },
  { label: "Skills", href: "#skills" },
  { label: "Experience", href: "#experience" },
  { label: "Contact", href: "#contact" }
];

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);

      // Determine active section
      const sections = navLinks.map(link => link.href.substring(1));
      for (const section of sections.reverse()) {
        const element = document.getElementById(section);
        if (element && window.scrollY >= element.offsetTop - 200) {
          setActiveSection(section);
          break;
        }
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    element?.scrollIntoView({ behavior: "smooth" });
    setIsMobileMenuOpen(false);
  };

  const handleToggleTheme = (e: React.MouseEvent<HTMLButtonElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = rect.left + rect.width / 2;
    const y = rect.top + rect.height / 2;
    toggleTheme({ x, y });
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? "bg-background/95 backdrop-blur-md border-b border-border shadow-sm"
          : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-center relative h-16 md:h-20">
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link, index) => (
              <button
                key={link.href}
                onClick={() => scrollToSection(link.href)}
                className={`relative text-sm font-medium font-display transition-colors duration-200 ease-out link-underline ${
                  activeSection === link.href.substring(1)
                    ? 'text-foreground'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {link.label}
              </button>
            ))}
            <Button
              size="sm"
              onClick={() => scrollToSection("#contact")}
              className="font-display hover:scale-105 hover-glow transition-all duration-200 ease-out"
            >
              Hire Me
            </Button>
            <button
              onClick={handleToggleTheme}
              className="p-2 text-foreground hover:text-primary transition-colors duration-200 ease-out"
              aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
            >
              <div className="relative w-5 h-5">
                <Sun className={`w-5 h-5 absolute inset-0 transition-all duration-300 ${
                  theme === "dark" ? "rotate-0 opacity-100" : "rotate-90 opacity-0"
                }`} />
                <Moon className={`w-5 h-5 absolute inset-0 transition-all duration-300 ${
                  theme === "light" ? "rotate-0 opacity-100" : "-rotate-90 opacity-0"
                }`} />
              </div>
            </button>
          </nav>

          {/* Mobile: Hire Me + Hamburger */}
          <div className="md:hidden absolute right-0 flex items-center gap-2">
            <Button
              size="sm"
              onClick={() => scrollToSection("#contact")}
              className="font-display text-xs"
            >
              Hire Me
            </Button>
          <button
            className="p-2 text-foreground hover:bg-muted/20 transition-colors duration-200 ease-out"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            <div className="relative w-6 h-6">
              <Menu className={`w-6 h-6 absolute inset-0 transition-all duration-300 ${
                isMobileMenuOpen ? 'rotate-90 opacity-0' : 'rotate-0 opacity-100'
              }`} />
              <X className={`w-6 h-6 absolute inset-0 transition-all duration-300 ${
                isMobileMenuOpen ? 'rotate-0 opacity-100' : '-rotate-90 opacity-0'
              }`} />
            </div>
          </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <nav className={`md:hidden overflow-hidden transition-all duration-500 ease-out ${
          isMobileMenuOpen ? 'max-h-[calc(100dvh-4rem)] opacity-100' : 'max-h-0 opacity-0'
        }`}>
          <div className="py-4 border-t border-border bg-background/95 backdrop-blur-md overflow-y-auto max-h-[calc(100dvh-5rem)]">
            <div className="flex flex-col gap-2" style={{ paddingBottom: 'env(safe-area-inset-bottom, 16px)' }}>
              {navLinks.map((link, index) => (
                <button
                  key={link.href}
                  onClick={() => scrollToSection(link.href)}
                  className={`text-left px-4 py-3 min-h-[44px] flex items-center text-sm font-medium font-display transition-all duration-300 hover:bg-muted/20 hover:pl-6 ${
                    activeSection === link.href.substring(1)
                      ? 'text-foreground bg-muted/10'
                      : 'text-muted-foreground'
                  }`}
                  style={{
                    transitionDelay: isMobileMenuOpen ? `${index * 50}ms` : '0ms',
                    transform: isMobileMenuOpen ? 'translateX(0)' : 'translateX(-20px)',
                    opacity: isMobileMenuOpen ? 1 : 0
                  }}
                >
                  {link.label}
                </button>
              ))}
              <div className="px-4 pt-2 flex gap-2">
                <Button
                  className="flex-1 font-display hover:scale-[1.02] transition-transform duration-200 ease-out"
                  onClick={() => scrollToSection("#contact")}
                >
                  Hire Me
                </Button>
                <button
                  onClick={handleToggleTheme}
                  className="p-3 border border-border text-foreground hover:text-primary transition-colors duration-200 ease-out rounded-md"
                  aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
                >
                  <div className="relative w-5 h-5">
                    <Sun className={`w-5 h-5 absolute inset-0 transition-all duration-300 ${
                      theme === "dark" ? "rotate-0 opacity-100" : "rotate-90 opacity-0"
                    }`} />
                    <Moon className={`w-5 h-5 absolute inset-0 transition-all duration-300 ${
                      theme === "light" ? "rotate-0 opacity-100" : "-rotate-90 opacity-0"
                    }`} />
                  </div>
                </button>
              </div>
            </div>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;
