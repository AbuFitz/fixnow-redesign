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
      setScrolled(window.scrollY > 100);
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
    { name: "Service Areas", href: "/locations" },
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
          : 'bg-background/98 backdrop-blur-md border-b border-border/40'
      }`}
    >
      <div className="container mx-auto px-4 lg:px-6">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center gap-1"
            onClick={() => setIsOpen(false)}
          >
            <span className="font-display font-bold text-xl lg:text-2xl">
              <span className="text-foreground">Fix</span>
              <span className="text-primary">Now</span>
              <span className="hidden sm:inline text-foreground ml-1">Mechanics</span>
            </span>
          </Link>

          {/* Desktop Navigation - Centered */}
          <nav className="hidden lg:flex items-center justify-center absolute left-1/2 -translate-x-1/2 gap-2">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className={`px-6 py-2.5 rounded-full text-sm font-medium transition-all ${
                  isActive(link.href)
                    ? 'bg-primary text-background'
                    : 'text-foreground/70 hover:text-foreground hover:bg-primary/5'
                }`}
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* Desktop Right Section */}
          <div className="hidden lg:flex items-center gap-4">
            <a
              href={`tel:${BUSINESS_INFO.phone}`}
              className="flex items-center gap-2 text-foreground/80 hover:text-primary transition-colors text-sm font-medium"
            >
              <Phone className="w-4 h-4" />
              <span>{BUSINESS_INFO.phone}</span>
            </a>

            <Button
              asChild
              size="default"
              className={`rounded-full font-semibold transition-opacity duration-300 ${
                showQuoteButton ? 'opacity-100' : 'opacity-0 pointer-events-none'
              }`}
            >
              <Link to="/quote">Get Quote</Link>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden p-2 hover:bg-primary/10 rounded-lg transition-colors"
            aria-label="Toggle menu"
          >
            {isOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <>
          <div
            className="lg:hidden fixed inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setIsOpen(false)}
          />
          <div className="lg:hidden fixed top-16 left-0 right-0 bottom-0 bg-background border-t border-border transform transition-transform duration-300 translate-x-0">
            <nav className="h-full flex flex-col">
              <div className="flex-1 overflow-y-auto px-6 py-8">
                <div className="space-y-1 mb-8">
                  {navLinks.map((link) => (
                    <Link
                      key={link.href}
                      to={link.href}
                      onClick={() => setIsOpen(false)}
                      className={`block py-3 px-4 rounded-lg text-base font-medium transition-all ${
                        isActive(link.href)
                          ? 'bg-primary/10 text-primary'
                          : 'text-foreground/80 hover:bg-primary/5'
                      }`}
                    >
                      {link.name}
                    </Link>
                  ))}
                </div>

                <div className="space-y-3 py-6 border-t border-border/50">
                  <a
                    href={`tel:${BUSINESS_INFO.phone}`}
                    className="flex items-center gap-3 px-4 py-3 rounded-lg bg-primary/5 hover:bg-primary/10 transition-all"
                  >
                    <div className="p-2 rounded-full bg-primary/10">
                      <Phone className="w-4 h-4 text-primary" />
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Call us</p>
                      <p className="text-sm font-semibold">{BUSINESS_INFO.phone}</p>
                    </div>
                  </a>
                </div>
              </div>

              <div className="border-t border-border/50 p-6 bg-card/30">
                <Button
                  asChild
                  size="lg"
                  className="w-full rounded-full font-bold text-base h-14"
                >
                  <Link to="/quote" onClick={() => setIsOpen(false)}>
                    Get Free Quote
                  </Link>
                </Button>
                <p className="text-center text-xs text-muted-foreground mt-3">
                  Same day slots • No obligation • Free estimates
                </p>
              </div>
            </nav>
          </div>
        </>
      )}
    </header>
  );
};

export default Header;
