import { Link } from "react-router-dom";
import { Phone, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { BUSINESS_INFO } from "@/lib/constants";

const CTASection = () => {
  return (
    <section className="py-16 md:py-20 bg-primary relative overflow-hidden">
      {/* Accent patterns */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 right-0 w-96 h-96 bg-background rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-background rounded-full blur-3xl" />
      </div>
      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-background/20 backdrop-blur-sm border border-background/30 mb-6">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-background opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-background" />
            </span>
            <span className="text-sm font-semibold text-primary-foreground uppercase tracking-wider">Same Day Service Available</span>
          </div>
          
          {/* Main heading */}
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-primary-foreground mb-4 leading-tight drop-shadow-lg">
            Need a Mechanic?
            <br />
            We'll Come to You
          </h2>
          
          <p className="text-lg md:text-xl text-primary-foreground/90 mb-8 max-w-2xl mx-auto font-medium">
            Don't waste time at the garage. Get mobile mechanic services at your doorstep within hours.
          </p>
          
          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              asChild 
              className="group rounded-full h-16 px-10 text-lg font-semibold bg-background text-foreground hover:bg-background/90 shadow-2xl hover:shadow-3xl hover:scale-[1.05] transition-all"
            >
              <Link to="/estimate">
                Get Free Quote Now
                <ArrowRight className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              asChild 
              className="rounded-full h-16 px-10 text-lg font-semibold border-2 border-primary-foreground/40 text-primary-foreground bg-transparent hover:bg-primary-foreground/15 hover:border-primary-foreground/70 hover:scale-[1.05] transition-all"
            >
              <a href={`tel:${BUSINESS_INFO.phone}`}>
                <Phone className="w-5 h-5 mr-2" />
                {BUSINESS_INFO.phone}
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;