import { Link } from "react-router-dom";
import { ArrowRight, Phone, CheckCircle2, Wrench, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Layout from "@/components/layout/Layout";
import { BUSINESS_INFO } from "@/lib/constants";
import { useState } from "react";

const Services = () => {
  const placeholderImage = "https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=800&auto=format&fit=crop";
  const interimServiceImage = "/generalrepairs.JPG";
  const fullServiceImage = "https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?w=800&auto=format&fit=crop";

  const allServices = [
    {
      name: "Basic Health Check",
      price: "£35",
      description: "Quick inspection of fluids, tyres, lights, and battery. Ideal before a long journey.",
      includes: ["Fluid level checks", "Tyre inspection", "Lights check", "Battery test"],
    },
    {
      name: "Mobile Diagnostic",
      price: "£45",
      description: "Full OBD diagnostic scan, visual inspection, and written report.",
      includes: ["Full OBD diagnostic scan", "Visual inspection", "Written report explaining findings", "Identify the problem clearly"],
    },
    {
      name: "Brake Fluid Change",
      price: "£55",
      description: "Full brake fluid flush and replacement.",
      includes: ["Full brake fluid flush", "Fresh brake fluid", "System bleed", "Brake test"],
    },
    {
      name: "Pre-Purchase Inspection",
      price: "£85",
      description: "Comprehensive 40-point inspection before you buy a used car.",
      includes: ["Comprehensive 40-point inspection", "Diagnostic scan", "Test drive where possible", "Detailed report with photos"],
    },
    {
      name: "Brake Pad Replacement",
      price: "From £90",
      note: "Front from £100, Rear from £90",
      description: "Quality brake pad fitting with inspection.",
      includes: ["Remove wheels", "Inspect discs and callipers", "Fit quality brake pads", "Brake test"],
    },
    {
      name: "Battery Replacement",
      price: "From £100",
      note: "Standard from £100, Stop-Start from £150",
      description: "Battery test and replacement service.",
      includes: ["Battery test", "Fitting new battery", "Terminal cleaning", "Proper disposal of old battery"],
    },
    {
      name: "Suspension Work",
      price: "Request Quote",
      description: "Suspension repairs and replacements. Tell us exactly what needs doing - coilovers, tie rods, control arms, bushings, or complete diagnosis.",
      includes: ["Suspension component replacement", "Coilover installation", "Tie rod replacement", "Control arm fitting", "Bush replacement", "Wheel alignment check"],
    },
    {
      name: "Brake Pads & Discs",
      price: "From £160",
      note: "Front from £180, Rear from £160",
      description: "Complete brake refresh including pads and discs.",
      includes: ["New brake pads", "New brake discs", "Complete installation", "Brake test"],
    },
  ];

  return (
    <Layout>
      {/* Hero with Image */}
      <section className="relative py-12 md:py-18 bg-gradient-to-b from-card via-surface-elevated to-card overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src={placeholderImage} 
            alt="" 
            className="w-full h-full object-cover grayscale opacity-50"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-card/20 via-card/40 to-card" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_hsl(var(--primary)/0.06),_transparent_70%)]" />
        
        <div className="container mx-auto px-6 md:px-12 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20 mb-6">
              <Wrench className="w-3.5 h-3.5 text-primary" />
              <span className="text-xs font-medium text-primary uppercase tracking-wider">Mobile Services</span>
            </div>
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">
              Our <span className="text-primary">Services</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-xl mx-auto">
              Professional mobile mechanic services at your location. From diagnostics to full servicing.
            </p>
          </div>
        </div>
      </section>

      {/* Service Packs */}
      <section className="pt-16 pb-12 md:pt-20 md:pb-16">
        <div className="container mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 max-w-6xl mx-auto">
            {/* Full Service */}
            <div className="group bg-gradient-to-br from-card via-card to-card/80 rounded-3xl overflow-hidden border-2 border-primary/40 hover:border-primary transition-all duration-500 hover:shadow-2xl hover:shadow-primary/20">
              <div className="relative h-48 md:h-64 overflow-hidden">
                <img 
                  src={fullServiceImage}
                  alt="Full Service"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 brightness-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-card via-card/50 to-transparent" />
                <div className="absolute top-4 right-4 bg-primary text-primary-foreground px-3 md:px-4 py-1.5 md:py-2 rounded-full font-bold text-base md:text-lg">
                  From £150
                </div>
                <div className="absolute top-4 left-4 bg-black text-[#FFD500] px-3 py-1.5 rounded-full font-semibold text-xs md:text-sm uppercase tracking-wider shadow-lg border-2 border-[#FFD500]">
                  Most Popular
                </div>
              </div>
              
              <div className="p-6 md:p-8">
                <h3 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-3">
                  Full Service
                </h3>
                <p className="text-sm md:text-base text-muted-foreground mb-3 md:mb-4">
                  Recommended annually or every 12,000 miles. Comprehensive service with complete inspection.
                </p>
                <p className="text-xs text-muted-foreground mb-6 p-2 md:p-3 bg-primary/5 rounded-lg border border-primary/10">
                  Petrol from £150 / Diesel from £180. Diesel includes fuel filter replacement.
                </p>
                
                <div className="space-y-2 md:space-y-3 mb-6">
                  {[
                    "Everything in interim service",
                    "Air filter replacement",
                    "Cabin filter replacement",
                    "50-point comprehensive inspection",
                    "Service book stamped",
                  ].map((item, i) => (
                    <div key={i} className="flex items-start gap-2 md:gap-3">
                      <CheckCircle2 className="w-4 h-4 md:w-5 md:h-5 text-primary mt-0.5 flex-shrink-0" />
                      <span className="text-sm md:text-base text-foreground">{item}</span>
                    </div>
                  ))}
                </div>
                
                <Button asChild className="w-full rounded-full h-11 md:h-12 font-semibold text-sm md:text-base">
                  <Link to="/estimate/full-service">
                    Book Full Service
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Link>
                </Button>
              </div>
            </div>

            {/* Interim Service */}
            <div className="group bg-gradient-to-br from-card via-card to-card/80 rounded-3xl overflow-hidden border border-border hover:border-primary/40 transition-all duration-500 hover:shadow-2xl">
              <div className="relative h-48 md:h-64 overflow-hidden">
                <img 
                  src={interimServiceImage}
                  alt="Interim Service"
                  className="w-full h-full object-cover object-[center_35%] group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-card via-card/50 to-transparent" />
                <div className="absolute top-4 right-4 bg-primary text-primary-foreground px-3 md:px-4 py-1.5 md:py-2 rounded-full font-bold text-base md:text-lg">
                  From £110
                </div>
              </div>
              
              <div className="p-6 md:p-8">
                <h3 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-3">
                  Interim Service
                </h3>
                <p className="text-sm md:text-base text-muted-foreground mb-6">
                  Recommended every 6 months or 6,000 miles. Essential maintenance to keep your vehicle running safely.
                </p>
                
                <div className="space-y-2 md:space-y-3 mb-6">
                  {[
                    "Engine oil and filter replacement",
                    "Fluid checks and top-ups",
                    "Tyre inspection",
                    "Brake check",
                    "30-point safety inspection",
                  ].map((item, i) => (
                    <div key={i} className="flex items-start gap-2 md:gap-3">
                      <CheckCircle2 className="w-4 h-4 md:w-5 md:h-5 text-primary mt-0.5 flex-shrink-0" />
                      <span className="text-sm md:text-base text-foreground">{item}</span>
                    </div>
                  ))}
                </div>
                
                <Button asChild className="w-full rounded-full h-11 md:h-12 font-semibold text-sm md:text-base">
                  <Link to="/estimate/interim-service">
                    Book Interim Service
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* All Services List */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-6 md:px-12">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-8 md:mb-12">
              <h2 className="font-display text-2xl md:text-3xl lg:text-4xl font-bold text-foreground mb-3">
                All <span className="text-primary">Services</span>
              </h2>
              <p className="text-sm md:text-base text-muted-foreground">Click for details and pricing</p>
            </div>

            <div className="bg-card rounded-2xl md:rounded-3xl border border-border overflow-hidden">
              <div className="divide-y divide-border">
                {allServices.map((service, i) => (
                  <Dialog key={i}>
                    <DialogTrigger asChild>
                      <button className="w-full px-4 md:px-6 py-3 md:py-4 hover:bg-primary/5 transition-colors text-left group">
                        <div className="flex items-center justify-between gap-3 md:gap-4">
                          <div className="flex-1 min-w-0">
                            <div className="text-sm md:text-base font-medium text-foreground truncate">{service.name}</div>
                          </div>
                          <div className="flex items-center gap-2 md:gap-3 flex-shrink-0">
                            <div className="text-sm md:text-base font-bold text-primary whitespace-nowrap">{service.price}</div>
                            <Info className="w-4 h-4 md:w-5 md:h-5 text-muted-foreground group-hover:text-primary transition-colors flex-shrink-0" />
                          </div>
                        </div>
                      </button>
                    </DialogTrigger>
                    
                    <DialogContent className="w-[90vw] sm:w-full max-w-[600px] md:max-w-2xl max-h-[90vh] overflow-y-auto overflow-x-hidden rounded-2xl md:rounded-3xl p-0">
                      <div className="p-4 md:p-6 lg:p-8 overflow-x-hidden w-full">
                        <DialogHeader className="mb-4 md:mb-6 text-center">
                          <DialogTitle className="text-xl md:text-2xl lg:text-3xl font-bold text-foreground mb-2 break-words">{service.name}</DialogTitle>
                          <div className="text-2xl md:text-3xl lg:text-4xl font-bold text-primary break-words">{service.price}</div>
                        </DialogHeader>
                        
                        <div className="space-y-4 md:space-y-6 overflow-x-hidden">
                          <p className="text-sm md:text-base text-muted-foreground leading-relaxed text-center break-words">{service.description}</p>
                          
                          {service.note && (
                            <div className="p-3 md:p-4 bg-muted/50 rounded-xl md:rounded-2xl border border-border text-center">
                              <p className="text-xs md:text-sm text-foreground font-medium break-words">{service.note}</p>
                            </div>
                          )}
                          
                          <div>
                            <p className="text-xs md:text-sm font-semibold text-foreground mb-3 md:mb-4 flex items-center justify-center gap-2">
                              <CheckCircle2 className="w-4 h-4 text-primary" />
                              What's Included
                            </p>
                            <div className="space-y-2 md:space-y-3">
                              {service.includes.map((item, idx) => (
                                <div key={idx} className="flex items-start gap-2 md:gap-3 text-sm md:text-base text-foreground">
                                  <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 md:mt-2.5 flex-shrink-0" />
                                  <span className="leading-relaxed text-left break-words flex-1">{item}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                          
                          <div className="pt-4 md:pt-6">
                            <Button asChild className="w-full rounded-full h-11 md:h-12 font-semibold text-sm md:text-base">
                              <Link to="/estimate">
                                Get Quote
                                <ArrowRight className="w-4 h-4 ml-2" />
                              </Link>
                            </Button>
                          </div>
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-12 md:py-16 bg-primary relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-64 md:w-96 h-64 md:h-96 bg-background rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-64 md:w-96 h-64 md:h-96 bg-background rounded-full blur-3xl" />
        </div>
        <div className="container mx-auto px-6 md:px-12 text-center relative z-10">
          <h2 className="font-display text-2xl md:text-4xl lg:text-5xl font-bold text-primary-foreground mb-3 md:mb-4 leading-tight drop-shadow-lg">
            Not sure what you need?
          </h2>
          <p className="text-sm md:text-lg lg:text-xl text-primary-foreground/90 mb-6 md:mb-8 max-w-2xl mx-auto font-medium">
            Give us a call or send an enquiry. We'll help figure out what's going on and what needs doing.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center max-w-md mx-auto">
            <Button size="lg" asChild className="group rounded-full h-11 md:h-14 px-6 md:px-8 text-sm md:text-lg font-semibold bg-background text-foreground hover:bg-background/90 hover:scale-[1.05] transition-all w-full sm:w-auto">
              <Link to="/estimate">
                Get a Quote
                <ArrowRight className="w-4 h-4 md:w-5 md:h-5 ml-2 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild className="rounded-full h-11 md:h-14 px-6 md:px-8 text-sm md:text-lg font-semibold border-2 border-primary-foreground/40 text-primary-foreground bg-transparent hover:bg-primary-foreground/15 hover:border-primary-foreground/70 hover:scale-[1.05] transition-all w-full sm:w-auto">
              <a href={`tel:${BUSINESS_INFO.phone}`}>
                <Phone className="w-4 h-4 md:w-5 md:h-5 mr-2" />
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