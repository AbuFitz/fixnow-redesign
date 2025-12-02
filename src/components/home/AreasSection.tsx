import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { LOCATIONS, BUSINESS_INFO } from "@/lib/constants";

const AreasSection = () => {
  return (
    <section className="py-24 md:py-32 bg-card">
      <div className="container mx-auto px-6 md:px-12">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="w-8 h-[1px] bg-primary" />
            <span className="text-xs tracking-[0.3em] uppercase text-muted-foreground font-medium">
              Coverage
            </span>
            <div className="w-8 h-[1px] bg-primary" />
          </div>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4">
            Areas we cover
          </h2>
          <p className="text-muted-foreground max-w-lg mx-auto">
            Based in Hemel Hempstead, we serve a {BUSINESS_INFO.coverage}.
          </p>
        </div>
        
        {/* Location Grid */}
        <div className="flex flex-wrap justify-center gap-3 max-w-3xl mx-auto mb-12">
          {LOCATIONS.map((location) => (
            <Link
              key={location.slug}
              to={`/locations/${location.slug}`}
              className="px-5 py-3 rounded-full bg-secondary/50 border border-border/50 hover:border-primary/50 hover:bg-secondary transition-all duration-300 text-foreground hover:text-primary text-sm font-medium"
            >
              {location.name}
            </Link>
          ))}
        </div>
        
        {/* CTA */}
        <div className="text-center">
          <Button asChild variant="outline" size="lg" className="rounded-full">
            <Link to="/locations">
              View all areas
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default AreasSection;