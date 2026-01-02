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
      setScrolled(window.scrollY > 50);
      setPastHero(window.scrollY > window.innerHeight);
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
    { name: "Home", href: "/" },
    { name: "Services", href: "/services" },
    { name: "Areas", href: "/locations" },
  ];

  const isActive = (href: string) => {
    if (href === "/") return location.pathname === "/";
    return location.pathname.startsWith(href);
  };

  const handleLogoClick = (e: React.MouseEvent) => {
    setIsOpen(false);
    if (isHomePage) {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const showQuoteButton = !isHomePage || pastHero;

  return (
    <>
      <header
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
          !scrolled
            ? 'bg-background/70 backdrop-blur-2xl'
            : 'bg-background border-b border-border/40'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">
            
            {/* Logo - Left */}
            <Link
              to="/"
              className="flex items-center shrink-0 group"
              onClick={handleLogoClick}
            >
              <span className="font-display font-bold text-xl lg:text-2xl tracking-tight">
                <span className="text-foreground">Fix</span>
                <span className="text-primary">Now</span>
                <span className="text-foreground"> Mechanics</span>
              </span>
            </Link>

            {/* Desktop Navigation - Center */}
            <nav className="hidden lg:flex absolute left-1/2 -translate-x-1/2 items-center gap-1 bg-card/50 backdrop-blur-sm border border-border/60 rounded-full px-2 py-2">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  className={`px-6 py-2 rounded-full text-[15px] font-medium text-center transition-all duration-300 ${
                    isActive(link.href)
                      ? 'bg-primary text-background'
                      : 'text-foreground/60 hover:text-foreground/90 hover:bg-card/30'
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
                className="flex items-center gap-2 px-4 py-2.5 rounded-full border border-border/40 bg-card/30 hover:bg-card/60 hover:border-border/60 transition-all duration-300"
              >
                <Phone className="w-4 h-4 text-primary" />
                <span className="text-sm font-medium text-foreground">
                  {BUSINESS_INFO.phone}
                </span>
              </a>

              <Button
                asChild
                className={`rounded-full font-semibold px-6 h-11 transition-all duration-500 hover:scale-105 ${
                  showQuoteButton ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4 pointer-events-none'
                }`}
              >
                <Link to="/estimate">Get Quote</Link>
              </Button>
            </div>

            {/* Mobile Right Section */}
            <div className="flex lg:hidden items-center gap-2">
              <a
                href={`tel:${BUSINESS_INFO.phone}`}
                className="p-2.5 flex items-center justify-center active:scale-95 transition-all duration-200"
                aria-label="Call us"
              >
                <Phone className="w-[18px] h-[18px] text-primary" />
              </a>
              
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="p-2.5 rounded-full border border-border/40 bg-card/30 hover:bg-card/60 active:scale-95 transition-all duration-200"
                aria-label="Toggle menu"
              >
                {isOpen ? (
                  <X className="w-5 h-5 text-foreground" />
                ) : (
                  <Menu className="w-5 h-5 text-foreground" />
                )}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <div
        className={`lg:hidden fixed inset-0 bg-black/75 backdrop-blur-lg transition-all duration-400 z-40 ${
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setIsOpen(false)}
      />

      {/* Mobile Menu Panel */}
      <div
        className={`lg:hidden fixed inset-x-0 top-16 bg-background/80 backdrop-blur-xl border-b border-border/40 transition-all duration-300 z-40 ${
          isOpen ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0 pointer-events-none'
        }`}
      >
        <nav className="px-4 py-6">
          {/* Navigation Links */}
          <div className="space-y-2 mb-6">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                onClick={() => setIsOpen(false)}
                className={`block py-3 px-4 rounded-lg font-medium text-base transition-all duration-200 ${
                  isActive(link.href)
                    ? 'bg-primary text-background'
                    : 'text-foreground/70 hover:text-foreground hover:bg-card/50'
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* CTA Button */}
          <Button
            asChild
            size="lg"
            className="w-full rounded-lg font-semibold"
          >
            <Link to="/estimate" onClick={() => setIsOpen(false)}>
              Get Free Quote
            </Link>
          </Button>
        </nav>
      </div>
    </>
  );
};

export default Header;
