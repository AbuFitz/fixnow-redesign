import { Link } from "react-router-dom";
import { ArrowRight, Phone, CheckCircle2, Wrench } from "lucide-react";
import { Button } from "@/components/ui/button";
import Layout from "@/components/layout/Layout";
import { BUSINESS_INFO } from "@/lib/constants";

const Services = () => {
  // Placeholder image - you can replace these with actual service images
  const placeholderImage = "https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=800&auto=format&fit=crop";
  const interimServiceImage = "https://images.unsplash.com/photo-1625047509168-a7026f36de04?w=800&auto=format&fit=crop";
  const fullServiceImage = "https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?w=800&auto=format&fit=crop";

  return (
    <Layout>
      {/* Hero with Image */}
      <section className="relative py-12 md:py-18 bg-gradient-to-b from-card via-surface-elevated to-card overflow-hidden">
        {/* Map/Background */}
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

      {/* Featured Services - Servicing */}
      <section className="pt-16 pb-8 md:pt-20 md:pb-12">
        <div className="container mx-auto px-6 md:px-12">
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-3">
              <span className="text-primary">Servicing</span>
            </h2>
            <p className="text-muted-foreground">Keep your vehicle running smoothly with our service packages</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {/* Interim Service */}
            <div className="group bg-gradient-to-br from-card via-card to-card/80 rounded-3xl overflow-hidden border border-border hover:border-primary/40 transition-all duration-500 hover:shadow-2xl">
              <div className="relative h-64 overflow-hidden">
                <img 
                  src={interimServiceImage}
                  alt="Interim Service"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-card via-card/50 to-transparent" />
                <div className="absolute top-4 right-4 bg-primary text-primary-foreground px-4 py-2 rounded-full font-bold text-lg">
                  From £110
                </div>
              </div>
              
              <div className="p-8">
                <h3 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-3">
                  Interim Service
                </h3>
                <p className="text-muted-foreground mb-6">
                  Recommended every 6 months or 6,000 miles. Essential maintenance to keep your vehicle running safely.
                </p>
                
                <div className="space-y-3 mb-6">
                  {[
                    "Engine oil and filter replacement",
                    "Fluid checks and top-ups",
                    "Tyre inspection",
                    "Brake check",
                    "30-point safety inspection",
                  ].map((item, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                      <span className="text-foreground">{item}</span>
                    </div>
                  ))}
                </div>
                
                <Button asChild className="w-full rounded-full h-12 font-semibold">
                  <Link to="/estimate">
                    Get a Quote
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Link>
                </Button>
              </div>
            </div>

            {/* Full Service */}
            <div className="group bg-gradient-to-br from-card via-card to-card/80 rounded-3xl overflow-hidden border-2 border-primary/40 hover:border-primary transition-all duration-500 hover:shadow-2xl hover:shadow-primary/20">
              <div className="relative h-64 overflow-hidden">
                <img 
                  src={fullServiceImage}
                  alt="Full Service"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 brightness-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-card via-card/50 to-transparent" />
                <div className="absolute top-4 right-4 bg-primary text-primary-foreground px-4 py-2 rounded-full font-bold text-lg">
                  From £150
                </div>
                <div className="absolute top-4 left-4 bg-foreground text-background px-3 py-1 rounded-full font-semibold text-sm uppercase tracking-wider">
                  Most Popular
                </div>
              </div>
              
              <div className="p-8">
                <h3 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-3">
                  Full Service
                </h3>
                <p className="text-muted-foreground mb-4">
                  Recommended annually or every 12,000 miles. Comprehensive service with complete inspection.
                </p>
                <p className="text-xs text-muted-foreground mb-6 p-3 bg-primary/5 rounded-lg border border-primary/10">
                  Petrol from £150 / Diesel from £180. Diesel includes fuel filter replacement.
                </p>
                
                <div className="space-y-3 mb-6">
                  {[
                    "Everything in interim service",
                    "Air filter replacement",
                    "Cabin filter replacement",
                    "50-point comprehensive inspection",
                    "Service book stamped",
                  ].map((item, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                      <span className="text-foreground">{item}</span>
                    </div>
                  ))}
                </div>
                
                <Button asChild className="w-full rounded-full h-12 font-semibold">
                  <Link to="/estimate">
                    Get a Quote
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Other Services Grid */}
      <section className="py-12 md:py-16 bg-gradient-to-b from-surface-elevated to-background">
        <div className="container mx-auto px-6 md:px-12">
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-3">
              Other Services
            </h2>
            <p className="text-muted-foreground">Diagnostics, brakes, electrical, and more</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
            {/* Diagnostics */}
            <div className="bg-card rounded-2xl p-6 border border-border hover:border-blue-500/40 transition-all duration-300 hover:shadow-lg group">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border border-blue-500/20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <div className="text-3xl">🔍</div>
              </div>
              <h3 className="font-display text-xl font-bold text-foreground mb-2">Diagnostics</h3>
              <p className="text-sm text-muted-foreground mb-4">Full OBD scans, pre-purchase inspections, and health checks</p>
              <div className="text-primary font-bold mb-4">From £35</div>
              <Button asChild variant="outline" className="w-full rounded-full">
                <Link to="/estimate">View Options</Link>
              </Button>
            </div>

            {/* Brakes */}
            <div className="bg-card rounded-2xl p-6 border border-border hover:border-red-500/40 transition-all duration-300 hover:shadow-lg group">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-red-500/10 to-orange-500/10 border border-red-500/20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <div className="text-3xl">🛞</div>
              </div>
              <h3 className="font-display text-xl font-bold text-foreground mb-2">Brake Services</h3>
              <p className="text-sm text-muted-foreground mb-4">Pads, discs, fluid changes, and complete brake work</p>
              <div className="text-primary font-bold mb-4">From £55</div>
              <Button asChild variant="outline" className="w-full rounded-full">
                <Link to="/estimate">View Options</Link>
              </Button>
            </div>

            {/* Battery & Electrical */}
            <div className="bg-card rounded-2xl p-6 border border-border hover:border-yellow-500/40 transition-all duration-300 hover:shadow-lg group">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-yellow-500/10 to-amber-500/10 border border-yellow-500/20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <div className="text-3xl">🔋</div>
              </div>
              <h3 className="font-display text-xl font-bold text-foreground mb-2">Battery & Electrical</h3>
              <p className="text-sm text-muted-foreground mb-4">Battery replacement, alternator, and electrical repairs</p>
              <div className="text-primary font-bold mb-4">From £100</div>
              <Button asChild variant="outline" className="w-full rounded-full">
                <Link to="/estimate">View Options</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Summary Table */}
      <section className="py-16 md:py-20">
        <div className="container mx-auto px-6 md:px-12">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-3">
                Service <span className="text-primary">Pricing</span>
              </h2>
              <p className="text-muted-foreground">Transparent pricing with no hidden fees</p>
            </div>

            <div className="bg-card rounded-3xl border border-border overflow-hidden">
              {/* Table Header */}
              <div className="bg-gradient-to-r from-primary/10 via-primary/5 to-primary/10 px-6 py-4 border-b border-border">
                <div className="grid grid-cols-2 gap-4">
                  <div className="font-bold text-foreground">Service</div>
                  <div className="font-bold text-foreground text-right">Price</div>
                </div>
              </div>
              
              {/* Table Body */}
              <div className="divide-y divide-border">
                {[
                  { name: "Basic Health Check", price: "£35" },
                  { name: "Mobile Diagnostic", price: "£45" },
                  { name: "Brake Fluid Change", price: "£55" },
                  { name: "Pre-Purchase Inspection", price: "£85" },
                  { name: "Brake Pad Replacement", price: "From £90" },
                  { name: "Battery Replacement", price: "From £100" },
                  { name: "Interim Service", price: "From £110" },
                  { name: "Full Service (Petrol)", price: "From £150" },
                  { name: "Brake Pads & Discs", price: "From £160" },
                  { name: "Full Service (Diesel)", price: "From £180" },
                ].map((item, i) => (
                  <div key={i} className="px-6 py-4 hover:bg-primary/5 transition-colors">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="text-foreground">{item.name}</div>
                      <div className="text-primary font-bold text-right">{item.price}</div>
                    </div>
                  </div>
                ))}
              </div>
              
              {/* Table Footer */}
              <div className="bg-gradient-to-r from-primary/5 via-primary/10 to-primary/5 px-6 py-6 border-t border-border">
                <p className="text-sm text-muted-foreground text-center mb-4">
                  All prices include VAT. Additional parts charged separately.
                </p>
                <div className="flex justify-center">
                  <Button asChild size="lg" className="rounded-full font-semibold">
                    <Link to="/estimate">
                      Get Your Custom Quote
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust & CTA */}
      <section className="py-16 md:py-20 bg-gradient-to-b from-primary/5 via-background to-background relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
        </div>
        
        <div className="container mx-auto px-6 md:px-12 relative z-10">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-6">
                Why Choose <span className="text-primary">FixNow</span>
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
              <div className="bg-card rounded-2xl p-6 text-center border border-border hover:border-primary/40 transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
                <div className="text-4xl mb-4">✓</div>
                <h3 className="font-bold text-foreground mb-2">Fully Qualified</h3>
                <p className="text-sm text-muted-foreground">City & Guilds certified mechanics</p>
              </div>
              
              <div className="bg-card rounded-2xl p-6 text-center border border-border hover:border-primary/40 transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
                <div className="text-4xl mb-4">🛡️</div>
                <h3 className="font-bold text-foreground mb-2">12-Month Guarantee</h3>
                <p className="text-sm text-muted-foreground">On all parts and labour</p>
              </div>
              
              <div className="bg-card rounded-2xl p-6 text-center border border-border hover:border-primary/40 transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
                <div className="text-4xl mb-4">📍</div>
                <h3 className="font-bold text-foreground mb-2">Mobile Service</h3>
                <p className="text-sm text-muted-foreground">We come to you, anywhere</p>
              </div>
            </div>

            <div className="text-center bg-card rounded-3xl p-8 md:p-12 border border-border">
              <h3 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-4">
                Ready to Get Started?
              </h3>
              <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
                Get an instant quote or call us for same-day service availability
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild size="lg" className="rounded-full font-semibold">
                  <Link to="/estimate">
                    Get Quote Now
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="rounded-full font-semibold">
                  <a href={`tel:${BUSINESS_INFO.phone}`}>
                    <Phone className="w-4 h-4 mr-2" />
                    {BUSINESS_INFO.phone}
                  </a>
                </Button>
              </div>
            </div>
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