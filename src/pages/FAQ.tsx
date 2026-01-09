import Layout from "@/components/layout/Layout";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "How do you calculate the price?",
    answer: "Our prices include labour and parts. We check the exact parts cost for your vehicle and give you a final price before booking. No surprises.",
  },
  {
    question: "What is included in a service?",
    answer: "An interim service covers oil, filter, and safety checks. A full service adds air filter, cabin filter, and a more comprehensive inspection. Diesel full services include fuel filter replacement.",
  },
  {
    question: "Do you cover my area?",
    answer: "We are based in Hemel Hempstead and cover approximately 25 miles including St Albans, Watford, Luton, Stevenage, and surrounding areas. Locations further away may have a small travel supplement.",
  },
  {
    question: "How do I pay?",
    answer: "Bank transfer or cash on completion of work.",
  },
  {
    question: "What if you find extra problems?",
    answer: "We will contact you before doing any additional work. You approve the cost first.",
  },
  {
    question: "Do you guarantee your work?",
    answer: "Yes. 30-day guarantee on workmanship.",
  },
];

const FAQ = () => {
  return (
    <Layout>
      {/* Hero */}
      <section className="relative py-12 md:py-18 bg-gradient-to-b from-card via-surface to-card overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_hsl(var(--primary)/0.08),_transparent_50%)]" />
        
        <div className="container mx-auto px-6 md:px-12 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">
              Frequently Asked <span className="text-primary">Questions</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-xl mx-auto">
              Common questions about our mobile mechanic services
            </p>
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="pt-16 pb-16 md:pt-20 md:pb-24">
        <div className="container mx-auto px-6 md:px-12">
          <div className="max-w-3xl mx-auto">
            <Accordion type="single" collapsible className="space-y-4">
              {faqs.map((faq, index) => (
                <AccordionItem
                  key={index}
                  value={`item-${index}`}
                  className="bg-card border border-border rounded-lg px-6 py-2"
                >
                  <AccordionTrigger className="text-left text-lg font-semibold text-foreground hover:text-primary">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground pt-2 pb-4">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default FAQ;
