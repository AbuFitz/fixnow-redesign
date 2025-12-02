import { Clock, MapPin, Shield, Banknote, Check } from "lucide-react";
import trustImage from "@/assets/trust-mechanic.jpg";

const features = [
  { icon: MapPin, title: "We Come To You", description: "Home, work, or roadside" },
  { icon: Clock, title: "Open 7 Days", description: "Available all week" },
  { icon: Banknote, title: "Honest Pricing", description: "No hidden fees, ever" },
  { icon: Shield, title: "Quality Parts", description: "OE spec or better" },
];

const WhyUsSection = () => {
  return (
    <section className="py-16 md:py-20 bg-background">
      <div className="container mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          {/* Image Side */}
          <div className="relative order-2 lg:order-1">
            <div className="relative rounded-2xl overflow-hidden aspect-[4/5]">
              <img src={trustImage} alt="Mechanic working" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent" />
            </div>
            
            {/* Floating card */}
            <div className="absolute -bottom-4 right-4 md:right-8 p-5 rounded-xl bg-card border border-border/50">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Check className="w-4 h-4 text-primary" />
                </div>
                <span className="font-display font-bold text-foreground">Fully Equipped</span>
              </div>
              <p className="text-sm text-muted-foreground">
                We bring everything needed
              </p>
            </div>
          </div>

          {/* Content Side */}
          <div className="order-1 lg:order-2">
            <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4 leading-tight">
              Garage service,
              <br />
              <span className="text-muted-foreground">at your door</span>
            </h2>
            
            <p className="text-lg text-muted-foreground mb-10 max-w-md">
              We bring everything needed to diagnose and fix your car right where it's parked. No towing, no waiting rooms.
            </p>

            {/* Features Grid */}
            <div className="grid grid-cols-2 gap-3">
              {features.map((feature) => {
                const Icon = feature.icon;
                return (
                  <div 
                    key={feature.title} 
                    className="p-4 rounded-xl bg-card border border-border/50"
                  >
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-3">
                      <Icon className="w-5 h-5 text-primary" />
                    </div>
                    <h3 className="font-display font-semibold text-foreground mb-0.5">
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