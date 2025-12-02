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
    <section className="py-16 md:py-20 bg-card">
      <div className="container mx-auto px-6 md:px-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-3">
            How it works
          </h2>
          <p className="text-muted-foreground text-lg">
            Simple, straightforward, no hassle
          </p>
        </div>

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-4xl mx-auto mb-12">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <div key={step.number} className="relative group">
                {/* Connector line */}
                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute top-12 left-[60%] w-full h-[2px] bg-border/50" />
                )}
                
                <div className="relative p-6 rounded-2xl bg-background/50 border border-border/50 transition-all duration-300 hover:border-border">
                  {/* Number + Icon */}
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 rounded-xl bg-card border border-border/50 flex items-center justify-center">
                      <Icon className="w-5 h-5 text-primary" />
                    </div>
                    <span className="text-4xl font-display font-bold text-border/70">
                      {step.number}
                    </span>
                  </div>
                  
                  <h3 className="font-display text-xl font-bold text-foreground mb-1">
                    {step.title}
                  </h3>
                  <p className="text-muted-foreground text-sm">
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