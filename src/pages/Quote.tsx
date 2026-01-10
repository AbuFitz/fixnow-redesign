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
        return formData.reg && formData.fuelType;
      case 3:
        return true; // Details/Schedule step - all optional
      case 4:
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
            <div className="bg-card rounded-xl p-8 md:p-12 border border-border text-center">
              {/* Success Icon */}
              <div className="flex items-center justify-center mb-6">
                <div className="w-20 h-20 bg-green-600 rounded-full flex items-center justify-center">
                  <Check className="w-10 h-10 text-white stroke-[3]" />
                </div>
              </div>
              
              {/* Heading */}
              <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-3">
                Request Received
              </h1>
              
              {/* Description */}
              <p className="text-base text-muted-foreground mb-6">
                Request received! We'll review your details and contact you shortly by call, text, or email with your quote.
              </p>
              
              {/* Email Notice */}
              <div className="bg-zinc-800 dark:bg-zinc-900 rounded-lg p-4 mb-8">
                <p className="text-sm text-white font-medium">
                  <strong className="text-white">Check your email</strong> - A confirmation has been sent. If you don't see it, please check your junk/spam folder.
                </p>
              </div>
              
              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Button asChild className="rounded-full h-11 px-8">
                  <a href={`tel:${BUSINESS_INFO.phone}`}>
                    Call {BUSINESS_INFO.phone}
                  </a>
                </Button>
                
                <Button asChild variant="outline" className="rounded-full h-11 px-8">
                  <Link to="/services">
                    View Services
                  </Link>
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
      <section className="py-8 md:py-12 bg-background min-h-screen overflow-x-hidden">
        <div className="container mx-auto px-5 sm:px-6 max-w-2xl w-full">
          {/* Header */}
          <div className="text-center mb-6">
            <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
              Request a Quote
            </h1>
            <p className="text-base text-muted-foreground">
              Tell us what you need and we'll provide a free quote
            </p>
          </div>

          {/* Progress */}
          <div className="mb-8 max-w-md mx-auto">
            <div className="flex items-center justify-center gap-2 mb-2">
              {[1, 2, 3, 4].map((s) => (
                <div key={s} className="flex items-center">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium transition-all ${
                    s < step ? 'bg-muted text-muted-foreground' :
                    s === step ? 'bg-card text-foreground border-2 border-border' :
                    'bg-background text-muted-foreground/40 border border-border/40'
                  }`}>
                    {s < step ? <Check className="w-5 h-5" /> : s}
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
                <div className="bg-card rounded-xl p-5 sm:p-6 border border-border">
                  <h2 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                    <FileText className="w-5 h-5 text-primary" />
                    What Do You Need?
                  </h2>
                  
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="serviceType" className="text-base mb-2 block">
                        Select a service
                      </Label>
                    <select
                      id="serviceType"
                      name="serviceType"
                      value={formData.serviceType}
                      onChange={handleInputChange}
                      required
                      className={`w-full h-14 px-4 py-2 border bg-background rounded-lg text-base appearance-none cursor-pointer transition-colors ${
                        attemptedNext && !formData.serviceType ? 'border-red-500 border-2' : 'border-input'
                      }`}
                      style={{
                        fontSize: '16px',
                        backgroundImage: 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'12\' height=\'12\' viewBox=\'0 0 12 12\'%3E%3Cpath fill=\'%23666\' d=\'M6 9L1 4h10z\'/%3E%3C/svg%3E")',
                        backgroundRepeat: 'no-repeat',
                        backgroundPosition: 'right 1rem center',
                        backgroundSize: '12px',
                      }}
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
                      <optgroup label="Suspension">
                        <option value="suspension-check">Suspension Check - £45</option>
                        <option value="suspension-repair">Suspension Repair - Request Quote</option>
                      </optgroup>
                      <optgroup label="General Repairs">
                        <option value="general-repair">General Repairs - £45/hour</option>
                        <option value="other">Something Else</option>
                      </optgroup>
                    </select>
                    {attemptedNext && !formData.serviceType && (
                      <p className="text-sm text-red-500 mt-2">Please select a service</p>
                    )}
                    </div>
                    
                    {formData.serviceType && (
                      <div className="bg-muted/50 rounded-lg p-4 border border-border">
                        <p className="text-sm text-muted-foreground">
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
                <div className="bg-card rounded-xl p-5 sm:p-6 border border-border">
                  <h2 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                    <Car className="w-5 h-5 text-primary" />
                    Vehicle Details
                  </h2>
                  
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="reg" className="text-base mb-2 block">
                        Registration Plate
                      </Label>
                      <Input 
                        id="reg" 
                        name="reg" 
                        placeholder="AB12 CDE" 
                        value={formData.reg}
                        onChange={handleInputChange}
                        required
                        maxLength={8}
                        className={`h-14 px-4 text-base font-semibold tracking-wider uppercase transition-colors ${
                          attemptedNext && !formData.reg ? 'border-red-500 border-2' : ''
                        }`}
                        style={{ fontSize: '16px' }}
                      />
                      {attemptedNext && !formData.reg && (
                        <p className="text-sm text-red-500 mt-2">Registration plate is needed</p>
                      )}
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="make" className="text-base mb-2 block text-muted-foreground">Make (Optional)</Label>
                        <Input 
                          id="make" 
                          name="make" 
                          placeholder="e.g. Ford" 
                          value={formData.make}
                          onChange={handleInputChange}
                          className="h-14 text-base"
                          style={{ fontSize: '16px' }}
                        />
                      </div>
                      <div>
                        <Label htmlFor="model" className="text-base mb-2 block text-muted-foreground">Model (Optional)</Label>
                        <Input 
                          id="model" 
                          name="model" 
                          placeholder="e.g. Focus" 
                          value={formData.model}
                          onChange={handleInputChange}
                          className="h-14 text-base"
                          style={{ fontSize: '16px' }}
                        />
                      </div>
                    </div>
                    
                    <div>
                      <Label htmlFor="fuelType" className="text-base mb-2 block">
                        Fuel Type
                      </Label>
                      <select
                        id="fuelType"
                        name="fuelType"
                        value={formData.fuelType}
                        onChange={handleInputChange}
                        className={`w-full h-14 px-4 py-2 border bg-background rounded-lg text-base appearance-none cursor-pointer transition-colors ${
                          attemptedNext && !formData.fuelType ? 'border-red-500 border-2' : 'border-input'
                        }`}
                        style={{
                          fontSize: '16px',
                          backgroundImage: 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'12\' height=\'12\' viewBox=\'0 0 12 12\'%3E%3Cpath fill=\'%23666\' d=\'M6 9L1 4h10z\'/%3E%3C/svg%3E")',
                          backgroundRepeat: 'no-repeat',
                          backgroundPosition: 'right 1rem center',
                          backgroundSize: '12px',
                        }}
                      >
                        <option value="">Select fuel type</option>
                        <option value="petrol">Petrol</option>
                        <option value="diesel">Diesel</option>
                      </select>
                      {attemptedNext && !formData.fuelType && (
                        <p className="text-sm text-red-500 mt-2">Fuel type is needed</p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Step 3: Details */}
            {step === 3 && (
              <div className="space-y-4 animate-fade-in w-full max-w-full overflow-hidden">
                <div className="bg-card rounded-xl p-5 sm:p-6 border border-border">
                  <h2 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                    <Calendar className="w-5 h-5 text-primary" />
                    Schedule & Details
                  </h2>
                  
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="preferredDate" className="text-base mb-2 block">Preferred Date (Optional)</Label>
                      <Input 
                        id="preferredDate" 
                        name="preferredDate" 
                        type="text"
                        placeholder="e.g. 15/01/2026 or Next Monday"
                        value={formData.preferredDate}
                        onChange={handleInputChange}
                        className="h-14 text-base w-full"
                        style={{ fontSize: '16px' }}
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="message" className="text-base mb-2 block">Describe the Issue (Optional)</Label>
                      <textarea 
                        id="message" 
                        name="message" 
                        placeholder="Any symptoms, noises, or additional details..."
                        value={formData.message}
                        onChange={handleInputChange}
                        rows={4}
                        className="w-full px-4 py-3 text-base border border-input bg-background rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-ring"
                        style={{ fontSize: '16px' }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Step 4: Contact */}
            {step === 4 && (
              <div className="space-y-4 animate-fade-in w-full max-w-full overflow-hidden">
                <div className="bg-card rounded-xl p-5 sm:p-6 border border-border">
                  <h2 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                    <User className="w-5 h-5 text-primary" />
                    Your Details
                  </h2>
                  
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="name" className="text-base mb-2 block">Full Name</Label>
                      <Input 
                        id="name" 
                        name="name" 
                        placeholder="Your name" 
                        value={formData.name}
                        onChange={handleInputChange}
                        required 
                        className={`h-14 text-base transition-colors ${
                          attemptedNext && !formData.name ? 'border-red-500 border-2' : ''
                        }`}
                        style={{ fontSize: '16px' }}
                      />
                      {attemptedNext && !formData.name && (
                        <p className="text-sm text-red-500 mt-2">Name is needed</p>
                      )}
                    </div>
                    
                    <div>
                      <Label htmlFor="email" className="text-base mb-2 block">Email</Label>
                      <Input 
                        id="email" 
                        name="email" 
                        type="email" 
                        inputMode="email"
                        autoComplete="email"
                        placeholder="you@email.com" 
                        value={formData.email}
                        onChange={handleInputChange}
                        required 
                        className={`h-14 text-base transition-colors ${
                          attemptedNext && (!formData.email || !isValidEmail(formData.email)) ? 'border-red-500 border-2' : ''
                        }`}
                        style={{ fontSize: '16px' }}
                      />
                      {attemptedNext && !formData.email && (
                        <p className="text-sm text-red-500 mt-2">Email is needed</p>
                      )}
                      {attemptedNext && formData.email && !isValidEmail(formData.email) && (
                        <p className="text-sm text-red-500 mt-2">Please enter a valid email</p>
                      )}
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="phone" className="text-base mb-2 block">Phone</Label>
                        <Input 
                          id="phone" 
                          name="phone" 
                          type="tel" 
                          inputMode="tel"
                          autoComplete="tel"
                          placeholder="07XXX XXXXXX" 
                          value={formData.phone}
                          onChange={handleInputChange}
                          required 
                          className={`h-14 text-base transition-colors ${
                            attemptedNext && !formData.phone ? 'border-red-500 border-2' : ''
                          }`}
                          style={{ fontSize: '16px' }}
                        />
                        {attemptedNext && !formData.phone && (
                          <p className="text-sm text-red-500 mt-2">Phone is needed</p>
                        )}
                      </div>
                      <div>
                        <Label htmlFor="postcode" className="text-base mb-2 block">Postcode</Label>
                        <Input 
                          id="postcode" 
                          name="postcode" 
                          inputMode="text"
                          autoComplete="postal-code"
                          placeholder="HP2 7DE" 
                          value={formData.postcode}
                          onChange={handleInputChange}
                          required 
                          className={`h-14 text-base transition-colors ${
                            attemptedNext && !formData.postcode ? 'border-red-500 border-2' : ''
                          }`}
                          style={{ fontSize: '16px' }}
                        />
                        {attemptedNext && !formData.postcode && (
                          <p className="text-sm text-red-500 mt-2">Postcode is needed</p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Navigation */}
            <div className="flex gap-4 pt-4">
              {step > 1 && (
                <Button
                  type="button"
                  variant="outline"
                  onClick={prevStep}
                  className="flex-1 h-14 rounded-lg text-base px-8 w-full sm:w-auto"
                >
                  <ArrowLeft className="w-5 h-5 mr-2" />
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
                  className={`${step === 1 ? 'w-full' : 'flex-1'} h-14 rounded-lg text-base px-8 w-full sm:w-auto transition-all`}
                >
                  Continue
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              ) : (
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex-1 h-14 rounded-lg text-base px-8 w-full sm:w-auto"
                >
                  {isSubmitting ? "Submitting..." : "Request Quote"}
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              )}
            </div>

            {/* Help */}
            <p className="text-sm text-center text-muted-foreground pt-4">
              Need help?{" "}
              <a href={`tel:${BUSINESS_INFO.phone}`} className="text-primary hover:underline font-medium">
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
