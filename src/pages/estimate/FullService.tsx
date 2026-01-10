import { useState } from "react";
import { ArrowRight, ArrowLeft, Car, User, Calendar, Check, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Layout from "@/components/layout/Layout";
import { BUSINESS_INFO } from "@/lib/constants";
import { submitForm } from "@/lib/formService";
import { toast } from "sonner";
import { Link } from "react-router-dom";

const FullService = () => {
  const [step, setStep] = useState(1);
  const [attemptedNext, setAttemptedNext] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [formData, setFormData] = useState({
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    // Only submit on step 3
    if (step !== 3) {
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
          vehicleMake: formData.make,
          vehicleModel: formData.model,
          vehicleYear: formData.year,
          vehicleReg: formData.reg,
          fuelType: formData.fuelType,
          serviceType: `Full Service - ${formData.fuelType === 'diesel' ? '£180' : '£150'} (${formData.fuelType})`,
          preferredDate: formData.preferredDate,
          message: formData.message,
        },
        'full'
      );
      
      if (result.success) {
        setShowSuccess(true);
        
        // Reset form
        setFormData({
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
        setAttemptedNext(false);
      } else {
        toast.error("Submission Failed", {
          description: result.message || "Please try again or call us directly.",
          duration: 5000,
        });
      }
    } catch (error) {
      console.error("Form submission error:", error);
      toast.error("Something went wrong", {
        description: "Please try again or call us at " + BUSINESS_INFO.phone,
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
    if (e.key === 'Enter') {
      const target = e.target as HTMLElement;
      
      // Allow Enter in textareas
      if (target.tagName === 'TEXTAREA') {
        return;
      }
      
      // Block Enter on date inputs completely
      if (target.tagName === 'INPUT' && (target as HTMLInputElement).type === 'date') {
        e.preventDefault();
        e.stopPropagation();
        return;
      }
      
      // On step 3 (final step), NEVER auto-submit
      if (step === 3) {
        if (target.tagName !== 'BUTTON' || (target as HTMLButtonElement).type !== 'submit') {
          e.preventDefault();
          e.stopPropagation();
        }
        return;
      }
      
      // On steps 1-2, allow advancing but not on buttons
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
        return formData.make && formData.model && formData.reg && formData.fuelType;
      case 2:
        return formData.name && formData.email && isValidEmail(formData.email) && formData.phone && formData.postcode;
      default:
        return true;
    }
  };

  const nextStep = () => {
    setAttemptedNext(true);
    if (canProceed()) {
      setStep(step + 1);
      setAttemptedNext(false);
    }
  };

  const prevStep = () => setStep(step - 1);

  const getPrice = () => {
    if (!formData.fuelType) return "From £150";
    return formData.fuelType === "diesel" ? "£180" : "£150";
  };

  const price = getPrice();

  return (
    <Layout>
      <section className="py-6 md:py-8 bg-background min-h-screen overflow-x-hidden">
        <div className="container mx-auto px-4 max-w-xl w-full">
          
          {/* Success Screen */}
          {showSuccess ? (
            <div className="max-w-3xl mx-auto">
              <div className="bg-card rounded-2xl p-6 md:p-10 border border-border shadow-sm">
                {/* Success Icon */}
                <div className="flex items-center justify-center mb-6">
                  <div className="w-20 h-20 bg-[#FF6B35] rounded-full flex items-center justify-center">
                    <Check className="w-10 h-10 text-white stroke-[3]" />
                  </div>
                </div>
                
                {/* Heading */}
                <h1 className="text-2xl md:text-3xl font-bold text-center text-foreground mb-3">
                  Booking Received
                </h1>
                
                {/* Description */}
                <p className="text-center text-base text-muted-foreground mb-6">
                  Your FixNow Mechanics full service booking has been successfully submitted. A member of our team is now reviewing your details.
                </p>
                
                {/* Request Details */}
                <div className="bg-secondary/30 rounded-lg p-5 mb-6">
                  <h2 className="font-semibold text-lg mb-3 text-foreground">Your Request</h2>
                  <div className="space-y-2 text-sm">
                    {formData.make && formData.model && (
                      <div className="flex">
                        <span className="text-muted-foreground min-w-[100px]">Vehicle:</span>
                        <span className="font-medium text-foreground">
                          {formData.make} {formData.model} {formData.year && `(${formData.year})`}
                        </span>
                      </div>
                    )}
                    {formData.fuelType && (
                      <div className="flex">
                        <span className="text-muted-foreground min-w-[100px]">Fuel Type:</span>
                        <span className="font-medium text-foreground">{formData.fuelType}</span>
                      </div>
                    )}
                    <div className="flex">
                      <span className="text-muted-foreground min-w-[100px]">Service:</span>
                      <span className="font-medium text-foreground">Full Service - {price}</span>
                    </div>
                    {formData.postcode && (
                      <div className="flex">
                        <span className="text-muted-foreground min-w-[100px]">Postcode:</span>
                        <span className="font-medium text-foreground">{formData.postcode}</span>
                      </div>
                    )}
                    {formData.preferredDate && (
                      <div className="flex">
                        <span className="text-muted-foreground min-w-[100px]">Preferred time:</span>
                        <span className="font-medium text-foreground">{formData.preferredDate}</span>
                      </div>
                    )}
                  </div>
                </div>
                
                {/* What Happens Next */}
                <div className="bg-[#FFF3E6] dark:bg-[#3d2a1a] rounded-lg p-5 mb-6 border-l-4 border-[#FF6B35]">
                  <h2 className="font-semibold text-lg mb-3 text-foreground">What Happens Next</h2>
                  <div className="space-y-2 text-sm text-foreground/90">
                    <p>✓ We confirm your appointment time</p>
                    <p>✓ We'll arrive at the agreed time</p>
                    <p>✓ Our mechanic will introduce themselves</p>
                    <p>✓ We complete the full service with 50-point inspection</p>
                    <p>✓ You pay only after the job is done</p>
                  </div>
                  <p className="text-xs text-muted-foreground italic mt-3">
                    Nothing is charged until the service is complete.
                  </p>
                </div>
                
                {/* When Will I Receive */}
                <div className="bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 rounded-lg p-5 mb-6">
                  <h2 className="font-semibold text-base mb-2 text-blue-900 dark:text-blue-200">
                    When Will I Receive Confirmation?
                  </h2>
                  <p className="text-sm text-blue-800 dark:text-blue-300 mb-2">
                    Most bookings are confirmed within <strong>15 to 60 minutes</strong> during working hours.
                  </p>
                  <p className="text-sm text-blue-800 dark:text-blue-300">
                    <strong>Check your email</strong> for the next update. If you don't see it, please check your junk/spam folder.
                  </p>
                </div>
                
                {/* Need Urgent Help */}
                <div className="bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-800 rounded-lg p-5 mb-6">
                  <h2 className="font-semibold text-base mb-2 text-red-900 dark:text-red-200">
                    Need Urgent Help?
                  </h2>
                  <p className="text-sm text-red-800 dark:text-red-300 mb-3">
                    If your vehicle will not start, is blocking a road, or is unsafe to drive, please call us on
                  </p>
                  <a 
                    href={`tel:${BUSINESS_INFO.phone}`}
                    className="inline-block font-bold text-lg text-[#FF6B35] hover:text-[#FF6B35]/80 transition-colors"
                  >
                    {BUSINESS_INFO.phone}
                  </a>
                </div>
                
                {/* Pricing */}
                <div className="bg-secondary/20 rounded-lg p-5 mb-6">
                  <h2 className="font-semibold text-base mb-2 text-foreground">Pricing</h2>
                  <p className="text-sm text-muted-foreground">
                    Fixed price of {price} includes all filters, fluids, comprehensive 50-point inspection, and service book stamp. Payment after completion.
                  </p>
                </div>
                
                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <Button asChild className="rounded-full h-11 px-6 bg-[#FF6B35] hover:bg-[#FF6B35]/90">
                    <Link to="/services">
                      View Our Services
                    </Link>
                  </Button>
                  
                  <Button asChild variant="outline" className="rounded-full h-11 px-6 border-[#FF6B35] text-[#FF6B35] hover:bg-[#FF6B35]/10">
                    <a href={`tel:${BUSINESS_INFO.phone}`}>
                      Call {BUSINESS_INFO.phone}
                    </a>
                  </Button>
                </div>
              </div>
            </div>
          ) : (
                    </a>
                  </Button>
                </div>
              </div>
            </div>
          ) : (
            <>
          {/* Header */}
          <div className="text-center mb-4">
            <h1 className="text-xl md:text-2xl font-bold text-foreground mb-1">
              Full Service Booking
            </h1>
            <p className="text-sm text-muted-foreground">
              From {price}
            </p>
          </div>

          {/* Progress */}
          <div className="mb-6 max-w-md mx-auto">
            <div className="flex items-center justify-center gap-2 mb-2">
              {[1, 2, 3].map((s) => (
                <div key={s} className="flex items-center">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold transition-all border-2 ${
                    s < step ? 'bg-primary text-primary-foreground border-primary' :
                    s === step ? 'bg-foreground text-background border-foreground' :
                    'bg-background text-muted-foreground border-border'
                  }`}>
                    {s < step ? <Check className="w-5 h-5" /> : s}
                  </div>
                  {s < 3 && (
                    <div className={`w-16 h-1 mx-1 rounded-full transition-all ${
                      s < step ? 'bg-primary' : 'bg-border'
                    }`} />
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} onKeyDown={handleKeyDown} className="space-y-4 w-full max-w-full overflow-x-hidden">
            {/* Step 1: Vehicle */}
            {step === 1 && (
              <div className="space-y-4 animate-fade-in w-full max-w-full overflow-hidden">
                <div className="bg-card rounded-xl p-4 border border-border">
                  <h2 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
                    <Car className="w-4 h-4 text-primary" />
                    Vehicle Details
                  </h2>
                  
                  <div className="space-y-4">
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
                          className="h-11 text-base"
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
                          className="h-11 text-base"
                        />
                      </div>
                    </div>
                    
                    <div>
                      <Label htmlFor="reg" className="text-sm mb-1.5">Registration Plate</Label>
                      <div className="relative">
                        <div className="absolute left-0 top-0 bottom-0 w-10 bg-[#0C4DA2] rounded-l-md flex items-center justify-center">
                          <div className="text-[#FFD500] font-bold text-xs">GB</div>
                        </div>
                        <Input 
                          id="reg" 
                          name="reg" 
                          placeholder="AB12CDE" 
                          value={formData.reg}
                          onChange={handleInputChange}
                          required 
                          className="h-11 pl-12 pr-3 text-base font-bold tracking-wider uppercase bg-[#FFD500] text-black border-2 border-black placeholder:text-black/40"
                          style={{ paddingLeft: '3rem', textAlign: 'left' }}
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
                        required
                        className={`w-full h-11 px-3 py-2 border bg-background rounded-md text-base appearance-none cursor-pointer transition-colors ${
                          attemptedNext && !formData.fuelType ? 'border-red-500 border-2' : 'border-input'
                        }`}
                        style={{
                          backgroundImage: 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'12\' height=\'12\' viewBox=\'0 0 12 12\'%3E%3Cpath fill=\'%23666\' d=\'M6 9L1 4h10z\'/%3E%3C/svg%3E")',
                          backgroundRepeat: 'no-repeat',
                          backgroundPosition: 'right 0.75rem center',
                          backgroundSize: '12px',
                        }}
                      >
                        <option value="">--</option>
                        <option value="petrol">Petrol (£150)</option>
                        <option value="diesel">Diesel (£180)</option>
                      </select>
                      {attemptedNext && !formData.fuelType && (
                        <p className="text-xs text-red-500 mt-1">Please select a fuel type</p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Step 2: Contact */}
            {step === 2 && (
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
                        className="h-11 text-base"
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
                        className={`h-11 text-base transition-colors ${
                          attemptedNext && (!formData.email || !isValidEmail(formData.email)) ? 'border-red-500 border-2' : ''
                        }`}
                      />
                      {attemptedNext && !formData.email && (
                        <p className="text-xs text-red-500 mt-1">Required</p>
                      )}
                      {attemptedNext && formData.email && !isValidEmail(formData.email) && (
                        <p className="text-xs text-red-500 mt-1">Invalid email</p>
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
                          className={`h-11 text-base transition-colors ${
                            attemptedNext && !formData.phone ? 'border-red-500 border-2' : ''
                          }`}
                        />
                        {attemptedNext && !formData.phone && (
                          <p className="text-xs text-red-500 mt-1">Required</p>
                        )}
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
                          className="h-11 text-base"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Step 3: Booking */}
            {step === 3 && (
              <div className="space-y-4 animate-fade-in w-full max-w-full overflow-hidden">
                <div className="bg-card rounded-xl p-4 border border-border">
                  <h2 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-primary" />
                    Schedule Your Service
                  </h2>
                  
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="preferredDate" className="text-sm mb-1.5">Preferred Date (Optional)</Label>
                      <input 
                        id="preferredDate" 
                        name="preferredDate" 
                        type="date" 
                        value={formData.preferredDate}
                        onChange={handleInputChange}
                        className="h-12 text-base w-full rounded-md border border-input bg-background px-3 py-2 focus:outline-none focus:ring-2 focus:ring-ring"
                        style={{ fontSize: '16px' }}
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="message" className="text-sm mb-1.5">Additional Notes (Optional)</Label>
                      <textarea 
                        id="message" 
                        name="message" 
                        placeholder="Any special requirements..."
                        value={formData.message}
                        onChange={handleInputChange}
                        rows={3}
                        className="w-full px-3 py-3 text-base border border-input bg-background rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-ring"
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
                  className="flex-1 h-10 rounded-full text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-3 h-3 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2" />
                      Sending...
                    </>
                  ) : (
                    <>
                      Request Booking
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </>
                  )}
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
          </>
          )}
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
        @keyframes scale-in {
          from { transform: scale(0); }
          to { transform: scale(1); }
        }
        .animate-scale-in {
          animation: scale-in 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
        }
      `}</style>
    </Layout>
  );
};

export default FullService;
