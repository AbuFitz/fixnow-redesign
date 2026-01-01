import { Link } from "react-router-dom";
import { Phone, Mail, MapPin } from "lucide-react";
import { BUSINESS_INFO, LOCATIONS } from "@/lib/constants";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-card border-t border-border">
      {/* Desktop Layout */}
      <div className="hidden md:block container mx-auto px-6 py-12">
        <div className="grid grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div>
            <Link to="/" className="inline-block mb-4">
              <span className="font-display font-bold text-xl">
                <span className="text-foreground">Fix</span>
                <span className="text-primary">Now</span>
                <span className="text-foreground ml-1">Mechanics</span>
              </span>
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Professional mobile mechanic services at your location. We come to you.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">Quick Links</h4>
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
                <Link to="/quote" className="text-muted-foreground hover:text-primary transition-colors">
                  Get a Quote
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
            <h4 className="font-semibold text-foreground mb-4">Service Areas</h4>
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
            <h4 className="font-semibold text-foreground mb-4">Contact</h4>
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
              <li className="flex items-start gap-2 text-muted-foreground text-xs pt-2">
                <div>
                  <p>{BUSINESS_INFO.hours.weekday}</p>
                  <p>{BUSINESS_INFO.hours.weekend}</p>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 border-t border-border flex justify-between items-center text-sm text-muted-foreground">
          <p>© {currentYear} {BUSINESS_INFO.name}. All rights reserved.</p>
          <p className="flex items-center gap-1">
            <MapPin className="w-3 h-3" />
            Serving {BUSINESS_INFO.coverage} of Hemel Hempstead
          </p>
        </div>
      </div>

      {/* Mobile Layout - Ultra Compact */}
      <div className="md:hidden px-4 py-6">
        <div className="flex items-center justify-between mb-4">
          <Link to="/">
            <span className="font-display font-bold text-base">
              <span className="text-foreground">Fix</span>
              <span className="text-primary">Now</span>
              <span className="text-foreground ml-1">Mechanics</span>
            </span>
          </Link>
          <a
            href={`tel:${BUSINESS_INFO.phone}`}
            className="flex items-center gap-1.5 text-primary font-medium text-sm"
          >
            <Phone className="w-3.5 h-3.5" />
            Call
          </a>
        </div>

        {/* Links Row */}
        <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-muted-foreground mb-4">
          <Link to="/services" className="hover:text-primary">Services</Link>
          <Link to="/locations" className="hover:text-primary">Areas</Link>
          <Link to="/quote" className="hover:text-primary">Quote</Link>
          <Link to="/privacy" className="hover:text-primary">Privacy</Link>
          <Link to="/terms" className="hover:text-primary">Terms</Link>
        </div>

        {/* Copyright */}
        <p className="text-xs text-muted-foreground/60">
          © {currentYear} {BUSINESS_INFO.name}
        </p>
      </div>
    </footer>
  );
};

export default Footer;
