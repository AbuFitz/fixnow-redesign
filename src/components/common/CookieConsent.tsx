import { useState, useEffect } from "react";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";

const CookieConsent = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("cookieConsent");
    if (!consent) {
      // Show after a short delay for better UX
      setTimeout(() => setIsVisible(true), 1000);
    }
  }, []);

  const acceptCookies = () => {
    localStorage.setItem("cookieConsent", "accepted");
    setIsVisible(false);
  };

  const declineCookies = () => {
    localStorage.setItem("cookieConsent", "declined");
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <>
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black/20 backdrop-blur-[2px] z-40 animate-fade-in" />
      
      {/* Cookie Banner */}
      <div className="fixed bottom-4 left-4 right-4 md:left-6 md:right-auto md:bottom-6 md:max-w-md z-50 animate-slide-up">
        <div className="bg-card border-2 border-border rounded-2xl shadow-2xl overflow-hidden">
          {/* Header with Cookie Emoji */}
          <div className="bg-gradient-to-r from-primary/10 via-primary/5 to-transparent p-4 md:p-5 border-b border-border/50">
            <div className="flex items-start gap-3">
              <div className="text-4xl md:text-5xl flex-shrink-0 animate-bounce-subtle">
                🍪
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-display text-lg md:text-xl font-bold text-foreground mb-1">
                  Cookie Notice
                </h3>
                <p className="text-xs md:text-sm text-muted-foreground leading-relaxed">
                  We use cookies to improve your browsing experience and analyze site traffic.
                </p>
              </div>
              <button
                onClick={declineCookies}
                className="flex-shrink-0 p-1 rounded-lg hover:bg-muted transition-colors"
                aria-label="Close"
              >
                <X className="w-4 h-4 text-muted-foreground" />
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="p-4 md:p-5 space-y-3">
            <p className="text-xs md:text-sm text-foreground/80 leading-relaxed">
              We use <strong className="text-foreground">functional cookies</strong> to ensure the website works properly. 
              These cookies are essential for basic site functionality and cannot be disabled.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-2 pt-2">
              <Button
                onClick={acceptCookies}
                size="sm"
                className="flex-1 rounded-full font-semibold text-sm h-10 hover:scale-[1.02] transition-transform"
              >
                Accept Cookies
              </Button>
              <Button
                onClick={declineCookies}
                variant="outline"
                size="sm"
                className="flex-1 sm:flex-initial rounded-full font-semibold text-sm h-10 hover:scale-[1.02] transition-transform"
              >
                Decline Optional
              </Button>
            </div>

            <p className="text-[10px] md:text-xs text-muted-foreground text-center pt-1">
              Learn more in our{" "}
              <a href="/privacy" className="text-primary hover:underline font-medium">
                Privacy Policy
              </a>
            </p>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slide-up {
          from { 
            opacity: 0;
            transform: translateY(2rem);
          }
          to { 
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes bounce-subtle {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-4px); }
        }
        .animate-fade-in {
          animation: fade-in 0.3s ease-out;
        }
        .animate-slide-up {
          animation: slide-up 0.4s ease-out;
        }
        .animate-bounce-subtle {
          animation: bounce-subtle 2s ease-in-out infinite;
        }
      `}</style>
    </>
  );
};

export default CookieConsent;
