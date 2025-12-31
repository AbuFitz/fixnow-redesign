import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Phone, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { BUSINESS_INFO } from "@/lib/constants";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const isHomePage = location.pathname === "/";

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Services", href: "/services" },
    { name: "Service Areas", href: "/locations" },
  ];

  const isActive = (href: string) => {
    if (href === "/") return location.pathname === "/";
    return location.pathname.startsWith(href);
  };

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled 
          ? "bg-background/90 backdrop-blur-xl border-b border-border/50" 
          : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-12">
        <div className="flex items-center justify-between h-16 sm:h-18 md:h-20">{/*Logo */}
          <Link to="/" className="group flex items-center gap-2">
            <span className="font-display font-bold text-lg sm:text-xl tracking-tight">
              <span className="text-foreground">Fix</span>
              <span className="text-primary">Now</span>
              <span className="text-foreground hidden sm:inline"> Mechanics</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center">
            <div className="flex items-center gap-1 p-1 rounded-full bg-card/50 backdrop-blur-sm border border-border/50">
              <Link
                to="/"
                className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${
                  location.pathname === "/"
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:text-foreground hover:bg-card"
                }`}
              >
                Home
              </Link>
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.href}
                  className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${
                    isActive(link.href)
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:text-foreground hover:bg-card"
                  }`}
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </nav>

          {/* Phone + Quote CTA */}
          <div className="hidden md:flex items-center gap-3">
            {!isHomePage && (
              <Button asChild size="lg" className="rounded-full px-6">
                <Link to="/quote" className="flex items-center gap-2">
                  Get Quote
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </Button>
            )}
            <Button asChild variant="outline" size="lg" className="rounded-full border-primary/30 hover:border-primary hover:bg-primary/10 group">
              <a 
                href={`tel:${BUSINESS_INFO.phone}`}
                className="flex items-center gap-2.5"
              >
                <Phone className="w-4 h-4 text-primary" />
                <span className="font-semibold text-foreground">{BUSINESS_INFO.phone}</span>
              </a>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden min-w-[44px] min-h-[44px] w-11 h-11 rounded-xl bg-card/50 backdrop-blur-sm border border-border/50 flex items-center justify-center text-foreground"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden py-4 animate-fade-in bg-background/95 backdrop-blur-xl border-b border-border/50 rounded-b-2xl shadow-lg">
            <nav className="flex flex-col gap-1">
              <Link
                to="/"
                className={`px-4 py-2.5 rounded-lg text-base font-medium transition-all ${
                  location.pathname === "/" ? "text-primary bg-primary/10" : "text-muted-foreground hover:bg-card"
                }`}
                onClick={() => setIsOpen(false)}
              >
                Home
              </Link>
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.href}
                  className={`px-4 py-2.5 rounded-lg text-base font-medium transition-all ${
                    isActive(link.href) ? "text-primary bg-primary/10" : "text-muted-foreground hover:bg-card"
                  }`}
                  onClick={() => setIsOpen(false)}
                >
                  {link.name}
                </Link>
              ))}
            </nav>
            <div className="flex items-center gap-2 sm:gap-3 mt-4 pt-4 border-t border-border/30 px-4">
              <Button asChild size="sm" className="rounded-full flex-1 h-11 text-sm">
                <Link to="/quote" onClick={() => setIsOpen(false)}>
                  Get Quote
                </Link>
              </Button>
              <Button asChild size="sm" variant="outline" className="rounded-full min-w-[44px] h-11">
                <a href={`tel:${BUSINESS_INFO.phone}`}>
                  <Phone className="w-4 h-4" />
                </a>
              </Button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;