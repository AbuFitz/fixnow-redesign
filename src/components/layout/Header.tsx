import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Phone, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { BUSINESS_INFO } from "@/lib/constants";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const isHomePage = location.pathname === "/";

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const navLinks = [
    { name: "Services", href: "/services" },
    { name: "Areas", href: "/locations" },
  ];

  const isActive = (href: string) => {
    if (href === "/") return location.pathname === "/";
    return location.pathname.startsWith(href);
  };

  const showQuoteButton = !isHomePage || scrolled;

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        isHomePage && !scrolled
          ? 'bg-transparent'
          : 'bg-background/95 backdrop-blur-xl border-b border-border/40 shadow-lg shadow-black/5'
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14 sm:h-16 lg:h-18">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center shrink-0"
            onClick={() => setIsOpen(false)}
          >
            <span className="font-display font-bold text-lg sm:text-xl lg:text-2xl tracking-tight">
              <span className="text-foreground">Fix</span>
              <span className="text-primary">Now</span>
              <span className="text-foreground ml-1 sm:ml-1.5">Mechanics</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  isActive(link.href)
                    ? 'text-primary bg-primary/10'
                    : 'text-foreground/70 hover:text-foreground hover:bg-muted/50'
                }`}
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* Desktop Right Section */}
          <div className="hidden lg:flex items-center gap-3">
            <a
              href={`tel:${BUSINESS_INFO.phone}`}
              className="flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-muted/50 transition-all text-foreground/80 hover:text-foreground"
            >
              <Phone className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium">{BUSINESS_INFO.phone}</span>
            </a>

            <Button
              asChild
              size="sm"
              className={`rounded-lg font-semibold px-5 transition-all duration-300 ${
                showQuoteButton ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2 pointer-events-none'
              }`}
            >
              <Link to="/quote">Get Quote</Link>
            </Button>
          </div>

          {/* Mobile Right Section */}
          <div className="flex lg:hidden items-center gap-2">
            <a
              href={`tel:${BUSINESS_INFO.phone}`}
              className="p-2 rounded-lg bg-primary/10 hover:bg-primary/20 transition-colors"
              aria-label="Call us"
            >
              <Phone className="w-5 h-5 text-primary" />
            </a>
            
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-lg hover:bg-muted/50 transition-colors"
              aria-label="Toggle menu"
            >
              {isOpen ? (
                <X className="w-6 h-6 text-foreground" />
              ) : (
                <Menu className="w-6 h-6 text-foreground" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <div
        className={`lg:hidden fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-300 ${
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setIsOpen(false)}
      />

      {/* Mobile Menu Panel */}
      <div
        className={`lg:hidden fixed top-14 sm:top-16 left-0 right-0 bg-background border-t border-border/50 shadow-2xl transform transition-all duration-300 ${
          isOpen ? 'translate-y-0 opacity-100' : '-translate-y-4 opacity-0 pointer-events-none'
        }`}
      >
        <nav className="container mx-auto px-4 py-4">
          {/* Navigation Links */}
          <div className="space-y-1 mb-4">
            <Link
              to="/"
              onClick={() => setIsOpen(false)}
              className={`flex items-center justify-between py-3 px-4 rounded-xl text-base font-medium transition-all ${
                location.pathname === "/"
                  ? 'bg-primary/10 text-primary'
                  : 'text-foreground hover:bg-muted/50'
              }`}
            >
              <span>Home</span>
              <ChevronRight className="w-4 h-4 opacity-40" />
            </Link>
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                onClick={() => setIsOpen(false)}
                className={`flex items-center justify-between py-3 px-4 rounded-xl text-base font-medium transition-all ${
                  isActive(link.href)
                    ? 'bg-primary/10 text-primary'
                    : 'text-foreground hover:bg-muted/50'
                }`}
              >
                <span>{link.name}</span>
                <ChevronRight className="w-4 h-4 opacity-40" />
              </Link>
            ))}
          </div>

          {/* CTA Button */}
          <div className="pt-4 border-t border-border/50">
            <Button
              asChild
              size="lg"
              className="w-full rounded-xl font-bold text-base h-12"
            >
              <Link to="/quote" onClick={() => setIsOpen(false)}>
                Get Free Quote
              </Link>
            </Button>
            <p className="text-center text-xs text-muted-foreground mt-2">
              Free estimates • No obligation
            </p>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;
