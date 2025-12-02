import { Clock, MapPin, Shield, Banknote, Check, Package } from "lucide-react";
import trustImage from "@/assets/trust-mechanic.jpg";

const features = [
  { icon: Clock, title: "Convenient Scheduling", description: "Early morning, evening, and weekend appointments available." },
  { icon: Banknote, title: "Transparent Pricing", description: "No hidden fees. Detailed quotes provided before work begins." },
  { icon: MapPin, title: "We Come To You", description: "We repair your vehicle at your home, office, or roadside." },
  { icon: Shield, title: "Quality Parts", description: "We use OE specification parts or better for all repairs." },
  { icon: Package, title: "BYO Parts Policy", description: "Bring your own parts — we'll fit them. Labour warranty only; parts at your risk." },
];

const WhyUsSection = () => {
  return (
    <section className="py-10 md:py-14 bg-background">
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
            <span className="text-sm font-medium text-primary uppercase tracking-wider mb-2 block">Why Choose Us</span>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-2 leading-tight">
              Quality Service,<br />
              <span className="text-muted-foreground">Personal Touch</span>
            </h2>

            {/* Features List */}
            <div className="space-y-3 md:space-y-4 mt-5">
              {features.map((feature) => {
                const Icon = feature.icon;
                return (
                  <div 
                    key={feature.title} 
                    className="flex items-start gap-3"
                  >
                    <div className="w-9 h-9 md:w-10 md:h-10 rounded-full border border-primary/30 flex items-center justify-center flex-shrink-0">
                      <Icon className="w-4 h-4 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-display font-bold text-foreground text-base md:text-lg">
                        {feature.title}
                      </h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {feature.description}
                      </p>
                    </div>
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