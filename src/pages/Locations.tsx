import { Link } from "react-router-dom";
import { MapPin, ArrowRight, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import Layout from "@/components/layout/Layout";
import { BUSINESS_INFO, LOCATIONS } from "@/lib/constants";

const Locations = () => {
  return (
    <Layout>
      {/* Hero */}
      <section className="py-12 md:py-16 bg-gradient-to-b from-background to-card/30">
        <div className="container mx-auto px-6 md:px-12">
          <div className="max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20 mb-6">
              <MapPin className="w-3.5 h-3.5 text-primary" />
              <span className="text-xs font-medium text-primary uppercase tracking-wider">{BUSINESS_INFO.coverage} Coverage</span>
            </div>
            <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4">
              We Cover <span className="text-primary">Your Area</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-6 max-w-2xl">
              Based in Hemel Hempstead, providing mobile mechanic services across Hertfordshire, Bedfordshire, Buckinghamshire, and North London.
            </p>
            
            {/* Quick CTA */}
            <div className="flex flex-col sm:flex-row gap-3">
              <Link to="/estimate">
                <Button size="lg" className="w-full sm:w-auto">
                  Get a Quote
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </Link>
              <a href={`tel:${BUSINESS_INFO.phone}`}>
                <Button size="lg" variant="outline" className="w-full sm:w-auto">
                  <Phone className="mr-2 w-4 h-4" />
                  {BUSINESS_INFO.phone}
                </Button>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Locations Grid */}
      <section className="pt-16 pb-16 md:pt-20 md:pb-20">
        <div className="container mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {LOCATIONS.map((location) => (
              <Link
                key={location.slug}
                to={`/locations/${location.slug}`}
                className="group relative bg-card rounded-xl p-5 border border-border/50 hover:border-primary/30 transition-all"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center">
                    <MapPin className="w-4 h-4 text-primary" />
                  </div>
                  <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
                </div>
                <h2 className="font-display text-lg font-semibold text-foreground mb-1">
                  {location.name}
                </h2>
                <p className="text-muted-foreground text-sm mb-3 line-clamp-2">
                  {location.description}
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {location.postcodes.slice(0, 3).map((postcode) => (
                    <span
                      key={postcode}
                      className="px-2 py-0.5 bg-background/50 rounded text-xs text-muted-foreground"
                    >
                      {postcode}
                    </span>
                  ))}
                  {location.postcodes.length > 3 && (
                    <span className="px-2 py-0.5 bg-background/50 rounded text-xs text-muted-foreground">
                      +{location.postcodes.length - 3}
                    </span>
                  )}
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 md:py-20 bg-primary relative overflow-hidden">
        {/* Accent patterns */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-96 h-96 bg-background rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-background rounded-full blur-3xl" />
        </div>
        <div className="container mx-auto px-6 md:px-12 text-center relative z-10">
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-primary-foreground mb-3 sm:mb-4 leading-tight drop-shadow-lg px-4">
            Don't see your area?
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-primary-foreground/90 mb-6 sm:mb-8 max-w-2xl mx-auto font-medium px-4">
            We cover a wide area. Give us a call to check if we can come to you.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center px-4">
            <Button size="lg" asChild className="group rounded-full h-12 sm:h-14 md:h-16 px-6 sm:px-8 md:px-10 text-base sm:text-lg font-semibold bg-background text-foreground hover:bg-background/90 hover:scale-[1.05] transition-all w-full sm:w-auto">
              <a href={`tel:${BUSINESS_INFO.phone}`}>
                <Phone className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                {BUSINESS_INFO.phone}
              </a>
            </Button>
            <Button size="lg" variant="outline" asChild className="rounded-full h-12 sm:h-14 md:h-16 px-6 sm:px-8 md:px-10 text-base sm:text-lg font-semibold border-2 border-primary-foreground/40 text-primary-foreground bg-transparent hover:bg-primary-foreground/15 hover:border-primary-foreground/70 hover:scale-[1.05] transition-all w-full sm:w-auto">
              <Link to="/estimate">Get a Quote</Link>
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Locations;
