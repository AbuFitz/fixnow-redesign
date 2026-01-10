import { Link } from "react-router-dom";
import { MapPin, ArrowRight } from "lucide-react";
import { LOCATIONS } from "@/lib/constants";

const AreasSection = () => {
  return (
    <section className="pt-8 sm:pt-12 md:pt-16 lg:pt-20 pb-12 sm:pb-14 md:pb-16 lg:pb-20 bg-gradient-to-b from-card to-surface-elevated relative overflow-hidden">
      {/* Map Background - 30% visible */}
      <div className="absolute inset-0 opacity-30">
        <img
          src="/areas.png"
          alt="Coverage area map"
          className="w-full h-full object-cover grayscale"
          loading="lazy"
        />
      </div>
      <div className="absolute inset-0 bg-card/40" />
      
      <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-12 relative z-10">
        {/* Header */}
        <div className="text-center mb-6 sm:mb-8 md:mb-10">
          <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-primary/10 border border-primary/20 mb-3 sm:mb-4">
            <MapPin className="w-3 h-3 sm:w-4 sm:h-4 text-primary" />
            <span className="text-xs sm:text-sm font-semibold text-primary uppercase tracking-wider">Coverage</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-2 sm:mb-3">
            Areas we cover
          </h2>
          <p className="text-muted-foreground text-sm sm:text-base md:text-xl max-w-xl mx-auto px-4">
            Mobile mechanic services across Hertfordshire & beyond
          </p>
        </div>

        {/* Location Grid */}
        <div className="flex flex-wrap justify-center gap-2 max-w-3xl mx-auto mb-4 sm:mb-6">
          {LOCATIONS.map((location) => (
            <Link
              key={location.slug}
              to={`/locations/${location.slug}`}
              className="px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-background/60 border border-border/50 hover:border-primary/50 hover:bg-background transition-all duration-200"
            >
              <span className="text-xs sm:text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
                {location.name}
              </span>
            </Link>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center">
          <Link
            to="/locations"
            className="inline-flex items-center gap-2 text-primary hover:text-primary/80 font-medium group text-sm sm:text-base"
          >
            View all service areas
            <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default AreasSection;