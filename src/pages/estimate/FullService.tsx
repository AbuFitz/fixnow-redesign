import { useState } from "react";
import { ArrowRight, ArrowLeft, Car, User, Calendar, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Layout from "@/components/layout/Layout";
import { BUSINESS_INFO } from "@/lib/constants";

const FullService = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    make: "",
    model: "",
    year: "",
    reg: "",
    fuelType: "petrol",
    name: "",
    email: "",
    phone: "",
    postcode: "",
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

  const canProceed = () => {
    switch (step) {
      case 1:
        return formData.make && formData.model && formData.year && formData.reg && formData.fuelType;
      case 2:
        return formData.name && formData.email && formData.phone && formData.postcode;
      default:
        return true;
    }
  };

  const nextStep = () => {
    if (canProceed()) setStep(step + 1);
  };

  const prevStep = () => setStep(step - 1);

  const price = formData.fuelType === "diesel" ? "£180" : "£150";

  return (
    <Layout>
      <section className="py-6 md:py-8 bg-background min-h-screen">
        <div className="container mx-auto px-4 max-w-xl">
          {/* Progress */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-2">
              {[1, 2, 3].map((s) => (
                <div key={s} className="flex items-center flex-1">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                    s < step ? 'bg-primary text-primary-foreground' :
                    s === step ? 'bg-primary text-primary-foreground' :
                    'bg-muted text-muted-foreground'
                  }`}>
                    {s < step ? <Check className="w-4 h-4" /> : s}
                  </div>
                  {s < 3 && (
                    <div className={`flex-1 h-0.5 mx-2 ${s < step ? 'bg-primary' : 'bg-muted'}`} />
                  )}
                </div>
              ))}
            </div>
            <p className="text-xs text-center text-muted-foreground">
              Step {step} of 3
            </p>
          </div>

          {/* Header */}
          <div className="text-center mb-6">
            <h1 className="text-xl md:text-2xl font-bold text-foreground mb-1">
              Full Service Booking
            </h1>
            <p className="text-sm text-muted-foreground">
              From {price} • 12 months / 12,000 miles
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Step 1: Vehicle */}
            {step === 1 && (
              <div className="space-y-4 animate-fade-in">
                <div className="bg-card rounded-xl p-4 border border-border">
                  <h2 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
                    <Car className="w-4 h-4 text-primary" />
                    Vehicle Details
                  </h2>
                  
                  <div className="space-y-3">
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <Label htmlFor="make" className="text-xs">Make</Label>
                        <Input 
                          id="make" 
                          name="make" 
                          placeholder="Ford" 
                          value={formData.make}
                          onChange={handleInputChange}
                          required 
                          className="h-9 text-sm"
                        />
                      </div>
                      <div>
                        <Label htmlFor="model" className="text-xs">Model</Label>
                        <Input 
                          id="model" 
                          name="model" 
                          placeholder="Focus" 
                          value={formData.model}
                          onChange={handleInputChange}
                          required 
                          className="h-9 text-sm"
                        />
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <Label htmlFor="year" className="text-xs">Year</Label>
                        <Input 
                          id="year" 
                          name="year" 
                          placeholder="2018" 
                          value={formData.year}
                          onChange={handleInputChange}
                          required 
                          className="h-9 text-sm"
                        />
                      </div>
                      <div>
                        <Label htmlFor="reg" className="text-xs">Registration</Label>
                        <Input 
                          id="reg" 
                          name="reg" 
                          placeholder="AB12CDE" 
                          value={formData.reg}
                          onChange={handleInputChange}
                          required 
                          className="h-9 text-sm"
                        />
                      </div>
                    </div>
                    
                    <div>
                      <Label htmlFor="fuelType" className="text-xs">Fuel Type</Label>
                      <select
                        id="fuelType"
                        name="fuelType"
                        value={formData.fuelType}
                        onChange={handleInputChange}
                        required
                        className="w-full h-9 px-3 py-2 border border-input bg-background rounded-md text-sm"
                      >
                        <option value="petrol">Petrol - £150</option>
                        <option value="diesel">Diesel - £180</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Step 2: Contact */}
            {step === 2 && (
              <div className="space-y-4 animate-fade-in">
                <div className="bg-card rounded-xl p-4 border border-border">
                  <h2 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
                    <User className="w-4 h-4 text-primary" />
                    Your Details
                  </h2>
                  
                  <div className="space-y-3">
                    <div>
                      <Label htmlFor="name" className="text-xs">Full Name</Label>
                      <Input 
                        id="name" 
                        name="name" 
                        placeholder="Your name" 
                        value={formData.name}
                        onChange={handleInputChange}
                        required 
                        className="h-9 text-sm"
                      />
                    </div>
                    
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <Label htmlFor="email" className="text-xs">Email</Label>
                        <Input 
                          id="email" 
                          name="email" 
                          type="email" 
                          placeholder="you@email.com" 
                          value={formData.email}
                          onChange={handleInputChange}
                          required 
                          className="h-9 text-sm"
                        />
                      </div>
                      <div>
                        <Label htmlFor="phone" className="text-xs">Phone</Label>
                        <Input 
                          id="phone" 
                          name="phone" 
                          type="tel" 
                          placeholder="07XXX XXXXXX" 
                          value={formData.phone}
                          onChange={handleInputChange}
                          required 
                          className="h-9 text-sm"
                        />
                      </div>
                    </div>
                    
                    <div>
                      <Label htmlFor="postcode" className="text-xs">Postcode</Label>
                      <Input 
                        id="postcode" 
                        name="postcode" 
                        placeholder="HP2 7DE" 
                        value={formData.postcode}
                        onChange={handleInputChange}
                        required 
                        className="h-9 text-sm"
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Step 3: Booking */}
            {step === 3 && (
              <div className="space-y-4 animate-fade-in">
                <div className="bg-card rounded-xl p-4 border border-border">
                  <h2 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-primary" />
                    When Would You Like Us?
                  </h2>
                  
                  <div className="space-y-3">
                    <div>
                      <Label htmlFor="preferredDate" className="text-xs">Preferred Date</Label>
                      <Input 
                        id="preferredDate" 
                        name="preferredDate" 
                        type="date" 
                        value={formData.preferredDate}
                        onChange={handleInputChange}
                        className="h-9 text-sm"
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="message" className="text-xs">Additional Notes (Optional)</Label>
                      <textarea 
                        id="message" 
                        name="message" 
                        placeholder="Any special requirements..."
                        value={formData.message}
                        onChange={handleInputChange}
                        rows={3}
                        className="w-full px-3 py-2 text-sm border border-input bg-background rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-ring"
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Navigation */}
            <div className="flex gap-3 pt-2">
              {step > 1 && (
                <Button
                  type="button"
                  variant="outline"
                  onClick={prevStep}
                  className="flex-1 h-10 rounded-full text-sm"
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back
                </Button>
              )}
              
              {step < 3 ? (
                <Button
                  type="button"
                  onClick={nextStep}
                  disabled={!canProceed()}
                  className={`${step === 1 ? 'w-full' : 'flex-1'} h-10 rounded-full text-sm`}
                >
                  Continue
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              ) : (
                <Button
                  type="submit"
                  className="flex-1 h-10 rounded-full text-sm"
                >
                  Request Booking
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              )}
            </div>

            {/* Help */}
            <p className="text-xs text-center text-muted-foreground pt-2">
              Need help?{" "}
              <a href={`tel:${BUSINESS_INFO.phone}`} className="text-primary hover:underline">
                Call {BUSINESS_INFO.phone}
              </a>
            </p>
          </form>
        </div>
      </section>
      
      <style>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fade-in 0.3s ease-out;
        }
      `}</style>
    </Layout>
  );
};

export default FullService;
