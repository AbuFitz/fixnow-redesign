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
    <section className="py-12 md:py-16 bg-secondary/80 relative overflow-hidden">
      {/* Subtle top/bottom borders for separation */}
      <div className="absolute inset-x-0 top-0 h-px bg-border/50" />
      <div className="absolute inset-x-0 bottom-0 h-px bg-border/50" />
      <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-12 relative z-10">
        {/* Header */}
        <div className="text-center mb-8 md:mb-10">
          <h2 className="font-display text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-2">
            How it works
          </h2>
          <p className="text-sm sm:text-base md:text-lg lg:text-xl font-medium text-muted-foreground">
            Simple, straightforward, no hassle
          </p>
        </div>

        {/* Steps - Compact on mobile */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-3 md:gap-6 max-w-5xl mx-auto mb-8 md:mb-10">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <div key={step.number} className="relative group">
                {/* Connector line - desktop only */}
                {index < steps.length - 1 && (
                  <div className="hidden sm:block absolute top-12 left-[60%] w-full h-[2px] bg-border/50" />
                )}

                <div className="relative p-4 sm:p-4 md:p-8 rounded-xl md:rounded-2xl bg-background/80 backdrop-blur-sm border border-border/50 transition-all duration-300 hover:border-primary/30 text-center sm:text-left">
                  {/* Icon - centered on mobile */}
                  <div className="flex justify-center sm:justify-start md:items-center md:gap-4 mb-3 md:mb-5">
                    <div className="w-12 h-12 md:w-14 md:h-14 rounded-lg md:rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center">
                      <Icon className="w-5 h-5 md:w-6 md:h-6 text-primary" />
                    </div>
                    <span className="hidden md:block text-4xl font-display font-bold text-border/70">
                      {step.number}
                    </span>
                  </div>

                  <h3 className="font-display text-sm sm:text-base md:text-2xl font-bold text-foreground mb-1 md:mb-2">
                    {step.title}
                  </h3>
                  <p className="text-muted-foreground text-xs sm:text-xs md:text-base">
                    {step.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* CTA */}
        <div className="text-center">
          <Button size="lg" asChild className="rounded-full h-14 px-10 text-base font-semibold hover:scale-[1.02] transition-all group">
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
