import { Link } from "react-router-dom";
import { Phone, Mail, MapPin, Clock, ArrowUpRight } from "lucide-react";
import { BUSINESS_INFO, LOCATIONS } from "@/lib/constants";

const Footer = () => {
  return (
    <footer className="relative bg-card border-t border-border overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />
      
      <div className="container mx-auto px-4 py-16 md:py-20 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12">
          {/* Company Info */}
          <div className="lg:col-span-1">
            <Link to="/" className="flex items-center gap-3 mb-6 group">
              <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-primary to-yellow-500 flex items-center justify-center shadow-lg">
                <span className="text-primary-foreground font-bold text-xl font-display">F</span>
              </div>
              <span className="font-display font-bold text-xl text-foreground">
                FixNow<span className="text-primary">Mechanics</span>
              </span>
            </Link>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              Professional mobile mechanic services. We come to you anywhere within a {BUSINESS_INFO.coverage}.
            </p>
            <div className="flex flex-col gap-4">
              <a 
                href={`tel:${BUSINESS_INFO.phone}`} 
                className="flex items-center gap-3 text-foreground hover:text-primary transition-colors group"
              >
                <div className="p-2 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
                  <Phone className="w-4 h-4 text-primary" />
                </div>
                <span className="font-medium">{BUSINESS_INFO.phone}</span>
              </a>
              <a 
                href={`mailto:${BUSINESS_INFO.email}`} 
                className="flex items-center gap-3 text-foreground hover:text-primary transition-colors group"
              >
                <div className="p-2 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
                  <Mail className="w-4 h-4 text-primary" />
                </div>
                <span className="font-medium">{BUSINESS_INFO.email}</span>
              </a>
              <div className="flex items-center gap-3 text-muted-foreground">
                <div className="p-2 rounded-lg bg-secondary">
                  <MapPin className="w-4 h-4 text-muted-foreground" />
                </div>
                <span>Based in {BUSINESS_INFO.address}</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-display font-semibold text-foreground mb-6 text-lg">Quick Links</h3>
            <ul className="flex flex-col gap-3">
              {[
                { name: "Home", href: "/" },
                { name: "Services", href: "/services" },
                { name: "Get Quote", href: "/estimate" },
                { name: "Service Areas", href: "/locations" },
              ].map((link) => (
                <li key={link.name}>
                  <Link 
                    to={link.href} 
                    className="text-muted-foreground hover:text-primary transition-colors flex items-center gap-1 group"
                  >
                    {link.name}
                    <ArrowUpRight className="w-3 h-3 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Service Areas */}
          <div>
            <h3 className="font-display font-semibold text-foreground mb-6 text-lg">Service Areas</h3>
            <ul className="flex flex-col gap-3">
              {LOCATIONS.slice(0, 5).map((location) => (
                <li key={location.slug}>
                  <Link
                    to={`/locations/${location.slug}`}
                    className="text-muted-foreground hover:text-primary transition-colors flex items-center gap-1 group"
                  >
                    {location.name}
                    <ArrowUpRight className="w-3 h-3 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                  </Link>
                </li>
              ))}
              <li>
                <Link 
                  to="/locations" 
                  className="text-primary hover:text-primary/80 transition-colors font-medium flex items-center gap-1"
                >
                  View all areas
                  <ArrowUpRight className="w-4 h-4" />
                </Link>
              </li>
            </ul>
          </div>

          {/* Opening Hours */}
          <div>
            <h3 className="font-display font-semibold text-foreground mb-6 text-lg">Opening Hours</h3>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-lg bg-primary/10">
                  <Clock className="w-4 h-4 text-primary" />
                </div>
                <div className="text-muted-foreground">
                  <p className="text-foreground font-medium mb-1">Mon - Sat</p>
                  <p>7am - 10pm</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-lg bg-secondary">
                  <Clock className="w-4 h-4 text-muted-foreground" />
                </div>
                <div className="text-muted-foreground">
                  <p className="text-foreground font-medium mb-1">Sunday</p>
                  <p>8am - 8pm</p>
                </div>
              </div>
              <p className="text-sm text-muted-foreground pt-2 border-t border-border/50">
                Emergency callouts available outside of these hours.
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-border/50 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-muted-foreground text-sm">
            © {new Date().getFullYear()} {BUSINESS_INFO.name}. All rights reserved.
          </p>
          <div className="flex gap-6">
            <Link to="/privacy" className="text-muted-foreground hover:text-foreground text-sm transition-colors">
              Privacy Policy
            </Link>
            <Link to="/terms" className="text-muted-foreground hover:text-foreground text-sm transition-colors">
              Terms & Conditions
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
