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
    <section className="py-12 sm:py-14 md:py-16 lg:py-20 bg-gradient-to-br from-background via-surface/50 to-card relative overflow-x-hidden">
      {/* Accent glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-primary/8 rounded-full blur-[150px]" />
      
      <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10 lg:gap-16 items-center">
          
          {/* Content Side - First on mobile, second on desktop */}
          <div className="lg:order-2">
            <span className="text-xs sm:text-sm font-semibold text-primary uppercase tracking-wider mb-2 sm:mb-3 block">Why Choose Us</span>
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-2 sm:mb-3 leading-tight">
              Quality Service,<br />
              <span className="text-muted-foreground">Personal Touch</span>
            </h2>

            {/* Features List */}
            <div className="space-y-3 sm:space-y-4 md:space-y-5 mt-5 sm:mt-6 md:mt-8">
              {features.map((feature) => {
                const Icon = feature.icon;
                return (
                  <div 
                    key={feature.title} 
                    className="flex items-start gap-2 sm:gap-3"
                  >
                    <div className="w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 rounded-full border border-primary/30 flex items-center justify-center flex-shrink-0">
                      <Icon className="w-3 h-3 sm:w-4 sm:h-4 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-display font-bold text-foreground text-sm sm:text-base md:text-lg">
                        {feature.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Image Side with Banner - Second on mobile, first on desktop */}
          <div className="relative lg:order-1 mt-8 lg:mt-0">
            {/* Main Image Container */}
            <div className="relative rounded-2xl overflow-visible aspect-[4/5] lg:rotate-2">
              <div className="rounded-2xl overflow-hidden shadow-2xl w-full h-full">
                <img src={trustImage} alt="Mechanic working" className="w-full h-full object-cover brightness-75" />
                <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent" />
              </div>

              {/* Floating Banner - Positioned relative to image */}
              <div className="absolute -bottom-6 -right-2 sm:-bottom-8 sm:-right-4 lg:-bottom-6 lg:-right-6 z-20 lg:-rotate-3">
                <div className="p-4 sm:p-5 rounded-xl bg-primary border-2 border-primary shadow-2xl">
                  <div className="flex items-center gap-2 sm:gap-3 mb-2">
                    <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg bg-black/10 flex items-center justify-center">
                      <Check className="w-3 h-3 sm:w-4 sm:h-4 text-black" />
                    </div>
                    <span className="font-display font-bold text-black text-sm sm:text-base">Fully Equipped</span>
                  </div>
                  <p className="text-xs sm:text-sm text-black/80">
                    We bring everything needed
                  </p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default WhyUsSection;