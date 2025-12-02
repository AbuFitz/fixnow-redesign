import { Link } from "react-router-dom";
import { MapPin, ArrowRight, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import Layout from "@/components/layout/Layout";
import { BUSINESS_INFO, LOCATIONS } from "@/lib/constants";

const Locations = () => {
  return (
    <Layout>
      {/* Hero */}
      <section className="py-16 md:py-24 bg-card">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary mb-6">
              <MapPin className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-muted-foreground">
                {BUSINESS_INFO.coverage} Coverage
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              Service Areas
            </h1>
            <p className="text-lg text-muted-foreground">
              Based in Hemel Hempstead, we provide mobile mechanic services across 
              Hertfordshire, Bedfordshire, Buckinghamshire, and North London.
            </p>
          </div>
        </div>
      </section>

      {/* Locations Grid */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {LOCATIONS.map((location) => (
              <Link
                key={location.slug}
                to={`/locations/${location.slug}`}
                className="bg-card rounded-2xl p-6 border border-border hover:border-primary/50 transition-colors group"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                    <MapPin className="w-6 h-6 text-primary" />
                  </div>
                  <ArrowRight className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
                </div>
                <h2 className="text-xl font-semibold text-foreground mb-2">
                  {location.name}
                </h2>
                <p className="text-muted-foreground text-sm mb-4">
                  {location.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {location.postcodes.slice(0, 4).map((postcode) => (
                    <span
                      key={postcode}
                      className="px-2 py-1 bg-secondary rounded text-xs text-muted-foreground"
                    >
                      {postcode}
                    </span>
                  ))}
                  {location.postcodes.length > 4 && (
                    <span className="px-2 py-1 bg-secondary rounded text-xs text-muted-foreground">
                      +{location.postcodes.length - 4} more
                    </span>
                  )}
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 md:py-24 bg-card">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Don't See Your Area?
          </h2>
          <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
            We cover a wide area beyond these locations. Give us a call to check if we can come to you.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" asChild>
              <a href={`tel:${BUSINESS_INFO.phone}`}>
                <Phone className="w-5 h-5 mr-2" />
                Call {BUSINESS_INFO.phone}
              </a>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link to="/estimate">Get a Quote</Link>
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Locations;
