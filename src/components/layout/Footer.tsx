import { Link } from "react-router-dom";
import { Phone, Mail } from "lucide-react";
import { BUSINESS_INFO, LOCATIONS } from "@/lib/constants";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-card border-t border-border">
      {/* Mobile: Compact & Simple */}
      <div className="md:hidden">
        <div className="px-4 py-8 pb-24">
          {/* Brand */}
          <div className="mb-6">
            <Link to="/" className="inline-block mb-3">
              <span className="font-display font-bold text-lg">
                <span className="text-foreground">Fix</span>
                <span className="text-primary">Now</span>
                <span className="text-foreground"> Mechanics</span>
              </span>
            </Link>
            <p className="text-sm text-secondary leading-relaxed">
              Mobile mechanic services at your location across Hertfordshire and beyond.
            </p>
          </div>

          {/* Contact */}
          <div className="space-y-3 mb-6">
            <a 
              href={`tel:${BUSINESS_INFO.phone}`}
              className="flex items-center gap-3 text-foreground hover:text-primary transition-colors py-2"
            >
              <Phone className="w-4 h-4 text-primary flex-shrink-0" />
              <span className="text-base font-medium">{BUSINESS_INFO.phone}</span>
            </a>
            <a 
              href={`mailto:${BUSINESS_INFO.email}`}
              className="flex items-center gap-3 text-secondary hover:text-foreground transition-colors py-2"
            >
              <Mail className="w-4 h-4 text-primary flex-shrink-0" />
              <span className="text-sm">{BUSINESS_INFO.email}</span>
            </a>
          </div>

          {/* Links */}
          <nav className="flex flex-wrap gap-4 py-4 border-t border-border">
            <Link to="/services" className="text-sm text-secondary hover:text-foreground transition-colors py-2">
              Services
            </Link>
            <Link to="/locations" className="text-sm text-secondary hover:text-foreground transition-colors py-2">
              Areas
            </Link>
            <Link to="/quote" className="text-sm text-secondary hover:text-foreground transition-colors py-2">
              Get Quote
            </Link>
            <Link to="/privacy" className="text-sm text-secondary hover:text-foreground transition-colors py-2">
              Privacy
            </Link>
            <Link to="/terms" className="text-sm text-secondary hover:text-foreground transition-colors py-2">
              Terms
            </Link>
          </nav>

          {/* Copyright */}
          <div className="pt-4 border-t border-border">
            <p className="text-xs text-muted text-center">
              © {currentYear} {BUSINESS_INFO.name}. All rights reserved.
            </p>
          </div>
        </div>
      </div>

      {/* Desktop: Full Layout */}
      <div className="hidden md:block">
        <div className="container mx-auto px-8 py-12">
          <div className="grid grid-cols-4 gap-10 mb-8">
            {/* Brand & Info */}
            <div>
              <Link to="/" className="inline-block mb-4">
                <span className="font-display font-bold text-xl">
                  <span className="text-foreground">Fix</span>
                  <span className="text-primary">Now</span>
                  <span className="text-foreground"> Mechanics</span>
                </span>
              </Link>
              <p className="text-secondary text-sm leading-relaxed">
                Professional mobile mechanic services bringing quality repairs directly to your location.
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="font-display font-semibold text-foreground text-sm mb-4">Quick Links</h4>
              <ul className="space-y-2.5 text-sm">
                <li>
                  <Link to="/services" className="text-secondary hover:text-foreground transition-colors">
                    Our Services
                  </Link>
                </li>
                <li>
                  <Link to="/locations" className="text-secondary hover:text-foreground transition-colors">
                    Service Areas
                  </Link>
                </li>
                <li>
                  <Link to="/quote" className="text-secondary hover:text-foreground transition-colors">
                    Get a Quote
                  </Link>
                </li>
                <li>
                  <Link to="/privacy" className="text-secondary hover:text-foreground transition-colors">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link to="/terms" className="text-secondary hover:text-foreground transition-colors">
                    Terms of Service
                  </Link>
                </li>
              </ul>
            </div>

            {/* Service Areas */}
            <div>
              <h4 className="font-display font-semibold text-foreground text-sm mb-4">Coverage Areas</h4>
              <ul className="space-y-2.5 text-sm">
                {LOCATIONS.slice(0, 5).map((location) => (
                  <li key={location.slug}>
                    <Link 
                      to={`/locations/${location.slug}`}
                      className="text-secondary hover:text-foreground transition-colors"
                    >
                      {location.name}
                    </Link>
                  </li>
                ))}
                <li>
                  <Link to="/locations" className="text-primary hover:text-primary/80 transition-colors font-medium">
                    View All Areas →
                  </Link>
                </li>
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h4 className="font-display font-semibold text-foreground text-sm mb-4">Get in Touch</h4>
              <ul className="space-y-3 text-sm">
                <li>
                  <a href={`tel:${BUSINESS_INFO.phone}`} className="flex items-center gap-2 text-secondary hover:text-foreground transition-colors group">
                    <Phone className="w-4 h-4 text-primary" />
                    {BUSINESS_INFO.phone}
                  </a>
                </li>
                <li>
                  <a href={`mailto:${BUSINESS_INFO.email}`} className="flex items-center gap-2 text-secondary hover:text-foreground transition-colors group">
                    <Mail className="w-4 h-4 text-primary" />
                    {BUSINESS_INFO.email}
                  </a>
                </li>
                <li className="pt-2">
                  <div className="text-xs text-muted space-y-1">
                    <p className="font-medium text-foreground">Opening Hours:</p>
                    <p className="text-secondary">{BUSINESS_INFO.hours.weekday}</p>
                    <p className="text-secondary">{BUSINESS_INFO.hours.weekend}</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="pt-8 border-t border-border">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <p className="text-muted text-sm">
                © {currentYear} {BUSINESS_INFO.name}. All rights reserved.
              </p>
              <p className="text-xs text-muted">
                Serving within {BUSINESS_INFO.coverage} of Hemel Hempstead
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
