import { ReactNode } from "react";
import Header from "./Header";
import Footer from "./Footer";
import WhatsAppWidget from "./WhatsAppWidget";
import CookieConsent from "../common/CookieConsent";

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="min-h-screen flex flex-col overflow-x-hidden max-w-full">
      <Header />
      <main className="flex-1 pt-16 md:pt-20 overflow-x-hidden max-w-full">{children}</main>
      <Footer />
      <WhatsAppWidget />
      <CookieConsent />
    </div>
  );
};

export default Layout;
