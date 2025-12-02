import { Link } from "react-router-dom";
import { Phone, Mail, MapPin, Clock } from "lucide-react";
import { BUSINESS_INFO, LOCATIONS } from "@/lib/constants";

const Footer = () => {
  return (
    <footer className="bg-card border-t border-border">
      <div className="container mx-auto px-4 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Company Info */}
          <div>
            <Link to="/" className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-xl">F</span>
              </div>
              <span className="font-bold text-xl text-foreground">
                FixNow<span className="text-primary">Mechanics</span>
              </span>
            </Link>
            <p className="text-muted-foreground mb-4">
              Professional mobile mechanic services. We come to you anywhere within a {BUSINESS_INFO.coverage}.
            </p>
            <div className="flex flex-col gap-3">
              <a href={`tel:${BUSINESS_INFO.phone}`} className="flex items-center gap-2 text-foreground hover:text-primary transition-colors">
                <Phone className="w-4 h-4 text-primary" />
                {BUSINESS_INFO.phone}
              </a>
              <a href={`mailto:${BUSINESS_INFO.email}`} className="flex items-center gap-2 text-foreground hover:text-primary transition-colors">
                <Mail className="w-4 h-4 text-primary" />
                {BUSINESS_INFO.email}
              </a>
              <div className="flex items-center gap-2 text-muted-foreground">
                <MapPin className="w-4 h-4 text-primary" />
                Based in {BUSINESS_INFO.address}
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">Quick Links</h3>
            <ul className="flex flex-col gap-2">
              <li>
                <Link to="/" className="text-muted-foreground hover:text-primary transition-colors">Home</Link>
              </li>
              <li>
                <Link to="/services" className="text-muted-foreground hover:text-primary transition-colors">Services</Link>
              </li>
              <li>
                <Link to="/estimate" className="text-muted-foreground hover:text-primary transition-colors">Get Quote</Link>
              </li>
              <li>
                <Link to="/locations" className="text-muted-foreground hover:text-primary transition-colors">Service Areas</Link>
              </li>
            </ul>
          </div>

          {/* Service Areas */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">Service Areas</h3>
            <ul className="flex flex-col gap-2">
              {LOCATIONS.slice(0, 6).map((location) => (
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
                <Link to="/locations" className="text-primary hover:underline">
                  View all areas →
                </Link>
              </li>
            </ul>
          </div>

          {/* Opening Hours */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">Opening Hours</h3>
            <div className="flex flex-col gap-2 text-muted-foreground">
              <div className="flex items-start gap-2">
                <Clock className="w-4 h-4 text-primary mt-0.5" />
                <div>
                  <p>{BUSINESS_INFO.hours.weekday}</p>
                  <p>{BUSINESS_INFO.hours.weekend}</p>
                </div>
              </div>
              <p className="text-sm mt-2">
                Emergency callouts available outside of these hours.
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-border mt-8 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-muted-foreground text-sm">
            © {new Date().getFullYear()} {BUSINESS_INFO.name}. All rights reserved.
          </p>
          <div className="flex gap-6">
            <Link to="/privacy" className="text-muted-foreground hover:text-primary text-sm transition-colors">
              Privacy Policy
            </Link>
            <Link to="/terms" className="text-muted-foreground hover:text-primary text-sm transition-colors">
              Terms & Conditions
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
