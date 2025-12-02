import { useState } from "react";
import { ArrowRight, ArrowLeft, Check, Phone, Wrench } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import Layout from "@/components/layout/Layout";
import { BUSINESS_INFO, SERVICES, LOCATIONS } from "@/lib/constants";
import engineImage from "@/assets/engine-detail.jpg";

type FormData = {
  service: string;
  location: string;
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
  const [formData, setFormData] = useState<FormData>({
    service: "",
    location: "",
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
  };

  const nextStep = () => setStep((prev) => Math.min(prev + 1, 4));
  const prevStep = () => setStep((prev) => Math.max(prev - 1, 1));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Thanks! We've received your enquiry and will call you back shortly.");
    console.log("Form data:", formData);
  };

  const stepLabels = ["Service", "Location", "Vehicle", "Contact"];

  return (
    <Layout>
      <section className="relative min-h-screen">
        {/* Background */}
        <div className="absolute inset-0 hidden lg:block">
          <div className="absolute inset-y-0 right-0 w-1/2">
            <img 
              src={engineImage} 
              alt="Engine detail" 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-background via-background/80 to-transparent" />
          </div>
        </div>

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
                    <div className="grid grid-cols-2 gap-3">
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
                    <h2 className="font-display text-xl font-semibold text-foreground mb-4">
                      Where are you?
                    </h2>
                    <div className="flex flex-wrap gap-2">
                      {LOCATIONS.map((location) => (
                        <button
                          key={location.slug}
                          type="button"
                          onClick={() => updateFormData("location", location.slug)}
                          className={`px-4 py-2 rounded-full text-sm transition-all border ${
                            formData.location === location.slug
                              ? "bg-primary/10 border-primary text-foreground"
                              : "bg-secondary/30 border-border/50 hover:border-border text-foreground"
                          }`}
                        >
                          {location.name}
                        </button>
                      ))}
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
                        placeholder="Make (e.g. Ford)"
                        value={formData.vehicleMake}
                        onChange={(e) => updateFormData("vehicleMake", e.target.value)}
                        className="rounded-xl bg-secondary/30 border-border/50"
                      />
                      <Input
                        placeholder="Model (e.g. Focus)"
                        value={formData.vehicleModel}
                        onChange={(e) => updateFormData("vehicleModel", e.target.value)}
                        className="rounded-xl bg-secondary/30 border-border/50"
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
                        onChange={(e) => updateFormData("vehicleReg", e.target.value)}
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
                    <div className="grid grid-cols-2 gap-4">
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
                    <Button type="button" onClick={nextStep} className="rounded-full">
                      Next
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  ) : (
                    <Button type="submit" className="rounded-full glow-hover">
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
