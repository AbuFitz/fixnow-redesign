import { useState, useEffect } from "react";
import { X, Cookie, Settings, Shield, BarChart } from "lucide-react";
import { Link } from "react-router-dom";

interface CookiePreferences {
  necessary: boolean;
  analytics: boolean;
  marketing: boolean;
}

const CookieConsent = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [preferences, setPreferences] = useState<CookiePreferences>({
    necessary: true, // Always true, cannot be disabled
    analytics: false,
    marketing: false,
  });

  useEffect(() => {
    const consent = localStorage.getItem("fixnow_cookie_consent");
    if (!consent) {
      // Show after 2 seconds for better UX
      setTimeout(() => setIsVisible(true), 2000);
    } else {
      // Load saved preferences
      try {
        const saved = JSON.parse(localStorage.getItem("fixnow_cookie_preferences") || "{}");
        setPreferences(prev => ({ ...prev, ...saved }));
      } catch (e) {
        console.error("Failed to parse cookie preferences");
      }
    }
  }, []);

  const saveCookiePreferences = (prefs: CookiePreferences) => {
    localStorage.setItem("fixnow_cookie_consent", "accepted");
    localStorage.setItem("fixnow_cookie_preferences", JSON.stringify(prefs));
    localStorage.setItem("fixnow_consent_date", new Date().toISOString());
    
    // Apply preferences (in a real app, you'd enable/disable analytics/marketing scripts)
    if (prefs.analytics) {
      // Enable analytics
      console.log("Analytics enabled");
    }
    if (prefs.marketing) {
      // Enable marketing
      console.log("Marketing enabled");
    }
  };

  const acceptAll = () => {
    const allPrefs = {
      necessary: true,
      analytics: true,
      marketing: true,
    };
    saveCookiePreferences(allPrefs);
    setIsVisible(false);
  };

  const acceptNecessary = () => {
    saveCookiePreferences({
      necessary: true,
      analytics: false,
      marketing: false,
    });
    setIsVisible(false);
  };

  const saveCustomPreferences = () => {
    saveCookiePreferences(preferences);
    setIsVisible(false);
  };

  const declineCookies = () => {
    localStorage.setItem("fixnow_cookie_consent", "declined");
    setIsVisible(false);
  };

  if (!isVisible) return null;

  // Mobile Design
  const MobileView = () => (
    <div className="lg:hidden fixed inset-x-0 bottom-0 z-40 animate-slide-up-mobile pointer-events-none">
      <div className="bg-gradient-to-t from-card via-card to-card/95 backdrop-blur-xl pointer-events-auto">
        <div className="px-4 py-5">
          {/* Close button - properly centered */}
          <button
            onClick={declineCookies}
            className="absolute top-3 right-3 p-2 rounded-full transition-opacity hover:opacity-70 flex items-center justify-center"
            aria-label="Close"
          >
            <X className="w-5 h-5 text-muted-foreground" />
          </button>

          <div className="flex items-start gap-3 mb-4">
            <div className="text-3xl">
              🍪
            </div>
            <div className="flex-1 pr-8">
              <h3 className="font-bold text-foreground text-base mb-1">Cookie Settings</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                We use cookies to enhance your experience.{" "}
                <Link to="/privacy" className="text-primary hover:underline font-medium">
                  Learn more
                </Link>
              </p>
            </div>
          </div>

          {!showSettings ? (
            <div className="space-y-2">
              <button
                onClick={acceptAll}
                className="w-full px-4 py-3 bg-primary text-primary-foreground rounded-xl text-sm font-semibold hover:bg-primary/90 transition-all active:scale-[0.98]"
              >
                Accept All
              </button>
              <div className="flex gap-2">
                <button
                  onClick={acceptNecessary}
                  className="flex-1 px-4 py-2.5 border-2 border-border rounded-xl text-xs font-medium text-foreground hover:bg-muted/50 transition-all active:scale-[0.98]"
                >
                  Necessary Only
                </button>
                <button
                  onClick={() => setShowSettings(true)}
                  className="flex-1 px-4 py-2.5 border-2 border-border rounded-xl text-xs font-medium text-foreground hover:bg-muted/50 transition-all active:scale-[0.98] flex items-center justify-center gap-1.5"
                >
                  <Settings className="w-3.5 h-3.5" />
                  Customize
                </button>
              </div>
            </div>
          ) : (
            <div className="space-y-3">
              <div className="space-y-2.5">
                <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg border border-border">
                  <div className="flex items-center gap-2">
                    <Shield className="w-4 h-4 text-primary" />
                    <span className="text-xs font-medium">Necessary</span>
                  </div>
                  <div className="text-[10px] text-muted-foreground bg-muted px-2 py-1 rounded">Always On</div>
                </div>
                
                <label className="flex items-center justify-between p-3 bg-card rounded-lg border border-border cursor-pointer hover:bg-muted/30 transition-colors">
                  <div className="flex items-center gap-2">
                    <BarChart className="w-4 h-4 text-muted-foreground" />
                    <span className="text-xs font-medium">Analytics</span>
                  </div>
                  <input
                    type="checkbox"
                    checked={preferences.analytics}
                    onChange={(e) => setPreferences(prev => ({ ...prev, analytics: e.target.checked }))}
                    className="w-4 h-4 rounded accent-primary"
                  />
                </label>

                <label className="flex items-center justify-between p-3 bg-card rounded-lg border border-border cursor-pointer hover:bg-muted/30 transition-colors">
                  <div className="flex items-center gap-2">
                    <Cookie className="w-4 h-4 text-muted-foreground" />
                    <span className="text-xs font-medium">Marketing</span>
                  </div>
                  <input
                    type="checkbox"
                    checked={preferences.marketing}
                    onChange={(e) => setPreferences(prev => ({ ...prev, marketing: e.target.checked }))}
                    className="w-4 h-4 rounded accent-primary"
                  />
                </label>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => setShowSettings(false)}
                  className="flex-1 px-4 py-2.5 border-2 border-border rounded-xl text-xs font-medium text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-all"
                >
                  Back
                </button>
                <button
                  onClick={saveCustomPreferences}
                  className="flex-1 px-4 py-3 bg-primary text-primary-foreground rounded-xl text-sm font-semibold hover:bg-primary/90 transition-all active:scale-[0.98]"
                >
                  Save Preferences
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );

  // Desktop Design - Left Side
  const DesktopView = () => (
    <div className="hidden lg:block fixed bottom-6 left-6 z-40 animate-slide-in-left pointer-events-none">
      <div className="bg-gradient-to-br from-card via-card to-card/95 backdrop-blur-xl rounded-2xl w-[420px] pointer-events-auto">
        <div className="p-6">
          {/* Close button - properly centered */}
          <button
            onClick={declineCookies}
            className="absolute top-4 right-4 p-2 rounded-lg transition-opacity hover:opacity-70 flex items-center justify-center"
            aria-label="Close"
          >
            <X className="w-4 h-4 text-muted-foreground" />
          </button>

          <div className="flex items-start gap-4 mb-5">
            <div className="text-4xl">
              🍪
            </div>
            <div className="flex-1 pr-6">
              <h3 className="font-bold text-foreground text-xl mb-2">Cookie Preferences</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                We use cookies to improve your browsing experience and provide personalized content. You can customize your preferences below.
              </p>
            </div>
          </div>

          {!showSettings ? (
            <div className="space-y-3">
              <button
                onClick={acceptAll}
                className="w-full px-5 py-3.5 bg-primary text-primary-foreground rounded-xl text-sm font-semibold hover:bg-primary/90 transition-all hover:scale-[1.02] active:scale-[0.98]"
              >
                Accept All Cookies
              </button>
              <div className="flex gap-3">
                <button
                  onClick={acceptNecessary}
                  className="flex-1 px-4 py-2.5 border-2 border-border rounded-xl text-sm font-medium text-foreground hover:bg-muted/50 transition-all hover:scale-[1.02]"
                >
                  Necessary Only
                </button>
                <button
                  onClick={() => setShowSettings(true)}
                  className="flex-1 px-4 py-2.5 border-2 border-border rounded-xl text-sm font-medium text-foreground hover:bg-muted/50 transition-all hover:scale-[1.02] flex items-center justify-center gap-2"
                >
                  <Settings className="w-4 h-4" />
                  Customize
                </button>
              </div>
              <Link 
                to="/privacy" 
                className="block text-center text-xs text-muted-foreground hover:text-primary transition-colors underline"
              >
                Privacy Policy
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="space-y-3">
                <div className="p-4 bg-muted/30 rounded-xl border border-border">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2.5">
                      <Shield className="w-5 h-5 text-primary" />
                      <span className="text-sm font-semibold">Necessary Cookies</span>
                    </div>
                    <div className="text-xs text-muted-foreground bg-muted px-2.5 py-1 rounded-md font-medium">Always Active</div>
                  </div>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    Required for basic site functionality and security.
                  </p>
                </div>
                
                <label className="block p-4 bg-card rounded-xl border border-border cursor-pointer hover:bg-muted/30 hover:border-primary/30 transition-all">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2.5">
                      <BarChart className="w-5 h-5 text-muted-foreground" />
                      <span className="text-sm font-semibold">Analytics Cookies</span>
                    </div>
                    <input
                      type="checkbox"
                      checked={preferences.analytics}
                      onChange={(e) => setPreferences(prev => ({ ...prev, analytics: e.target.checked }))}
                      className="w-5 h-5 rounded accent-primary cursor-pointer"
                    />
                  </div>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    Help us understand how visitors interact with our website.
                  </p>
                </label>

                <label className="block p-4 bg-card rounded-xl border border-border cursor-pointer hover:bg-muted/30 hover:border-primary/30 transition-all">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2.5">
                      <Cookie className="w-5 h-5 text-muted-foreground" />
                      <span className="text-sm font-semibold">Marketing Cookies</span>
                    </div>
                    <input
                      type="checkbox"
                      checked={preferences.marketing}
                      onChange={(e) => setPreferences(prev => ({ ...prev, marketing: e.target.checked }))}
                      className="w-5 h-5 rounded accent-primary cursor-pointer"
                    />
                  </div>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    Used to deliver personalized content and advertisements.
                  </p>
                </label>
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  onClick={() => setShowSettings(false)}
                  className="flex-1 px-4 py-2.5 border-2 border-border rounded-xl text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-all"
                >
                  Back
                </button>
                <button
                  onClick={saveCustomPreferences}
                  className="flex-1 px-5 py-3 bg-primary text-primary-foreground rounded-xl text-sm font-semibold hover:bg-primary/90 transition-all hover:scale-[1.02]"
                >
                  Save Preferences
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );

  return (
    <>
      <MobileView />
      <DesktopView />

      <style>{`
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
        @keyframes slide-in-left {
          from { 
            opacity: 0;
            transform: translateX(-2rem);
          }
          to { 
            opacity: 1;
            transform: translateX(0);
          }
        }
        .animate-slide-up-mobile {
          animation: slide-up-mobile 0.4s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .animate-slide-in-left {
          animation: slide-in-left 0.5s cubic-bezier(0.16, 1, 0.3, 1);
        }
      `}</style>
    </>
  );
};

export default CookieConsent;
