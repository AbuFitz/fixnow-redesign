import { MessageSquare, Phone, Wrench } from "lucide-react";

const steps = [
  {
    number: "01",
    icon: MessageSquare,
    title: "Send Enquiry",
    description: "Tell us what's wrong",
  },
  {
    number: "02",
    icon: Phone,
    title: "We Call Back",
    description: "Discuss & arrange time",
  },
  {
    number: "03",
    icon: Wrench,
    title: "We Fix It",
    description: "At your location",
  },
];

const HowItWorksSection = () => {
  return (
    <section className="py-16 md:py-20 bg-card border-y border-border/50">
      <div className="container mx-auto px-6 md:px-12">
        {/* Compact horizontal layout */}
        <div className="flex flex-col md:flex-row md:items-center gap-8 md:gap-0">
          {/* Title */}
          <div className="md:w-1/4 md:pr-8 md:border-r md:border-border/50">
            <span className="text-primary text-sm font-medium tracking-wider uppercase mb-2 block">
              How it works
            </span>
            <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground">
              Simple process
            </h2>
          </div>

          {/* Steps */}
          <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-0 md:pl-8">
            {steps.map((step, index) => {
              const Icon = step.icon;
              return (
                <div
                  key={step.number}
                  className="flex items-center gap-4 md:flex-col md:text-center md:px-6 relative"
                >
                  {/* Connector line - desktop */}
                  {index < steps.length - 1 && (
                    <div className="hidden md:block absolute top-6 left-[calc(50%+40px)] right-0 h-[1px] bg-gradient-to-r from-primary/50 to-transparent" />
                  )}
                  
                  {/* Icon */}
                  <div className="w-12 h-12 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center flex-shrink-0">
                    <Icon className="w-5 h-5 text-primary" />
                  </div>
                  
                  {/* Content */}
                  <div>
                    <span className="text-xs text-primary font-medium mb-1 block md:mt-3">
                      {step.number}
                    </span>
                    <h3 className="font-display text-lg font-semibold text-foreground">
                      {step.title}
                    </h3>
                    <p className="text-sm text-muted-foreground mt-1">
                      {step.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
