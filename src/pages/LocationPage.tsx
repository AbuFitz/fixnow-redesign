import { useParams, Link, Navigate } from "react-router-dom";
import { MapPin, ArrowRight, Phone, Clock, CreditCard, Wrench } from "lucide-react";
import { Button } from "@/components/ui/button";
import Layout from "@/components/layout/Layout";
import { BUSINESS_INFO, SERVICES, LOCATIONS } from "@/lib/constants";

const LocationPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const location = LOCATIONS.find((loc) => loc.slug === slug);

  if (!location) {
    return <Navigate to="/locations" replace />;
  }

  // Location-specific map coordinates
  const mapCoords: Record<string, { lat: number; lng: number; zoom: number }> = {
    "hemel-hempstead": { lat: 51.7533, lng: -0.4689, zoom: 12 },
    "watford": { lat: 51.6565, lng: -0.3903, zoom: 12 },
    "st-albans": { lat: 51.7520, lng: -0.3360, zoom: 12 },
    "luton": { lat: 51.8787, lng: -0.4200, zoom: 12 },
    "dunstable": { lat: 51.8860, lng: -0.5210, zoom: 13 },
    "milton-keynes": { lat: 52.0406, lng: -0.7594, zoom: 11 },
    "aylesbury": { lat: 51.8165, lng: -0.8139, zoom: 12 },
    "stevenage": { lat: 51.9017, lng: -0.2020, zoom: 12 },
    "hatfield": { lat: 51.7623, lng: -0.2287, zoom: 13 },
    "north-london": { lat: 51.5833, lng: -0.1167, zoom: 11 },
  };

  const coords = mapCoords[slug || ""] || { lat: 51.75, lng: -0.4, zoom: 12 };
  const mapUrl = `https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d40000!2d${coords.lng}!3d${coords.lat}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f${coords.zoom}!5e0!3m2!1sen!2suk!4v1700000000000!5m2!1sen!2suk`;

  return (
    <Layout>
      {/* Hero */}
      <section className="py-20 md:py-28 bg-gradient-to-br from-card via-surface-elevated to-card relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-primary/3 rounded-full blur-[100px]" />
        <div className="container mx-auto px-6 md:px-12 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <div className="flex items-center justify-center gap-3 mb-6">
              <div className="w-8 h-[1px] bg-primary" />
              <span className="text-xs tracking-[0.3em] uppercase text-muted-foreground font-medium">
                Mobile Mechanic
              </span>
              <div className="w-8 h-[1px] bg-primary" />
            </div>
            <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-6">
              Mobile Mechanic in {location.name}
            </h1>
            <p className="text-lg text-muted-foreground mb-8">
              {location.description} We come to your home or workplace.
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
                  Call Us
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Postcodes & Map */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-6 md:px-12">
          <div className="grid md:grid-cols-2 gap-8 md:gap-12 max-w-6xl mx-auto">
            {/* Postcodes */}
            <div>
              <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-6">
                Postcodes in {location.name}
              </h2>
              <div className="flex flex-wrap gap-3 mb-6">
                {location.postcodes.map((postcode) => (
                  <span
                    key={postcode}
                    className="px-4 py-2 bg-card border border-border rounded-full text-foreground text-sm font-medium"
                  >
                    {postcode}
                  </span>
                ))}
              </div>
              <p className="text-muted-foreground text-sm">
                Not sure if we cover your area? Call us on{" "}
                <a href={`tel:${BUSINESS_INFO.phone}`} className="text-primary hover:underline">
                  {BUSINESS_INFO.phone}
                </a>
              </p>
            </div>

            {/* Map - 30% larger */}
            <div className="h-[400px] md:h-[520px] rounded-2xl overflow-hidden border border-border/50 shadow-lg">
              <iframe
                src={mapUrl}
                className="w-full h-full border-0"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title={`${location.name} coverage map`}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-16 md:py-24 bg-card">
        <div className="container mx-auto px-6 md:px-12">
          <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-8 text-center">
            Services in {location.name}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl mx-auto">
            {SERVICES.map((service) => (
              <div
                key={service.id}
                className="bg-secondary/30 rounded-xl p-5"
              >
                <h3 className="font-display text-lg font-semibold text-foreground mb-1">{service.name}</h3>
                <p className="text-primary font-medium text-sm">{service.price}</p>
              </div>
            ))}
          </div>
          <div className="text-center mt-8">
            <Button asChild variant="outline" className="rounded-full">
              <Link to="/services">
                View all services
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-6 md:px-12">
          <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-10 text-center">
            Why use us in {location.name}?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {[
              {
                icon: Clock,
                title: "Convenient",
                description: "We come to you at a time that works for you. No need to visit a garage.",
              },
              {
                icon: CreditCard,
                title: "Honest Pricing",
                description: "We'll give you a clear quote upfront. No hidden fees or surprises.",
              },
              {
                icon: Wrench,
                title: "Equipped",
                description: "We bring everything needed to diagnose and fix your vehicle on the spot.",
              },
            ].map((item, index) => (
              <div key={index} className="text-center">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <item.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-display text-lg font-semibold text-foreground mb-2">{item.title}</h3>
                <p className="text-muted-foreground text-sm">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 md:py-24 bg-primary">
        <div className="container mx-auto px-6 md:px-12 text-center">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-primary-foreground mb-4">
            Need help in {location.name}?
          </h2>
          <p className="text-primary-foreground/80 mb-8 max-w-lg mx-auto">
            Send us an enquiry and we'll call you back to discuss.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" asChild className="rounded-full">
              <Link to="/estimate">Get a Quote</Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              asChild
              className="rounded-full bg-transparent border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary"
            >
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

export default LocationPage;