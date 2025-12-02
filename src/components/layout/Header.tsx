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
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Services", href: "/services" },
    { name: "Service Areas", href: "/locations" },
    { name: "Get Quote", href: "/estimate" },
  ];

  const isActive = (href: string) => {
    if (href === "/") return location.pathname === "/";
    return location.pathname.startsWith(href);
  };

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "glass-strong shadow-lg" : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center group">
            <span className="font-display font-bold text-xl md:text-2xl">
              <span className="text-foreground">Fix</span>
              <span className="text-primary">Now</span>
              <span className="text-foreground">Mechanics</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.href}
                className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                  isActive(link.href) 
                    ? "text-primary bg-primary/10" 
                    : "text-muted-foreground hover:text-foreground hover:bg-secondary/50"
                }`}
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* CTA Button */}
          <div className="hidden md:flex items-center gap-4">
            <a 
              href={`tel:${BUSINESS_INFO.phone}`} 
              className="flex items-center gap-2 text-foreground hover:text-primary transition-colors"
            >
              <div className="p-2 rounded-lg bg-primary/10">
                <Phone className="w-4 h-4 text-primary" />
              </div>
              <span className="font-semibold">{BUSINESS_INFO.phone}</span>
            </a>
            <Button asChild className="rounded-xl">
              <Link to="/estimate">Get Quote</Link>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 text-foreground rounded-lg hover:bg-secondary/50 transition-colors"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden py-6 border-t border-border/50 animate-fade-in">
            <nav className="flex flex-col gap-2">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.href}
                  className={`px-4 py-3 rounded-xl font-medium transition-colors ${
                    isActive(link.href)
                      ? "text-primary bg-primary/10"
                      : "text-muted-foreground hover:text-foreground hover:bg-secondary/50"
                  }`}
                  onClick={() => setIsOpen(false)}
                >
                  {link.name}
                </Link>
              ))}
              <div className="pt-4 mt-2 border-t border-border/50">
                <a
                  href={`tel:${BUSINESS_INFO.phone}`}
                  className="flex items-center gap-3 px-4 py-3 text-primary font-semibold"
                >
                  <Phone className="w-5 h-5" />
                  {BUSINESS_INFO.phone}
                </a>
                <Button asChild className="w-full mt-3 rounded-xl">
                  <Link to="/estimate" onClick={() => setIsOpen(false)}>
                    Get Free Quote
                  </Link>
                </Button>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
