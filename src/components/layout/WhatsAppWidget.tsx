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
          <div className="hidden lg:block absolute bottom-20 right-0 w-[min(360px,calc(100vw-2rem))] bg-card/98 backdrop-blur-xl rounded-2xl shadow-2xl border border-border overflow-hidden mb-2 animate-slide-up">
            <div className="bg-[#25D366] p-4 flex items-center gap-3">
              <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shrink-0">
                <MessageCircle className="w-6 h-6 text-[#25D366]" />
              </div>
              <div className="min-w-0">
                <h3 className="font-bold text-white text-sm">Chat with us</h3>
                <p className="text-xs text-white/90">Typically replies instantly</p>
              </div>
            </div>
            
            <div className="p-4 space-y-2 max-h-[500px] overflow-y-auto">
              <p className="text-xs text-muted-foreground mb-3">Select a quick message or start a chat:</p>
              {quickMessages.map((msg, index) => (
                <button
                  key={index}
                  onClick={() => handleMessageClick(msg.message)}
                  className="w-full text-left p-3 rounded-xl bg-muted/50 hover:bg-muted border border-border hover:border-primary/50 transition-all group"
                >
                  <div className="flex items-start justify-between gap-2">
                    <span className="text-sm font-medium text-foreground flex-1">{msg.title}</span>
                    <MessageCircle className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors shrink-0 mt-0.5" />
                  </div>
                  <p className="text-xs text-muted-foreground mt-1 leading-relaxed">{msg.message}</p>
                </button>
              ))}
              
              <button
                onClick={() => handleMessageClick("Hi! I'd like to enquire about your services.")}
                className="w-full mt-3 p-3 rounded-xl bg-[#25D366] hover:bg-[#20BA5A] text-white font-semibold text-sm transition-all hover:scale-[1.02] flex items-center justify-center gap-2"
              >
                <MessageCircle className="w-4 h-4" />
                Start Custom Chat
              </button>
            </div>
          </div>
        )}

        {/* Quick Message Options - Mobile */}
        {isOpen && (
          <div className="lg:hidden fixed inset-x-0 bottom-0 bg-card/98 backdrop-blur-xl rounded-t-3xl shadow-2xl border-t-2 border-border max-h-[80vh] overflow-hidden animate-slide-up-mobile">
            <div className="bg-[#25D366] p-4 flex items-center gap-3">
              <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
                <MessageCircle className="w-6 h-6 text-[#25D366]" />
              </div>
              <div>
                <h3 className="font-bold text-white">Chat with FixNow</h3>
                <p className="text-xs text-white/90">Typically replies instantly</p>
              </div>
            </div>
            
            <div className="p-4 space-y-2.5 max-h-[60vh] overflow-y-auto">
              <p className="text-xs text-muted-foreground mb-3">Quick messages:</p>
              {quickMessages.map((msg, index) => (
                <button
                  key={index}
                  onClick={() => handleMessageClick(msg.message)}
                  className="w-full text-left p-3.5 rounded-xl bg-muted/50 active:bg-muted border border-border active:scale-[0.98] transition-all"
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-semibold text-foreground">{msg.title}</span>
                    <MessageCircle className="w-4 h-4 text-[#25D366]" />
                  </div>
                  <p className="text-xs text-muted-foreground leading-relaxed">{msg.message}</p>
                </button>
              ))}
              
              <button
                onClick={() => handleMessageClick("Hi! I'd like to enquire about your services.")}
                className="w-full mt-4 p-4 rounded-xl bg-[#25D366] active:bg-[#20BA5A] text-white font-bold text-sm transition-all active:scale-[0.98] flex items-center justify-center gap-2 shadow-lg"
              >
                <MessageCircle className="w-5 h-5" />
                Start Custom Chat
              </button>
            </div>
          </div>
        )}

        {/* Main WhatsApp Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={`relative w-14 h-14 md:w-16 md:h-16 bg-[#25D366] hover:bg-[#20BA5A] rounded-full flex items-center justify-center shadow-2xl transition-all hover:scale-110 active:scale-95 group ${
            isOpen ? 'scale-95' : ''
          }`}
          aria-label="Chat on WhatsApp"
        >
          {isOpen ? (
            <X className="w-7 h-7 md:w-8 md:h-8 text-white transition-transform group-hover:rotate-90" />
          ) : (
            <MessageCircle className="w-7 h-7 md:w-8 md:h-8 text-white animate-pulse" />
          )}
          
          {/* Notification dot */}
          {!isOpen && (
            <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full border-2 border-background animate-pulse" />
          )}
        </button>

        {/* Tooltip - Desktop only */}
        {!isOpen && (
          <div className="hidden lg:block absolute bottom-full right-0 mb-2 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
            <div className="bg-foreground text-background text-xs font-medium px-3 py-2 rounded-lg shadow-lg">
              Chat on WhatsApp
            </div>
          </div>
        )}
      </div>

      <style>{`
        @keyframes slide-up {
          from { 
            opacity: 0;
            transform: translateY(1rem);
          }
          to { 
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes slide-up-mobile {
          from { 
            opacity: 0;
            transform: translateY(100%);
          }
          to { 
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-slide-up {
          animation: slide-up 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .animate-slide-up-mobile {
          animation: slide-up-mobile 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        }
      `}</style>
    </>
  );
};

export default WhatsAppWidget;
