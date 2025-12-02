import { Link } from "react-router-dom";
import { ArrowRight, Monitor, CircleDot, Settings, Zap, ArrowUpDown, Wrench, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import Layout from "@/components/layout/Layout";
import { BUSINESS_INFO, SERVICES } from "@/lib/constants";
import engineDetailImg from "@/assets/engine-detail.jpg";

const iconMap: Record<string, React.ElementType> = {
  Monitor,
  CircleDot,
  Settings,
  Zap,
  ArrowUpDown,
  Wrench,
};

const serviceDetails: Record<string, { includes: string[]; duration: string }> = {
  diagnostics: {
    includes: [
      "Full engine diagnostic scan",
      "Fault code reading & clearing",
      "System health check",
      "Report of findings",
    ],
    duration: "30-60 mins",
  },
  brakes: {
    includes: [
      "Brake pad replacement",
      "Brake disc replacement",
      "Brake fluid check/top-up",
      "Brake system inspection",
    ],
    duration: "1-2 hours",
  },
  servicing: {
    includes: [
      "Oil & filter change",
      "Air filter replacement",
      "Fluid top-ups",
      "Multi-point inspection",
    ],
    duration: "1-2 hours",
  },
  electrical: {
    includes: [
      "Battery testing & replacement",
      "Alternator repairs",
      "Starter motor repairs",
      "Electrical fault finding",
    ],
    duration: "1-3 hours",
  },
  suspension: {
    includes: [
      "Shock absorber replacement",
      "Spring replacement",
      "Suspension bush replacement",
      "Steering components",
    ],
    duration: "2-4 hours",
  },
  general: {
    includes: [
      "Oil changes",
      "Filter replacements",
      "Belt replacements",
      "General mechanical repairs",
    ],
    duration: "Varies",
  },
};

const Services = () => {
  return (
    <Layout>
      {/* Hero with Image */}
      <section className="relative py-16 md:py-24 bg-card overflow-hidden">
        {/* Background image */}
        <div className="absolute inset-0">
          <img 
            src={engineDetailImg} 
            alt="" 
            className="w-full h-full object-cover opacity-60"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-card/40 via-card/60 to-card" />
        </div>
        
        <div className="container mx-auto px-6 md:px-12 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20 mb-6">
              <Wrench className="w-3.5 h-3.5 text-primary" />
              <span className="text-xs font-medium text-primary uppercase tracking-wider">What we do</span>
            </div>
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">
              Our <span className="text-primary">Services</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-xl mx-auto">
              Mobile mechanic services at your location. We come to you with the tools and parts to get the job done.
            </p>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {SERVICES.map((service) => {
              const Icon = iconMap[service.icon];
              const details = serviceDetails[service.id];
              return (
                <div
                  key={service.id}
                  className="bg-card rounded-2xl p-6 md:p-8 border border-border"
                >
                  <div className="flex items-start gap-4 mb-6">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Icon className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h2 className="font-display text-xl font-semibold text-foreground mb-1">{service.name}</h2>
                      <p className="text-primary font-semibold">{service.price}</p>
                    </div>
                  </div>
                  
                  <p className="text-muted-foreground mb-6 text-sm">{service.description}</p>
                  
                  <div className="mb-6">
                    <h4 className="text-xs font-medium text-muted-foreground mb-3 uppercase tracking-wider">
                      What's Included
                    </h4>
                    <ul className="space-y-2">
                      {details.includes.map((item, index) => (
                        <li key={index} className="flex items-center gap-2 text-foreground text-sm">
                          <div className="w-1 h-1 rounded-full bg-primary" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="flex items-center justify-between pt-6 border-t border-border">
                    <span className="text-sm text-muted-foreground">
                      ~{details.duration}
                    </span>
                    <Button asChild className="rounded-full" size="sm">
                      <Link to="/estimate">
                        Get Quote
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Link>
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 md:py-24 bg-card">
        <div className="container mx-auto px-6 md:px-12 text-center">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
            Not sure what you need?
          </h2>
          <p className="text-muted-foreground mb-8 max-w-lg mx-auto">
            Give us a call or send an enquiry. We'll help figure out what's going on and what needs doing.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" asChild className="rounded-full">
              <Link to="/estimate">
                Get a Quote
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild className="rounded-full">
              <a href={`tel:${BUSINESS_INFO.phone}`}>
                <Phone className="w-4 h-4 mr-2" />
                {BUSINESS_INFO.phone}
              </a>
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Services;