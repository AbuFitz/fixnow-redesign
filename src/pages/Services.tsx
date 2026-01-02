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

const serviceDetails: Record<string, { includes: string[]; note?: string }> = {
  "mobile-diagnostic": {
    includes: [
      "Full OBD diagnostic scan",
      "Visual inspection",
      "Written report explaining findings",
      "Identify the problem clearly",
    ],
  },
  "pre-purchase": {
    includes: [
      "Comprehensive 40-point inspection",
      "Diagnostic scan",
      "Test drive where possible",
      "Detailed report with photos",
    ],
  },
  "health-check": {
    includes: [
      "Fluid level checks",
      "Tyre inspection",
      "Lights check",
      "Battery test",
    ],
  },
  "interim-service": {
    includes: [
      "Engine oil and filter replacement",
      "Fluid checks and top-ups",
      "Tyre inspection",
      "Brake check",
      "30-point safety inspection",
    ],
    note: "Recommended every 6 months or 6,000 miles",
  },
  "full-service": {
    includes: [
      "Everything in interim service",
      "Air filter replacement",
      "Cabin filter replacement",
      "50-point comprehensive inspection",
      "Service book stamped",
    ],
    note: "From £150 (petrol) / From £180 (diesel). Diesel includes fuel filter.",
  },
  "brake-pads": {
    includes: [
      "Remove wheels",
      "Inspect discs and callipers",
      "Fit quality brake pads",
      "Brake test",
    ],
    note: "Front from £100, Rear from £90",
  },
  "brake-pads-discs": {
    includes: [
      "New brake pads",
      "New brake discs",
      "Complete installation",
      "Brake test",
    ],
    note: "Front from £180, Rear from £160. Recommended when discs are worn or scored.",
  },
  "brake-fluid": {
    includes: [
      "Full brake fluid flush",
      "Fresh brake fluid",
      "System bleed",
      "Brake test",
    ],
  },
  "battery": {
    includes: [
      "Battery test",
      "Fitting new battery",
      "Terminal cleaning",
      "Proper disposal of old battery",
    ],
    note: "Standard from £100, Stop-Start from £150",
  },
  "general": {
    includes: [
      "Oil changes",
      "Filter replacements",
      "Belt replacements",
      "Various mechanical repairs",
    ],
    note: "Labour rate: £45 per hour",
  },
};

const Services = () => {
  return (
    <Layout>
      {/* Hero with Image */}
      <section className="relative py-12 md:py-18 bg-gradient-to-b from-card via-surface to-card overflow-hidden">
        {/* Background image */}
        <div className="absolute inset-0">
          <img 
            src={engineDetailImg} 
            alt="" 
            className="w-full h-full object-cover opacity-60"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-card/50 via-card/70 to-card" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_hsl(var(--primary)/0.08),_transparent_50%)]" />
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
      <section className="pt-16 pb-16 md:pt-20 md:pb-24 bg-gradient-to-b from-background to-surface relative">
        {/* Subtle pattern */}
        <div className="absolute inset-0 opacity-[0.02]" style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, hsl(var(--primary)) 1px, transparent 0)`,
          backgroundSize: '40px 40px'
        }} />
        <div className="container mx-auto px-6 md:px-12 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {SERVICES.map((service) => {
              const Icon = iconMap[service.icon];
              const details = serviceDetails[service.id];
              return (
                <div
                  key={service.id}
                  className="bg-card rounded-2xl p-6 md:p-8 border border-border hover:border-primary/30 transition-all duration-300 hover:shadow-lg"
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
                  
                  {details && (
                    <>
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
                      
                      {details.note && (
                        <div className="mb-4 p-3 bg-primary/5 rounded-lg border border-primary/10">
                          <p className="text-xs text-muted-foreground">{details.note}</p>
                        </div>
                      )}
                    </>
                  )}
                  
                  <div className="flex items-center justify-between pt-6 border-t border-border">
                    <span className="text-sm text-muted-foreground">
                      {service.category}
                    </span>
                    <Button asChild className="rounded-full group" size="sm">
                      <Link to="/estimate">
                        Get Quote
                        <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
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
      <section className="py-16 md:py-24 bg-primary relative overflow-hidden">
        {/* Accent patterns */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-96 h-96 bg-background rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-background rounded-full blur-3xl" />
        </div>
        <div className="container mx-auto px-6 md:px-12 text-center relative z-10">
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-primary-foreground mb-3 sm:mb-4 leading-tight drop-shadow-lg px-4">
            Not sure what you need?
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-primary-foreground/90 mb-6 sm:mb-8 max-w-2xl mx-auto font-medium px-4">
            Give us a call or send an enquiry. We'll help figure out what's going on and what needs doing.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center px-4">
            <Button size="lg" asChild className="group rounded-full h-12 sm:h-14 md:h-16 px-6 sm:px-8 md:px-10 text-base sm:text-lg font-semibold bg-background text-foreground hover:bg-background/90 hover:scale-[1.05] transition-all w-full sm:w-auto">
              <Link to="/estimate">
                Get a Quote
                <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 ml-2 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild className="rounded-full h-12 sm:h-14 md:h-16 px-6 sm:px-8 md:px-10 text-base sm:text-lg font-semibold border-2 border-primary-foreground/40 text-primary-foreground bg-transparent hover:bg-primary-foreground/15 hover:border-primary-foreground/70 hover:scale-[1.05] transition-all w-full sm:w-auto">
              <a href={`tel:${BUSINESS_INFO.phone}`}>
                <Phone className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                {BUSINESS_INFO.phone}
              </a>
            </Button>
          </div>
        </div>
      </section>

      {/* Disclaimer */}
      <section className="py-8 bg-card border-t border-border">
        <div className="container mx-auto px-6 md:px-12">
          <p className="text-xs text-muted-foreground text-center max-w-4xl mx-auto">
            All prices shown are guides for standard vehicles. Final price depends on your specific vehicle and will be confirmed before booking. Prices include labour and parts unless otherwise stated.
          </p>
        </div>
      </section>
    </Layout>
  );
};

export default Services;