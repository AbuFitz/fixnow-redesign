import { Link } from "react-router-dom";
import { MapPin, ArrowRight, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import Layout from "@/components/layout/Layout";
import { BUSINESS_INFO, LOCATIONS } from "@/lib/constants";

const Locations = () => {
  return (
    <Layout>
      {/* Hero with Map Background */}
      <section className="relative py-17 md:py-24 bg-gradient-to-b from-card via-surface-elevated to-card overflow-hidden">
        {/* Map background */}
        <div className="absolute inset-0">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d150000!2d-0.4!3d51.75!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2suk!4v1700000000000!5m2!1sen!2suk&disableDefaultUI=1&zoomControl=0&mapTypeControl=0&streetViewControl=0&fullscreenControl=0"
            className="w-full h-full border-0 grayscale opacity-50"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Coverage area map"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-card/20 via-card/40 to-card" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_hsl(var(--primary)/0.06),_transparent_70%)]" />
        
        <div className="container mx-auto px-6 md:px-12 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20 mb-6">
              <MapPin className="w-3.5 h-3.5 text-primary" />
              <span className="text-xs font-medium text-primary uppercase tracking-wider">{BUSINESS_INFO.coverage} Coverage</span>
            </div>
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">
              Areas We Cover
            </h1>
            <p className="text-lg text-muted-foreground max-w-xl mx-auto">
              Based in Hemel Hempstead, we cover Hertfordshire, Bedfordshire, Buckinghamshire, and North London.
            </p>
          </div>
        </div>
      </section>

      {/* Locations Grid */}
      <section className="py-16 md:py-20">
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
      <section className="py-16 md:py-20 bg-card">
        <div className="container mx-auto px-6 md:px-12 text-center">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
            Don't see your area?
          </h2>
          <p className="text-muted-foreground mb-8 max-w-lg mx-auto">
            We cover a wide area. Give us a call to check if we can come to you.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button size="lg" asChild className="rounded-full">
              <a href={`tel:${BUSINESS_INFO.phone}`}>
                <Phone className="w-4 h-4 mr-2" />
                {BUSINESS_INFO.phone}
              </a>
            </Button>
            <Button size="lg" variant="outline" asChild className="rounded-full">
              <Link to="/estimate">Get a Quote</Link>
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Locations;
