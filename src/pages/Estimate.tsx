import { useState } from "react";
import { ArrowRight, Check, Phone, MapPin, AlertCircle, CheckCircle, Clock, Shield, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Alert, AlertDescription } from "@/components/ui/alert";
import Layout from "@/components/layout/Layout";
import { BUSINESS_INFO, SERVICES } from "@/lib/constants";
import { isValidPostcodeFormat, isCoveredPostcode, getLocationForPostcode, formatPostcode } from "@/lib/postcodeUtils";
import { submitForm } from "@/lib/formService";
import { toast } from "sonner";

type FormData = {
  service: string;
  postcode: string;
  address: string;
  vehicleMake: string;
  vehicleModel: string;
  vehicleYear: string;
  vehicleReg: string;
  name: string;
  email: string;
  phone: string;
  message: string;
};

const Estimate = () => {
  const [step, setStep] = useState(1);
  const [postcodeError, setPostcodeError] = useState("");
  const [postcodeValid, setPostcodeValid] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    service: "",
    postcode: "",
    address: "",
    vehicleMake: "",
    vehicleModel: "",
    vehicleYear: "",
    vehicleReg: "",
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const updateFormData = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    
    // Validate postcode on change
    if (field === "postcode") {
      const formatted = formatPostcode(value);
      setFormData((prev) => ({ ...prev, postcode: formatted }));
      
      if (value.length > 0) {
        if (!isValidPostcodeFormat(value)) {
          setPostcodeError("Please enter a valid UK postcode");
          setPostcodeValid(false);
        } else if (!isCoveredPostcode(value)) {
          setPostcodeError("Sorry, we don't currently cover this area");
          setPostcodeValid(false);
        } else {
          const location = getLocationForPostcode(value);
          setPostcodeError("");
          setPostcodeValid(true);
        }
      } else {
        setPostcodeError("");
        setPostcodeValid(false);
      }
    }
  };

  const canProceedFromStep = (currentStep: number): boolean => {
    switch (currentStep) {
      case 1:
        return formData.service !== "";
      case 2:
        return postcodeValid && formData.address.trim() !== "";
      case 3:
        return formData.vehicleMake !== "" && formData.vehicleModel !== "";
      case 4:
        return formData.name !== "" && formData.email !== "" && formData.phone !== "";
      default:
        return true;
    }
  };

  const nextStep = () => {
    if (canProceedFromStep(step)) {
      setStep((prev) => Math.min(prev + 1, 4));
    }
  };
  
  const prevStep = () => setStep((prev) => Math.max(prev - 1, 1));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Submit to Web3Forms with branded emails
      const result = await submitForm(
        {
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          postcode: formData.postcode,
          vehicleMake: formData.vehicleMake,
          vehicleModel: formData.vehicleModel,
          vehicleYear: formData.vehicleYear,
          vehicleReg: formData.vehicleReg,
          serviceType: formData.service,
          message: `${formData.message}\n\nAddress: ${formData.address}\nLocation: ${getLocationForPostcode(formData.postcode)}`,
        },
        'estimate'
      );
      
      if (result.success) {
        setShowSuccess(true);
        toast.success("Request Received!", {
          description: "We'll call you back shortly to discuss your quote.",
          duration: 5000,
        });
        
        // Reset form
        setFormData({
          service: "",
          postcode: "",
          address: "",
          vehicleMake: "",
          vehicleModel: "",
          vehicleYear: "",
          vehicleReg: "",
          name: "",
          email: "",
          phone: "",
          message: "",
        });
        setStep(1);
        setPostcodeValid(false);
        setPostcodeError("");
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

  const stepLabels = ["Service", "Location", "Vehicle", "Contact"];

  return (
    <Layout>
      <section className="relative min-h-screen bg-gradient-to-br from-background via-surface/30 to-background overflow-x-hidden">
        {/* Subtle accent glow */}
        <div className="absolute top-20 right-1/4 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[140px] pointer-events-none" />

        <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-12 py-12 sm:py-16 md:py-20 relative z-10 max-w-full">
          <div className="max-w-4xl mx-auto w-full">
            
            {/* Success Screen */}
            {showSuccess ? (
              <div className="text-center py-12 sm:py-16 md:py-20 animate-fade-in">
                <div className="max-w-2xl mx-auto">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6 animate-scale-in">
                    <Check className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
                  </div>
                  
                  <h1 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-4">
                    Request Received!
                  </h1>
                  
                  <p className="text-lg sm:text-xl text-muted-foreground mb-8">
                    Thank you for contacting FixNow Mechanics. We've received your enquiry and will call you back shortly to discuss your quote.
                  </p>
                  
                  <div className="bg-card/80 backdrop-blur-sm rounded-xl p-6 border border-border/50 mb-8">
                    <h2 className="font-semibold text-foreground mb-4">What happens next?</h2>
                    <div className="space-y-3 text-left">
                      <div className="flex items-start gap-3">
                        <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <span className="text-xs font-bold text-primary">1</span>
                        </div>
                        <p className="text-sm text-muted-foreground">We'll call you within 1 hour (during business hours) to discuss your needs</p>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <span className="text-xs font-bold text-primary">2</span>
                        </div>
                        <p className="text-sm text-muted-foreground">We'll provide a clear, honest quote with no hidden fees</p>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <span className="text-xs font-bold text-primary">3</span>
                        </div>
                        <p className="text-sm text-muted-foreground">You'll also receive a confirmation email at the address you provided</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Button
                      onClick={() => setShowSuccess(false)}
                      variant="outline"
                      size="lg"
                      className="rounded-full"
                    >
                      Submit Another Request
                    </Button>
                    <Button
                      asChild
                      size="lg"
                      className="rounded-full"
                    >
                      <a href={`tel:${BUSINESS_INFO.phone}`}>
                        <Phone className="w-4 h-4 mr-2" />
                        Call Us Now
                      </a>
                    </Button>
                  </div>
                </div>
              </div>
            ) : (
              <>
            {/* HERO - Trust First */}
            <div className="text-center mb-8 sm:mb-10 md:mb-12">
              <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-primary/10 border border-primary/20 mb-3 sm:mb-4">
                <Check className="w-3 h-3 sm:w-4 sm:h-4 text-primary" />
                <span className="text-xs sm:text-sm font-semibold text-primary">Mobile Mechanic — We Come To You</span>
              </div>
              
              <h1 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-3 sm:mb-4 leading-tight">
                Get a fast, honest quote
                <br />
                <span className="text-primary">in 60 seconds</span>
              </h1>
              
              <p className="text-base sm:text-lg md:text-xl text-muted-foreground mb-5 sm:mb-6 max-w-2xl mx-auto">
                Tell us what's wrong and we'll call you back to discuss.
              </p>

              {/* Trust Signals */}
              <div className="flex flex-wrap justify-center gap-3 sm:gap-4 md:gap-6 mb-6 sm:mb-8">
                <div className="flex items-center gap-2 text-sm text-foreground/80">
                  <Check className="w-4 h-4 text-primary" />
                  <span className="font-medium">No call centre</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-foreground/80">
                  <Check className="w-4 h-4 text-primary" />
                  <span className="font-medium">No inflated prices</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-foreground/80">
                  <Check className="w-4 h-4 text-primary" />
                  <span className="font-medium">Pay after the job</span>
                </div>
              </div>
            </div>

            {/* Quick Stats Bar */}
            <div className="grid grid-cols-3 gap-3 sm:gap-4 mb-6 sm:mb-8 max-w-2xl mx-auto">
              <div className="text-center p-3 sm:p-4 rounded-lg sm:rounded-xl bg-card/50 border border-border/50">
                <Clock className="w-4 h-4 sm:w-5 sm:h-5 text-primary mx-auto mb-1 sm:mb-2" />
                <div className="text-xs sm:text-sm font-medium text-foreground">Same Day</div>
                <div className="text-[10px] sm:text-xs text-muted-foreground">If needed</div>
              </div>
              <div className="text-center p-3 sm:p-4 rounded-lg sm:rounded-xl bg-card/50 border border-border/50">
                <Shield className="w-4 h-4 sm:w-5 sm:h-5 text-primary mx-auto mb-1 sm:mb-2" />
                <div className="text-xs sm:text-sm font-medium text-foreground">No Obligation</div>
                <div className="text-[10px] sm:text-xs text-muted-foreground">Free quote</div>
              </div>
              <div className="text-center p-3 sm:p-4 rounded-lg sm:rounded-xl bg-card/50 border border-border/50">
                <Users className="w-4 h-4 sm:w-5 sm:h-5 text-primary mx-auto mb-1 sm:mb-2" />
                <div className="text-xs sm:text-sm font-medium text-foreground">Trusted</div>
                <div className="text-[10px] sm:text-xs text-muted-foreground">Local service</div>
              </div>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="w-full max-w-full overflow-x-hidden">
              <div className="bg-card/80 backdrop-blur-sm rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-10 border border-border/50 max-w-3xl mx-auto w-full">
                <div className="space-y-6 sm:space-y-8">
                  {/* Step 1: Problem/Service */}
                  <div className="space-y-4">
                    <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
                      <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-primary/10 border border-primary/30 flex items-center justify-center flex-shrink-0">
                        <span className="text-xs sm:text-sm font-bold text-primary">1</span>
                      </div>
                      <div>
                        <h2 className="font-display text-lg sm:text-xl md:text-2xl font-bold text-foreground">
                          What's the issue?
                        </h2>
                        <p className="text-xs sm:text-sm text-muted-foreground">Pick what's closest to your problem</p>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-2 sm:gap-3">
                      {SERVICES.map((service) => (
                        <button
                          key={service.id}
                          type="button"
                          onClick={() => updateFormData("service", service.id)}
                          className={`p-4 rounded-xl text-left transition-all border ${
                            formData.service === service.id
                              ? "bg-primary/10 border-primary shadow-sm"
                              : "bg-secondary/30 border-border/50 hover:border-primary/30"
                          }`}
                        >
                          <span className="font-medium text-foreground block text-sm md:text-base">{service.name}</span>
                          <span className="text-xs text-muted-foreground">{service.price}</span>
                        </button>
                      ))}
                    </div>
                    {formData.service && (
                      <div className="p-3 rounded-lg bg-green-500/10 border border-green-500/20 animate-fade-in">
                        <p className="text-sm text-green-700 dark:text-green-400 flex items-center gap-2">
                          <CheckCircle className="w-4 h-4" />
                          Great! We'll discuss this when we call you back.
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Step 2: Location */}
                  <div className="space-y-4 pt-6 sm:pt-8 border-t border-border/50">
                    <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
                      <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-primary/10 border border-primary/30 flex items-center justify-center">
                        <span className="text-xs sm:text-sm font-bold text-primary">2</span>
                      </div>
                      <div>
                        <h2 className="font-display text-lg sm:text-xl md:text-2xl font-bold text-foreground">
                          Where are you located?
                        </h2>
                        <p className="text-xs sm:text-sm text-muted-foreground">Just your postcode for now</p>
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      {/* Postcode Input */}
                      <div className="relative">
                        <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-muted-foreground" />
                        <Input
                          placeholder="Enter your postcode (e.g. HP2 7DE)"
                          value={formData.postcode}
                          onChange={(e) => updateFormData("postcode", e.target.value)}
                          className={`rounded-xl bg-secondary/30 border-border/50 pl-10 sm:pl-12 h-11 sm:h-12 text-sm sm:text-base ${
                            postcodeError ? "border-destructive" : postcodeValid ? "border-green-500" : ""
                          }`}
                          required
                        />
                        {postcodeValid && (
                          <CheckCircle className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-green-500" />
                        )}
                      </div>
                      
                      {/* Error Message */}
                      {postcodeError && (
                        <Alert variant="destructive">
                          <AlertCircle className="h-4 w-4" />
                          <AlertDescription>{postcodeError}</AlertDescription>
                        </Alert>
                      )}
                      
                      {/* Success Message */}
                      {postcodeValid && (
                        <Alert className="border-green-500/50 bg-green-500/10">
                          <CheckCircle className="h-4 w-4 text-green-500" />
                          <AlertDescription className="text-green-700 dark:text-green-400">
                            Perfect! We cover {getLocationForPostcode(formData.postcode)}
                          </AlertDescription>
                        </Alert>
                      )}
                      
                      {/* Full Address - Only show when postcode is valid */}
                      {postcodeValid && (
                        <div className="space-y-3 animate-fade-in">
                          <div className="border-t border-border/50 pt-3 sm:pt-4">
                            <label className="text-xs sm:text-sm font-medium text-foreground mb-2 block">
                              Now, what's your full address?
                            </label>
                            <Textarea
                              placeholder="Street address, house/flat number, etc."
                              value={formData.address}
                              onChange={(e) => updateFormData("address", e.target.value)}
                              rows={3}
                              className="rounded-xl bg-secondary/30 border-border/50 text-sm sm:text-base"
                              required
                            />
                            <p className="text-xs text-muted-foreground mt-2">
                              This helps us find you quickly when we arrive
                            </p>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Step 3: Vehicle */}
                  <div className="space-y-4 pt-6 sm:pt-8 border-t border-border/50">
                    <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
                      <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-primary/10 border border-primary/30 flex items-center justify-center">
                        <span className="text-xs sm:text-sm font-bold text-primary">3</span>
                      </div>
                      <div>
                        <h2 className="font-display text-lg sm:text-xl md:text-2xl font-bold text-foreground">
                          Tell us about your car
                        </h2>
                        <p className="text-xs sm:text-sm text-muted-foreground">Make and model is enough</p>
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
                      <Input
                        placeholder="Make (e.g. Ford) *"
                        value={formData.vehicleMake}
                        onChange={(e) => updateFormData("vehicleMake", e.target.value)}
                        className="rounded-xl bg-secondary/30 border-border/50 h-11 sm:h-12 text-sm sm:text-base"
                        required
                      />
                      <Input
                        placeholder="Model (e.g. Focus) *"
                        value={formData.vehicleModel}
                        onChange={(e) => updateFormData("vehicleModel", e.target.value)}
                        className="rounded-xl bg-secondary/30 border-border/50 h-11 sm:h-12 text-sm sm:text-base"
                        required
                      />
                    </div>
                    <div>
                      <label className="text-xs sm:text-sm font-medium text-foreground mb-2 block">Registration Plate</label>
                      <div className="relative">
                        <div className="absolute left-0 top-0 bottom-0 w-10 bg-[#0C4DA2] rounded-l-lg flex items-center justify-center z-10">
                          <div className="text-[#FFD500] font-bold text-xs">GB</div>
                        </div>
                        <Input
                          placeholder="AB12 CDE"
                          value={formData.vehicleReg}
                          onChange={(e) => updateFormData("vehicleReg", e.target.value.toUpperCase())}
                          className="rounded-lg h-11 sm:h-12 pl-12 pr-3 text-base sm:text-lg font-bold tracking-wider uppercase bg-[#FFD500] text-black border-2 border-black placeholder:text-black/40"
                          style={{ textAlign: 'center', paddingLeft: '2.5rem', paddingRight: '0.75rem' }}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Step 4: Contact */}
                  <div className="space-y-4 pt-6 sm:pt-8 border-t border-border/50">
                    <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
                      <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-primary/10 border border-primary/30 flex items-center justify-center">
                        <span className="text-xs sm:text-sm font-bold text-primary">3</span>
                      </div>
                      <div>
                        <h2 className="font-display text-lg sm:text-xl md:text-2xl font-bold text-foreground">
                          How can we reach you?
                        </h2>
                        <p className="text-xs sm:text-sm text-muted-foreground">We'll call within 1 hour (during business hours)</p>
                      </div>
                    </div>
                    <Input
                      placeholder="Your name *"
                      value={formData.name}
                      onChange={(e) => updateFormData("name", e.target.value)}
                      required
                      className="rounded-xl bg-secondary/30 border-border/50 h-11 sm:h-12 text-sm sm:text-base"
                    />
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
                      <Input
                        type="email"
                        placeholder="Email *"
                        value={formData.email}
                        onChange={(e) => updateFormData("email", e.target.value)}
                        required
                        className="rounded-xl bg-secondary/30 border-border/50 h-11 sm:h-12 text-sm sm:text-base"
                      />
                      <Input
                        type="tel"
                        placeholder="Phone *"
                        value={formData.phone}
                        onChange={(e) => updateFormData("phone", e.target.value)}
                        required
                        className="rounded-xl bg-secondary/30 border-border/50 h-11 sm:h-12 text-sm sm:text-base"
                      />
                    </div>
                    <Textarea
                      placeholder="What's the issue? (optional)"
                      value={formData.message}
                      onChange={(e) => updateFormData("message", e.target.value)}
                      rows={3}
                      className="rounded-xl bg-secondary/30 border-border/50 text-sm sm:text-base"
                    />
                  </div>

                {/* Submit */}
                <div className="mt-6 sm:mt-8 pt-4 sm:pt-6 border-t border-border/50">
                  <Button 
                    type="submit" 
                    size="lg"
                    disabled={isSubmitting}
                    className="w-full rounded-full h-12 sm:h-14 text-base sm:text-lg font-semibold shadow-xl shadow-primary/25 hover:shadow-2xl hover:shadow-primary/35 hover:scale-[1.02] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2" />
                        Sending...
                      </>
                    ) : (
                      <>
                        Send My Enquiry — We'll Call Back
                        <ArrowRight className="w-5 h-5 ml-2" />
                      </>
                    )}
                  </Button>
                  
                  <div className="mt-3 sm:mt-4 p-3 sm:p-4 rounded-lg bg-primary/5 border border-primary/10">
                    <p className="text-xs sm:text-sm text-center text-muted-foreground">
                      <Check className="w-3 h-3 sm:w-4 sm:h-4 inline text-primary mr-1" />
                      <strong className="text-foreground">No obligation.</strong> We'll call to discuss your needs and provide a clear quote. No surprise fees.
                    </p>
                  </div>
                </div>
              </div>
              </div>
            </form>

            {/* Quick Contact */}
            <div className="mt-6 sm:mt-8 text-center">
              <p className="text-xs sm:text-sm text-muted-foreground mb-2 sm:mb-3">Prefer to speak now?</p>
              <Button variant="outline" size="lg" asChild className="rounded-full h-11 sm:h-12 text-sm sm:text-base">
                <a href={`tel:${BUSINESS_INFO.phone}`}>
                  <Phone className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                  Call {BUSINESS_INFO.phone}
                </a>
              </Button>
            </div>
            </>
            )}
          </div>
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

export default Estimate;
