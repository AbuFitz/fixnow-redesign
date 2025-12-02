import { MessageSquare, Calendar, CheckCircle } from "lucide-react";

const steps = [
  {
    number: "01",
    icon: MessageSquare,
    title: "Get a Quote",
    description: "Tell us what's wrong with your vehicle and your location. We'll provide a transparent, no-obligation quote.",
  },
  {
    number: "02",
    icon: Calendar,
    title: "Book a Time",
    description: "Choose a time that works for you. We offer early morning, evening, and weekend appointments.",
  },
  {
    number: "03",
    icon: CheckCircle,
    title: "We Fix It",
    description: "Our mechanic arrives fully equipped and repairs your vehicle on-site. Pay only when you're satisfied.",
  },
];

const HowItWorksSection = () => {
  return (
    <section className="py-24 md:py-32 relative overflow-hidden noise">
      {/* Background */}
      <div className="absolute inset-0 bg-card" />
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/5" />
      
      {/* Decorative Lines */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-20">
          <span className="text-primary font-semibold tracking-wider uppercase text-sm mb-4 block">Simple Process</span>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">
            How It Works
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            Getting your car fixed has never been easier. Three simple steps to professional repairs.
          </p>
        </div>
        
        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12 max-w-5xl mx-auto">
          {steps.map((step, index) => (
            <div key={step.number} className="relative group">
              {/* Connector Line (desktop) */}
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-16 left-[60%] w-[80%] h-px bg-gradient-to-r from-primary/50 via-primary/20 to-transparent" />
              )}
              
              <div className="relative">
                {/* Step Number (background) */}
                <div className="absolute -top-4 -left-2 font-display text-8xl font-black text-primary/10 select-none">
                  {step.number}
                </div>
                
                {/* Icon Circle */}
                <div className="relative w-20 h-20 rounded-2xl bg-gradient-to-br from-primary to-yellow-500 flex items-center justify-center mb-6 glow-sm group-hover:glow transition-all duration-500">
                  <step.icon className="w-9 h-9 text-primary-foreground" />
                </div>
                
                {/* Content */}
                <h3 className="font-display text-2xl font-bold text-foreground mb-3">{step.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
