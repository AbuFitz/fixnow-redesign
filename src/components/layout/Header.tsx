import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { BUSINESS_INFO } from "@/lib/constants";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [pastHero, setPastHero] = useState(false);
  const location = useLocation();
  const isHomePage = location.pathname === "/";

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setScrolled(scrollY > 50);
      // Hero section is typically viewport height, check if past it
      setPastHero(scrollY > window.innerHeight * 0.7);
    };
    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Check initial state
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  // Handle body scroll lock
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
    { name: "Home", href: "/" },
    { name: "Services", href: "/services" },
    { name: "Areas", href: "/locations" },
  ];

  const isActive = (href: string) => {
    if (href === "/") return location.pathname === "/";
    return location.pathname.startsWith(href);
  };

  // Show quote button: on non-home pages always, on home page only after scrolling past hero
  const showQuoteButton = !isHomePage || pastHero;

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
        isHomePage && !scrolled
          ? 'bg-transparent'
          : 'bg-background/95 backdrop-blur-md border-b border-border/40 shadow-lg shadow-black/5'
      }`}
    >
      <div className="container mx-auto px-4 lg:px-6">
        <div className="flex items-center justify-between h-14 lg:h-16">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center gap-1 relative z-50"
            onClick={() => setIsOpen(false)}
          >
            <span className="font-display font-bold text-lg lg:text-xl">
              <span className="text-foreground">Fix</span>
              <span className="text-primary">Now</span>
              <span className="text-foreground ml-1">Mechanics</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  isActive(link.href)
                    ? 'bg-primary text-primary-foreground'
                    : 'text-foreground/70 hover:text-foreground hover:bg-secondary'
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
              className="flex items-center gap-2 text-foreground/80 hover:text-primary transition-colors text-sm font-medium px-3 py-2 rounded-full hover:bg-secondary"
            >
              <Phone className="w-4 h-4" />
              <span>{BUSINESS_INFO.phone}</span>
            </a>

            <div className={`transition-all duration-500 ${showQuoteButton ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2 pointer-events-none'}`}>
              <Button asChild size="sm" className="rounded-full font-semibold px-5">
                <Link to="/quote">Get Quote</Link>
              </Button>
            </div>
          </div>

          {/* Mobile Right Section */}
          <div className="flex lg:hidden items-center gap-2">
            {/* Mobile Quote Button - Animated */}
            <div className={`transition-all duration-500 ${showQuoteButton ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-4 pointer-events-none'}`}>
              <Button asChild size="sm" className="rounded-full font-semibold text-xs px-3 h-8">
                <Link to="/quote">Quote</Link>
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 hover:bg-secondary rounded-lg transition-colors relative z-50"
              aria-label="Toggle menu"
            >
              {isOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`lg:hidden fixed inset-0 z-40 transition-all duration-300 ${
          isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        {/* Backdrop */}
        <div
          className="absolute inset-0 bg-black/70 backdrop-blur-sm"
          onClick={() => setIsOpen(false)}
        />

        {/* Menu Panel */}
        <div
          className={`absolute top-14 left-0 right-0 bg-background border-b border-border shadow-2xl transition-transform duration-300 ${
            isOpen ? 'translate-y-0' : '-translate-y-full'
          }`}
        >
          <div className="p-4 space-y-2">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                onClick={() => setIsOpen(false)}
                className={`block py-3 px-4 rounded-lg text-base font-medium transition-all ${
                  isActive(link.href)
                    ? 'bg-primary text-primary-foreground'
                    : 'text-foreground/80 hover:bg-secondary'
                }`}
              >
                {link.name}
              </Link>
            ))}

            {/* Phone */}
            <a
              href={`tel:${BUSINESS_INFO.phone}`}
              className="flex items-center gap-3 py-3 px-4 rounded-lg bg-secondary/50 hover:bg-secondary transition-all"
              onClick={() => setIsOpen(false)}
            >
              <Phone className="w-4 h-4 text-primary" />
              <span className="font-medium text-foreground">{BUSINESS_INFO.phone}</span>
            </a>

            {/* Quote CTA */}
            <Button asChild size="lg" className="w-full rounded-lg font-bold mt-2">
              <Link to="/quote" onClick={() => setIsOpen(false)}>
                Get Free Quote
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
