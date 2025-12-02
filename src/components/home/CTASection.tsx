import { Link } from "react-router-dom";
import { Phone, ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { BUSINESS_INFO } from "@/lib/constants";

const CTASection = () => {
  return (
    <section className="py-24 md:py-32 bg-background relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_hsl(var(--primary)/0.1),_transparent_60%)]" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[150px]" />
      
      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <div className="max-w-4xl mx-auto">
          {/* Main Card */}
          <div className="relative p-8 md:p-12 lg:p-16 rounded-3xl bg-card/50 backdrop-blur-xl border border-primary/20 overflow-hidden">
            {/* Inner glow */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-primary/5" />
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-[100px]" />
            
            <div className="relative z-10 text-center">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-8">
                <Sparkles className="w-4 h-4 text-primary" />
                <span className="text-sm font-medium text-primary">Ready to help</span>
              </div>
              
              <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 leading-tight">
                Need help with
                <br />
                <span className="text-primary">your car?</span>
              </h2>
              
              <p className="text-lg md:text-xl text-muted-foreground mb-10 max-w-lg mx-auto">
                Send us an enquiry and we'll call you back to discuss. No obligation, just honest advice.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  size="lg" 
                  asChild 
                  className="rounded-full h-14 px-8 text-base group shadow-lg shadow-primary/25"
                >
                  <Link to="/estimate">
                    <span className="flex items-center gap-2">
                      Get a Quote
                      <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                    </span>
                  </Link>
                </Button>
                <Button 
                  size="lg" 
                  variant="outline" 
                  asChild 
                  className="rounded-full h-14 px-8 text-base border-border/50 bg-background/50 hover:bg-background hover:border-primary/30"
                >
                  <a href={`tel:${BUSINESS_INFO.phone}`}>
                    <Phone className="w-5 h-5 mr-2 text-primary" />
                    {BUSINESS_INFO.phone}
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
