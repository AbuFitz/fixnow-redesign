import { MessageSquare, Phone, Wrench, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const steps = [
  {
    number: "01",
    icon: MessageSquare,
    title: "Send Enquiry",
    description: "Tell us what's wrong with your vehicle",
  },
  {
    number: "02",
    icon: Phone,
    title: "We Call Back",
    description: "Discuss details and arrange a time",
  },
  {
    number: "03",
    icon: Wrench,
    title: "We Fix It",
    description: "At your location, same day if needed",
  },
];

const HowItWorksSection = () => {
  return (
    <section className="py-8 md:py-12 bg-card">
      <div className="container mx-auto px-6 md:px-12">
        {/* Header */}
        <div className="text-center mb-4 md:mb-8">
          <h2 className="font-display text-2xl md:text-4xl font-bold text-foreground mb-1">
            How it works
          </h2>
          <p className="text-muted-foreground text-sm md:text-lg">
            Simple, straightforward, no hassle
          </p>
        </div>

        {/* Steps - Compact on mobile */}
        <div className="grid grid-cols-3 gap-2 md:gap-3 max-w-4xl mx-auto mb-4 md:mb-8">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <div key={step.number} className="relative group">
                {/* Connector line - desktop only */}
                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute top-12 left-[60%] w-full h-[2px] bg-border/50" />
                )}
                
                <div className="relative p-3 md:p-6 rounded-xl md:rounded-2xl bg-background/50 border border-border/50 transition-all duration-300 hover:border-border text-center md:text-left">
                  {/* Icon - centered on mobile */}
                  <div className="flex justify-center md:justify-start md:items-center md:gap-4 mb-2 md:mb-4">
                    <div className="w-10 h-10 md:w-12 md:h-12 rounded-lg md:rounded-xl bg-card border border-border/50 flex items-center justify-center">
                      <Icon className="w-4 h-4 md:w-5 md:h-5 text-primary" />
                    </div>
                    <span className="hidden md:block text-4xl font-display font-bold text-border/70">
                      {step.number}
                    </span>
                  </div>
                  
                  <h3 className="font-display text-xs md:text-xl font-bold text-foreground mb-0.5 md:mb-1">
                    {step.title}
                  </h3>
                  <p className="text-muted-foreground text-[10px] md:text-sm hidden md:block">
                    {step.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* CTA */}
        <div className="text-center">
          <Button size="lg" asChild className="rounded-full h-12 px-8 group">
            <Link to="/estimate">
              Start Your Enquiry
              <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;