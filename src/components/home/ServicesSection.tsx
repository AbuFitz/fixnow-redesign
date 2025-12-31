import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import servicingImg from "@/assets/service-servicing.jpg";

const services = [
  { id: "diagnostics", name: "Diagnostics", price: "From £45", image: "/diagonstic.jpg" },
  { id: "brakes", name: "Brakes", price: "From £80", image: "/brakes.jpg" },
  { id: "servicing", name: "Servicing", price: "From £120", image: servicingImg },
  { id: "general", name: "General Repairs", price: "Call for quote", image: "/generalrepairs.JPG" },
  { id: "electrical", name: "Electrical", price: "From £60", image: "/electrical.jpg" },
  { id: "suspension", name: "Suspension", price: "From £100", image: "/suspension.jpg" },
];

const ServicesSection = () => {
  return (
    <section className="py-10 md:py-4 bg-background relative overflow-hidden">
      {/* Subtle grid pattern */}
      <div className="absolute inset-0 opacity-[0.015]" style={{
        backgroundImage: `linear-gradient(hsl(var(--primary)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--primary)) 1px, transparent 1px)`,
        backgroundSize: '50px 50px'
      }} />
      <div className="container mx-auto px-6 md:px-12 relative z-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-6">
          <div>
            <span className="text-sm font-medium text-primary uppercase tracking-wider mb-2 block">What we do</span>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground">
              Great Services,<br />
              <span className="text-muted-foreground">At Your Location</span>
            </h2>
          </div>
          <Button variant="outline" size="lg" asChild className="rounded-full border-border/50 bg-card/30 hover:bg-card/50 w-fit group">
            <Link to="/services">
              All services
              <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
        </div>

        {/* Bento Grid - All 6 items fit in one frame */}
        <div className="grid grid-cols-3 md:grid-cols-6 gap-2 md:gap-3">
          {services.map((service, index) => (
            <Link
              key={service.id}
              to="/services"
              className={`group relative rounded-xl overflow-hidden transition-transform duration-300 hover:scale-[1.02] ${
                index === 0 ? "col-span-2 row-span-2 aspect-square" : "col-span-1 aspect-square"
              }`}
            >
              {/* Image */}
              <img
                src={service.image}
                alt={service.name}
                className={`absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 brightness-75 ${
                  service.id === "brakes" ? "object-[center_125%] scale-125" : ""
                }`}
              />
              
              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent" />
              
              {/* Content */}
              <div className="absolute inset-0 p-3 md:p-4 flex flex-col justify-end">
                <h3 className={`font-display font-bold text-foreground mb-0.5 ${index === 0 ? "text-xl md:text-2xl" : "text-sm md:text-base"}`}>
                  {service.name}
                </h3>
                <p className="text-primary font-medium text-xs">{service.price}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
