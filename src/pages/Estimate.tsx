import { useState } from "react";
import { ArrowRight, ArrowLeft, Check, Phone, Wrench, MapPin, AlertCircle, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Alert, AlertDescription } from "@/components/ui/alert";
import Layout from "@/components/layout/Layout";
import { BUSINESS_INFO, SERVICES } from "@/lib/constants";
import { isValidPostcodeFormat, isCoveredPostcode, getLocationForPostcode, formatPostcode } from "@/lib/postcodeUtils";

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Format the data for submission
    const submissionData = {
      ...formData,
      location: getLocationForPostcode(formData.postcode),
    };
    
    console.log("Form submission:", submissionData);
    alert("Thanks! We've received your enquiry and will call you back shortly.");
    
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
  };

  const stepLabels = ["Service", "Location", "Vehicle", "Contact"];

  return (
    <Layout>
      <section className="relative min-h-screen bg-gradient-to-br from-background via-surface to-background">
        {/* Background */}
        <div className="absolute inset-0 hidden lg:block">
          <div className="absolute inset-y-0 right-0 w-1/2">
            <img 
              src="/quoteimage.JPG" 
              alt="Engine detail" 
              className="w-full h-full object-cover brightness-[0.45] contrast-110 grayscale-[30%]"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-background via-background/50 to-transparent" />
          </div>
        </div>
        
        {/* Subtle accent glow */}
        <div className="absolute top-20 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-[120px]" />

        <div className="container mx-auto px-6 md:px-12 py-20 md:py-28 relative z-10">
          <div className="max-w-xl">
            {/* Header */}
            <div className="mb-10">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20 mb-6">
                <Wrench className="w-4 h-4 text-primary" />
                <span className="text-sm text-foreground/80">Free Quote</span>
              </div>
              <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4">
                Get a Quote
              </h1>
              <p className="text-muted-foreground">
                Tell us what you need and we'll call you back to discuss.
              </p>
            </div>

            {/* Progress */}
            <div className="flex items-center gap-2 mb-8">
              {stepLabels.map((label, index) => {
                const stepNum = index + 1;
                const isActive = step === stepNum;
                const isComplete = step > stepNum;
                return (
                  <div key={label} className="flex items-center gap-2">
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-all ${
                        isComplete
                          ? "bg-primary text-primary-foreground"
                          : isActive
                          ? "bg-primary text-primary-foreground"
                          : "bg-secondary text-muted-foreground"
                      }`}
                    >
                      {isComplete ? <Check className="w-4 h-4" /> : stepNum}
                    </div>
                    {index < 3 && (
                      <div
                        className={`w-8 h-[2px] ${
                          step > stepNum ? "bg-primary" : "bg-border"
                        }`}
                      />
                    )}
                  </div>
                );
              })}
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit}>
              <div className="bg-card/80 backdrop-blur-sm rounded-2xl p-6 md:p-8 border border-border/50">
                {/* Step 1: Service */}
                {step === 1 && (
                  <div className="space-y-4">
                    <h2 className="font-display text-xl font-semibold text-foreground mb-4">
                      What do you need?
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {SERVICES.map((service) => (
                        <button
                          key={service.id}
                          type="button"
                          onClick={() => updateFormData("service", service.id)}
                          className={`p-4 rounded-xl text-left transition-all border ${
                            formData.service === service.id
                              ? "bg-primary/10 border-primary"
                              : "bg-secondary/30 border-border/50 hover:border-border"
                          }`}
                        >
                          <span className="font-medium text-foreground block">{service.name}</span>
                          <span className="text-xs text-muted-foreground">{service.price}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Step 2: Location */}
                {step === 2 && (
                  <div className="space-y-4">
                    <h2 className="font-display text-xl font-semibold text-foreground mb-1">
                      Where are you?
                    </h2>
                    <p className="text-sm text-muted-foreground mb-4">
                      Let's check if we cover your area
                    </p>
                    
                    <div className="space-y-4">
                      {/* Postcode Input */}
                      <div className="relative">
                        <MapPin className="absolute left-3 top-3.5 w-4 h-4 text-muted-foreground" />
                        <Input
                          placeholder="Enter your postcode (e.g. HP2 7DE)"
                          value={formData.postcode}
                          onChange={(e) => updateFormData("postcode", e.target.value)}
                          className={`rounded-xl bg-secondary/30 border-border/50 pl-10 ${
                            postcodeError ? "border-destructive" : postcodeValid ? "border-green-500" : ""
                          }`}
                          required
                        />
                        {postcodeValid && (
                          <CheckCircle className="absolute right-3 top-3.5 w-4 h-4 text-green-500" />
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
                          <div className="border-t border-border/50 pt-4">
                            <label className="text-sm font-medium text-foreground mb-2 block">
                              Now, what's your full address?
                            </label>
                            <Textarea
                              placeholder="Street address, house/flat number, etc."
                              value={formData.address}
                              onChange={(e) => updateFormData("address", e.target.value)}
                              rows={3}
                              className="rounded-xl bg-secondary/30 border-border/50"
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
                )}

                {/* Step 3: Vehicle */}
                {step === 3 && (
                  <div className="space-y-4">
                    <h2 className="font-display text-xl font-semibold text-foreground mb-4">
                      Your vehicle
                    </h2>
                    <div className="grid grid-cols-2 gap-4">
                      <Input
                        placeholder="Make (e.g. Ford) *"
                        value={formData.vehicleMake}
                        onChange={(e) => updateFormData("vehicleMake", e.target.value)}
                        className="rounded-xl bg-secondary/30 border-border/50"
                        required
                      />
                      <Input
                        placeholder="Model (e.g. Focus) *"
                        value={formData.vehicleModel}
                        onChange={(e) => updateFormData("vehicleModel", e.target.value)}
                        className="rounded-xl bg-secondary/30 border-border/50"
                        required
                      />
                      <Input
                        placeholder="Year (e.g. 2019)"
                        value={formData.vehicleYear}
                        onChange={(e) => updateFormData("vehicleYear", e.target.value)}
                        className="rounded-xl bg-secondary/30 border-border/50"
                      />
                      <Input
                        placeholder="Reg (e.g. AB12 CDE)"
                        value={formData.vehicleReg}
                        onChange={(e) => updateFormData("vehicleReg", e.target.value.toUpperCase())}
                        className="rounded-xl bg-secondary/30 border-border/50"
                      />
                    </div>
                  </div>
                )}

                {/* Step 4: Contact */}
                {step === 4 && (
                  <div className="space-y-4">
                    <div>
                      <h2 className="font-display text-xl font-semibold text-foreground mb-1">
                        Your details
                      </h2>
                      <p className="text-sm text-muted-foreground mb-4">
                        We'll call you to discuss.
                      </p>
                    </div>
                    <Input
                      placeholder="Name *"
                      value={formData.name}
                      onChange={(e) => updateFormData("name", e.target.value)}
                      required
                      className="rounded-xl bg-secondary/30 border-border/50"
                    />
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <Input
                        type="email"
                        placeholder="Email *"
                        value={formData.email}
                        onChange={(e) => updateFormData("email", e.target.value)}
                        required
                        className="rounded-xl bg-secondary/30 border-border/50"
                      />
                      <Input
                        type="tel"
                        placeholder="Phone *"
                        value={formData.phone}
                        onChange={(e) => updateFormData("phone", e.target.value)}
                        required
                        className="rounded-xl bg-secondary/30 border-border/50"
                      />
                    </div>
                    <Textarea
                      placeholder="What's the issue? (optional)"
                      value={formData.message}
                      onChange={(e) => updateFormData("message", e.target.value)}
                      rows={3}
                      className="rounded-xl bg-secondary/30 border-border/50"
                    />
                  </div>
                )}

                {/* Navigation */}
                <div className="flex justify-between mt-8 pt-6 border-t border-border/50">
                  <Button
                    type="button"
                    variant="ghost"
                    onClick={prevStep}
                    disabled={step === 1}
                    className="rounded-full"
                  >
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Back
                  </Button>
                  {step < 4 ? (
                    <Button 
                      type="button" 
                      onClick={nextStep} 
                      disabled={!canProceedFromStep(step)}
                      className="rounded-full"
                    >
                      Next
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  ) : (
                    <Button 
                      type="submit" 
                      disabled={!canProceedFromStep(step)}
                      className="rounded-full glow-hover"
                    >
                      Send Enquiry
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  )}
                </div>
              </div>
            </form>

            {/* Quick Contact */}
            <div className="mt-8 flex items-center gap-4">
              <span className="text-sm text-muted-foreground">Prefer to call?</span>
              <Button variant="outline" size="sm" asChild className="rounded-full">
                <a href={`tel:${BUSINESS_INFO.phone}`}>
                  <Phone className="w-4 h-4 mr-2" />
                  {BUSINESS_INFO.phone}
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Estimate;
