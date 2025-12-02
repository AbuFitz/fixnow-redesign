import { MessageSquare, PhoneCall, CheckCircle } from "lucide-react";

const steps = [
  {
    number: "01",
    icon: MessageSquare,
    title: "Send an Enquiry",
    description: "Tell us about your vehicle and what's happening. Submit your details through our form or give us a call.",
  },
  {
    number: "02",
    icon: PhoneCall,
    title: "We Call You Back",
    description: "We'll get back to you to discuss the issue, give you a quote, and arrange a time that works for you.",
  },
  {
    number: "03",
    icon: CheckCircle,
    title: "We Come to You",
    description: "We arrive at your location with everything needed to diagnose and fix your vehicle on the spot.",
  },
];

const HowItWorksSection = () => {
  return (
    <section className="py-24 md:py-32 bg-card">
      <div className="container mx-auto px-6 md:px-12">
        {/* Section Header */}
        <div className="text-center mb-20">
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="w-8 h-[1px] bg-primary" />
            <span className="text-xs tracking-[0.3em] uppercase text-muted-foreground font-medium">
              How it works
            </span>
            <div className="w-8 h-[1px] bg-primary" />
          </div>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4">
            Simple process
          </h2>
          <p className="text-muted-foreground max-w-lg mx-auto">
            Getting your car fixed shouldn't be complicated. Here's how we work.
          </p>
        </div>
        
        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-16 max-w-5xl mx-auto">
          {steps.map((step, index) => (
            <div key={step.number} className="relative text-center md:text-left">
              {/* Connector Line (desktop) */}
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-10 left-[60%] w-full h-[1px] bg-border" />
              )}
              
              <div className="relative">
                {/* Step Number */}
                <span className="inline-block text-xs tracking-[0.2em] uppercase text-primary font-medium mb-4">
                  Step {step.number}
                </span>
                
                {/* Icon */}
                <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-6 mx-auto md:mx-0">
                  <step.icon className="w-7 h-7 text-primary" />
                </div>
                
                {/* Content */}
                <h3 className="font-display text-xl font-semibold text-foreground mb-3">
                  {step.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;