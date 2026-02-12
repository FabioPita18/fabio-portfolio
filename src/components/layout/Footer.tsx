import { ArrowUp } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="py-8 bg-card border-t border-border relative">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex-1" />

          {/* Copyright */}
          <p className="text-sm text-muted-foreground">
            © {currentYear} Fabio Pita
          </p>

          {/* Location */}
          <p className="text-sm text-muted-foreground flex-1 justify-end flex items-center gap-1">
            Johannesburg, South Africa
            <span className="inline-block hover:scale-125 transition-transform duration-200 ease-out cursor-default">🇿🇦</span>
          </p>
        </div>
      </div>

      {/* Scroll to top button */}
      <button
        onClick={scrollToTop}
        className="absolute right-6 -top-6 p-3 bg-primary text-primary-foreground shadow-lg hover:scale-110 hover:-translate-y-1 transition-all duration-200 ease-out hover-glow"
        aria-label="Scroll to top"
      >
        <ArrowUp className="w-5 h-5" />
      </button>
    </footer>
  );
};

export default Footer;
