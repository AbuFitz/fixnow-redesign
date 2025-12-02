import { Link } from "react-router-dom";
import { LOCATIONS } from "@/lib/constants";

const HeroSection = () => {
  const featuredLocations = LOCATIONS.slice(0, 4);
  
  return (
    <section className="min-h-screen flex flex-col justify-center bg-background px-6 md:px-12 lg:px-20 pt-24 pb-16">
      <div className="max-w-5xl">
        {/* Badge */}
        <div 
          className="flex items-center gap-3 mb-12 opacity-0 animate-fade-in"
          style={{ animationDelay: "0.1s" }}
        >
          <div className="w-8 h-[1px] bg-primary" />
          <span className="text-xs tracking-[0.3em] uppercase text-muted-foreground font-medium">
            Mobile Mechanic
          </span>
        </div>
        
        {/* Main Heading */}
        <h1 
          className="font-display text-6xl md:text-8xl lg:text-9xl font-bold text-foreground mb-10 leading-[0.95] tracking-tight opacity-0 animate-slide-up"
          style={{ animationDelay: "0.2s" }}
        >
          We come
          <br />
          to <span className="italic font-light text-primary">you</span>
        </h1>
        
        {/* Subheading */}
        <p 
          className="text-base md:text-lg text-muted-foreground mb-16 max-w-lg leading-relaxed opacity-0 animate-slide-up"
          style={{ animationDelay: "0.4s" }}
        >
          Vehicle diagnostics and repairs. <span className="text-foreground font-medium">At your location.</span>
        </p>
        
        {/* Locations */}
        <div 
          className="flex flex-wrap items-center gap-x-2 gap-y-1 text-sm opacity-0 animate-fade-in"
          style={{ animationDelay: "0.6s" }}
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
    </section>
  );
};

export default HeroSection;
