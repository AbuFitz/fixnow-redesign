import { Clock, MapPin, Shield, Banknote } from "lucide-react";
import trustImage from "@/assets/trust-mechanic.jpg";

const features = [
  {
    icon: MapPin,
    title: "We Come To You",
    description: "No need to visit a garage",
  },
  {
    icon: Clock,
    title: "Same Day Service",
    description: "When you need it",
  },
  {
    icon: Banknote,
    title: "Honest Pricing",
    description: "No hidden fees",
  },
  {
    icon: Shield,
    title: "Quality Parts",
    description: "OE or equivalent",
  },
];

const WhyUsSection = () => {
  return (
    <section className="py-20 md:py-28 bg-background">
      <div className="container mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Image Side */}
          <div className="relative order-2 lg:order-1">
            <div className="relative rounded-2xl overflow-hidden aspect-[4/5] lg:aspect-[3/4]">
              <img
                src={trustImage}
                alt="Mechanic working"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />
            </div>
            
            {/* Floating stat card */}
            <div className="absolute -bottom-6 -right-6 md:right-8 bg-card border border-border rounded-2xl p-5 shadow-xl">
              <div className="text-3xl font-display font-bold text-primary mb-1">
                SE London
              </div>
              <p className="text-sm text-muted-foreground">Coverage Area</p>
            </div>
          </div>

          {/* Content Side */}
          <div className="order-1 lg:order-2">
            <span className="text-primary text-sm font-medium tracking-wider uppercase mb-3 block">
              Why us
            </span>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-6">
              Garage service,<br />
              <span className="text-muted-foreground">at your door</span>
            </h2>
            <p className="text-muted-foreground mb-10 max-w-md">
              We bring everything needed to diagnose and fix your car right where it's parked. No towing, no waiting rooms.
            </p>

            {/* Features Grid */}
            <div className="grid grid-cols-2 gap-6">
              {features.map((feature) => {
                const Icon = feature.icon;
                return (
                  <div key={feature.title} className="group">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-3 group-hover:bg-primary/20 transition-colors">
                      <Icon className="w-5 h-5 text-primary" />
                    </div>
                    <h3 className="font-display font-semibold text-foreground mb-1">
                      {feature.title}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {feature.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyUsSection;
