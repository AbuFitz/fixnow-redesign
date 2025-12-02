import { useState } from "react";
import { ArrowRight, ArrowLeft, Check, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import Layout from "@/components/layout/Layout";
import { BUSINESS_INFO, SERVICES, LOCATIONS } from "@/lib/constants";

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
    // Frontend only - no submission
    alert("Thank you! Your quote request has been received. We'll be in touch shortly.");
    console.log("Form data:", formData);
  };

  return (
    <Layout>
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            {/* Header */}
            <div className="text-center mb-10">
              <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
                Get a Free Quote
              </h1>
              <p className="text-muted-foreground">
                Fill out the form below and we'll get back to you with a quote.
              </p>
            </div>

            {/* Progress Steps */}
            <div className="flex items-center justify-between mb-10">
              {["Service", "Location", "Vehicle", "Contact"].map((label, index) => {
                const stepNum = index + 1;
                const isActive = step === stepNum;
                const isComplete = step > stepNum;
                return (
                  <div key={label} className="flex-1 flex items-center">
                    <div className="flex flex-col items-center flex-1">
                      <div
                        className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold transition-colors ${
                          isComplete
                            ? "bg-primary text-primary-foreground"
                            : isActive
                            ? "bg-primary text-primary-foreground"
                            : "bg-secondary text-muted-foreground"
                        }`}
                      >
                        {isComplete ? <Check className="w-5 h-5" /> : stepNum}
                      </div>
                      <span
                        className={`text-xs mt-2 ${
                          isActive || isComplete ? "text-foreground" : "text-muted-foreground"
                        }`}
                      >
                        {label}
                      </span>
                    </div>
                    {index < 3 && (
                      <div
                        className={`h-0.5 flex-1 mx-2 ${
                          step > stepNum ? "bg-primary" : "bg-secondary"
                        }`}
                      />
                    )}
                  </div>
                );
              })}
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit}>
              <div className="bg-card rounded-2xl p-6 md:p-8 border border-border">
                {/* Step 1: Service */}
                {step === 1 && (
                  <div>
                    <h2 className="text-xl font-semibold text-foreground mb-6">
                      What service do you need?
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {SERVICES.map((service) => (
                        <button
                          key={service.id}
                          type="button"
                          onClick={() => updateFormData("service", service.id)}
                          className={`p-4 rounded-xl text-left transition-colors border ${
                            formData.service === service.id
                              ? "bg-primary/10 border-primary text-foreground"
                              : "bg-secondary/50 border-transparent hover:bg-secondary text-foreground"
                          }`}
                        >
                          <span className="font-medium">{service.name}</span>
                          <span className="text-sm text-muted-foreground block mt-1">
                            {service.price}
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Step 2: Location */}
                {step === 2 && (
                  <div>
                    <h2 className="text-xl font-semibold text-foreground mb-6">
                      Where are you located?
                    </h2>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                      {LOCATIONS.map((location) => (
                        <button
                          key={location.slug}
                          type="button"
                          onClick={() => updateFormData("location", location.slug)}
                          className={`p-3 rounded-xl text-center transition-colors border ${
                            formData.location === location.slug
                              ? "bg-primary/10 border-primary text-foreground"
                              : "bg-secondary/50 border-transparent hover:bg-secondary text-foreground"
                          }`}
                        >
                          <span className="font-medium">{location.name}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Step 3: Vehicle */}
                {step === 3 && (
                  <div>
                    <h2 className="text-xl font-semibold text-foreground mb-6">
                      Tell us about your vehicle
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm font-medium text-foreground mb-2 block">
                          Make
                        </label>
                        <Input
                          placeholder="e.g. Ford"
                          value={formData.vehicleMake}
                          onChange={(e) => updateFormData("vehicleMake", e.target.value)}
                        />
                      </div>
                      <div>
                        <label className="text-sm font-medium text-foreground mb-2 block">
                          Model
                        </label>
                        <Input
                          placeholder="e.g. Focus"
                          value={formData.vehicleModel}
                          onChange={(e) => updateFormData("vehicleModel", e.target.value)}
                        />
                      </div>
                      <div>
                        <label className="text-sm font-medium text-foreground mb-2 block">
                          Year
                        </label>
                        <Input
                          placeholder="e.g. 2019"
                          value={formData.vehicleYear}
                          onChange={(e) => updateFormData("vehicleYear", e.target.value)}
                        />
                      </div>
                      <div>
                        <label className="text-sm font-medium text-foreground mb-2 block">
                          Registration
                        </label>
                        <Input
                          placeholder="e.g. AB12 CDE"
                          value={formData.vehicleReg}
                          onChange={(e) => updateFormData("vehicleReg", e.target.value)}
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* Step 4: Contact */}
                {step === 4 && (
                  <div>
                    <h2 className="text-xl font-semibold text-foreground mb-6">
                      Your contact details
                    </h2>
                    <div className="space-y-4">
                      <div>
                        <label className="text-sm font-medium text-foreground mb-2 block">
                          Name *
                        </label>
                        <Input
                          placeholder="Your name"
                          value={formData.name}
                          onChange={(e) => updateFormData("name", e.target.value)}
                          required
                        />
                      </div>
                      <div>
                        <label className="text-sm font-medium text-foreground mb-2 block">
                          Email *
                        </label>
                        <Input
                          type="email"
                          placeholder="your@email.com"
                          value={formData.email}
                          onChange={(e) => updateFormData("email", e.target.value)}
                          required
                        />
                      </div>
                      <div>
                        <label className="text-sm font-medium text-foreground mb-2 block">
                          Phone *
                        </label>
                        <Input
                          type="tel"
                          placeholder="07xxx xxx xxx"
                          value={formData.phone}
                          onChange={(e) => updateFormData("phone", e.target.value)}
                          required
                        />
                      </div>
                      <div>
                        <label className="text-sm font-medium text-foreground mb-2 block">
                          Additional details
                        </label>
                        <Textarea
                          placeholder="Describe the issue or any additional information..."
                          value={formData.message}
                          onChange={(e) => updateFormData("message", e.target.value)}
                          rows={4}
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* Navigation */}
                <div className="flex justify-between mt-8 pt-6 border-t border-border">
                  <Button
                    type="button"
                    variant="ghost"
                    onClick={prevStep}
                    disabled={step === 1}
                  >
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Back
                  </Button>
                  {step < 4 ? (
                    <Button type="button" onClick={nextStep}>
                      Next
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  ) : (
                    <Button type="submit">
                      Submit Request
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  )}
                </div>
              </div>
            </form>

            {/* Quick Contact */}
            <div className="mt-8 text-center">
              <p className="text-muted-foreground mb-3">Need help urgently?</p>
              <Button variant="outline" asChild>
                <a href={`tel:${BUSINESS_INFO.phone}`}>
                  <Phone className="w-4 h-4 mr-2" />
                  Call {BUSINESS_INFO.phone}
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
