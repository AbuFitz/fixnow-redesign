import { useEffect } from "react";
import Layout from "@/components/layout/Layout";
import HeroSection from "@/components/home/HeroSection";
import ServicesSection from "@/components/home/ServicesSection";
import HowItWorksSection from "@/components/home/HowItWorksSection";
import AreasSection from "@/components/home/AreasSection";
import WhyUsSection from "@/components/home/WhyUsSection";
import CTASection from "@/components/home/CTASection";

const Index = () => {
  useEffect(() => {
    const isMobile = window.innerWidth < 768;
    window.scrollTo(0, isMobile ? 52 : 54);
  }, []);

  return (
    <Layout>
      <HeroSection />
      <ServicesSection />
      <HowItWorksSection />
      <AreasSection />
      <WhyUsSection />
      <CTASection />
    </Layout>
  );
};

export default Index;
