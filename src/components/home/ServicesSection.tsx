import { Link } from "react-router-dom";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import diagnosticsImg from "@/assets/service-diagnostics.jpg";
import brakesImg from "@/assets/service-brakes.jpg";
import servicingImg from "@/assets/service-servicing.jpg";
import electricalImg from "@/assets/service-electrical.jpg";
import suspensionImg from "@/assets/service-suspension.jpg";
import generalImg from "@/assets/service-general.jpg";

const services = [
  { id: "diagnostics", name: "Diagnostics", price: "From £45", image: diagnosticsImg, featured: true },
  { id: "brakes", name: "Brakes", price: "From £80", image: brakesImg },
  { id: "servicing", name: "Servicing", price: "From £120", image: servicingImg },
  { id: "electrical", name: "Electrical", price: "From £60", image: electricalImg, featured: true },
  { id: "suspension", name: "Suspension", price: "From £100", image: suspensionImg },
  { id: "general", name: "General Repairs", price: "Quote", image: generalImg },
];

const ServicesSection = () => {
  return (
    <section className="py-16 md:py-24 bg-background relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[150px]" />
      
      <div className="container mx-auto px-6 md:px-12 relative z-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20 mb-6">
              <div className="w-1.5 h-1.5 rounded-full bg-primary" />
              <span className="text-xs font-medium text-primary uppercase tracking-wider">Services</span>
            </div>
            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-foreground">
              What we <span className="text-primary">do</span>
            </h2>
          </div>
          <Button variant="outline" size="lg" asChild className="rounded-full border-border/50 bg-card/30 backdrop-blur-sm hover:bg-card/50 hover:border-primary/30 w-fit group">
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
              className={`group relative rounded-2xl md:rounded-3xl overflow-hidden transition-all duration-500 hover:scale-[1.02] ${
                index === 0 ? "col-span-2 row-span-2 aspect-square md:aspect-auto" :
                index === 3 ? "col-span-2 md:col-span-1 aspect-[2/1] md:aspect-square" :
                "aspect-square"
              }`}
            >
              {/* Image */}
              <img
                src={service.image}
                alt={service.name}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              
              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />
              
              {/* Glow effect on hover */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <div className="absolute inset-0 bg-gradient-to-t from-primary/20 via-transparent to-transparent" />
              </div>
              
              {/* Border glow */}
              <div className="absolute inset-0 rounded-2xl md:rounded-3xl border border-transparent group-hover:border-primary/30 transition-colors" />
              
              {/* Content */}
              <div className="absolute inset-0 p-4 md:p-6 flex flex-col justify-end">
                <div className="flex items-end justify-between">
                  <div>
                    <h3 className={`font-display font-bold text-foreground mb-1 ${index === 0 ? "text-2xl md:text-3xl" : "text-lg md:text-xl"}`}>
                      {service.name}
                    </h3>
                    <p className="text-primary font-medium text-sm">{service.price}</p>
                  </div>
                  <div className="w-10 h-10 rounded-full bg-card/50 backdrop-blur-sm border border-border/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all translate-y-2 group-hover:translate-y-0">
                    <ArrowUpRight className="w-4 h-4 text-primary" />
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
