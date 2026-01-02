import { Link } from "react-router-dom";
import { ArrowRight, Play } from "lucide-react";
import { Button } from "@/components/ui/button";

const HeroSection = () => {
  return (
    <section className="relative min-h-[75vh] md:min-h-[65vh] lg:min-h-[70vh] flex items-center overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <img
          src="/CompanyVan.jpg"
          alt="FixNow Mechanics Van"
          className="w-full h-full object-cover object-center md:object-[65%_center] lg:object-[70%_center] brightness-[0.6] md:brightness-[0.7] lg:brightness-[0.8]"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/98 to-background/40" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-background/70" />
        {/* Animated gradient overlay */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_hsl(var(--primary)/0.12),_transparent_60%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_hsl(var(--primary)/0.08),_transparent_50%)]" />
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
      </div>

      {/* Floating Elements */}
      <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-primary/8 rounded-full blur-[128px] animate-pulse" />
      <div className="absolute bottom-1/4 left-1/4 w-64 h-64 bg-primary/5 rounded-full blur-[100px]" />
      
      <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-12 relative z-10 pt-12 sm:pt-14 md:pt-16 lg:pt-12 pb-6 sm:pb-8 md:pb-10 lg:pb-12">
        <div className="max-w-2xl lg:max-w-3xl">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 sm:gap-3 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-card/40 backdrop-blur-xl border border-primary/20 mb-3 sm:mb-4 md:mb-5 animate-fade-in">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary" />
            </span>
            <span className="text-xs sm:text-sm text-foreground/90 font-medium">Hertfordshire & Beyond</span>
          </div>
          
          {/* Main Headline */}
          <h1 className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-foreground leading-[0.9] mb-4 sm:mb-5 md:mb-6 animate-slide-up drop-shadow-lg">
            We come
            <br />
            <span className="relative">
              to{" "}
              <span className="relative inline-block text-[1.3em]">
                <span className="text-primary italic font-light drop-shadow-[0_0_30px_hsl(var(--primary)/0.5)]">you!</span>
                <svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 100 12" preserveAspectRatio="none">
                  <path d="M0,8 Q50,0 100,8" stroke="hsl(var(--primary))" strokeWidth="3" fill="none" strokeLinecap="round" />
                </svg>
              </span>
            </span>
          </h1>
          
          {/* Subheadline */}
          <p className="text-base sm:text-lg md:text-xl text-muted-foreground/90 mb-5 sm:mb-6 md:mb-8 max-w-xl leading-relaxed animate-slide-up" style={{ animationDelay: "0.1s" }}>
            Car trouble? We bring the garage to your driveway.{" "}
            <span className="text-foreground font-semibold">No trip needed.</span>
          </p>
          
          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 animate-slide-up" style={{ animationDelay: "0.2s" }}>
            <Button 
              size="lg" 
              asChild 
              className="rounded-full h-12 sm:h-14 px-8 sm:px-10 text-sm sm:text-base font-semibold group relative overflow-hidden hover:scale-[1.02] transition-all w-full sm:w-auto"
            >
              <Link to="/quote">
                <span className="relative z-10 flex items-center gap-2">
                  Get Quote Now
                  <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                </span>
              </Link>
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              asChild 
              className="rounded-full h-12 sm:h-14 px-6 sm:px-8 text-sm sm:text-base border-border/50 bg-card/30 backdrop-blur-sm hover:bg-card/50 hover:border-primary/30 group w-full sm:w-auto"
            >
              <Link to="/services">
                <Play className="w-4 h-4 mr-2 text-primary" />
                View Services
              </Link>
            </Button>
          </div>
        </div>

        {/* Stats Row */}
        <div className="mt-8 sm:mt-10 md:mt-12 grid grid-cols-3 gap-4 sm:gap-6 md:gap-8 max-w-2xl animate-fade-in" style={{ animationDelay: "0.4s" }}>
          {[
            { value: "7 Days", label: "Open Weekly" },
            { value: "45 Mile", label: "Coverage Area" },
            { value: "Same Day", label: "Call-outs Available" },
          ].map((stat) => (
            <div key={stat.label} className="relative">
              <div className="text-xl sm:text-2xl md:text-3xl font-display font-bold text-primary mb-0.5 sm:mb-1 drop-shadow-sm">{stat.value}</div>
              <div className="text-[10px] sm:text-xs md:text-sm text-muted-foreground/80">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
