import { useState } from "react";
import { ArrowRight, ArrowLeft, Check, MessageCircle } from "lucide-react";
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
  { id: 'diagnostics', name: 'Diagnostics', price: 'From £45', icon: '', desc: "Find out what's wrong" },
  { id: 'brakes', name: 'Brakes', price: 'From £80', icon: '', desc: 'Pads, discs & fluid' },
  { id: 'servicing', name: 'Servicing', price: 'From £120', icon: '', desc: 'Full service package' },
  { id: 'electrical', name: 'Electrical', price: 'From £40', icon: '', desc: 'Battery & electrics' },
  { id: 'suspension', name: 'Suspension', price: 'From £100', icon: '', desc: 'Shocks & springs' },
  { id: 'general', name: 'Other Repair', price: 'Quote needed', icon: '', desc: 'General repairs' }
];

const urgencyOptions = [
  { id: 'flexible', label: "I'm flexible", sublabel: 'Book me in when convenient' },
  { id: 'this-week', label: 'This week', sublabel: 'Prefer within 7 days' },
  { id: 'urgent', label: 'ASAP', sublabel: 'Need it sorted quickly' }
];

const contactMethods = [
  { id: 'whatsapp', icon: '', label: 'WhatsApp' },
  { id: 'call', icon: '', label: 'Phone call' },
  { id: 'text', icon: '', label: 'Text' }
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
    console.log('Form submission:', formData);
    
    // Create WhatsApp message
    const message = `Hi, I'd like a quote for my car.

Vehicle: ${formData.registration}
Service: ${services.find(s => s.id === formData.service)?.name}
Issue: ${formData.description}
Urgency: ${urgencyOptions.find(u => u.id === formData.urgency)?.label}
Preferred contact: ${contactMethods.find(c => c.id === formData.contactMethod)?.label}

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
    if (canProceed()) {
      setStep(prev => prev + 1);
    }
  };

  const prevStep = () => setStep(prev => prev - 1);

  return (
    <Layout>
      <section className="min-h-screen py-24 px-4">
        <div className="container mx-auto max-w-2xl">
          {/* Progress Bar */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-3">
              {[1, 2, 3, 4].map((s) => (
                <div key={s} className="flex items-center flex-1">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-all ${
                    s < step ? 'bg-primary text-background' :
                    s === step ? 'bg-primary text-background ring-4 ring-primary/20' :
                    'bg-card border-2 border-border text-muted-foreground'
                  }`}>
                    {s < step ? <Check className="w-5 h-5" /> : s}
                  </div>
                  {s < 4 && (
                    <div className={`flex-1 h-1 mx-2 rounded-full transition-all ${
                      s < step ? 'bg-primary' : 'bg-border'
                    }`} />
                  )}
                </div>
              ))}
            </div>
            <p className="text-sm text-muted-foreground text-center">
              Step {step} of 4
            </p>
          </div>

          {/* Form Card */}
          <div className="bg-card border border-border rounded-2xl p-6 md:p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              
              {/* Step 1: Service Selection */}
              {step === 1 && (
                <div className="space-y-6 animate-fade-in">
                  <div>
                    <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
                      What do you need help with?
                    </h2>
                    <p className="text-muted-foreground">Choose the service closest to what you need</p>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {services.map((service) => (
                      <button
                        key={service.id}
                        type="button"
                        onClick={() => updateFormData('service', service.id)}
                        className={`min-h-[80px] p-4 rounded-xl text-left transition-all border-2 ${
                          formData.service === service.id
                            ? 'bg-primary/10 border-primary'
                            : 'bg-secondary border-border hover:border-primary/50'
                        }`}
                      >
                        <div className="flex items-start gap-3">
                          {service.icon && <span className="text-3xl" role="img" aria-label={service.name}>{service.icon}</span>}
                          <div className="flex-1 min-w-0">
                            <div className="font-semibold text-foreground text-base">{service.name}</div>
                            <div className="text-sm text-muted-foreground">{service.desc}</div>
                            <div className="text-xs text-primary font-medium mt-1">{service.price}</div>
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Step 2: Vehicle Registration */}
              {step === 2 && (
                <div className="space-y-6 animate-fade-in">
                  <div>
                    <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
                      What's your vehicle?
                    </h2>
                    <p className="text-muted-foreground">Enter your UK registration plate</p>
                  </div>
                  
                  <div className="flex justify-center">
                    <div className="uk-reg-plate">
                      <div className="reg-blue-strip">
                        <div className="flex flex-col items-center leading-none">
                          <span className="text-[10px]">GB</span>
                          <span className="text-[6px] mt-0.5">🇬🇧</span>
                        </div>
                      </div>
                      <Input
                        type="text"
                        value={formData.registration}
                        onChange={(e) => updateFormData('registration', e.target.value.toUpperCase())}
                        placeholder="AB12 CDE"
                        maxLength={8}
                        className="reg-input"
                        required
                      />
                    </div>
                  </div>
                  
                  <p className="text-xs text-muted-foreground text-center">
                    This helps us prepare the right parts and equipment
                  </p>
                </div>
              )}

              {/* Step 3: Description & Urgency */}
              {step === 3 && (
                <div className="space-y-6 animate-fade-in">
                  <div>
                    <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
                      Tell us what's happening
                    </h2>
                    <p className="text-muted-foreground">Any details help us give an accurate quote</p>
                  </div>
                  
                  <Textarea
                    value={formData.description}
                    onChange={(e) => updateFormData('description', e.target.value)}
                    placeholder="e.g. 'Dashboard warning light appeared' or 'Hearing squeaking when braking'"
                    rows={4}
                    className="resize-none bg-secondary border-border text-foreground"
                    required
                  />
                  
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-3">
                      How urgent is this?
                    </label>
                    <div className="space-y-2">
                      {urgencyOptions.map((option) => (
                        <button
                          key={option.id}
                          type="button"
                          onClick={() => updateFormData('urgency', option.id)}
                          className={`w-full min-h-[56px] p-4 rounded-xl text-left transition-all border-2 ${
                            formData.urgency === option.id
                              ? 'bg-primary/10 border-primary'
                              : 'bg-secondary border-border hover:border-primary/50'
                          }`}
                        >
                          <div className="font-semibold text-foreground">{option.label}</div>
                          <div className="text-sm text-muted-foreground">{option.sublabel}</div>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Step 4: Contact Details */}
              {step === 4 && (
                <div className="space-y-6 animate-fade-in">
                  <div>
                    <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
                      How should we reach you?
                    </h2>
                    <p className="text-muted-foreground">We'll get back to you within an hour</p>
                  </div>
                  
                  <div className="space-y-4">
                    <Input
                      type="text"
                      value={formData.name}
                      onChange={(e) => updateFormData('name', e.target.value)}
                      placeholder="Your name"
                      className="h-12 bg-secondary border-border text-foreground"
                      required
                    />
                    
                    <Input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => updateFormData('phone', e.target.value)}
                      placeholder="Phone number"
                      className="h-12 bg-secondary border-border text-foreground"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-3">
                      Preferred contact method
                    </label>
                    <div className="grid grid-cols-3 gap-3">
                      {contactMethods.map((method) => (
                        <button
                          key={method.id}
                          type="button"
                          onClick={() => updateFormData('contactMethod', method.id)}
                          className={`min-h-[72px] p-3 rounded-xl transition-all border-2 flex flex-col items-center justify-center gap-2 ${
                            formData.contactMethod === method.id
                              ? 'bg-primary/10 border-primary'
                              : 'bg-secondary border-border hover:border-primary/50'
                          }`}
                        >
                          {method.icon && <span className="text-2xl" role="img" aria-label={method.label}>{method.icon}</span>}
                          <span className="text-xs font-medium text-foreground">{method.label}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                  
                  {formData.contactMethod === 'whatsapp' && (
                    <div className="p-4 rounded-lg bg-green-500/10 border border-green-500/20">
                      <p className="text-sm text-green-700 dark:text-green-400 flex items-center gap-2">
                        <MessageCircle className="w-4 h-4" />
                        We'll send your quote via WhatsApp - quick and easy!
                      </p>
                    </div>
                  )}
                </div>
              )}

              {/* Navigation Buttons */}
              <div className="flex items-center gap-3 pt-6 border-t border-border">
                {step > 1 && (
                  <Button
                    type="button"
                    variant="outline"
                    onClick={prevStep}
                    className="flex-1"
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
                    className={`${step === 1 ? 'w-full' : 'flex-1'}`}
                  >
                    Continue
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                ) : (
                  <Button
                    type="submit"
                    disabled={!canProceed()}
                    className="flex-1"
                  >
                    Send Quote Request
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                )}
              </div>
            </form>
            
            {/* WhatsApp Alternative */}
            <div className="mt-6 pt-6 border-t border-border text-center">
              <p className="text-sm text-muted-foreground mb-3">
                Or message us directly on WhatsApp
              </p>
              <Button variant="outline" size="sm" asChild>
                <a
                  href="https://wa.me/447354915941?text=Hi%2C%20I%27d%20like%20a%20quote%20for%20my%20car."
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <MessageCircle className="w-4 h-4 mr-2" />
                  Chat on WhatsApp
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>
      
      <style>{`
        .uk-reg-plate {
          display: flex;
          background: #FFFFFF;
          border-radius: 8px;
          overflow: hidden;
          max-width: 280px;
          margin: 0 auto;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
        }

        .reg-blue-strip {
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 12px 10px;
          background: #003399;
          color: white;
          font-size: 0.75rem;
          font-weight: 700;
        }

        .reg-input {
          flex: 1;
          padding: 16px 12px;
          border: none;
          background: #F7DC6F;
          font-size: 1.5rem;
          font-weight: 700;
          text-align: center;
          letter-spacing: 2px;
          color: #0A0A0A;
          text-transform: uppercase;
          border-radius: 0;
          height: auto;
        }

        .reg-input:focus {
          outline: none;
          box-shadow: none;
        }

        .reg-input::placeholder {
          color: rgba(10, 10, 10, 0.4);
        }

        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-in {
          animation: fade-in 0.3s ease-out;
        }
      `}</style>
    </Layout>
  );
};

export default Quote;
