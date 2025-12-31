import { MessageSquare, Phone, Wrench } from "lucide-react";

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
    <section className="py-12 md:py-16 bg-background">
      <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-12">
        {/* Header */}
        <div className="text-center mb-8 md:mb-12">
          <h2 className="font-display text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-2">
            How it works
          </h2>
          <p className="text-sm sm:text-base md:text-lg lg:text-xl text-muted-foreground">
            Simple, straightforward, no hassle
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 md:gap-8 max-w-4xl mx-auto">
          {steps.map((step) => {
            const Icon = step.icon;
            return (
              <div key={step.number} className="text-center">
                {/* Icon */}
                <div className="flex justify-center mb-4">
                  <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-primary/10 flex items-center justify-center">
                    <Icon className="w-7 h-7 md:w-9 md:h-9 text-primary" />
                  </div>
                </div>

                {/* Content */}
                <h3 className="font-display text-lg md:text-xl font-bold text-foreground mb-2">
                  {step.title}
                </h3>
                <p className="text-sm md:text-base text-muted-foreground">
                  {step.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
