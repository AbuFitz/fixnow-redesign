import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Phone, ChevronRight, Sparkles } from "lucide-react";
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
    <>
      <header
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
          isHomePage && !scrolled
            ? 'bg-transparent'
            : 'bg-background/95 backdrop-blur-xl border-b border-border/40 shadow-lg shadow-black/5'
        }`}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-[70px] lg:h-20">
            {/* Logo */}
            <Link
              to="/"
              className="flex items-center shrink-0 relative group"
              onClick={() => setIsOpen(false)}
            >
              <span className="font-display font-bold text-lg sm:text-xl lg:text-2xl tracking-tight">
                <span className="text-foreground transition-colors group-hover:text-foreground/80">Fix</span>
                <span className="text-primary transition-all group-hover:text-primary/90">Now</span>
                <span className="text-foreground ml-1 sm:ml-1.5 transition-colors group-hover:text-foreground/80">Mechanics</span>
              </span>
              <div className="absolute -inset-2 bg-primary/5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity -z-10" />
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-2">
              <Link
                to="/"
                className={`relative px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 overflow-hidden group ${
                  location.pathname === "/"
                    ? 'text-primary'
                    : 'text-foreground/70 hover:text-foreground'
                }`}
              >
                <span className="relative z-10">Home</span>
                <div className={`absolute inset-0 rounded-xl transition-all duration-200 ${
                  location.pathname === "/"
                    ? 'bg-primary/15 shadow-lg shadow-primary/5'
                    : 'bg-muted/0 group-hover:bg-muted/50'
                }`} />
                {location.pathname === "/" && (
                  <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-8 h-0.5 bg-primary rounded-full" />
                )}
              </Link>
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  className={`relative px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 overflow-hidden group ${
                    isActive(link.href)
                      ? 'text-primary'
                      : 'text-foreground/70 hover:text-foreground'
                  }`}
                >
                  <span className="relative z-10">{link.name}</span>
                  <div className={`absolute inset-0 rounded-xl transition-all duration-200 ${
                    isActive(link.href)
                      ? 'bg-primary/15 shadow-lg shadow-primary/5'
                      : 'bg-muted/0 group-hover:bg-muted/50'
                  }`} />
                  {isActive(link.href) && (
                    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-8 h-0.5 bg-primary rounded-full" />
                  )}
                </Link>
              ))}
            </nav>

            {/* Desktop Right Section */}
            <div className="hidden lg:flex items-center gap-3">
              <a
                href={`tel:${BUSINESS_INFO.phone}`}
                className="group relative flex items-center gap-2.5 px-5 py-2.5 rounded-xl overflow-hidden transition-all duration-200"
              >
                <div className="absolute inset-0 bg-muted/0 group-hover:bg-muted/50 transition-all duration-200" />
                <Phone className="relative z-10 w-4 h-4 text-primary group-hover:scale-110 transition-transform duration-200" />
                <span className="relative z-10 text-sm font-semibold text-foreground/80 group-hover:text-foreground transition-colors">
                  {BUSINESS_INFO.phone}
                </span>
              </a>

              <Button
                asChild
                size="sm"
                className={`relative rounded-xl font-bold px-6 py-2.5 h-auto transition-all duration-300 shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30 hover:scale-105 overflow-hidden group ${
                  showQuoteButton ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2 pointer-events-none'
                }`}
              >
                <Link to="/quote" className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 group-hover:rotate-12 transition-transform duration-200" />
                  <span>Get Quote</span>
                </Link>
              </Button>
            </div>

            {/* Mobile Right Section */}
            <div className="flex lg:hidden items-center gap-2">
              <a
                href={`tel:${BUSINESS_INFO.phone}`}
                className="p-2.5 rounded-xl bg-primary/10 hover:bg-primary/20 active:scale-95 transition-all duration-200 shadow-sm"
                aria-label="Call us"
              >
                <Phone className="w-5 h-5 text-primary" />
              </a>
              
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="relative p-2.5 rounded-xl hover:bg-muted/50 active:scale-95 transition-all duration-200 shadow-sm"
                aria-label="Toggle menu"
              >
                <div className="relative w-6 h-6">
                  <Menu 
                    className={`absolute inset-0 w-6 h-6 text-foreground transition-all duration-300 ${
                      isOpen ? 'rotate-90 opacity-0 scale-75' : 'rotate-0 opacity-100 scale-100'
                    }`} 
                  />
                  <X 
                    className={`absolute inset-0 w-6 h-6 text-foreground transition-all duration-300 ${
                      isOpen ? 'rotate-0 opacity-100 scale-100' : '-rotate-90 opacity-0 scale-75'
                    }`} 
                  />
                </div>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay - Fixed backdrop that blurs everything below header */}
      <div
        className={`lg:hidden fixed inset-0 bg-black/70 backdrop-blur-md transition-all duration-300 z-40 ${
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setIsOpen(false)}
        style={{ top: 0 }}
      />

      {/* Mobile Menu Panel */}
      <div
        className={`lg:hidden fixed left-0 right-0 bg-background/98 backdrop-blur-xl border-b border-border/50 shadow-2xl transform transition-all duration-300 z-40 ${
          isOpen ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0 pointer-events-none'
        }`}
        style={{ 
          top: '64px', // For mobile (h-16 = 64px)
          maxHeight: 'calc(100vh - 64px)',
          overflowY: 'auto'
        }}
      >
        <nav className="container mx-auto px-4 py-6">
          {/* Menu Title */}
          <div className="mb-6">
            <h2 className="text-lg font-bold text-foreground/90 flex items-center gap-2">
              <span className="w-1 h-6 bg-primary rounded-full" />
              Navigation
            </h2>
            <p className="text-xs text-muted-foreground mt-1 ml-3">
              Explore our services and areas
            </p>
          </div>

          {/* Navigation Links */}
          <div className="space-y-2 mb-6">
            <Link
              to="/"
              onClick={() => setIsOpen(false)}
              className={`group flex items-center justify-between py-4 px-5 rounded-2xl text-base font-semibold transition-all duration-200 active:scale-[0.98] ${
                location.pathname === "/"
                  ? 'bg-primary/15 text-primary shadow-lg shadow-primary/5'
                  : 'text-foreground bg-card/50 hover:bg-card active:bg-card/80 border border-border/50'
              }`}
            >
              <span className="flex items-center gap-3">
                <span className={`w-2 h-2 rounded-full transition-all duration-200 ${
                  location.pathname === "/" 
                    ? 'bg-primary scale-100' 
                    : 'bg-muted-foreground/30 scale-75 group-hover:scale-100'
                }`} />
                Home
              </span>
              <ChevronRight className={`w-5 h-5 transition-all duration-200 ${
                location.pathname === "/"
                  ? 'text-primary/70 translate-x-0'
                  : 'text-muted-foreground/40 -translate-x-1 group-hover:translate-x-0'
              }`} />
            </Link>
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                onClick={() => setIsOpen(false)}
                className={`group flex items-center justify-between py-4 px-5 rounded-2xl text-base font-semibold transition-all duration-200 active:scale-[0.98] ${
                  isActive(link.href)
                    ? 'bg-primary/15 text-primary shadow-lg shadow-primary/5'
                    : 'text-foreground bg-card/50 hover:bg-card active:bg-card/80 border border-border/50'
                }`}
              >
                <span className="flex items-center gap-3">
                  <span className={`w-2 h-2 rounded-full transition-all duration-200 ${
                    isActive(link.href)
                      ? 'bg-primary scale-100'
                      : 'bg-muted-foreground/30 scale-75 group-hover:scale-100'
                  }`} />
                  {link.name}
                </span>
                <ChevronRight className={`w-5 h-5 transition-all duration-200 ${
                  isActive(link.href)
                    ? 'text-primary/70 translate-x-0'
                    : 'text-muted-foreground/40 -translate-x-1 group-hover:translate-x-0'
                }`} />
              </Link>
            ))}
          </div>

          {/* CTA Section */}
          <div className="pt-6 border-t border-border/50">
            <Button
              asChild
              size="lg"
              className="w-full rounded-2xl font-bold text-base h-14 shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30 transition-all duration-200 active:scale-[0.98] group"
            >
              <Link to="/quote" onClick={() => setIsOpen(false)} className="flex items-center justify-center gap-2">
                <Sparkles className="w-5 h-5 group-hover:rotate-12 transition-transform duration-200" />
                Get Free Quote
              </Link>
            </Button>
            <p className="text-center text-xs text-muted-foreground mt-3 flex items-center justify-center gap-2">
              <span className="w-1 h-1 rounded-full bg-primary/60" />
              Free estimates • No obligation
              <span className="w-1 h-1 rounded-full bg-primary/60" />
            </p>
          </div>
        </nav>
      </div>
    </>
  );
};

export default Header;
