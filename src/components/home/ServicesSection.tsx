import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

// Import service images
import diagnosticsImg from "@/assets/service-diagnostics.jpg";
import brakesImg from "@/assets/service-brakes.jpg";
import servicingImg from "@/assets/service-servicing.jpg";
import electricalImg from "@/assets/service-electrical.jpg";
import suspensionImg from "@/assets/service-suspension.jpg";
import generalImg from "@/assets/service-general.jpg";

const services = [
  {
    id: "diagnostics",
    name: "Diagnostics",
    price: "From £45",
    image: diagnosticsImg,
    span: "col-span-2 row-span-2",
  },
  {
    id: "brakes",
    name: "Brakes",
    price: "From £80",
    image: brakesImg,
    span: "col-span-1 row-span-1",
  },
  {
    id: "servicing",
    name: "Servicing",
    price: "From £120",
    image: servicingImg,
    span: "col-span-1 row-span-1",
  },
  {
    id: "electrical",
    name: "Electrical",
    price: "From £60",
    image: electricalImg,
    span: "col-span-1 row-span-2",
  },
  {
    id: "suspension",
    name: "Suspension",
    price: "From £100",
    image: suspensionImg,
    span: "col-span-1 row-span-1",
  },
  {
    id: "general",
    name: "General Repairs",
    price: "Call for quote",
    image: generalImg,
    span: "col-span-1 row-span-1",
  },
];

const ServicesSection = () => {
  return (
    <section className="py-20 md:py-28 bg-background">
      <div className="container mx-auto px-6 md:px-12">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
          <div>
            <span className="text-primary text-sm font-medium tracking-wider uppercase mb-3 block">
              Services
            </span>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground">
              What we do
            </h2>
          </div>
          <Button variant="outline" size="lg" asChild className="rounded-full w-fit">
            <Link to="/services">
              All services
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </Button>
        </div>

        {/* Bento Grid - Desktop */}
        <div className="hidden md:grid grid-cols-4 grid-rows-3 gap-4 h-[600px]">
          {services.map((service) => (
            <Link
              key={service.id}
              to="/services"
              className={`group relative rounded-2xl overflow-hidden ${service.span}`}
            >
              <img
                src={service.image}
                alt={service.name}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background via-background/30 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />
              <div className="absolute inset-0 p-6 flex flex-col justify-end">
                <h3 className="font-display text-xl md:text-2xl font-semibold text-foreground mb-1">
                  {service.name}
                </h3>
                <p className="text-primary font-medium">{service.price}</p>
              </div>
              {/* Hover border effect */}
              <div className="absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-primary/30 transition-colors" />
            </Link>
          ))}
        </div>

        {/* Mobile Horizontal Scroll */}
        <div className="md:hidden -mx-6 px-6">
          <div className="flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-hide">
            {services.map((service) => (
              <Link
                key={service.id}
                to="/services"
                className="group relative flex-shrink-0 w-64 h-80 rounded-2xl overflow-hidden snap-start"
              >
                <img
                  src={service.image}
                  alt={service.name}
                  className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
                <div className="absolute inset-0 p-5 flex flex-col justify-end">
                  <h3 className="font-display text-xl font-semibold text-foreground mb-1">
                    {service.name}
                  </h3>
                  <p className="text-primary font-medium text-sm">{service.price}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
