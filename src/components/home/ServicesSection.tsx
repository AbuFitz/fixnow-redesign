import { Link } from "react-router-dom";
import { ArrowRight, Monitor, CircleDot, Settings, Zap, ArrowUpDown, Wrench } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SERVICES } from "@/lib/constants";
import mechanicImage from "@/assets/mechanic-working.jpg";
import engineImage from "@/assets/engine-detail.jpg";

const iconMap: Record<string, React.ElementType> = {
  Monitor,
  CircleDot,
  Settings,
  Zap,
  ArrowUpDown,
  Wrench,
};

const ServicesSection = () => {
  return (
    <section className="py-24 md:py-32 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-card/50 to-background" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-16">
          <div>
            <span className="text-primary font-semibold tracking-wider uppercase text-sm mb-4 block">What We Do</span>
            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight">
              Expert Services,<br />
              <span className="text-muted-foreground">At Your Location</span>
            </h2>
          </div>
          <p className="text-muted-foreground max-w-md text-lg">
            From diagnostics to full servicing, we handle everything at your doorstep with professional-grade equipment.
          </p>
        </div>
        
        {/* Services Grid with Featured Image */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Featured Image Card */}
          <div className="lg:col-span-5 lg:row-span-2 relative group overflow-hidden rounded-3xl">
            <img 
              src={mechanicImage} 
              alt="Expert mechanic at work" 
              className="w-full h-full object-cover min-h-[400px] transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-8">
              <h3 className="font-display text-2xl font-bold text-foreground mb-2">Professional Grade</h3>
              <p className="text-muted-foreground">Using the same tools and diagnostics as main dealers</p>
            </div>
          </div>
          
          {/* Service Cards */}
          {SERVICES.slice(0, 4).map((service, index) => {
            const Icon = iconMap[service.icon];
            return (
              <div
                key={service.id}
                className="lg:col-span-3 md:col-span-1 group"
              >
                <div className="h-full p-6 rounded-2xl border-gradient bg-card/50 backdrop-blur-sm hover:bg-card transition-all duration-300 surface-shine">
                  <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-5 group-hover:bg-primary/20 transition-colors">
                    <Icon className="w-7 h-7 text-primary" />
                  </div>
                  <h3 className="font-display text-xl font-semibold text-foreground mb-2">{service.name}</h3>
                  <p className="text-muted-foreground text-sm mb-4 line-clamp-2">{service.description}</p>
                  <p className="text-primary font-bold text-lg">{service.price}</p>
                </div>
              </div>
            );
          })}
          
          {/* Bottom Row - Remaining Services */}
          <div className="lg:col-span-4 relative group overflow-hidden rounded-3xl">
            <img 
              src={engineImage} 
              alt="Engine diagnostics" 
              className="w-full h-full object-cover min-h-[200px] transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-background/90 via-background/70 to-transparent" />
            <div className="absolute inset-0 p-8 flex flex-col justify-center">
              <h3 className="font-display text-xl font-bold text-foreground mb-2">All Makes & Models</h3>
              <p className="text-muted-foreground text-sm">Specialists in European, Japanese & American vehicles</p>
            </div>
          </div>
          
          {SERVICES.slice(4, 6).map((service) => {
            const Icon = iconMap[service.icon];
            return (
              <div
                key={service.id}
                className="lg:col-span-3 group"
              >
                <div className="h-full p-6 rounded-2xl border-gradient bg-card/50 backdrop-blur-sm hover:bg-card transition-all duration-300 surface-shine">
                  <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-5 group-hover:bg-primary/20 transition-colors">
                    <Icon className="w-7 h-7 text-primary" />
                  </div>
                  <h3 className="font-display text-xl font-semibold text-foreground mb-2">{service.name}</h3>
                  <p className="text-muted-foreground text-sm mb-4 line-clamp-2">{service.description}</p>
                  <p className="text-primary font-bold text-lg">{service.price}</p>
                </div>
              </div>
            );
          })}
        </div>
        
        {/* CTA */}
        <div className="text-center mt-12">
          <Button variant="outline" size="lg" asChild className="rounded-xl">
            <Link to="/services">
              View All Services
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
