import { Link } from "react-router-dom";
import { Phone, Mail, Clock } from "lucide-react";
import { BUSINESS_INFO, LOCATIONS } from "@/lib/constants";

const Footer = () => {
  return (
    <footer className="bg-card border-t border-border">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
        {/* Desktop Layout */}
        <div className="hidden md:grid md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div>
            <Link to="/" className="inline-block mb-3">
              <span className="font-display font-bold text-xl">
                <span className="text-foreground">Fix</span>
                <span className="text-primary">Now</span>
                <span className="text-foreground"> Mechanics</span>
              </span>
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Mobile Repairs. No Garages. No Stress.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-foreground mb-3">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/services" className="text-muted-foreground hover:text-primary transition-colors">
                  Services
                </Link>
              </li>
              <li>
                <Link to="/locations" className="text-muted-foreground hover:text-primary transition-colors">
                  Coverage Areas
                </Link>
              </li>
              <li>
                <Link to="/estimate" className="text-muted-foreground hover:text-primary transition-colors">
                  Get a Quote
                </Link>
              </li>
              <li>
                <Link to="/faq" className="text-muted-foreground hover:text-primary transition-colors">
                  FAQ
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="text-muted-foreground hover:text-primary transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-muted-foreground hover:text-primary transition-colors">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>

          {/* Service Areas */}
          <div>
            <h4 className="font-semibold text-foreground mb-3">Service Areas</h4>
            <ul className="space-y-2 text-sm">
              {LOCATIONS.slice(0, 5).map((location) => (
                <li key={location.slug}>
                  <Link
                    to={`/locations/${location.slug}`}
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    {location.name}
                  </Link>
                </li>
              ))}
              <li>
                <Link to="/locations" className="text-primary hover:text-primary/80 transition-colors font-medium">
                  View All →
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold text-foreground mb-3">Contact</h4>
            <ul className="space-y-3 text-sm">
              <li>
                <a
                  href={`tel:${BUSINESS_INFO.phone}`}
                  className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
                >
                  <Phone className="w-4 h-4" />
                  {BUSINESS_INFO.phone}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${BUSINESS_INFO.email}`}
                  className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
                >
                  <Mail className="w-4 h-4" />
                  {BUSINESS_INFO.email}
                </a>
              </li>
              <li className="flex items-start gap-2 text-muted-foreground pt-2">
                <Clock className="w-4 h-4 mt-0.5" />
                <div className="text-xs">
                  <p>{BUSINESS_INFO.hours.weekday}</p>
                  <p>{BUSINESS_INFO.hours.weekend}</p>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Mobile Layout */}
        <div className="md:hidden space-y-6 mb-8">
          {/* Brand */}
          <div>
            <Link to="/" className="inline-block mb-3">
              <span className="font-display font-bold text-lg">
                <span className="text-foreground">Fix</span>
                <span className="text-primary">Now</span>
                <span className="text-foreground"> Mechanics</span>
              </span>
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Mobile Repairs. No Garages. No Stress.
            </p>
          </div>

          {/* Contact */}
          <div className="space-y-3">
            <h4 className="font-semibold text-foreground text-sm mb-2">Contact</h4>
            <a
              href={`tel:${BUSINESS_INFO.phone}`}
              className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors text-sm"
            >
              <Phone className="w-4 h-4 text-primary" />
              <span>{BUSINESS_INFO.phone}</span>
            </a>
            <a
              href={`mailto:${BUSINESS_INFO.email}`}
              className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors text-sm"
            >
              <Mail className="w-4 h-4 text-primary" />
              <span>{BUSINESS_INFO.email}</span>
            </a>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-semibold text-foreground text-sm mb-3">Quick Links</h4>
            <nav className="flex flex-wrap gap-x-4 gap-y-2 text-sm">
              <Link to="/services" className="text-muted-foreground hover:text-primary transition-colors">Services</Link>
              <Link to="/locations" className="text-muted-foreground hover:text-primary transition-colors">Areas</Link>
              <Link to="/estimate" className="text-muted-foreground hover:text-primary transition-colors">Quote</Link>
              <Link to="/faq" className="text-muted-foreground hover:text-primary transition-colors">FAQ</Link>
              <Link to="/privacy" className="text-muted-foreground hover:text-primary transition-colors">Privacy</Link>
              <Link to="/terms" className="text-muted-foreground hover:text-primary transition-colors">Terms</Link>
            </nav>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-4 lg:pt-6 border-t border-border">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-2 text-xs sm:text-sm text-muted-foreground">
            <p>© 2026 {BUSINESS_INFO.name}. All rights reserved.</p>
            <p className="text-xs">
              Serving {BUSINESS_INFO.coverage} of Hemel Hempstead
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
