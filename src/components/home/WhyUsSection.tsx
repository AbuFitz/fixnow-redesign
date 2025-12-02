import { Link } from "react-router-dom";
import { Phone, ArrowRight, Clock, MapPin, CreditCard, Wrench } from "lucide-react";
import { Button } from "@/components/ui/button";
import { BUSINESS_INFO } from "@/lib/constants";
import toolsImage from "@/assets/tools.jpg";

const features = [
  {
    icon: MapPin,
    title: "We Come to You",
    description: "At your home, workplace, or wherever your car is. No need to visit a garage.",
  },
  {
    icon: Clock,
    title: "Flexible Hours",
    description: "Early mornings, evenings, and weekends available to fit around your schedule.",
  },
  {
    icon: CreditCard,
    title: "Honest Pricing",
    description: "We'll give you a clear quote before any work begins. No hidden fees.",
  },
  {
    icon: Wrench,
    title: "Equipped for the Job",
    description: "We bring the tools and parts needed to get your car sorted on the spot.",
  },
];

const WhyUsSection = () => {
  return (
    <section className="py-24 md:py-32 bg-background">
      <div className="container mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* Left - Content */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-[1px] bg-primary" />
              <span className="text-xs tracking-[0.3em] uppercase text-muted-foreground font-medium">
                Why us
              </span>
            </div>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-8">
              Convenience,<br />
              <span className="text-muted-foreground">without the hassle</span>
            </h2>
            
            <div className="space-y-8 mb-10">
              {features.map((feature, index) => (
                <div key={index} className="flex gap-5">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <feature.icon className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-display text-lg font-semibold text-foreground mb-1">
                      {feature.title}
                    </h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="rounded-full" asChild>
                <Link to="/estimate">
                  Get a Quote
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="rounded-full" asChild>
                <a href={`tel:${BUSINESS_INFO.phone}`}>
                  <Phone className="w-4 h-4 mr-2" />
                  Call Us
                </a>
              </Button>
            </div>
          </div>
          
          {/* Right - Image */}
          <div className="relative">
            <div className="rounded-3xl overflow-hidden">
              <img 
                src={toolsImage} 
                alt="Mechanic tools" 
                className="w-full h-auto object-cover aspect-[4/3]"
              />
            </div>
            {/* Floating card */}
            <div className="absolute -bottom-6 -left-6 md:left-auto md:-right-6 bg-card border border-border rounded-2xl p-6 max-w-[280px]">
              <p className="text-foreground font-medium mb-2">Available 7 days a week</p>
              <p className="text-muted-foreground text-sm">
                {BUSINESS_INFO.hours.weekday}<br />
                {BUSINESS_INFO.hours.weekend}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyUsSection;