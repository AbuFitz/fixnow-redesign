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
    <section className="py-16 md:py-24 bg-background relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-primary/5 to-transparent" />
      
      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Image Side */}
          <div className="relative order-2 lg:order-1">
            <div className="relative">
              {/* Main image */}
              <div className="relative rounded-3xl overflow-hidden aspect-[4/5]">
                <img src={trustImage} alt="Mechanic working" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
              </div>
              
              {/* Floating card */}
              <div className="absolute -bottom-6 -right-6 md:right-6 p-6 rounded-2xl bg-card/80 backdrop-blur-xl border border-primary/20 shadow-2xl shadow-black/20">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                    <Check className="w-5 h-5 text-primary" />
                  </div>
                  <span className="font-display font-bold text-foreground">Fully Equipped</span>
                </div>
                <p className="text-sm text-muted-foreground">
                  We bring everything needed to your location
                </p>
              </div>
              
              {/* Glow effect */}
              <div className="absolute -inset-4 bg-gradient-to-r from-primary/10 via-transparent to-primary/5 rounded-3xl blur-2xl -z-10" />
            </div>
          </div>

          {/* Content Side */}
          <div className="order-1 lg:order-2">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20 mb-6">
              <div className="w-1.5 h-1.5 rounded-full bg-primary" />
              <span className="text-xs font-medium text-primary uppercase tracking-wider">Why Us</span>
            </div>
            
            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 leading-tight">
              Garage service,
              <br />
              <span className="text-muted-foreground">at your door</span>
            </h2>
            
            <p className="text-lg text-muted-foreground mb-12 max-w-md">
              We bring everything needed to diagnose and fix your car right where it's parked. No towing, no waiting rooms.
            </p>

            {/* Features Grid */}
            <div className="grid grid-cols-2 gap-4">
              {features.map((feature) => {
                const Icon = feature.icon;
                return (
                  <div 
                    key={feature.title} 
                    className="group p-5 rounded-2xl bg-card/50 border border-border/50 hover:border-primary/30 hover:bg-card transition-all duration-300"
                  >
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
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
