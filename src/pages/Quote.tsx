import { useState } from "react";
import { ArrowRight, ArrowLeft, Check, MessageCircle, Phone, Car, Wrench, Clock, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import Layout from "@/components/layout/Layout";
import { BUSINESS_INFO } from "@/lib/constants";

type FormData = {
  service: string;
  registration: string;
  description: string;
  urgency: string;
  name: string;
  phone: string;
  contactMethod: string;
};

const services = [
  { id: 'diagnostics', name: 'Diagnostics', price: 'From £45', icon: Wrench, desc: "Find what's wrong" },
  { id: 'brakes', name: 'Brakes', price: 'From £80', icon: Car, desc: 'Pads, discs & fluid' },
  { id: 'servicing', name: 'Servicing', price: 'From £120', icon: Wrench, desc: 'Full service' },
  { id: 'electrical', name: 'Electrical', price: 'From £40', icon: Wrench, desc: 'Battery & electrics' },
  { id: 'suspension', name: 'Suspension', price: 'From £100', icon: Car, desc: 'Shocks & springs' },
  { id: 'general', name: 'Other', price: 'Quote needed', icon: Wrench, desc: 'General repairs' }
];

const urgencyOptions = [
  { id: 'flexible', label: "I'm flexible", sublabel: 'When convenient' },
  { id: 'this-week', label: 'This week', sublabel: 'Within 7 days' },
  { id: 'urgent', label: 'ASAP', sublabel: 'Need it quick' }
];

const contactMethods = [
  { id: 'whatsapp', label: 'WhatsApp', icon: MessageCircle },
  { id: 'call', label: 'Call', icon: Phone },
  { id: 'text', label: 'Text', icon: MessageCircle }
];

const Quote = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<FormData>({
    service: '',
    registration: '',
    description: '',
    urgency: '',
    name: '',
    phone: '',
    contactMethod: ''
  });

  const updateFormData = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const message = `Hi, I'd like a quote.

Vehicle: ${formData.registration}
Service: ${services.find(s => s.id === formData.service)?.name}
Issue: ${formData.description}
Urgency: ${urgencyOptions.find(u => u.id === formData.urgency)?.label}
Contact: ${contactMethods.find(c => c.id === formData.contactMethod)?.label}

Name: ${formData.name}
Phone: ${formData.phone}`;

    const whatsappUrl = `https://wa.me/447354915941?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  const canProceed = () => {
    switch (step) {
      case 1: return formData.service !== '';
      case 2: return formData.registration.length >= 2;
      case 3: return formData.description.trim() !== '' && formData.urgency !== '';
      case 4: return formData.name !== '' && formData.phone !== '' && formData.contactMethod !== '';
      default: return false;
    }
  };

  const nextStep = () => {
    if (canProceed()) setStep(prev => prev + 1);
  };

  const prevStep = () => setStep(prev => prev - 1);

  const stepIcons = [Wrench, Car, Clock, User];
  const stepTitles = ['Service', 'Vehicle', 'Details', 'Contact'];

  return (
    <Layout>
      <section className="min-h-screen pt-20 pb-10 px-4 flex flex-col items-center bg-background">
        <div className="w-full max-w-lg mx-auto">
          {/* Header */}
          <div className="text-center mb-6">
            <h1 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-1">
              Get Your Free Quote
            </h1>
            <p className="text-sm text-muted-foreground">
              Quick and easy - takes less than 2 minutes
            </p>
          </div>

          {/* Progress Steps */}
          <div className="flex items-center justify-between mb-8 px-2">
            {[1, 2, 3, 4].map((s, i) => {
              const Icon = stepIcons[i];
              return (
                <div key={s} className="flex items-center flex-1">
                  <div className="flex flex-col items-center">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${
                      s < step ? 'bg-primary text-primary-foreground' :
                      s === step ? 'bg-primary text-primary-foreground ring-4 ring-primary/20' :
                      'bg-secondary border border-border text-muted-foreground'
                    }`}>
                      {s < step ? <Check className="w-4 h-4" /> : <Icon className="w-4 h-4" />}
                    </div>
                    <span className={`text-[10px] mt-1 font-medium ${s <= step ? 'text-foreground' : 'text-muted-foreground'}`}>
                      {stepTitles[i]}
                    </span>
                  </div>
                  {s < 4 && (
                    <div className={`flex-1 h-0.5 mx-1 mt-[-12px] transition-all ${
                      s < step ? 'bg-primary' : 'bg-border'
                    }`} />
                  )}
                </div>
              );
            })}
          </div>

          {/* Form Card */}
          <div className="bg-card border border-border rounded-2xl overflow-hidden">
            <form onSubmit={handleSubmit}>
              <div className="p-5 md:p-6">
                {/* Step 1: Service Selection */}
                {step === 1 && (
                  <div className="space-y-4 animate-fade-in">
                    <div>
                      <h2 className="text-lg font-bold text-foreground mb-1">
                        What do you need?
                      </h2>
                      <p className="text-sm text-muted-foreground">Select the service closest to your needs</p>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-2">
                      {services.map((service) => {
                        const Icon = service.icon;
                        return (
                          <button
                            key={service.id}
                            type="button"
                            onClick={() => updateFormData('service', service.id)}
                            className={`p-3 rounded-xl text-left transition-all border-2 ${
                              formData.service === service.id
                                ? 'bg-primary/10 border-primary'
                                : 'bg-secondary/50 border-transparent hover:border-border'
                            }`}
                          >
                            <div className="flex items-center gap-2 mb-1">
                              <Icon className={`w-4 h-4 ${formData.service === service.id ? 'text-primary' : 'text-muted-foreground'}`} />
                              <span className="font-semibold text-sm text-foreground">{service.name}</span>
                            </div>
                            <p className="text-xs text-muted-foreground">{service.desc}</p>
                            <p className="text-xs text-primary font-medium mt-1">{service.price}</p>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* Step 2: Vehicle Registration */}
                {step === 2 && (
                  <div className="space-y-4 animate-fade-in">
                    <div>
                      <h2 className="text-lg font-bold text-foreground mb-1">
                        Your Vehicle
                      </h2>
                      <p className="text-sm text-muted-foreground">Enter your registration plate</p>
                    </div>
                    
                    <div className="flex justify-center py-4">
                      <div className="flex bg-white rounded-lg overflow-hidden shadow-lg max-w-[260px]">
                        <div className="bg-[#003399] text-white px-3 py-4 flex flex-col items-center justify-center">
                          <span className="text-[10px] font-bold">GB</span>
                          <span className="text-[8px]">🇬🇧</span>
                        </div>
                        <Input
                          type="text"
                          value={formData.registration}
                          onChange={(e) => updateFormData('registration', e.target.value.toUpperCase())}
                          placeholder="AB12 CDE"
                          maxLength={8}
                          className="flex-1 border-0 bg-[#F7DC6F] text-black font-bold text-xl text-center tracking-widest h-full rounded-none focus-visible:ring-0"
                          required
                        />
                      </div>
                    </div>
                    
                    <p className="text-xs text-muted-foreground text-center">
                      Helps us prepare the right parts
                    </p>
                  </div>
                )}

                {/* Step 3: Description & Urgency */}
                {step === 3 && (
                  <div className="space-y-4 animate-fade-in">
                    <div>
                      <h2 className="text-lg font-bold text-foreground mb-1">
                        Tell us more
                      </h2>
                      <p className="text-sm text-muted-foreground">What's happening with your vehicle?</p>
                    </div>
                    
                    <Textarea
                      value={formData.description}
                      onChange={(e) => updateFormData('description', e.target.value)}
                      placeholder="e.g. 'Warning light on dashboard' or 'Squeaking when braking'"
                      rows={3}
                      className="resize-none bg-secondary border-border"
                      required
                    />
                    
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        How urgent?
                      </label>
                      <div className="grid grid-cols-3 gap-2">
                        {urgencyOptions.map((option) => (
                          <button
                            key={option.id}
                            type="button"
                            onClick={() => updateFormData('urgency', option.id)}
                            className={`p-3 rounded-xl text-center transition-all border-2 ${
                              formData.urgency === option.id
                                ? 'bg-primary/10 border-primary'
                                : 'bg-secondary/50 border-transparent hover:border-border'
                            }`}
                          >
                            <div className="font-semibold text-sm text-foreground">{option.label}</div>
                            <div className="text-[10px] text-muted-foreground">{option.sublabel}</div>
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* Step 4: Contact Details */}
                {step === 4 && (
                  <div className="space-y-4 animate-fade-in">
                    <div>
                      <h2 className="text-lg font-bold text-foreground mb-1">
                        Your Details
                      </h2>
                      <p className="text-sm text-muted-foreground">We'll get back within an hour</p>
                    </div>
                    
                    <div className="space-y-3">
                      <Input
                        type="text"
                        value={formData.name}
                        onChange={(e) => updateFormData('name', e.target.value)}
                        placeholder="Your name"
                        className="h-11 bg-secondary border-border"
                        required
                      />
                      
                      <Input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => updateFormData('phone', e.target.value)}
                        placeholder="Phone number"
                        className="h-11 bg-secondary border-border"
                        required
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Contact preference
                      </label>
                      <div className="grid grid-cols-3 gap-2">
                        {contactMethods.map((method) => {
                          const Icon = method.icon;
                          return (
                            <button
                              key={method.id}
                              type="button"
                              onClick={() => updateFormData('contactMethod', method.id)}
                              className={`p-3 rounded-xl flex flex-col items-center gap-1 transition-all border-2 ${
                                formData.contactMethod === method.id
                                  ? 'bg-primary/10 border-primary'
                                  : 'bg-secondary/50 border-transparent hover:border-border'
                              }`}
                            >
                              <Icon className={`w-5 h-5 ${formData.contactMethod === method.id ? 'text-primary' : 'text-muted-foreground'}`} />
                              <span className="text-xs font-medium text-foreground">{method.label}</span>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Navigation */}
              <div className="border-t border-border p-4 flex gap-2 bg-secondary/30">
                {step > 1 && (
                  <Button type="button" variant="outline" onClick={prevStep} className="flex-1">
                    <ArrowLeft className="w-4 h-4 mr-1" />
                    Back
                  </Button>
                )}
                
                {step < 4 ? (
                  <Button
                    type="button"
                    onClick={nextStep}
                    disabled={!canProceed()}
                    className={step === 1 ? 'w-full' : 'flex-1'}
                  >
                    Continue
                    <ArrowRight className="w-4 h-4 ml-1" />
                  </Button>
                ) : (
                  <Button type="submit" disabled={!canProceed()} className="flex-1">
                    Send Request
                    <ArrowRight className="w-4 h-4 ml-1" />
                  </Button>
                )}
              </div>
            </form>
          </div>

          {/* Trust & Alternative */}
          <div className="mt-6 text-center">
            <div className="flex justify-center gap-3 mb-3">
              <span className="px-3 py-1 rounded-full bg-secondary text-xs font-medium text-muted-foreground">No Obligation</span>
              <span className="px-3 py-1 rounded-full bg-secondary text-xs font-medium text-muted-foreground">Free Quote</span>
            </div>
            <p className="text-sm text-muted-foreground mb-2">Or message us directly</p>
            <Button variant="outline" size="sm" asChild className="rounded-full">
              <a
                href="https://wa.me/447354915941?text=Hi%2C%20I%27d%20like%20a%20quote."
                target="_blank"
                rel="noopener noreferrer"
              >
                <MessageCircle className="w-4 h-4 mr-2" />
                Chat on WhatsApp
              </a>
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Quote;
