import { Link } from "react-router-dom";
import { ArrowRight, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { LOCATIONS, BUSINESS_INFO } from "@/lib/constants";

const AreasSection = () => {
  return (
    <section className="py-24 md:py-32 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-card via-background to-background" />
      
      {/* Decorative Elements */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl -translate-y-1/2" />
      <div className="absolute top-1/2 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl -translate-y-1/2" />
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="text-primary font-semibold tracking-wider uppercase text-sm mb-4 block">Coverage Area</span>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">
            Areas We Serve
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            Based in Hemel Hempstead, we cover a <span className="text-foreground font-medium">{BUSINESS_INFO.coverage}</span> reaching these areas and beyond.
          </p>
        </div>
        
        {/* Location Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 md:gap-4 max-w-4xl mx-auto mb-12">
          {LOCATIONS.map((location, index) => (
            <Link
              key={location.slug}
              to={`/locations/${location.slug}`}
              className="group relative overflow-hidden"
              style={{ animationDelay: `${index * 0.05}s` }}
            >
              <div className="relative px-4 py-4 rounded-xl bg-secondary/50 border border-border/50 hover:border-primary/50 hover:bg-secondary transition-all duration-300 text-center surface-shine">
                <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <MapPin className="w-3 h-3 text-primary" />
                </div>
                <span className="font-medium text-foreground group-hover:text-primary transition-colors">
                  {location.name}
                </span>
              </div>
            </Link>
          ))}
        </div>
        
        {/* CTA */}
        <div className="text-center">
          <Button asChild size="lg" className="rounded-xl">
            <Link to="/locations">
              View All Service Areas
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default AreasSection;
