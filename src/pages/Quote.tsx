import { useState } from "react";
import { ArrowRight, ChevronDown, ChevronUp, Car, User, Calendar, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Layout from "@/components/layout/Layout";
import { BUSINESS_INFO } from "@/lib/constants";

type Category = {
  id: string;
  name: string;
  services: Service[];
};

type Service = {
  id: string;
  name: string;
  price: string;
  description: string;
};

const categories: Category[] = [
  {
    id: "diagnostics",
    name: "Diagnostics & Inspections",
    services: [
      { id: "health-check", name: "Basic Health Check", price: "£35", description: "Quick inspection before a journey" },
      { id: "diagnostic", name: "Mobile Diagnostic", price: "£45", description: "Full OBD scan and report" },
      { id: "pre-purchase", name: "Pre-Purchase Inspection", price: "£85", description: "40-point inspection for used cars" },
    ],
  },
  {
    id: "servicing",
    name: "Servicing",
    services: [
      { id: "interim", name: "Interim Service", price: "£110", description: "6 months / 6,000 miles service" },
      { id: "full-petrol", name: "Full Service (Petrol)", price: "£150", description: "Annual comprehensive service" },
      { id: "full-diesel", name: "Full Service (Diesel)", price: "£180", description: "Annual service with fuel filter" },
    ],
  },
  {
    id: "brakes",
    name: "Brake Services",
    services: [
      { id: "brake-fluid", name: "Brake Fluid Change", price: "£55", description: "Full fluid flush and replacement" },
      { id: "brake-pads", name: "Brake Pad Replacement", price: "From £90", description: "Front or rear pads" },
      { id: "pads-discs", name: "Brake Pads & Discs", price: "From £160", description: "Complete brake refresh" },
    ],
  },
  {
    id: "electrical",
    name: "Electrical & Battery",
    services: [
      { id: "battery-standard", name: "Battery Replacement (Standard)", price: "£100", description: "Standard battery fitting" },
      { id: "battery-stopstart", name: "Battery Replacement (Stop-Start)", price: "£150", description: "Stop-start battery fitting" },
    ],
  },
  {
    id: "general",
    name: "General Repairs",
    services: [
      { id: "general-repair", name: "General Repairs", price: "£45/hour", description: "Labour rate for various repairs" },
      { id: "other", name: "Something Else", price: "Quote", description: "Describe your specific need" },
    ],
  },
];

const Quote = () => {
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);
  const [selectedService, setSelectedService] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  
  const [formData, setFormData] = useState({
    // Vehicle
    make: "",
    model: "",
    year: "",
    reg: "",
    // Contact
    name: "",
    email: "",
    phone: "",
    postcode: "",
    // Details
    preferredDate: "",
    message: "",
  });

  const toggleCategory = (categoryId: string) => {
    setExpandedCategory(expandedCategory === categoryId ? null : categoryId);
  };

  const selectService = (serviceId: string) => {
    setSelectedService(serviceId);
    setShowForm(true);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Handle form submission with web3forms
    const selectedCat = categories.flatMap(c => c.services).find(s => s.id === selectedService);
    console.log("Form submitted:", {
      service: selectedCat,
      ...formData
    });
  };

  const selectedServiceData = categories.flatMap(c => c.services).find(s => s.id === selectedService);

  if (showForm && selectedService) {
    return (
      <Layout>
        <section className="py-8 md:py-12 bg-gradient-to-b from-background via-surface-elevated to-background min-h-screen">
          <div className="container mx-auto px-4 md:px-6 max-w-2xl">
            {/* Header */}
            <div className="text-center mb-6 md:mb-8">
              <button
                onClick={() => setShowForm(false)}
                className="text-sm text-primary hover:underline mb-4 inline-flex items-center gap-1"
              >
                ← Change Service
              </button>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20 mb-3">
                <Info className="w-3.5 h-3.5 text-primary" />
                <span className="text-xs font-medium text-primary uppercase tracking-wider">Get Quote</span>
              </div>
              <h1 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-2">
                {selectedServiceData?.name}
              </h1>
              <p className="text-sm md:text-base text-muted-foreground">
                {selectedServiceData?.price} • {selectedServiceData?.description}
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
              {/* Vehicle Info */}
              <div className="bg-card rounded-xl p-4 md:p-5 border border-border">
                <h2 className="font-display text-base md:text-lg font-bold text-foreground mb-3 flex items-center gap-2">
                  <Car className="w-4 h-4 md:w-5 md:h-5 text-primary" />
                  Vehicle Details
                </h2>
                
                <div className="space-y-3">
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <Label htmlFor="make" className="text-xs">Make</Label>
                      <Input id="make" name="make" placeholder="Ford" value={formData.make} onChange={handleInputChange} required className="h-9 md:h-10 text-sm" />
                    </div>
                    <div>
                      <Label htmlFor="model" className="text-xs">Model</Label>
                      <Input id="model" name="model" placeholder="Focus" value={formData.model} onChange={handleInputChange} required className="h-9 md:h-10 text-sm" />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <Label htmlFor="year" className="text-xs">Year</Label>
                      <Input id="year" name="year" placeholder="2018" value={formData.year} onChange={handleInputChange} required className="h-9 md:h-10 text-sm" />
                    </div>
                    <div>
                      <Label htmlFor="reg" className="text-xs">Registration</Label>
                      <Input id="reg" name="reg" placeholder="AB12 CDE" value={formData.reg} onChange={handleInputChange} required className="h-9 md:h-10 text-sm" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Contact Info */}
              <div className="bg-card rounded-xl p-4 md:p-5 border border-border">
                <h2 className="font-display text-base md:text-lg font-bold text-foreground mb-3 flex items-center gap-2">
                  <User className="w-4 h-4 md:w-5 md:h-5 text-primary" />
                  Contact Details
                </h2>
                
                <div className="space-y-3">
                  <div>
                    <Label htmlFor="name" className="text-xs">Full Name</Label>
                    <Input id="name" name="name" placeholder="Your name" value={formData.name} onChange={handleInputChange} required className="h-9 md:h-10 text-sm" />
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <Label htmlFor="email" className="text-xs">Email</Label>
                      <Input id="email" name="email" type="email" placeholder="your@email.com" value={formData.email} onChange={handleInputChange} required className="h-9 md:h-10 text-sm" />
                    </div>
                    <div>
                      <Label htmlFor="phone" className="text-xs">Phone</Label>
                      <Input id="phone" name="phone" type="tel" placeholder="07XXX XXXXXX" value={formData.phone} onChange={handleInputChange} required className="h-9 md:h-10 text-sm" />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="postcode" className="text-xs">Postcode</Label>
                    <Input id="postcode" name="postcode" placeholder="HP2 7DE" value={formData.postcode} onChange={handleInputChange} required className="h-9 md:h-10 text-sm" />
                  </div>
                </div>
              </div>

              {/* Additional Info */}
              <div className="bg-card rounded-xl p-4 md:p-5 border border-border">
                <h2 className="font-display text-base md:text-lg font-bold text-foreground mb-3 flex items-center gap-2">
                  <Calendar className="w-4 h-4 md:w-5 md:h-5 text-primary" />
                  Booking Details
                </h2>
                
                <div className="space-y-3">
                  <div>
                    <Label htmlFor="preferredDate" className="text-xs">Preferred Date</Label>
                    <Input id="preferredDate" name="preferredDate" type="date" value={formData.preferredDate} onChange={handleInputChange} className="h-9 md:h-10 text-sm" />
                  </div>
                  <div>
                    <Label htmlFor="message" className="text-xs">Additional Notes (Optional)</Label>
                    <textarea 
                      id="message" 
                      name="message" 
                      placeholder="Any additional information..."
                      value={formData.message}
                      onChange={handleInputChange}
                      rows={3}
                      className="w-full px-3 py-2 text-sm border border-input bg-background rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-ring"
                    />
                  </div>
                </div>
              </div>

              {/* Submit */}
              <div className="space-y-3">
                <Button type="submit" className="w-full rounded-full h-10 md:h-11 font-semibold text-sm">
                  Request Quote
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
                <p className="text-xs text-center text-muted-foreground">
                  We'll respond within 24 hours or call{" "}
                  <a href={`tel:${BUSINESS_INFO.phone}`} className="text-primary hover:underline">
                    {BUSINESS_INFO.phone}
                  </a>
                </p>
              </div>
            </form>
          </div>
        </section>
      </Layout>
    );
  }

  return (
    <Layout>
      <section className="py-8 md:py-12 bg-gradient-to-b from-background via-surface-elevated to-background min-h-screen">
        <div className="container mx-auto px-4 md:px-6 max-w-2xl">
          {/* Header */}
          <div className="text-center mb-6 md:mb-8">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20 mb-3">
              <Info className="w-3.5 h-3.5 text-primary" />
              <span className="text-xs font-medium text-primary uppercase tracking-wider">Get a Quote</span>
            </div>
            <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-2">
              What Do You Need?
            </h1>
            <p className="text-sm md:text-base text-muted-foreground">
              Select a service category to see options
            </p>
          </div>

          {/* Categories */}
          <div className="space-y-2 md:space-y-3">
            {categories.map((category) => (
              <div key={category.id} className="bg-card rounded-xl border border-border overflow-hidden">
                {/* Category Header */}
                <button
                  onClick={() => toggleCategory(category.id)}
                  className="w-full px-4 md:px-5 py-3 md:py-4 flex items-center justify-between hover:bg-primary/5 transition-colors"
                >
                  <span className="font-semibold text-sm md:text-base text-foreground text-left">{category.name}</span>
                  {expandedCategory === category.id ? (
                    <ChevronUp className="w-4 h-4 md:w-5 md:h-5 text-primary flex-shrink-0" />
                  ) : (
                    <ChevronDown className="w-4 h-4 md:w-5 md:h-5 text-muted-foreground flex-shrink-0" />
                  )}
                </button>

                {/* Services List */}
                {expandedCategory === category.id && (
                  <div className="border-t border-border divide-y divide-border">
                    {category.services.map((service) => (
                      <button
                        key={service.id}
                        onClick={() => selectService(service.id)}
                        className="w-full px-4 md:px-5 py-3 hover:bg-primary/5 transition-colors text-left"
                      >
                        <div className="flex items-start justify-between gap-3">
                          <div className="flex-1 min-w-0">
                            <div className="text-sm md:text-base font-medium text-foreground mb-0.5">{service.name}</div>
                            <div className="text-xs md:text-sm text-muted-foreground">{service.description}</div>
                          </div>
                          <div className="text-sm md:text-base font-bold text-primary whitespace-nowrap flex-shrink-0">
                            {service.price}
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Footer Help */}
          <div className="mt-8 text-center">
            <p className="text-sm text-muted-foreground mb-3">
              Not sure what you need?
            </p>
            <Button variant="outline" size="sm" asChild className="rounded-full">
              <a href={`tel:${BUSINESS_INFO.phone}`}>
                Call {BUSINESS_INFO.phone}
              </a>
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Quote;
