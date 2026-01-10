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

const InterimService = () => {
  const [step, setStep] = useState(1);
  const [attemptedNext, setAttemptedNext] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [formData, setFormData] = useState({
    make: "",
    model: "",
    year: "",
    reg: "",
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
          serviceType: "Interim Service - From £110",
          preferredDate: formData.preferredDate,
          message: formData.message,
        },
        'interim'
      );
      
      if (result.success) {
        setShowSuccess(true);
        
        // Reset form
        setFormData({
          make: "",
          model: "",
          year: "",
          reg: "",
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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
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
        return formData.reg;
      case 2:
        return true; // Booking/Schedule step - all optional
      case 3:
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

  return (
    <Layout>
      <section className="py-6 md:py-8 bg-background min-h-screen overflow-x-hidden">
        <div className="container mx-auto px-4 max-w-xl w-full">
          
          {/* Success Screen */}
          {showSuccess ? (
            <div className="py-12 md:py-16 flex items-center justify-center min-h-screen">
              <div className="bg-card rounded-xl p-8 md:p-12 border border-border text-center max-w-2xl w-full">
                {/* Success Icon */}
                <div className="flex items-center justify-center mb-6">
                  <div className="w-20 h-20 bg-green-600 rounded-full flex items-center justify-center">
                    <Check className="w-10 h-10 text-white stroke-[3]" />
                  </div>
                </div>
                
                {/* Heading */}
                <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-3">
                  Booking Received
                </h1>
                
                {/* Description */}
                <p className="text-base text-muted-foreground mb-6">
                  Thank you! We've received your interim service booking and will confirm your appointment within 1 business day.
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
          ) : (
            <>
          {/* Header */}
          <div className="text-center mb-4">
            <h1 className="text-xl md:text-2xl font-bold text-foreground mb-1">
              Interim Service Booking
            </h1>
            <p className="text-sm text-muted-foreground">
              From £110
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
                    <div>
                      <Label htmlFor="reg" className="text-sm mb-1.5 flex items-center gap-1">
                        Registration Plate <span className="text-red-500">*</span>
                      </Label>
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
                    
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <Label htmlFor="make" className="text-sm mb-1.5 text-muted-foreground">Make (Optional)</Label>
                        <Input 
                          id="make" 
                          name="make" 
                          placeholder="e.g. Ford" 
                          value={formData.make}
                          onChange={handleInputChange}
                          className="h-11 text-base"
                        />
                      </div>
                      <div>
                        <Label htmlFor="model" className="text-sm mb-1.5 text-muted-foreground">Model (Optional)</Label>
                        <Input 
                          id="model" 
                          name="model" 
                          placeholder="e.g. Focus" 
                          value={formData.model}
                          onChange={handleInputChange}
                          className="h-11 text-base"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Step 2: Booking */}
            {step === 2 && (
              <div className="space-y-4 animate-fade-in w-full max-w-full overflow-hidden">
                <div className="bg-card rounded-xl p-4 border border-border">
                  <h2 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-primary" />
                    Schedule Your Service
                  </h2>
                  
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="preferredDate" className="text-sm mb-1.5">Preferred Date (Optional)</Label>
                      <Input 
                        id="preferredDate" 
                        name="preferredDate" 
                        type="text"
                        placeholder="e.g. 15/01/2026 or Next Monday"
                        value={formData.preferredDate}
                        onChange={handleInputChange}
                        className="h-12 text-base w-full"
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

export default InterimService;
