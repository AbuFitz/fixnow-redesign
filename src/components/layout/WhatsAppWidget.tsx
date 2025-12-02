import { MessageCircle } from "lucide-react";
import { BUSINESS_INFO } from "@/lib/constants";

const WhatsAppWidget = () => {
  return (
    <a
      href={BUSINESS_INFO.whatsapp}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-green-500 hover:bg-green-600 rounded-full flex items-center justify-center shadow-lg transition-all hover:scale-110"
      aria-label="Chat on WhatsApp"
    >
      <MessageCircle className="w-7 h-7 text-white" />
    </a>
  );
};

export default WhatsAppWidget;
