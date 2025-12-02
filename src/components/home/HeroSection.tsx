import { Link } from "react-router-dom";
import { Phone, MapPin, Clock, Star, ArrowRight, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { BUSINESS_INFO } from "@/lib/constants";
import heroImage from "@/assets/hero-car.jpg";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        <img 
          src={heroImage} 
          alt="Professional mobile mechanic service" 
          className="w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/95 to-background/70" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-background/50" />
      </div>
      
      {/* Animated Glow Orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl animate-pulse-glow opacity-30" />
      <div className="absolute bottom-1/4 right-1/3 w-64 h-64 bg-primary/10 rounded-full blur-3xl animate-float opacity-20" />
      
      <div className="container mx-auto px-4 py-20 relative z-10">
        <div className="max-w-4xl">
          {/* Badge */}
          <div 
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-strong mb-8 opacity-0 animate-fade-in"
            style={{ animationDelay: "0.2s" }}
          >
            <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            <span className="text-sm font-medium text-muted-foreground">Mobile Mechanics • Hertfordshire & Beyond</span>
          </div>
          
          {/* Main Heading */}
          <h1 
            className="font-display text-5xl md:text-7xl lg:text-8xl font-black text-foreground mb-6 leading-[0.9] tracking-tight opacity-0 animate-slide-up"
            style={{ animationDelay: "0.3s" }}
          >
            We Come
            <br />
            <span className="text-gradient-animated">To You</span>
          </h1>
          
          {/* Subheading */}
          <p 
            className="text-lg md:text-xl text-muted-foreground mb-10 max-w-xl leading-relaxed opacity-0 animate-slide-up"
            style={{ animationDelay: "0.5s" }}
          >
            Professional mobile mechanic services at your home or workplace. 
            No garage visits needed — <span className="text-foreground font-medium">we bring the expertise to you.</span>
          </p>
          
          {/* CTA Buttons */}
          <div 
            className="flex flex-col sm:flex-row gap-4 mb-14 opacity-0 animate-slide-up"
            style={{ animationDelay: "0.7s" }}
          >
            <Button size="lg" asChild className="text-lg px-8 py-6 rounded-2xl glow-hover font-semibold">
              <Link to="/estimate">
                Get Free Quote
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              asChild 
              className="text-lg px-8 py-6 rounded-2xl border-border/50 bg-card/50 backdrop-blur-sm hover:bg-card hover:border-primary/50 font-semibold"
            >
              <a href={`tel:${BUSINESS_INFO.phone}`}>
                <Phone className="w-5 h-5 mr-2" />
                Call Now
              </a>
            </Button>
          </div>
          
          {/* Trust Indicators */}
          <div 
            className="flex flex-wrap gap-6 md:gap-10 text-sm opacity-0 animate-fade-in"
            style={{ animationDelay: "0.9s" }}
          >
            <div className="flex items-center gap-2 text-muted-foreground">
              <div className="p-2 rounded-lg bg-primary/10">
                <Clock className="w-4 h-4 text-primary" />
              </div>
              <span>7am - 10pm Daily</span>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <div className="p-2 rounded-lg bg-primary/10">
                <MapPin className="w-4 h-4 text-primary" />
              </div>
              <span>{BUSINESS_INFO.coverage}</span>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <div className="p-2 rounded-lg bg-primary/10">
                <Star className="w-4 h-4 text-primary fill-primary" />
              </div>
              <span>5-Star Rated</span>
            </div>
          </div>
        </div>
      </div>
      
      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-0 animate-fade-in" style={{ animationDelay: "1.2s" }}>
        <span className="text-xs text-muted-foreground uppercase tracking-widest">Scroll</span>
        <ChevronDown className="w-5 h-5 text-muted-foreground animate-bounce" />
      </div>
    </section>
  );
};

export default HeroSection;
