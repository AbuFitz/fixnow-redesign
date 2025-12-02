import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import diagnosticsImg from "@/assets/service-diagnostics.jpg";
import brakesImg from "@/assets/service-brakes.jpg";
import servicingImg from "@/assets/service-servicing.jpg";
import electricalImg from "@/assets/service-electrical.jpg";
import suspensionImg from "@/assets/service-suspension.jpg";
import generalImg from "@/assets/service-general.jpg";

const services = [
  { id: "diagnostics", name: "Diagnostics", price: "From £45", image: diagnosticsImg },
  { id: "brakes", name: "Brakes", price: "From £80", image: brakesImg },
  { id: "servicing", name: "Servicing", price: "From £120", image: servicingImg },
  { id: "general", name: "General Repairs", price: "Call for quote", image: generalImg },
  { id: "electrical", name: "Electrical", price: "From £60", image: electricalImg },
  { id: "suspension", name: "Suspension", price: "From £100", image: suspensionImg },
];

const ServicesSection = () => {
  return (
    <section className="py-16 md:py-20 bg-background">
      <div className="container mx-auto px-6 md:px-12">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-10">
          <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground">
            What we do
          </h2>
          <Button variant="outline" size="lg" asChild className="rounded-full border-border/50 bg-card/30 hover:bg-card/50 w-fit group">
            <Link to="/services">
              All services
              <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
          {services.map((service, index) => (
            <Link
              key={service.id}
              to="/services"
              className={`group relative rounded-2xl overflow-hidden transition-transform duration-300 hover:scale-[1.02] ${
                index === 0 ? "col-span-2 row-span-2 aspect-square md:aspect-auto md:min-h-[400px]" :
                index === 4 ? "col-span-2 md:col-span-1 aspect-[2/1] md:aspect-square" :
                "aspect-square"
              }`}
            >
              {/* Image */}
              <img
                src={service.image}
                alt={service.name}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              
              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent" />
              
              {/* Content */}
              <div className="absolute inset-0 p-4 md:p-5 flex flex-col justify-end">
                <h3 className={`font-display font-bold text-foreground mb-0.5 ${index === 0 ? "text-2xl md:text-3xl" : "text-lg md:text-xl"}`}>
                  {service.name}
                </h3>
                <p className="text-primary font-medium text-sm">{service.price}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
