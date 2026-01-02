import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Phone } from "lucide-react";
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
    { name: "Home", href: "/" },
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
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
          isHomePage && !scrolled
            ? 'bg-transparent'
            : 'bg-background/98 backdrop-blur-2xl border-b border-border/40'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">
            
            {/* Logo - Left */}
            <Link
              to="/"
              className="flex items-center shrink-0 group"
              onClick={() => setIsOpen(false)}
            >
              <span className="font-display font-bold text-xl lg:text-2xl tracking-tight">
                <span className="text-foreground">Fix</span>
                <span className="text-primary">Now</span>
              </span>
            </Link>

            {/* Desktop Navigation - Center */}
            <nav className="hidden lg:flex absolute left-1/2 -translate-x-1/2 items-center gap-1 bg-card/50 backdrop-blur-sm border border-border/60 rounded-full px-2 py-2">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  className={`relative px-6 py-2 rounded-full text-[15px] font-medium transition-all duration-300 ${
                    isActive(link.href)
                      ? 'text-foreground'
                      : 'text-foreground/60 hover:text-foreground/90'
                  }`}
                >
                  <span className="relative z-10">{link.name}</span>
                  {isActive(link.href) && (
                    <div className="absolute inset-0 bg-primary rounded-full" 
                         style={{ 
                           animation: 'fadeIn 0.3s ease-in-out'
                         }} 
                    />
                  )}
                  {isActive(link.href) && (
                    <span className="absolute inset-0 flex items-center justify-center z-10 text-background font-semibold">
                      {link.name}
                    </span>
                  )}
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
                <Link to="/quote">Get Quote</Link>
              </Button>
            </div>

            {/* Mobile Right Section */}
            <div className="flex lg:hidden items-center gap-2">
              <a
                href={`tel:${BUSINESS_INFO.phone}`}
                className="p-2.5 rounded-full bg-primary/10 border border-primary/20 active:scale-95 transition-all duration-200"
                aria-label="Call us"
              >
                <Phone className="w-[18px] h-[18px] text-primary" />
              </a>
              
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="p-2.5 rounded-full border border-border/40 bg-card/30 active:scale-95 transition-all duration-200"
                aria-label="Toggle menu"
              >
                <div className="relative w-6 h-6">
                  <Menu 
                    className={`absolute inset-0 w-6 h-6 text-foreground transition-all duration-300 ${
                      isOpen ? 'rotate-90 opacity-0 scale-0' : 'rotate-0 opacity-100 scale-100'
                    }`} 
                  />
                  <X 
                    className={`absolute inset-0 w-6 h-6 text-foreground transition-all duration-300 ${
                      isOpen ? 'rotate-0 opacity-100 scale-100' : '-rotate-90 opacity-0 scale-0'
                    }`} 
                  />
                </div>
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
        className={`lg:hidden fixed inset-x-0 top-16 bottom-0 bg-background/95 backdrop-blur-2xl transition-all duration-400 z-40 overflow-y-auto ${
          isOpen ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0 pointer-events-none'
        }`}
      >
        <nav className="h-full flex flex-col px-6 py-8">
          
          {/* Menu Header */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-foreground mb-1">Menu</h2>
            <div className="h-1 w-12 bg-primary rounded-full" />
          </div>

          {/* Navigation Links */}
          <div className="flex-1 space-y-3">
            {navLinks.map((link, index) => (
              <Link
                key={link.href}
                to={link.href}
                onClick={() => setIsOpen(false)}
                className={`group flex items-center justify-between py-4 px-6 rounded-2xl font-medium text-lg transition-all duration-300 ${
                  isActive(link.href)
                    ? 'bg-primary text-background'
                    : 'bg-card/40 text-foreground/80 active:bg-card/60 border border-border/40'
                }`}
                style={{
                  animation: isOpen ? `slideInRight 0.4s ease-out ${index * 0.1}s both` : 'none'
                }}
              >
                <span className="flex items-center gap-4">
                  <span className={`text-2xl font-bold ${
                    isActive(link.href) ? 'text-background/60' : 'text-primary'
                  }`}>
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  {link.name}
                </span>
                <div className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  isActive(link.href) 
                    ? 'bg-background scale-100' 
                    : 'bg-primary/30 scale-0 group-active:scale-100'
                }`} />
              </Link>
            ))}
          </div>

          {/* CTA Section */}
          <div 
            className="mt-auto pt-8 border-t border-border/40"
            style={{
              animation: isOpen ? 'slideInUp 0.4s ease-out 0.3s both' : 'none'
            }}
          >
            <Button
              asChild
              size="lg"
              className="w-full rounded-2xl font-bold text-base h-14 mb-4"
            >
              <Link to="/quote" onClick={() => setIsOpen(false)}>
                Get Free Quote
              </Link>
            </Button>
            <p className="text-center text-sm text-muted-foreground">
              Free estimates • No obligation
            </p>
          </div>
        </nav>
      </div>

      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: scale(0.9);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        @keyframes slideInRight {
          from {
            opacity: 0;
            transform: translateX(30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes slideInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </>
  );
};

export default Header;
