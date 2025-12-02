import { Link } from "react-router-dom";
import { Phone, ArrowRight, Wrench, Clock, Shield, MapPin, Award, ThumbsUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { BUSINESS_INFO } from "@/lib/constants";
import toolsImage from "@/assets/tools.jpg";

const features = [
  {
    icon: Award,
    title: "Experienced & Qualified",
    description: "Fully trained mechanics with years of hands-on experience across all makes and models.",
  },
  {
    icon: Clock,
    title: "Convenient Scheduling",
    description: "Early morning, evening, and weekend appointments available to fit your busy life.",
  },
  {
    icon: Shield,
    title: "Transparent Pricing",
    description: "No hidden fees or surprises. Detailed quotes provided before any work begins.",
  },
  {
    icon: MapPin,
    title: "We Come To You",
    description: "Save time and hassle. We repair your vehicle at your home, office, or roadside.",
  },
];

const WhyUsSection = () => {
  return (
    <section className="py-24 md:py-32 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-background" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left - Content */}
          <div>
            <span className="text-primary font-semibold tracking-wider uppercase text-sm mb-4 block">Why Choose Us</span>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-8 leading-tight">
              Professional Service,<br />
              <span className="text-muted-foreground">Personal Touch</span>
            </h2>
            
            <div className="space-y-6">
              {features.map((feature, index) => (
                <div key={index} className="flex gap-5 group">
                  <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0 group-hover:bg-primary/20 transition-colors">
                    <feature.icon className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-display text-lg font-semibold text-foreground mb-1">{feature.title}</h3>
                    <p className="text-muted-foreground">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Right - Image & CTA Card */}
          <div className="relative">
            {/* Background Image */}
            <div className="relative rounded-3xl overflow-hidden aspect-[4/3]">
              <img 
                src={toolsImage} 
                alt="Professional mechanic tools" 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
            </div>
            
            {/* Floating CTA Card */}
            <div className="absolute -bottom-8 left-4 right-4 lg:left-8 lg:right-8">
              <div className="glass-strong rounded-2xl p-6 lg:p-8 glow">
                <h3 className="font-display text-2xl font-bold text-foreground mb-3">Ready to get started?</h3>
                <p className="text-muted-foreground mb-6">
                  Get a free, no-obligation quote for your vehicle repair or servicing needs.
                </p>
                <div className="flex flex-col sm:flex-row gap-3">
                  <Button size="lg" className="flex-1 rounded-xl" asChild>
                    <Link to="/estimate">
                      Get Free Quote
                      <ArrowRight className="w-5 h-5 ml-2" />
                    </Link>
                  </Button>
                  <Button size="lg" variant="outline" className="flex-1 rounded-xl" asChild>
                    <a href={`tel:${BUSINESS_INFO.phone}`}>
                      <Phone className="w-5 h-5 mr-2" />
                      Call Now
                    </a>
                  </Button>
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
