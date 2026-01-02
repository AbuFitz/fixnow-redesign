import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowRight, Car, MapPin, User, Mail, Phone as PhoneIcon, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Layout from "@/components/layout/Layout";
import { BUSINESS_INFO } from "@/lib/constants";

const FullService = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    // Personal Info
    name: "",
    email: "",
    phone: "",
    postcode: "",
    
    // Vehicle Info
    make: "",
    model: "",
    year: "",
    reg: "",
    fuelType: "petrol", // petrol or diesel
    
    // Service Details
    preferredDate: "",
    message: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Handle form submission with web3forms
    console.log("Form submitted:", formData);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const price = formData.fuelType === "diesel" ? "£180" : "£150";

  return (
    <Layout>
      <section className="py-12 md:py-16 bg-gradient-to-b from-background via-surface-elevated to-background">
        <div className="container mx-auto px-4 md:px-6 max-w-2xl">
          {/* Header */}
          <div className="text-center mb-8 md:mb-10">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20 mb-4">
              <Car className="w-3.5 h-3.5 text-primary" />
              <span className="text-xs font-medium text-primary uppercase tracking-wider">Full Service</span>
            </div>
            <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-3">
              Book Your <span className="text-primary">Full Service</span>
            </h1>
            <p className="text-sm md:text-base text-muted-foreground">
              From {price} • Takes approximately 2 hours
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6 md:space-y-8">
            {/* Vehicle Details */}
            <div className="bg-card rounded-2xl p-4 md:p-6 border border-border">
              <h2 className="font-display text-lg md:text-xl font-bold text-foreground mb-4 flex items-center gap-2">
                <Car className="w-5 h-5 text-primary" />
                Vehicle Details
              </h2>
              
              <div className="grid grid-cols-1 gap-3 md:gap-4">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <Label htmlFor="make" className="text-xs md:text-sm">Make</Label>
                    <Input 
                      id="make" 
                      name="make" 
                      placeholder="e.g. Ford" 
                      value={formData.make}
                      onChange={handleInputChange}
                      required 
                      className="h-10 md:h-11 text-sm md:text-base"
                    />
                  </div>
                  <div>
                    <Label htmlFor="model" className="text-xs md:text-sm">Model</Label>
                    <Input 
                      id="model" 
                      name="model" 
                      placeholder="e.g. Focus" 
                      value={formData.model}
                      onChange={handleInputChange}
                      required 
                      className="h-10 md:h-11 text-sm md:text-base"
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <Label htmlFor="year" className="text-xs md:text-sm">Year</Label>
                    <Input 
                      id="year" 
                      name="year" 
                      placeholder="e.g. 2018" 
                      value={formData.year}
                      onChange={handleInputChange}
                      required 
                      className="h-10 md:h-11 text-sm md:text-base"
                    />
                  </div>
                  <div>
                    <Label htmlFor="reg" className="text-xs md:text-sm">Registration</Label>
                    <Input 
                      id="reg" 
                      name="reg" 
                      placeholder="e.g. AB12 CDE" 
                      value={formData.reg}
                      onChange={handleInputChange}
                      required 
                      className="h-10 md:h-11 text-sm md:text-base"
                    />
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="fuelType" className="text-xs md:text-sm">Fuel Type</Label>
                  <select
                    id="fuelType"
                    name="fuelType"
                    value={formData.fuelType}
                    onChange={handleInputChange}
                    required
                    className="w-full h-10 md:h-11 px-3 text-sm md:text-base border border-input bg-background rounded-md focus:outline-none focus:ring-2 focus:ring-ring"
                  >
                    <option value="petrol">Petrol (£150)</option>
                    <option value="diesel">Diesel (£180)</option>
                  </select>
                  <p className="text-xs text-muted-foreground mt-1">
                    Diesel service includes fuel filter replacement
                  </p>
                </div>
              </div>
            </div>

            {/* Contact Details */}
            <div className="bg-card rounded-2xl p-4 md:p-6 border border-border">
              <h2 className="font-display text-lg md:text-xl font-bold text-foreground mb-4 flex items-center gap-2">
                <User className="w-5 h-5 text-primary" />
                Contact Details
              </h2>
              
              <div className="grid grid-cols-1 gap-3 md:gap-4">
                <div>
                  <Label htmlFor="name" className="text-xs md:text-sm">Full Name</Label>
                  <Input 
                    id="name" 
                    name="name" 
                    placeholder="Your name" 
                    value={formData.name}
                    onChange={handleInputChange}
                    required 
                    className="h-10 md:h-11 text-sm md:text-base"
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div>
                    <Label htmlFor="email" className="text-xs md:text-sm">Email</Label>
                    <Input 
                      id="email" 
                      name="email" 
                      type="email" 
                      placeholder="your@email.com" 
                      value={formData.email}
                      onChange={handleInputChange}
                      required 
                      className="h-10 md:h-11 text-sm md:text-base"
                    />
                  </div>
                  <div>
                    <Label htmlFor="phone" className="text-xs md:text-sm">Phone</Label>
                    <Input 
                      id="phone" 
                      name="phone" 
                      type="tel" 
                      placeholder="07XXX XXXXXX" 
                      value={formData.phone}
                      onChange={handleInputChange}
                      required 
                      className="h-10 md:h-11 text-sm md:text-base"
                    />
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="postcode" className="text-xs md:text-sm">Postcode</Label>
                  <Input 
                    id="postcode" 
                    name="postcode" 
                    placeholder="e.g. HP2 7DE" 
                    value={formData.postcode}
                    onChange={handleInputChange}
                    required 
                    className="h-10 md:h-11 text-sm md:text-base"
                  />
                </div>
              </div>
            </div>

            {/* Booking Details */}
            <div className="bg-card rounded-2xl p-4 md:p-6 border border-border">
              <h2 className="font-display text-lg md:text-xl font-bold text-foreground mb-4 flex items-center gap-2">
                <Calendar className="w-5 h-5 text-primary" />
                Preferred Date
              </h2>
              
              <div className="grid grid-cols-1 gap-3 md:gap-4">
                <div>
                  <Label htmlFor="preferredDate" className="text-xs md:text-sm">Preferred Date</Label>
                  <Input 
                    id="preferredDate" 
                    name="preferredDate" 
                    type="date" 
                    value={formData.preferredDate}
                    onChange={handleInputChange}
                    className="h-10 md:h-11 text-sm md:text-base"
                  />
                </div>
                
                <div>
                  <Label htmlFor="message" className="text-xs md:text-sm">Additional Notes (Optional)</Label>
                  <textarea 
                    id="message" 
                    name="message" 
                    placeholder="Any additional information..."
                    value={formData.message}
                    onChange={handleInputChange}
                    rows={3}
                    className="w-full px-3 py-2 text-sm md:text-base border border-input bg-background rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-ring"
                  />
                </div>
              </div>
            </div>

            {/* Submit */}
            <div className="space-y-3 md:space-y-4">
              <Button type="submit" className="w-full rounded-full h-11 md:h-12 font-semibold text-sm md:text-base">
                Request Full Service Booking
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
              
              <p className="text-xs text-center text-muted-foreground">
                We'll confirm your booking within 24 hours. Or call us on{" "}
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
};

export default FullService;
