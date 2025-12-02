import { Link } from "react-router-dom";
import { ArrowRight, Monitor, CircleDot, Settings, Zap, ArrowUpDown, Wrench, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import Layout from "@/components/layout/Layout";
import { BUSINESS_INFO, SERVICES } from "@/lib/constants";

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
      "Detailed report of findings",
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
      {/* Hero */}
      <section className="py-16 md:py-24 bg-card">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              Our Services
            </h1>
            <p className="text-lg text-muted-foreground">
              Professional mobile mechanic services brought directly to your location. 
              All work is carried out to the highest standards with transparent pricing.
            </p>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {SERVICES.map((service) => {
              const Icon = iconMap[service.icon];
              const details = serviceDetails[service.id];
              return (
                <div
                  key={service.id}
                  className="bg-card rounded-2xl p-6 md:p-8 border border-border"
                >
                  <div className="flex items-start gap-4 mb-6">
                    <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Icon className="w-7 h-7 text-primary" />
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-foreground mb-1">{service.name}</h2>
                      <p className="text-primary font-semibold text-lg">{service.price}</p>
                    </div>
                  </div>
                  
                  <p className="text-muted-foreground mb-6">{service.description}</p>
                  
                  <div className="mb-6">
                    <h4 className="text-sm font-semibold text-foreground mb-3 uppercase tracking-wide">
                      What's Included
                    </h4>
                    <ul className="space-y-2">
                      {details.includes.map((item, index) => (
                        <li key={index} className="flex items-center gap-2 text-muted-foreground">
                          <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="flex items-center justify-between pt-6 border-t border-border">
                    <span className="text-sm text-muted-foreground">
                      Est. duration: <span className="text-foreground font-medium">{details.duration}</span>
                    </span>
                    <Button asChild>
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
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Not Sure What You Need?
          </h2>
          <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
            Give us a call and we'll help diagnose the issue and recommend the right service for your vehicle.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" asChild>
              <Link to="/estimate">
                Get Free Quote
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <a href={`tel:${BUSINESS_INFO.phone}`}>
                <Phone className="w-5 h-5 mr-2" />
                Call {BUSINESS_INFO.phone}
              </a>
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Services;
