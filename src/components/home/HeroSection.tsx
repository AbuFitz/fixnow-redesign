import { Link } from "react-router-dom";
import { ArrowRight, Play } from "lucide-react";
import { Button } from "@/components/ui/button";

const HeroSection = () => {
  return (
    <section className="relative min-h-[75vh] md:min-h-[60vh] flex items-center overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <img src="/CompanyVan.jpg" alt="FixNow Mechanics Van" className="w-full h-full object-cover object-[30%_35%] scale-100 brightness-125 md:w-full md:h-auto md:object-contain md:object-right md:scale-75 md:translate-x-[15%] md:-translate-y-[20%] md:brightness-[200%]" />
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
      
      <div className="container mx-auto px-6 md:px-12 relative z-10 pt-16 md:pt-12 pb-8 md:pb-12">
        <div className="max-w-3xl">
          {/* Badge */}
          <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-card/40 backdrop-blur-xl border border-primary/20 mb-4 md:mb-5 animate-fade-in">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary" />
            </span>
            <span className="text-sm text-foreground/90 font-medium">Hertfordshire & Beyond</span>
          </div>
          
          {/* Main Headline */}
          <h1 className="font-display text-7xl sm:text-8xl md:text-7xl lg:text-8xl font-bold text-foreground leading-[0.9] mb-5 md:mb-6 animate-slide-up drop-shadow-lg">
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
          <p className="text-lg md:text-xl text-muted-foreground/90 mb-6 md:mb-8 max-w-xl leading-relaxed animate-slide-up" style={{ animationDelay: "0.1s" }}>
            Car trouble? We bring the garage to your driveway.{" "}
            <span className="text-foreground font-semibold">No trip needed.</span>
          </p>
          
          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-3 animate-slide-up" style={{ animationDelay: "0.2s" }}>
            <Button 
              size="lg" 
              asChild 
              className="rounded-full h-14 px-10 text-base font-semibold group relative overflow-hidden shadow-xl shadow-primary/30 hover:shadow-2xl hover:shadow-primary/40 hover:scale-[1.02] transition-all"
            >
              <Link to="/estimate">
                <span className="relative z-10 flex items-center gap-2">
                  Get FREE Quote Now
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
        <div className="mt-10 md:mt-12 grid grid-cols-3 gap-6 max-w-2xl animate-fade-in" style={{ animationDelay: "0.4s" }}>
          {[
            { value: "7 Days", label: "Open Weekly" },
            { value: "45 Mile", label: "Coverage Radius" },
            { value: "Same Day", label: "If Needed" },
          ].map((stat) => (
            <div key={stat.label} className="relative">
              <div className="text-2xl md:text-3xl font-display font-bold text-primary mb-1 drop-shadow-sm">{stat.value}</div>
              <div className="text-xs md:text-sm text-muted-foreground/80">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
