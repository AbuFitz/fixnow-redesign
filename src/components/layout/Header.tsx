import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { BUSINESS_INFO } from "@/lib/constants";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
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
      <div className="container mx-auto px-6 md:px-12">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="group flex items-center gap-2">
            <span className="font-display font-bold text-xl tracking-tight">
              <span className="text-foreground">Fix</span>
              <span className="text-primary">Now</span>
              <span className="text-foreground"> Mechanics</span>
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

          {/* Phone + CTA */}
          <div className="hidden md:flex items-center gap-4">
            <a 
              href={`tel:${BUSINESS_INFO.phone}`}
              className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              <Phone className="w-4 h-4 text-primary" />
              {BUSINESS_INFO.phone}
            </a>
            <Button asChild className="rounded-full px-6">
              <Link to="/estimate">
                Get Quote
              </Link>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden w-10 h-10 rounded-xl bg-card/50 backdrop-blur-sm border border-border/50 flex items-center justify-center text-foreground"
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
            <div className="flex items-center gap-3 mt-4 pt-4 border-t border-border/30 px-4">
              <Button asChild size="sm" className="rounded-full flex-1">
                <Link to="/estimate" onClick={() => setIsOpen(false)}>
                  Get Quote
                </Link>
              </Button>
              <Button asChild size="sm" variant="outline" className="rounded-full">
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