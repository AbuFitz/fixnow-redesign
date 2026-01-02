import { Link } from "react-router-dom";
import { ArrowRight, Monitor, Settings, CircleDot, Zap, Wrench, Phone, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Layout from "@/components/layout/Layout";
import { BUSINESS_INFO } from "@/lib/constants";
import engineDetailImg from "@/assets/engine-detail.jpg";
import { useState } from "react";

const serviceCategories = [
  {
    id: "diagnostics",
    name: "Diagnostic Services",
    icon: Monitor,
    description: "Find out what's wrong with your vehicle",
    color: "from-blue-500/10 to-cyan-500/10",
    borderColor: "border-blue-500/20",
    iconColor: "text-blue-500",
    services: [
      {
        name: "Mobile Diagnostic",
        price: "From £45",
        description: "Full OBD diagnostic scan, visual inspection, and written report.",
        includes: [
          "Full OBD diagnostic scan",
          "Visual inspection",
          "Written report explaining findings",
          "Identify the problem clearly",
        ],
      },
      {
        name: "Pre-Purchase Inspection",
        price: "From £85",
        description: "Comprehensive 40-point inspection before you buy a used car.",
        includes: [
          "Comprehensive 40-point inspection",
          "Diagnostic scan",
          "Test drive where possible",
          "Detailed report with photos",
        ],
      },
      {
        name: "Basic Health Check",
        price: "From £35",
        description: "Quick inspection ideal before a long journey.",
        includes: [
          "Fluid level checks",
          "Tyre inspection",
          "Lights check",
          "Battery test",
        ],
      },
    ],
  },
  {
    id: "servicing",
    name: "Servicing",
    icon: Settings,
    description: "Keep your vehicle running smoothly",
    color: "from-green-500/10 to-emerald-500/10",
    borderColor: "border-green-500/20",
    iconColor: "text-green-500",
    services: [
      {
        name: "Interim Service",
        price: "From £110",
        description: "Recommended every 6 months or 6,000 miles.",
        includes: [
          "Engine oil and filter replacement",
          "Fluid checks and top-ups",
          "Tyre inspection",
          "Brake check",
          "30-point safety inspection",
        ],
      },
      {
        name: "Full Service",
        price: "From £150",
        description: "Annual service with comprehensive inspection.",
        note: "Petrol from £150 / Diesel from £180. Diesel includes fuel filter.",
        includes: [
          "Everything in interim service",
          "Air filter replacement",
          "Cabin filter replacement",
          "50-point comprehensive inspection",
          "Service book stamped",
        ],
      },
    ],
  },
  {
    id: "brakes",
    name: "Brake Services",
    icon: CircleDot,
    description: "Keep you safe on the road",
    color: "from-red-500/10 to-orange-500/10",
    borderColor: "border-red-500/20",
    iconColor: "text-red-500",
    services: [
      {
        name: "Brake Pad Replacement",
        price: "From £90",
        description: "Quality brake pad fitting with inspection.",
        note: "Front from £100, Rear from £90",
        includes: [
          "Remove wheels",
          "Inspect discs and callipers",
          "Fit quality brake pads",
          "Brake test",
        ],
      },
      {
        name: "Brake Pads and Discs",
        price: "From £160",
        description: "Complete brake refresh including pads and discs.",
        note: "Front from £180, Rear from £160. Recommended when discs are worn or scored.",
        includes: [
          "New brake pads",
          "New brake discs",
          "Complete installation",
          "Brake test",
        ],
      },
      {
        name: "Brake Fluid Change",
        price: "£55",
        description: "Full brake fluid flush and replacement.",
        includes: [
          "Full brake fluid flush",
          "Fresh brake fluid",
          "System bleed",
          "Brake test",
        ],
      },
    ],
  },
  {
    id: "electrical",
    name: "Electrical & Battery",
    icon: Zap,
    description: "Battery and electrical solutions",
    color: "from-yellow-500/10 to-amber-500/10",
    borderColor: "border-yellow-500/20",
    iconColor: "text-yellow-500",
    services: [
      {
        name: "Battery Replacement",
        price: "From £100",
        description: "Battery test and replacement service.",
        note: "Standard from £100, Stop-Start from £150",
        includes: [
          "Battery test",
          "Fitting new battery",
          "Terminal cleaning",
          "Proper disposal of old battery",
        ],
      },
    ],
  },
  {
    id: "general",
    name: "General Repairs",
    icon: Wrench,
    description: "All types of mechanical work",
    color: "from-purple-500/10 to-pink-500/10",
    borderColor: "border-purple-500/20",
    iconColor: "text-purple-500",
    services: [
      {
        name: "General Repairs",
        price: "Quote",
        description: "We handle all types of mechanical work.",
        note: "Labour rate: £45 per hour",
        includes: [
          "Oil changes",
          "Filter replacements",
          "Belt replacements",
          "Various mechanical repairs",
        ],
      },
    ],
  },
];

const ServiceDialog = ({ category }: { category: typeof serviceCategories[0] }) => {
  const Icon = category.icon;
  
  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="group text-left w-full bg-gradient-to-br from-card via-card to-card/80 rounded-3xl p-8 border border-border/50 hover:border-primary/40 transition-all duration-500 hover:shadow-2xl hover:shadow-primary/10 hover:-translate-y-1 relative overflow-hidden">
          {/* Decorative gradient overlay */}
          <div className={`absolute inset-0 bg-gradient-to-br ${category.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
          
          {/* Content */}
          <div className="relative z-10">
            <div className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${category.color} border-2 ${category.borderColor} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500`}>
              <Icon className={`w-10 h-10 ${category.iconColor}`} />
            </div>
            
            <h3 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors duration-300">
              {category.name}
            </h3>
            <p className="text-muted-foreground text-base mb-6">{category.description}</p>
            
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-primary">
                {category.services.length} {category.services.length === 1 ? 'Service' : 'Services'}
              </span>
              <div className="flex items-center gap-2 text-primary font-semibold group-hover:gap-3 transition-all">
                <span className="text-sm">View Details</span>
                <ArrowRight className="w-5 h-5" />
              </div>
            </div>
          </div>
        </button>
      </DialogTrigger>
      
      <DialogContent className="max-w-4xl max-h-[85vh] overflow-hidden p-0">
        {/* Header with gradient */}
        <div className={`bg-gradient-to-br ${category.color} border-b ${category.borderColor} px-6 py-8`}>
          <div className="flex items-center gap-4">
            <div className={`w-16 h-16 rounded-xl bg-background/10 backdrop-blur-sm border ${category.borderColor} flex items-center justify-center`}>
              <Icon className={`w-8 h-8 ${category.iconColor}`} />
            </div>
            <div>
              <h2 className="font-display text-3xl font-bold text-foreground">{category.name}</h2>
              <p className="text-muted-foreground mt-1">{category.description}</p>
            </div>
          </div>
        </div>
        
        {/* Scrollable content */}
        <div className="overflow-y-auto max-h-[calc(85vh-180px)] px-6 py-6">
          <div className="space-y-4">
            {category.services.map((service, index) => (
              <div key={index} className="group bg-gradient-to-br from-card to-card/50 rounded-2xl p-6 border border-border/50 hover:border-primary/30 transition-all duration-300 hover:shadow-lg">
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-4">
                  <div className="flex-1">
                    <h4 className="font-display text-xl md:text-2xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                      {service.name}
                    </h4>
                    <p className="text-sm text-muted-foreground">{service.description}</p>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <div className="text-2xl font-bold text-primary">{service.price}</div>
                  </div>
                </div>
                
                {service.note && (
                  <div className="mb-4 p-3 bg-primary/5 rounded-xl border border-primary/10">
                    <p className="text-xs text-muted-foreground flex items-start gap-2">
                      <span className="text-primary">ℹ</span>
                      {service.note}
                    </p>
                  </div>
                )}
                
                <div className="border-t border-border/50 pt-4">
                  <p className="text-xs font-semibold text-muted-foreground mb-3 uppercase tracking-wider flex items-center gap-2">
                    <CheckCircle2 className="w-3 h-3 text-primary" />
                    What's Included
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-2">
                    {service.includes.map((item, i) => (
                      <div key={i} className="flex items-start gap-2 text-sm text-foreground">
                        <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Footer with actions */}
        <div className="border-t border-border px-6 py-4 bg-card/50">
          <div className="flex flex-col sm:flex-row gap-3">
            <Button asChild className="flex-1 rounded-full h-12 font-semibold">
              <Link to="/estimate">
                <span>Get a Quote</span>
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
            <Button variant="outline" asChild className="flex-1 rounded-full h-12 font-semibold">
              <a href={`tel:${BUSINESS_INFO.phone}`}>
                <Phone className="w-4 h-4 mr-2" />
                <span>Call {BUSINESS_INFO.phone}</span>
              </a>
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

const Services = () => {
  return (
    <Layout>
      {/* Hero with Image */}
      <section className="relative py-16 md:py-20 bg-gradient-to-b from-card via-surface to-card overflow-hidden">
        {/* Background image */}
        <div className="absolute inset-0">
          <img 
            src={engineDetailImg} 
            alt="" 
            className="w-full h-full object-cover opacity-40"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-card/80 via-card/90 to-card" />
        </div>
        
        <div className="container mx-auto px-4 sm:px-6 md:px-12 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 backdrop-blur-sm border border-primary/20 mb-6">
              <Wrench className="w-4 h-4 text-primary" />
              <span className="text-xs font-semibold text-primary uppercase tracking-wider">Professional Mobile Services</span>
            </div>
            <h1 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-foreground mb-6 leading-tight">
              Our <span className="text-primary">Services</span>
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Choose a category below to explore our services. Each card opens a detailed view with pricing and what's included.
            </p>
          </div>
        </div>
      </section>

      {/* Service Categories Grid */}
      <section className="py-12 sm:py-16 md:py-20 bg-gradient-to-b from-background via-surface to-background relative">
        {/* Decorative elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 -left-20 w-72 h-72 bg-primary/5 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        </div>
        
        <div className="container mx-auto px-4 sm:px-6 md:px-12 relative z-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 max-w-7xl mx-auto">
            {serviceCategories.map((category) => (
              <ServiceDialog key={category.id} category={category} />
            ))}
          </div>
        </div>
      </section>

      {/* Trust Badges */}
      <section className="py-16 md:py-20 bg-gradient-to-br from-card via-surface-elevated to-card border-y border-border relative overflow-hidden">
        {/* Decorative background */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-0 left-1/4 w-64 h-64 bg-primary/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-primary/10 rounded-full blur-3xl" />
        </div>
        
        <div className="container mx-auto px-4 sm:px-6 md:px-12 relative z-10">
          <div className="text-center mb-12">
            <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-3">
              Why Choose <span className="text-primary">FixNow</span>
            </h2>
            <p className="text-muted-foreground">The mobile mechanic you can trust</p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {[
              {
                title: "Transparent Pricing",
                description: "Exact cost confirmed before we start",
              },
              {
                title: "Quality Parts",
                description: "Meet or exceed manufacturer standards",
              },
              {
                title: "30-Day Guarantee",
                description: "On all workmanship",
              },
              {
                title: "We Come to You",
                description: "At your home or workplace",
              },
            ].map((item, index) => (
              <div key={index} className="group bg-gradient-to-br from-background to-background/50 rounded-2xl p-6 border border-border/50 hover:border-primary/30 transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
                <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <CheckCircle2 className="w-7 h-7 text-primary" />
                </div>
                <h3 className="font-display text-lg font-bold text-foreground mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{item.description}</p>
              </div>
            ))}
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