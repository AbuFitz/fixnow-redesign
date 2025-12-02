import { useParams, Link, Navigate } from "react-router-dom";
import { MapPin, ArrowRight, Phone, Clock, Shield, Wrench } from "lucide-react";
import { Button } from "@/components/ui/button";
import Layout from "@/components/layout/Layout";
import { BUSINESS_INFO, SERVICES, LOCATIONS } from "@/lib/constants";

const LocationPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const location = LOCATIONS.find((loc) => loc.slug === slug);

  if (!location) {
    return <Navigate to="/locations" replace />;
  }

  return (
    <Layout>
      {/* Hero */}
      <section className="py-16 md:py-24 bg-card">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary mb-6">
              <MapPin className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-muted-foreground">
                Mobile Mechanic Services
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              Mobile Mechanic in {location.name}
            </h1>
            <p className="text-lg text-muted-foreground mb-8">
              {location.description} Professional, reliable, and convenient — we come to your home or workplace.
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
                  Call Now
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Postcodes */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-6 text-center">
              Postcodes We Cover in {location.name}
            </h2>
            <div className="flex flex-wrap justify-center gap-3 mb-10">
              {location.postcodes.map((postcode) => (
                <span
                  key={postcode}
                  className="px-4 py-2 bg-secondary rounded-lg text-foreground font-medium"
                >
                  {postcode}
                </span>
              ))}
            </div>
            <p className="text-muted-foreground text-center">
              Not sure if we cover your area? Give us a call on{" "}
              <a href={`tel:${BUSINESS_INFO.phone}`} className="text-primary hover:underline">
                {BUSINESS_INFO.phone}
              </a>
            </p>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-16 md:py-24 bg-card">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-8 text-center">
            Services Available in {location.name}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {SERVICES.map((service) => (
              <div
                key={service.id}
                className="bg-secondary/50 rounded-xl p-6"
              >
                <h3 className="text-lg font-semibold text-foreground mb-2">{service.name}</h3>
                <p className="text-muted-foreground text-sm mb-3">{service.description}</p>
                <p className="text-primary font-semibold">{service.price}</p>
              </div>
            ))}
          </div>
          <div className="text-center mt-10">
            <Button asChild>
              <Link to="/services">
                View All Services
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-10 text-center">
            Why Choose FixNow Mechanics in {location.name}?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {[
              {
                icon: Clock,
                title: "Convenient",
                description: "We come to your home or workplace at a time that suits you.",
              },
              {
                icon: Shield,
                title: "Transparent",
                description: "Clear pricing with no hidden fees. You'll know the cost before we start.",
              },
              {
                icon: Wrench,
                title: "Professional",
                description: "Fully qualified mechanics with experience on all makes and models.",
              },
            ].map((item, index) => (
              <div key={index} className="text-center">
                <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <item.icon className="w-7 h-7 text-primary" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">{item.title}</h3>
                <p className="text-muted-foreground">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 md:py-24 bg-primary">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-4">
            Need a Mobile Mechanic in {location.name}?
          </h2>
          <p className="text-primary-foreground/80 mb-8 max-w-2xl mx-auto">
            Get a free quote today and we'll come to you at a time that works for you.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" asChild className="text-lg px-8">
              <Link to="/estimate">Get Free Quote</Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              asChild
              className="text-lg px-8 bg-transparent border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary"
            >
              <a href={`tel:${BUSINESS_INFO.phone}`}>
                <Phone className="w-5 h-5 mr-2" />
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
