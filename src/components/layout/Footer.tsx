import { Link } from "react-router-dom";
import { Phone, Mail, MapPin } from "lucide-react";
import { BUSINESS_INFO, LOCATIONS } from "@/lib/constants";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-card border-t border-border">
      {/* Mobile: Compact but informative */}
      <div className="md:hidden px-4 sm:px-6 py-6">
        <div className="flex items-center justify-between mb-4">
          <Link to="/" className="font-display font-bold text-base sm:text-lg">
            <span className="text-foreground">Fix</span>
            <span className="text-primary">Now</span>
            <span className="text-foreground"> Mechanics</span>
          </Link>
          <a href={`tel:${BUSINESS_INFO.phone}`} className="flex items-center gap-2 text-xs sm:text-sm text-foreground hover:text-primary transition-colors min-h-[44px]">
            <Phone className="w-4 h-4 text-primary" />
            {BUSINESS_INFO.phone}
          </a>
        </div>
        
        <div className="space-y-3 mb-4">
          <p className="text-xs text-muted-foreground leading-relaxed">
            Mobile mechanic services at your location across Hertfordshire and beyond.
          </p>
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <Mail className="w-3 h-3 text-primary" />
            <a href={`mailto:${BUSINESS_INFO.email}`} className="hover:text-foreground transition-colors">
              {BUSINESS_INFO.email}
            </a>
          </div>
        </div>
        
        <div className="flex flex-wrap gap-3 text-xs text-muted-foreground mb-4">
          <Link to="/services" className="hover:text-foreground transition-colors">Services</Link>
          <Link to="/locations" className="hover:text-foreground transition-colors">Areas</Link>
          <Link to="/estimate" className="hover:text-foreground transition-colors">Get Quote</Link>
          <Link to="/privacy" className="hover:text-foreground transition-colors">Privacy</Link>
          <Link to="/terms" className="hover:text-foreground transition-colors">Terms</Link>
        </div>
        
        <div className="pt-4 border-t border-border/50 text-center text-xs text-muted-foreground">
          <p>© {currentYear} {BUSINESS_INFO.name}. All rights reserved.</p>
        </div>
      </div>

      {/* Desktop: Full informative layout */}
      <div className="hidden md:block">
        <div className="container mx-auto px-8 lg:px-12 py-10 lg:py-12">
          <div className="grid grid-cols-4 gap-8 lg:gap-10 mb-6 lg:mb-8">
            {/* Brand & Info */}
            <div className="col-span-1">
              <Link to="/" className="inline-block mb-4">
                <span className="font-display font-bold text-xl">
                  <span className="text-foreground">Fix</span>
                  <span className="text-primary">Now</span>
                  <span className="text-foreground"> Mechanics</span>
                </span>
              </Link>
              <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                Professional mobile mechanic services bringing quality repairs directly to your location.
              </p>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <MapPin className="w-4 h-4 text-primary" />
                <span>{BUSINESS_INFO.address}</span>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="font-display font-semibold text-foreground text-sm mb-4">Quick Links</h4>
              <ul className="space-y-2.5 text-sm">
                <li>
                  <Link to="/services" className="text-muted-foreground hover:text-foreground transition-colors">
                    Our Services
                  </Link>
                </li>
                <li>
                  <Link to="/locations" className="text-muted-foreground hover:text-foreground transition-colors">
                    Service Areas
                  </Link>
                </li>
                <li>
                  <Link to="/estimate" className="text-muted-foreground hover:text-foreground transition-colors">
                    Get a Quote
                  </Link>
                </li>
                <li>
                  <Link to="/privacy" className="text-muted-foreground hover:text-foreground transition-colors">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link to="/terms" className="text-muted-foreground hover:text-foreground transition-colors">
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
                      className="text-muted-foreground hover:text-foreground transition-colors"
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
                  <a href={`tel:${BUSINESS_INFO.phone}`} className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors group">
                    <Phone className="w-4 h-4 text-primary group-hover:text-primary/80" />
                    {BUSINESS_INFO.phone}
                  </a>
                </li>
                <li>
                  <a href={`mailto:${BUSINESS_INFO.email}`} className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors group">
                    <Mail className="w-4 h-4 text-primary group-hover:text-primary/80" />
                    {BUSINESS_INFO.email}
                  </a>
                </li>
                <li className="pt-2">
                  <div className="text-xs text-muted-foreground space-y-1">
                    <p className="font-medium text-foreground">Opening Hours:</p>
                    <p>{BUSINESS_INFO.hours.weekday}</p>
                    <p>{BUSINESS_INFO.hours.weekend}</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="pt-8 border-t border-border">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <p className="text-muted-foreground text-sm">
                © {currentYear} {BUSINESS_INFO.name}. All rights reserved.
              </p>
              <p className="text-xs text-muted-foreground">
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
