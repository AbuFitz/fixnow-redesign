import { Link } from "react-router-dom";
import { Phone, Mail, MapPin } from "lucide-react";
import { BUSINESS_INFO, LOCATIONS } from "@/lib/constants";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const featuredLocations = LOCATIONS.slice(0, 6);

  return (
    <footer className="bg-card border-t border-border">
      <div className="container mx-auto px-6 md:px-12 py-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link to="/" className="inline-block mb-4">
              <span className="font-display font-bold text-xl">
                <span className="text-foreground">Fix</span>
                <span className="text-primary">Now</span>
                <span className="text-foreground">Mechanics</span>
              </span>
            </Link>
            <p className="text-muted-foreground text-sm mb-6">
              Mobile mechanic services at your location. Based in Hemel Hempstead, covering a {BUSINESS_INFO.coverage}.
            </p>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-display font-semibold text-foreground mb-4">Contact</h4>
            <ul className="space-y-3">
              <li>
                <a 
                  href={`tel:${BUSINESS_INFO.phone}`} 
                  className="flex items-center gap-3 text-muted-foreground hover:text-foreground transition-colors text-sm"
                >
                  <Phone className="w-4 h-4 text-primary" />
                  {BUSINESS_INFO.phone}
                </a>
              </li>
              <li>
                <a 
                  href={`mailto:${BUSINESS_INFO.email}`} 
                  className="flex items-center gap-3 text-muted-foreground hover:text-foreground transition-colors text-sm"
                >
                  <Mail className="w-4 h-4 text-primary" />
                  {BUSINESS_INFO.email}
                </a>
              </li>
              <li className="flex items-start gap-3 text-muted-foreground text-sm">
                <MapPin className="w-4 h-4 text-primary mt-0.5" />
                <span>
                  {BUSINESS_INFO.address}<br />
                  {BUSINESS_INFO.hours.weekday}<br />
                  {BUSINESS_INFO.hours.weekend}
                </span>
              </li>
            </ul>
          </div>

          {/* Areas */}
          <div>
            <h4 className="font-display font-semibold text-foreground mb-4">Areas</h4>
            <ul className="space-y-2">
              {featuredLocations.map((location) => (
                <li key={location.slug}>
                  <Link 
                    to={`/locations/${location.slug}`}
                    className="text-muted-foreground hover:text-foreground transition-colors text-sm"
                  >
                    {location.name}
                  </Link>
                </li>
              ))}
              <li>
                <Link 
                  to="/locations"
                  className="text-primary hover:text-primary/80 transition-colors text-sm"
                >
                  View all →
                </Link>
              </li>
            </ul>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-display font-semibold text-foreground mb-4">Links</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/services" className="text-muted-foreground hover:text-foreground transition-colors text-sm">
                  Services
                </Link>
              </li>
              <li>
                <Link to="/estimate" className="text-muted-foreground hover:text-foreground transition-colors text-sm">
                  Get a Quote
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="text-muted-foreground hover:text-foreground transition-colors text-sm">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-muted-foreground hover:text-foreground transition-colors text-sm">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-8 pt-6 border-t border-border">
          <p className="text-muted-foreground text-sm text-center">
            © {currentYear} {BUSINESS_INFO.name}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
