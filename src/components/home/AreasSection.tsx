import { Link } from "react-router-dom";
import { MapPin, ArrowRight } from "lucide-react";
import { LOCATIONS } from "@/lib/constants";

const AreasSection = () => {
  return (
    <section className="py-10 md:py-14 bg-card relative overflow-hidden">
      {/* Map Background */}
      <div className="absolute inset-0 opacity-20">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d200000!2d-0.4!3d51.75!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2suk!4v1700000000000!5m2!1sen!2suk&disableDefaultUI=1&zoomControl=0&mapTypeControl=0&streetViewControl=0&fullscreenControl=0"
          className="w-full h-full border-0 grayscale"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Coverage area map"
        />
      </div>
      <div className="absolute inset-0 bg-card/80" />
      
      <div className="container mx-auto px-6 md:px-12 relative z-10">
        {/* Header */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20 mb-3">
            <MapPin className="w-3.5 h-3.5 text-primary" />
            <span className="text-xs font-medium text-primary uppercase tracking-wider">Coverage</span>
          </div>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-2">
            Areas we cover
          </h2>
          <p className="text-muted-foreground text-lg max-w-md mx-auto">
            Mobile mechanic services across Hertfordshire & beyond
          </p>
        </div>

        {/* Location Grid */}
        <div className="flex flex-wrap justify-center gap-2 max-w-3xl mx-auto mb-6">
          {LOCATIONS.map((location) => (
            <Link
              key={location.slug}
              to={`/locations/${location.slug}`}
              className="px-4 py-2 rounded-full bg-background/60 border border-border/50 hover:border-primary/50 hover:bg-background transition-all duration-200"
            >
              <span className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
                {location.name}
              </span>
            </Link>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center">
          <Link
            to="/locations"
            className="inline-flex items-center gap-2 text-primary hover:text-primary/80 font-medium group"
          >
            View all service areas
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default AreasSection;