import { Link } from "react-router-dom";
import { ArrowRight, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { LOCATIONS } from "@/lib/constants";
import heroImage from "@/assets/hero-car.jpg";

const HeroSection = () => {
  return (
    <section className="relative min-h-[90vh] md:min-h-screen flex items-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        <img 
          src={heroImage} 
          alt="Car engine" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/95 to-background/60" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
      </div>
      
      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <div className="max-w-2xl">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-8">
            <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            <span className="text-sm text-foreground/80">Mobile Mechanic</span>
          </div>
          
          {/* Main Headline */}
          <h1 className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-foreground leading-[0.95] mb-6">
            We come to{" "}
            <span className="italic font-normal text-primary">you</span>
          </h1>
          
          {/* Subheadline */}
          <p className="text-lg md:text-xl text-muted-foreground mb-10 max-w-md leading-relaxed">
            Car trouble? We bring the garage to your driveway. Same-day service across South East London.
          </p>
          
          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 mb-16">
            <Button 
              size="lg" 
              asChild 
              className="rounded-full px-8 h-14 text-base glow-hover"
            >
              <Link to="/estimate">
                Get a Quote
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              asChild 
              className="rounded-full px-8 h-14 text-base border-border/50 hover:bg-card"
            >
              <Link to="/services">
                View Services
              </Link>
            </Button>
          </div>
          
          {/* Locations */}
          <div className="flex items-center gap-2 flex-wrap">
            <MapPin className="w-4 h-4 text-primary" />
            <span className="text-sm text-muted-foreground">Serving:</span>
            {LOCATIONS.slice(0, 5).map((location, index) => (
              <Link
                key={location.slug}
                to={`/locations/${location.slug}`}
                className="text-sm text-foreground/70 hover:text-primary transition-colors"
              >
                {location.name}{index < 4 && ","}
              </Link>
            ))}
            <Link 
              to="/locations" 
              className="text-sm text-primary hover:underline"
            >
              +more
            </Link>
          </div>
        </div>
      </div>
      
      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center gap-2">
        <span className="text-xs text-muted-foreground tracking-wider">Scroll</span>
        <div className="w-[1px] h-8 bg-gradient-to-b from-primary to-transparent" />
      </div>
    </section>
  );
};

export default HeroSection;
