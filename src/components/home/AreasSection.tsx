import { Link } from "react-router-dom";
import { MapPin } from "lucide-react";
import { LOCATIONS } from "@/lib/constants";

const AreasSection = () => {
  return (
    <section className="py-12 md:py-16 bg-card">
      <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-12">
        {/* Header */}
        <div className="text-center mb-8 md:mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-4">
            <MapPin className="w-4 h-4 text-primary" />
            <span className="text-sm font-semibold text-primary">Coverage</span>
          </div>
          <h2 className="font-display text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-3">
            Areas we cover
          </h2>
          <p className="text-muted-foreground text-sm md:text-lg max-w-xl mx-auto">
            Mobile mechanic services across Hertfordshire & beyond
          </p>
        </div>

        {/* Location Pills */}
        <div className="flex flex-wrap justify-center gap-2 max-w-3xl mx-auto">
          {LOCATIONS.slice(0, 12).map((location) => (
            <Link
              key={location.slug}
              to={`/locations/${location.slug}`}
              className="px-4 py-2 rounded-full bg-background border border-border hover:border-primary/50 hover:bg-primary/5 transition-all"
            >
              <span className="text-sm font-medium text-foreground">
                {location.name}
              </span>
            </Link>
          ))}
        </div>

        {/* View All Link */}
        <div className="text-center mt-6">
          <Link
            to="/locations"
            className="text-primary hover:text-primary/80 font-medium text-sm"
          >
            View all areas →
          </Link>
        </div>
      </div>
    </section>
  );
};

export default AreasSection;
