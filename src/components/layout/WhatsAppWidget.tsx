import { useState } from "react";
import { MessageCircle, X } from "lucide-react";
import { BUSINESS_INFO } from "@/lib/constants";

const WhatsAppWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);

  const quickMessages = [
    {
      title: "Get a Quote",
      message: "Hi! I'd like to get a quote for a mobile mechanic service. Can you help?"
    },
    {
      title: "Book a Service",
      message: "Hello! I'd like to book a service. What availability do you have?"
    },
    {
      title: "Ask a Question",
      message: "Hi there! I have a question about your services."
    },
    {
      title: "Emergency Help",
      message: "Hi! I need urgent assistance with my vehicle. Are you available?"
    }
  ];

  const handleMessageClick = (message: string) => {
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `${BUSINESS_INFO.whatsapp}?text=${encodedMessage}`;
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
    setIsOpen(false);
  };

  if (!isVisible) return null;

  return (
    <>
      {/* Desktop & Mobile WhatsApp Button */}
      <div className="fixed bottom-4 right-4 md:bottom-6 md:right-6 z-50">
        {/* Quick Message Options - Desktop */}
        {isOpen && (
          <div className="hidden lg:block absolute bottom-16 right-0 w-80 max-w-[calc(100vw-2rem)] bg-card/98 backdrop-blur-xl rounded-2xl shadow-2xl border border-border overflow-hidden mb-2 animate-slide-up">
            <div className="bg-[#25D366] p-3 flex items-center gap-2">
              <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center shrink-0">
                <MessageCircle className="w-5 h-5 text-[#25D366]" />
              </div>
              <div className="min-w-0">
                <h3 className="font-semibold text-white text-xs">Chat with us</h3>
                <p className="text-[10px] text-white/90">Quick replies</p>
              </div>
            </div>
            
            <div className="p-3 space-y-2 max-h-[400px] overflow-y-auto">
              {quickMessages.map((msg, index) => (
                <button
                  key={index}
                  onClick={() => handleMessageClick(msg.message)}
                  className="w-full text-left p-2.5 rounded-lg bg-muted/50 hover:bg-muted border border-border hover:border-primary/30 transition-colors"
                >
                  <div className="flex items-start justify-between gap-2">
                    <span className="text-xs font-medium text-foreground flex-1">{msg.title}</span>
                    <MessageCircle className="w-3 h-3 text-muted-foreground shrink-0 mt-0.5" />
                  </div>
                </button>
              ))}
              
              <button
                onClick={() => handleMessageClick("Hi! I'd like to enquire about your services.")}
                className="w-full mt-2 p-2.5 rounded-lg bg-[#25D366] hover:bg-[#20BA5A] text-white font-medium text-xs transition-colors flex items-center justify-center gap-2"
              >
                <MessageCircle className="w-3 h-3" />
                Start Chat
              </button>
            </div>
          </div>
        )}

        {/* Quick Message Options - Mobile */}
        {isOpen && (
          <div className="lg:hidden fixed inset-x-4 bottom-16 bg-card/98 backdrop-blur-xl rounded-2xl shadow-2xl border border-border max-h-[70vh] overflow-hidden animate-slide-up-mobile">
            <div className="bg-[#25D366] p-3 flex items-center gap-2">
              <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
                <MessageCircle className="w-5 h-5 text-[#25D366]" />
              </div>
              <div>
                <h3 className="font-semibold text-white text-sm">Chat with us</h3>
                <p className="text-[10px] text-white/90">Quick replies</p>
              </div>
            </div>
            
            <div className="p-3 space-y-2 max-h-[50vh] overflow-y-auto">
              {quickMessages.map((msg, index) => (
                <button
                  key={index}
                  onClick={() => handleMessageClick(msg.message)}
                  className="w-full text-left p-2.5 rounded-lg bg-muted/50 active:bg-muted border border-border transition-colors"
                >
                  <span className="text-xs font-medium text-foreground block">{msg.title}</span>
                </button>
              ))}
              
              <button
                onClick={() => handleMessageClick("Hi! I'd like to enquire about your services.")}
                className="w-full mt-2 p-3 rounded-lg bg-[#25D366] active:bg-[#20BA5A] text-white font-medium text-sm transition-colors flex items-center justify-center gap-2"
              >
                <MessageCircle className="w-4 h-4" />
                Start Chat
              </button>
            </div>
          </div>
        )}

        {/* Main WhatsApp Button - Smaller and subtle */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={`relative w-12 h-12 bg-[#25D366] hover:bg-[#20BA5A] rounded-full flex items-center justify-center shadow-lg transition-colors ${
            isOpen ? 'bg-[#20BA5A]' : ''
          }`}
          aria-label="Chat on WhatsApp"
        >
          {isOpen ? (
            <X className="w-5 h-5 text-white" />
          ) : (
            <MessageCircle className="w-5 h-5 text-white" />
          )}
        </button>
      </div>

      <style>{`
        @keyframes slide-up {
          from { 
            opacity: 0;
            transform: translateY(0.5rem);
          }
          to { 
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes slide-up-mobile {
          from { 
            opacity: 0;
            transform: translateY(1rem);
          }
          to { 
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-slide-up {
          animation: slide-up 0.2s ease-out;
        }
        .animate-slide-up-mobile {
          animation: slide-up-mobile 0.2s ease-out;
        }
      `}</style>
    </>
  );
};

export default WhatsAppWidget;
