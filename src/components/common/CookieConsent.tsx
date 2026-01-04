import { useState, useEffect } from "react";
import { X } from "lucide-react";
import { Link } from "react-router-dom";

const CookieConsent = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("fixnow_cookie_consent");
    if (!consent) {
      // Show after 3 seconds for better UX
      setTimeout(() => setIsVisible(true), 3000);
    }
  }, []);

  const acceptCookies = () => {
    localStorage.setItem("fixnow_cookie_consent", "accepted");
    localStorage.setItem("fixnow_consent_date", new Date().toISOString());
    setIsVisible(false);
  };

  const declineCookies = () => {
    localStorage.setItem("fixnow_cookie_consent", "declined");
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-3 left-3 right-3 md:bottom-4 md:left-4 md:right-4 z-50 animate-slide-up">
      <div className="bg-card/95 backdrop-blur-sm border border-border rounded-lg shadow-lg max-w-sm md:max-w-md mx-auto">
        <div className="flex items-start gap-3 p-3 md:p-4">
          <div className="text-2xl flex-shrink-0">🍪</div>
          
          <div className="flex-1 min-w-0">
            <p className="text-xs md:text-sm text-foreground mb-2 leading-relaxed">
              We use essential cookies for site functionality.{" "}
              <Link to="/privacy" className="text-primary hover:underline font-medium">
                Learn more
              </Link>
            </p>
            
            <div className="flex gap-2">
              <button
                onClick={acceptCookies}
                className="px-3 py-1.5 bg-primary text-primary-foreground rounded-md text-xs font-medium hover:bg-primary/90 transition-colors"
              >
                Accept
              </button>
              <button
                onClick={declineCookies}
                className="px-3 py-1.5 text-xs font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                Decline
              </button>
            </div>
          </div>

          <button
            onClick={declineCookies}
            className="flex-shrink-0 p-1 rounded hover:bg-muted transition-colors"
            aria-label="Close"
          >
            <X className="w-3.5 h-3.5 text-muted-foreground" />
          </button>
        </div>
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
        .animate-slide-up {
          animation: slide-up 0.3s ease-out;
        }
      `}</style>
    </div>
  );
};

export default CookieConsent;
