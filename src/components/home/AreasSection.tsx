import { Link } from "react-router-dom";
import { MapPin, ArrowRight } from "lucide-react";
import { LOCATIONS } from "@/lib/constants";

const AreasSection = () => {
  return (
    <section className="py-16 md:py-20 bg-card relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,_hsl(var(--primary)/0.08),_transparent_70%)]" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
      
      <div className="container mx-auto px-6 md:px-12 relative z-10">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20 mb-6">
            <MapPin className="w-3.5 h-3.5 text-primary" />
            <span className="text-xs font-medium text-primary uppercase tracking-wider">Coverage</span>
          </div>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-4">
            Areas we <span className="text-primary">cover</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-md mx-auto">
            Mobile mechanic services across South East London
          </p>
        </div>

        {/* Location Grid */}
        <div className="flex flex-wrap justify-center gap-3 max-w-4xl mx-auto mb-12">
          {LOCATIONS.map((location, index) => (
            <Link
              key={location.slug}
              to={`/locations/${location.slug}`}
              className="group relative px-5 py-3 rounded-full bg-background/50 backdrop-blur-sm border border-border/50 hover:border-primary/50 transition-all duration-300"
              style={{ animationDelay: `${index * 0.05}s` }}
            >
              {/* Glow effect on hover */}
              <div className="absolute inset-0 rounded-full bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity blur-sm" />
              <span className="relative text-sm font-medium text-muted-foreground group-hover:text-foreground transition-colors">
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
