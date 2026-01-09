import { useState } from "react";
import { ArrowRight, ArrowLeft, Car, User, Calendar, Check, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Layout from "@/components/layout/Layout";
import { BUSINESS_INFO } from "@/lib/constants";
import { submitForm } from "@/lib/formService";
import { toast } from "sonner";
import { Link } from "react-router-dom";

const Quote = () => {
  const [step, setStep] = useState(1);
  const [attemptedNext, setAttemptedNext] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [formData, setFormData] = useState({
    // Service
    serviceType: "",
    // Vehicle
    make: "",
    model: "",
    year: "",
    reg: "",
    fuelType: "",
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
    e.stopPropagation();
    
    // Only submit on step 4
    if (step !== 4) {
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      const result = await submitForm(
        {
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          postcode: formData.postcode,
          make: formData.make,
          model: formData.model,
          year: formData.year,
          reg: formData.reg,
          fuelType: formData.fuelType,
          serviceType: formData.serviceType,
          preferredDate: formData.preferredDate,
          message: formData.message,
        },
        'estimate'
      );
      
      if (result.success) {
        setShowSuccess(true);
        toast.success("Request Received!", {
          description: "We'll contact you within 1 business day.",
          duration: 5000,
        });
        
        // Reset form
        setFormData({
          serviceType: "",
          make: "",
          model: "",
          year: "",
          reg: "",
          fuelType: "",
          name: "",
          email: "",
          phone: "",
          postcode: "",
          preferredDate: "",
          message: "",
        });
        setStep(1);
      } else {
        toast.error("Submission Failed", {
          description: result.message || "Please call us at 07354 915941",
          duration: 5000,
        });
      }
    } catch (error) {
      toast.error("Something went wrong", {
        description: "Please call us at 07354 915941",
        duration: 5000,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    // Prevent Enter key from triggering form actions
    if (e.key === 'Enter') {
      const target = e.target as HTMLElement;
      
      // Allow Enter in textareas
      if (target.tagName === 'TEXTAREA') {
        return;
      }
      
      // Prevent Enter key on date inputs completely
      if (target.tagName === 'INPUT' && (target as HTMLInputElement).type === 'date') {
        e.preventDefault();
        e.stopPropagation();
        return;
      }
      
      // On step 4, NEVER auto-advance - user must click submit button
      if (step === 4) {
        if (target.tagName !== 'BUTTON' || (target as HTMLButtonElement).type !== 'submit') {
          e.preventDefault();
          e.stopPropagation();
        }
        return;
      }
      
      // Only advance on steps 1-3, and only if not clicking a button
      if (target.tagName !== 'BUTTON') {
        e.preventDefault();
        e.stopPropagation();
        nextStep();
      }
    }
  };

  const isValidEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const canProceed = () => {
    switch (step) {
      case 1:
        return formData.serviceType;
      case 2:
        return formData.make && formData.model && formData.fuelType;
      case 3:
        return formData.name && formData.email && isValidEmail(formData.email) && formData.phone && formData.postcode;
      default:
        return true;
    }
  };

  const nextStep = () => {
    setAttemptedNext(true);
    if (canProceed()) {
      setStep(Math.min(step + 1, 4));
      setAttemptedNext(false);
    }
  };

  const prevStep = () => setStep(step - 1);

  // Success screen
  if (showSuccess) {
    return (
      <Layout>
        <section className="py-12 md:py-16 bg-background min-h-screen flex items-center justify-center">
          <div className="container mx-auto px-4 max-w-2xl">
            <div className="bg-card rounded-2xl p-8 md:p-12 border border-border shadow-lg text-center">
              <div className="w-20 h-20 bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <Check className="w-10 h-10 text-green-500" />
              </div>
              
              <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
                Quote Request Received!
              </h1>
              
              <p className="text-base md:text-lg text-muted-foreground mb-8">
                Thank you for your request. We'll review your details and get back to you within 1 business day with a personalized quote.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center">
                <Button asChild className="w-full sm:w-auto rounded-full h-12 px-8">
                  <Link to="/services">
                    View Our Services
                  </Link>
                </Button>
                
                <Button asChild variant="outline" className="w-full sm:w-auto rounded-full h-12 px-8">
                  <a href={`tel:${BUSINESS_INFO.phone}`}>
                    Call {BUSINESS_INFO.phone}
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </Layout>
    );
  }

  return (
    <Layout>
      <section className="py-6 md:py-8 bg-background min-h-screen overflow-x-hidden">
        <div className="container mx-auto px-4 max-w-xl w-full">
          {/* Header */}
          <div className="text-center mb-4">
            <h1 className="text-xl md:text-2xl font-bold text-foreground mb-1">
              Request a Quote
            </h1>
            <p className="text-sm text-muted-foreground">
              Tell us what you need and we'll provide a free quote
            </p>
          </div>

          {/* Progress */}
          <div className="mb-6 max-w-md mx-auto">
            <div className="flex items-center justify-center gap-2 mb-2">
              {[1, 2, 3, 4].map((s) => (
                <div key={s} className="flex items-center">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium transition-all ${
                    s < step ? 'bg-muted text-muted-foreground' :
                    s === step ? 'bg-card text-foreground border border-border' :
                    'bg-background text-muted-foreground/40 border border-border/40'
                  }`}>
                    {s < step ? <Check className="w-4 h-4" /> : s}
                  </div>
                  {s < 4 && (
                    <div className={`w-8 h-[1px] mx-1 transition-all ${
                      s < step ? 'bg-border' : 'bg-border/30'
                    }`} />
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} onKeyDown={handleKeyDown} className="space-y-4 w-full max-w-full overflow-x-hidden">
            {/* Step 1: Service */}
            {step === 1 && (
              <div className="space-y-4 animate-fade-in w-full max-w-full overflow-hidden">
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
                        <option value="interim">Interim Service - From £110</option>
                        <option value="full">Full Service - From £150</option>
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
              <div className="space-y-4 animate-fade-in w-full max-w-full overflow-hidden">
                <div className="bg-card rounded-xl p-4 border border-border">
                  <h2 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
                    <Car className="w-4 h-4 text-primary" />
                    Vehicle Details
                  </h2>
                  
                  <div className="space-y-3">
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <Label htmlFor="make" className="text-sm mb-1.5">Make</Label>
                        <Input 
                          id="make" 
                          name="make" 
                          placeholder="Ford" 
                          value={formData.make}
                          onChange={handleInputChange}
                          required 
                          className="h-12 text-base"
                          style={{ fontSize: '16px' }}
                        />
                      </div>
                      <div>
                        <Label htmlFor="model" className="text-sm mb-1.5">Model</Label>
                        <Input 
                          id="model" 
                          name="model" 
                          placeholder="Focus" 
                          value={formData.model}
                          onChange={handleInputChange}
                          required 
                          className="h-12 text-base"
                          style={{ fontSize: '16px' }}
                        />
                      </div>
                    </div>
                    
                    <div>
                      <Label htmlFor="reg" className="text-sm mb-1.5">Registration Plate</Label>
                      <div className="relative">
                        <div className="absolute left-0 top-0 bottom-0 w-10 bg-[#0C4DA2] rounded-l-md flex items-center justify-center z-10">
                          <div className="text-[#FFD500] font-bold text-xs">GB</div>
                        </div>
                        <Input 
                          id="reg" 
                          name="reg" 
                          placeholder="AB12CDE" 
                          value={formData.reg}
                          onChange={handleInputChange}
                          maxLength={8}
                          className="h-12 pl-12 pr-3 text-base font-bold tracking-wider uppercase bg-[#FFD500] text-black border-2 border-black placeholder:text-black/40"
                          style={{ paddingLeft: '3rem', textAlign: 'left', fontSize: '16px' }}
                        />
                      </div>
                    </div>
                    
                    <div>
                      <Label htmlFor="fuelType" className="text-sm mb-1.5">Fuel Type</Label>
                      <select
                        id="fuelType"
                        name="fuelType"
                        value={formData.fuelType}
                        onChange={handleInputChange}
                        className={`w-full h-12 px-3 py-2 border bg-background rounded-md text-base appearance-none cursor-pointer transition-colors ${
                          attemptedNext && !formData.fuelType ? 'border-red-500 border-2' : 'border-input'
                        }`}
                        style={{
                          fontSize: '16px',
                          backgroundImage: 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'12\' height=\'12\' viewBox=\'0 0 12 12\'%3E%3Cpath fill=\'%23666\' d=\'M6 9L1 4h10z\'/%3E%3C/svg%3E")',
                          backgroundRepeat: 'no-repeat',
                          backgroundPosition: 'right 0.75rem center',
                          backgroundSize: '12px',
                        }}
                      >
                        <option value="">--</option>
                        <option value="petrol">Petrol</option>
                        <option value="diesel">Diesel</option>
                      </select>
                      {attemptedNext && !formData.fuelType && (
                        <p className="text-xs text-red-500 mt-1">Please select a fuel type</p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Step 3: Contact */}
            {step === 3 && (
              <div className="space-y-4 animate-fade-in w-full max-w-full overflow-hidden">
                <div className="bg-card rounded-xl p-4 border border-border">
                  <h2 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
                    <User className="w-4 h-4 text-primary" />
                    Your Details
                  </h2>
                  
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="name" className="text-sm mb-1.5">Full Name</Label>
                      <Input 
                        id="name" 
                        name="name" 
                        placeholder="Your name" 
                        value={formData.name}
                        onChange={handleInputChange}
                        required 
                        className="h-12 text-base"
                        style={{ fontSize: '16px' }}
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="email" className="text-sm mb-1.5">Email</Label>
                      <Input 
                        id="email" 
                        name="email" 
                        type="email" 
                        placeholder="you@email.com" 
                        value={formData.email}
                        onChange={handleInputChange}
                        required 
                        className={`h-12 text-base transition-colors ${
                          attemptedNext && (!formData.email || !isValidEmail(formData.email)) ? 'border-red-500 border-2' : ''
                        }`}
                        style={{ fontSize: '16px' }}
                      />
                      {attemptedNext && !formData.email && (
                        <p className="text-xs text-red-500 mt-1">Email is required</p>
                      )}
                      {attemptedNext && formData.email && !isValidEmail(formData.email) && (
                        <p className="text-xs text-red-500 mt-1">Please enter a valid email</p>
                      )}
                    </div>
                    
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <Label htmlFor="phone" className="text-sm mb-1.5">Phone</Label>
                        <Input 
                          id="phone" 
                          name="phone" 
                          type="tel" 
                          placeholder="07XXX XXXXXX" 
                          value={formData.phone}
                          onChange={handleInputChange}
                          required 
                          className="h-12 text-base"
                          style={{ fontSize: '16px' }}
                        />
                      </div>
                      <div>
                        <Label htmlFor="postcode" className="text-sm mb-1.5">Postcode</Label>
                        <Input 
                          id="postcode" 
                          name="postcode" 
                          placeholder="HP2 7DE" 
                          value={formData.postcode}
                          onChange={handleInputChange}
                          required 
                          className="h-12 text-base"
                          style={{ fontSize: '16px' }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Step 4: Details */}
            {step === 4 && (
              <div className="space-y-4 animate-fade-in w-full max-w-full overflow-hidden">
                <div className="bg-card rounded-xl p-4 border border-border">
                  <h2 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-primary" />
                    Schedule & Details
                  </h2>
                  
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="preferredDate" className="text-sm mb-1.5">Preferred Date (Optional)</Label>
                      <div className="max-w-full overflow-hidden">
                        <Input 
                          id="preferredDate" 
                          name="preferredDate" 
                          type="date" 
                          value={formData.preferredDate}
                          onChange={handleInputChange}
                          min={new Date().toISOString().split('T')[0]}
                          className="h-12 text-base w-full"
                          style={{ fontSize: '16px', maxWidth: '100%' }}
                        />
                      </div>
                    </div>
                    
                    <div>
                      <Label htmlFor="message" className="text-sm mb-1.5">Describe the Issue (Optional)</Label>
                      <textarea 
                        id="message" 
                        name="message" 
                        placeholder="Any symptoms, noises, or additional details..."
                        value={formData.message}
                        onChange={handleInputChange}
                        rows={4}
                        className="w-full px-3 py-3 text-base border border-input bg-background rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-ring"
                        style={{ fontSize: '16px' }}
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
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    nextStep();
                  }}
                  disabled={!canProceed()}
                  className={`${step === 1 ? 'w-full' : 'flex-1'} h-10 rounded-full text-sm transition-all ${
                    !canProceed() ? 'opacity-50 cursor-not-allowed' : ''
                  }`}
                >
                  Continue
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              ) : (
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex-1 h-10 rounded-full text-sm"
                >
                  {isSubmitting ? "Submitting..." : "Request Quote"}
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
