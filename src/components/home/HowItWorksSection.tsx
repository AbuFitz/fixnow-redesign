import { MessageSquare, Phone, Wrench, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const steps = [
  {
    number: "01",
    icon: MessageSquare,
    title: "Send Enquiry",
    description: "Tell us what's wrong with your vehicle",
    color: "from-blue-500/20 to-blue-500/5",
  },
  {
    number: "02",
    icon: Phone,
    title: "We Call Back",
    description: "Discuss details and arrange a time",
    color: "from-primary/20 to-primary/5",
  },
  {
    number: "03",
    icon: Wrench,
    title: "We Fix It",
    description: "At your location, same day if needed",
    color: "from-green-500/20 to-green-500/5",
  },
];

const HowItWorksSection = () => {
  return (
    <section className="py-16 md:py-20 bg-card relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_hsl(var(--primary)/0.05),_transparent_70%)]" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
      
      <div className="container mx-auto px-6 md:px-12 relative z-10">
        {/* Header */}
        <div className="text-center mb-16 md:mb-20">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20 mb-6">
            <div className="w-1.5 h-1.5 rounded-full bg-primary" />
            <span className="text-xs font-medium text-primary uppercase tracking-wider">Process</span>
          </div>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-4">
            How it <span className="text-primary">works</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-md mx-auto">
            Simple, straightforward, no hassle
          </p>
        </div>

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-4 max-w-5xl mx-auto mb-16">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <div key={step.number} className="relative group">
                {/* Connector line */}
                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute top-16 left-[60%] w-full h-[2px]">
                    <div className="h-full bg-gradient-to-r from-primary/30 via-primary/10 to-transparent" />
                    <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-primary/30" />
                  </div>
                )}
                
                <div className="relative p-6 md:p-8 rounded-3xl bg-background/50 backdrop-blur-sm border border-border/50 transition-all duration-500 group-hover:border-primary/30 group-hover:bg-background/80">
                  {/* Glow effect */}
                  <div className={`absolute inset-0 rounded-3xl bg-gradient-to-br ${step.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                  
                  <div className="relative z-10">
                    {/* Number + Icon */}
                    <div className="flex items-center gap-4 mb-6">
                      <div className="w-14 h-14 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                        <Icon className="w-6 h-6 text-primary" />
                      </div>
                      <span className="text-5xl font-display font-bold text-border/50 group-hover:text-primary/20 transition-colors">
                        {step.number}
                      </span>
                    </div>
                    
                    <h3 className="font-display text-xl md:text-2xl font-bold text-foreground mb-2">
                      {step.title}
                    </h3>
                    <p className="text-muted-foreground">
                      {step.description}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* CTA */}
        <div className="text-center">
          <Button size="lg" asChild className="rounded-full h-14 px-8 group shadow-lg shadow-primary/25">
            <Link to="/estimate">
              Start Your Enquiry
              <ArrowRight className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
