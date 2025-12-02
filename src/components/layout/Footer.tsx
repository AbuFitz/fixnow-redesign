import { Link } from "react-router-dom";
import { Phone, Mail } from "lucide-react";
import { BUSINESS_INFO, LOCATIONS } from "@/lib/constants";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-card border-t border-border">
      {/* Mobile: Ultra compact */}
      <div className="md:hidden px-6 py-4">
        <div className="flex items-center justify-between mb-2">
          <Link to="/" className="font-display font-bold text-base">
            <span className="text-foreground">FixNow</span>
            <span className="text-primary"> Mechanics</span>
          </Link>
          <a href={`tel:${BUSINESS_INFO.phone}`} className="flex items-center gap-1 text-sm text-foreground">
            <Phone className="w-3 h-3 text-primary" />
            {BUSINESS_INFO.phone}
          </a>
        </div>
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <div className="flex gap-3">
            <Link to="/services" className="hover:text-foreground">Services</Link>
            <Link to="/locations" className="hover:text-foreground">Areas</Link>
            <Link to="/estimate" className="hover:text-foreground">Quote</Link>
          </div>
          <span>© {currentYear}</span>
        </div>
      </div>

      {/* Desktop: Full layout */}
      <div className="hidden md:block">
        <div className="container mx-auto px-12 py-10">
          <div className="grid grid-cols-4 gap-8 mb-8">
            {/* Brand */}
            <div>
              <Link to="/" className="inline-block mb-3">
                <span className="font-display font-bold text-lg">
                  <span className="text-foreground">FixNow</span>
                  <span className="text-primary"> Mechanics</span>
                </span>
              </Link>
              <p className="text-muted-foreground text-sm">
                Mobile mechanic services at your location.
              </p>
            </div>

            {/* Contact */}
            <div>
              <h4 className="font-display font-semibold text-foreground text-sm mb-3">Contact</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <a href={`tel:${BUSINESS_INFO.phone}`} className="flex items-center gap-2 text-muted-foreground hover:text-foreground">
                    <Phone className="w-3.5 h-3.5 text-primary" />
                    {BUSINESS_INFO.phone}
                  </a>
                </li>
                <li>
                  <a href={`mailto:${BUSINESS_INFO.email}`} className="flex items-center gap-2 text-muted-foreground hover:text-foreground">
                    <Mail className="w-3.5 h-3.5 text-primary" />
                    {BUSINESS_INFO.email}
                  </a>
                </li>
              </ul>
            </div>

            {/* Areas */}
            <div>
              <h4 className="font-display font-semibold text-foreground text-sm mb-3">Areas</h4>
              <div className="flex flex-wrap gap-x-3 gap-y-1 text-sm">
                {LOCATIONS.slice(0, 4).map((location) => (
                  <Link 
                    key={location.slug}
                    to={`/locations/${location.slug}`}
                    className="text-muted-foreground hover:text-foreground"
                  >
                    {location.name}
                  </Link>
                ))}
                <Link to="/locations" className="text-primary hover:text-primary/80">
                  More →
                </Link>
              </div>
            </div>

            {/* Links */}
            <div>
              <h4 className="font-display font-semibold text-foreground text-sm mb-3">Links</h4>
              <div className="flex flex-wrap gap-x-3 gap-y-1 text-sm">
                <Link to="/services" className="text-muted-foreground hover:text-foreground">Services</Link>
                <Link to="/estimate" className="text-muted-foreground hover:text-foreground">Quote</Link>
                <Link to="/privacy" className="text-muted-foreground hover:text-foreground">Privacy</Link>
                <Link to="/terms" className="text-muted-foreground hover:text-foreground">Terms</Link>
              </div>
            </div>
          </div>

          {/* Bottom */}
          <div className="pt-6 border-t border-border">
            <p className="text-muted-foreground text-sm text-center">
              © {currentYear} {BUSINESS_INFO.name}. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
