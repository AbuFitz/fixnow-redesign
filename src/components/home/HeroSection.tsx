import { Link } from "react-router-dom";
import { ArrowRight, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { LOCATIONS, BUSINESS_INFO } from "@/lib/constants";
import heroImage from "@/assets/hero-car.jpg";

const HeroSection = () => {
  const featuredLocations = LOCATIONS.slice(0, 4);
  
  return (
    <section className="relative min-h-screen flex flex-col justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img 
          src={heroImage} 
          alt="Car service" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/95 to-background/60" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-background/30" />
      </div>
      
      <div className="relative z-10 px-6 md:px-12 lg:px-20 pt-32 pb-20">
        <div className="max-w-4xl">
          {/* Badge */}
          <div 
            className="flex items-center gap-3 mb-10 opacity-0 animate-fade-in"
            style={{ animationDelay: "0.1s" }}
          >
            <div className="w-8 h-[1px] bg-primary" />
            <span className="text-xs tracking-[0.3em] uppercase text-muted-foreground font-medium">
              Mobile Mechanic
            </span>
          </div>
          
          {/* Main Heading */}
          <h1 
            className="font-display text-6xl md:text-8xl lg:text-9xl font-bold text-foreground mb-8 leading-[0.95] tracking-tight opacity-0 animate-slide-up"
            style={{ animationDelay: "0.2s" }}
          >
            We come
            <br />
            to <span className="italic font-light text-primary">you</span>
          </h1>
          
          {/* Subheading */}
          <p 
            className="text-base md:text-lg text-muted-foreground mb-10 max-w-md leading-relaxed opacity-0 animate-slide-up"
            style={{ animationDelay: "0.4s" }}
          >
            Vehicle diagnostics and repairs. <span className="text-foreground font-medium">At your location.</span>
          </p>
          
          {/* CTA Buttons */}
          <div 
            className="flex flex-col sm:flex-row gap-4 mb-16 opacity-0 animate-slide-up"
            style={{ animationDelay: "0.5s" }}
          >
            <Button size="lg" asChild className="rounded-full px-8">
              <Link to="/estimate">
                Get a Quote
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
            <Button 
              size="lg" 
              variant="ghost" 
              asChild 
              className="rounded-full px-8 text-muted-foreground hover:text-foreground"
            >
              <a href={`tel:${BUSINESS_INFO.phone}`}>
                <Phone className="w-4 h-4 mr-2" />
                {BUSINESS_INFO.phone}
              </a>
            </Button>
          </div>
          
          {/* Locations */}
          <div 
            className="flex flex-wrap items-center gap-x-2 gap-y-1 text-sm opacity-0 animate-fade-in"
            style={{ animationDelay: "0.7s" }}
          >
            {featuredLocations.map((location, index) => (
              <span key={location.slug} className="flex items-center">
                <Link 
                  to={`/locations/${location.slug}`}
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  {location.name}
                </Link>
                {index < featuredLocations.length - 1 && (
                  <span className="text-muted-foreground/40 mx-2">•</span>
                )}
              </span>
            ))}
            <Link 
              to="/locations" 
              className="text-muted-foreground hover:text-primary transition-colors ml-1"
            >
              + more
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;