import { useState } from "react";
import { ArrowRight, ArrowLeft, Car, User, Calendar, Check, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Layout from "@/components/layout/Layout";
import { BUSINESS_INFO } from "@/lib/constants";

const Quote = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    // Service
    serviceType: "",
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
        return formData.serviceType;
      case 2:
        return formData.make && formData.model && formData.year && formData.reg;
      case 3:
        return formData.name && formData.email && formData.phone && formData.postcode;
      default:
        return true;
    }
  };

  const nextStep = () => {
    if (canProceed()) setStep(step + 1);
  };

  const prevStep = () => setStep(step - 1);

  return (
    <Layout>
      <section className="py-6 md:py-8 bg-background min-h-screen">
        <div className="container mx-auto px-4 max-w-xl">
          {/* Progress */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-2">
              {[1, 2, 3, 4].map((s) => (
                <div key={s} className="flex items-center flex-1">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                    s < step ? 'bg-primary text-primary-foreground' :
                    s === step ? 'bg-primary text-primary-foreground' :
                    'bg-muted text-muted-foreground'
                  }`}>
                    {s < step ? <Check className="w-4 h-4" /> : s}
                  </div>
                  {s < 4 && (
                    <div className={`flex-1 h-0.5 mx-2 ${s < step ? 'bg-primary' : 'bg-muted'}`} />
                  )}
                </div>
              ))}
            </div>
            <p className="text-xs text-center text-muted-foreground">
              Step {step} of 4
            </p>
          </div>

          {/* Header */}
          <div className="text-center mb-6">
            <h1 className="text-xl md:text-2xl font-bold text-foreground mb-1">
              Request a Quote
            </h1>
            <p className="text-sm text-muted-foreground">
              Tell us what you need and we'll provide a free quote
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Step 1: Service */}
            {step === 1 && (
              <div className="space-y-4 animate-fade-in">
                <div className="bg-card rounded-xl p-4 border border-border">
                  <h2 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
                    <FileText className="w-4 h-4 text-primary" />
                    What Do You Need?
                  </h2>
                  
                  <div className="space-y-3">
                    <select
                      id="serviceType"
                      name="serviceType"
                      value={formData.serviceType}
                      onChange={handleInputChange}
                      required
                      className="w-full h-10 px-3 py-2 border border-input bg-background rounded-md text-sm"
                    >
                      <option value="">Select a service...</option>
                      <optgroup label="Diagnostics & Inspections">
                        <option value="health-check">Basic Health Check - £35</option>
                        <option value="diagnostic">Mobile Diagnostic - £45</option>
                        <option value="pre-purchase">Pre-Purchase Inspection - £85</option>
                      </optgroup>
                      <optgroup label="Servicing">
                        <option value="interim">Interim Service - £110</option>
                        <option value="full-petrol">Full Service (Petrol) - £150</option>
                        <option value="full-diesel">Full Service (Diesel) - £180</option>
                      </optgroup>
                      <optgroup label="Brake Services">
                        <option value="brake-fluid">Brake Fluid Change - £55</option>
                        <option value="brake-pads">Brake Pad Replacement - From £90</option>
                        <option value="pads-discs">Brake Pads & Discs - From £160</option>
                      </optgroup>
                      <optgroup label="Electrical & Battery">
                        <option value="battery-standard">Battery Replacement (Standard) - £100</option>
                        <option value="battery-stopstart">Battery Replacement (Stop-Start) - £150</option>
                      </optgroup>
                      <optgroup label="General Repairs">
                        <option value="general-repair">General Repairs - £45/hour</option>
                        <option value="other">Something Else</option>
                      </optgroup>
                    </select>
                    
                    {formData.serviceType && (
                      <div className="bg-muted/50 rounded-lg p-3 border border-border">
                        <p className="text-xs text-muted-foreground">
                          We'll provide a detailed quote based on your vehicle and requirements
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Step 2: Vehicle */}
            {step === 2 && (
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
                  </div>
                </div>
              </div>
            )}

            {/* Step 3: Contact */}
            {step === 3 && (
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

            {/* Step 4: Details */}
            {step === 4 && (
              <div className="space-y-4 animate-fade-in">
                <div className="bg-card rounded-xl p-4 border border-border">
                  <h2 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-primary" />
                    Additional Information
                  </h2>
                  
                  <div className="space-y-3">
                    <div>
                      <Label htmlFor="preferredDate" className="text-xs">Preferred Date (Optional)</Label>
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
                      <Label htmlFor="message" className="text-xs">Describe the Issue (Optional)</Label>
                      <textarea 
                        id="message" 
                        name="message" 
                        placeholder="Any symptoms, noises, or additional details..."
                        value={formData.message}
                        onChange={handleInputChange}
                        rows={4}
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
              
              {step < 4 ? (
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
                  Request Quote
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

export default Quote;
