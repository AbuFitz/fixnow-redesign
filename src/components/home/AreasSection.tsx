import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { LOCATIONS } from "@/lib/constants";

const AreasSection = () => {
  return (
    <section className="py-16 md:py-20 bg-card border-y border-border/50">
      <div className="container mx-auto px-6 md:px-12">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          {/* Left side */}
          <div className="flex-shrink-0">
            <span className="text-primary text-sm font-medium tracking-wider uppercase mb-2 block">
              Coverage
            </span>
            <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground">
              Areas we cover
            </h2>
          </div>

          {/* Location pills */}
          <div className="flex flex-wrap gap-2 flex-1 md:justify-end">
            {LOCATIONS.map((location) => (
              <Link
                key={location.slug}
                to={`/locations/${location.slug}`}
                className="px-4 py-2 rounded-full bg-secondary/50 border border-border/50 text-sm text-foreground hover:border-primary/30 hover:bg-primary/5 transition-all"
              >
                {location.name}
              </Link>
            ))}
            <Link
              to="/locations"
              className="px-4 py-2 rounded-full bg-primary/10 border border-primary/30 text-sm text-primary hover:bg-primary/20 transition-all inline-flex items-center gap-1"
            >
              All areas
              <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AreasSection;
