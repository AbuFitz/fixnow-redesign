import { Link } from "react-router-dom";
import { ArrowRight, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import heroImage from "@/assets/hero-car.jpg";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <img src={heroImage} alt="Car" className="w-full h-full object-cover scale-105" />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/90 to-background/40" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-background/50" />
        {/* Animated gradient overlay */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_hsl(var(--primary)/0.15),_transparent_50%)]" />
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
      </div>

      {/* Floating Elements */}
      <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-primary/10 rounded-full blur-[128px] animate-pulse" />
      <div className="absolute bottom-1/4 left-1/4 w-64 h-64 bg-primary/5 rounded-full blur-[100px]" />
      
      <div className="container mx-auto px-6 md:px-12 relative z-10 pt-20">
        <div className="max-w-3xl">
          {/* Badge */}
          <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-card/40 backdrop-blur-xl border border-primary/20 mb-8 animate-fade-in">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary" />
            </span>
            <span className="text-sm text-foreground/90 font-medium">Mobile Mechanic • South East London</span>
          </div>
          
          {/* Main Headline */}
          <h1 className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-foreground leading-[0.9] mb-8 animate-slide-up">
            We come
            <br />
            <span className="relative">
              to{" "}
              <span className="relative inline-block">
                <span className="text-primary italic font-light">you</span>
                <svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 100 12" preserveAspectRatio="none">
                  <path d="M0,8 Q50,0 100,8" stroke="hsl(var(--primary))" strokeWidth="3" fill="none" strokeLinecap="round" />
                </svg>
              </span>
            </span>
          </h1>
          
          {/* Subheadline */}
          <p className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-xl leading-relaxed animate-slide-up" style={{ animationDelay: "0.1s" }}>
            Car trouble? We bring the garage to your driveway.{" "}
            <span className="text-foreground font-medium">Same-day service.</span>
          </p>
          
          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 animate-slide-up" style={{ animationDelay: "0.2s" }}>
            <Button 
              size="lg" 
              asChild 
              className="rounded-full h-14 px-8 text-base group relative overflow-hidden shadow-lg shadow-primary/25"
            >
              <Link to="/estimate">
                <span className="relative z-10 flex items-center gap-2">
                  Get a Quote
                  <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                </span>
              </Link>
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              asChild 
              className="rounded-full h-14 px-8 text-base border-border/50 bg-card/30 backdrop-blur-sm hover:bg-card/50 hover:border-primary/30 group"
            >
              <Link to="/services">
                <Play className="w-4 h-4 mr-2 text-primary" />
                View Services
              </Link>
            </Button>
          </div>
        </div>

        {/* Stats Row */}
        <div className="mt-20 md:mt-32 grid grid-cols-3 gap-8 max-w-2xl animate-fade-in" style={{ animationDelay: "0.4s" }}>
          {[
            { value: "Same Day", label: "Service Available" },
            { value: "SE London", label: "Coverage Area" },
            { value: "Mobile", label: "We Come To You" },
          ].map((stat) => (
            <div key={stat.label} className="relative">
              <div className="text-2xl md:text-3xl font-display font-bold text-primary mb-1">{stat.value}</div>
              <div className="text-xs md:text-sm text-muted-foreground">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 animate-bounce">
        <div className="w-6 h-10 rounded-full border-2 border-primary/30 flex items-start justify-center p-2">
          <div className="w-1 h-2 bg-primary rounded-full animate-[scroll_1.5s_ease-in-out_infinite]" />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
