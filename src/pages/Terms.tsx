import Layout from "@/components/layout/Layout";
import { BUSINESS_INFO } from "@/lib/constants";

const Terms = () => {
  return (
    <Layout>
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-8">
              Terms & Conditions
            </h1>
            
            <div className="prose prose-invert max-w-none">
              <p className="text-muted-foreground mb-6">
                Last updated: {new Date().toLocaleDateString('en-GB', { month: 'long', year: 'numeric' })}
              </p>

              <div className="space-y-8">
                <section>
                  <h2 className="text-2xl font-semibold text-foreground mb-4">1. Services</h2>
                  <p className="text-muted-foreground">
                    {BUSINESS_INFO.name} provides mobile mechanic services at customer locations within 
                    our service area. Services include vehicle diagnostics, repairs, servicing, and 
                    maintenance as described on our website.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold text-foreground mb-4">2. Quotes & Pricing</h2>
                  <p className="text-muted-foreground mb-4">
                    All quotes provided are estimates based on the information given. Final pricing may 
                    vary if:
                  </p>
                  <ul className="list-disc list-inside text-muted-foreground space-y-2">
                    <li>Additional work is required upon inspection</li>
                    <li>Parts prices change from suppliers</li>
                    <li>Vehicle condition differs from description</li>
                  </ul>
                  <p className="text-muted-foreground mt-4">
                    We will always inform you of any changes before proceeding with additional work.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold text-foreground mb-4">3. Booking & Cancellation</h2>
                  <p className="text-muted-foreground mb-4">
                    Bookings can be made via phone, WhatsApp, or our online quote form. We request 
                    24 hours notice for cancellations. Late cancellations or no-shows may incur a 
                    call-out fee.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold text-foreground mb-4">4. Payment</h2>
                  <p className="text-muted-foreground">
                    Payment is due upon completion of services. We accept cash, bank transfer, and 
                    card payments. For larger jobs, a deposit may be required to secure parts ordering.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold text-foreground mb-4">5. Warranty</h2>
                  <p className="text-muted-foreground">
                    All work carried out is guaranteed for 12 months or 12,000 miles (whichever comes 
                    first). Parts are covered by manufacturer warranties where applicable. Warranty 
                    does not cover wear and tear or damage caused by misuse.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold text-foreground mb-4">6. Liability</h2>
                  <p className="text-muted-foreground">
                    We carry full public liability insurance and professional indemnity insurance. 
                    Our liability is limited to the cost of the services provided. We are not liable 
                    for pre-existing vehicle faults or issues unrelated to our work.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold text-foreground mb-4">7. Vehicle Access</h2>
                  <p className="text-muted-foreground">
                    Customers must provide safe and suitable access to the vehicle for work to be 
                    carried out. We reserve the right to reschedule if conditions are unsuitable 
                    (e.g., severe weather, unsafe location).
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold text-foreground mb-4">8. Customer Responsibilities</h2>
                  <p className="text-muted-foreground mb-4">Customers are responsible for:</p>
                  <ul className="list-disc list-inside text-muted-foreground space-y-2">
                    <li>Providing accurate vehicle and contact information</li>
                    <li>Being present or providing access during the appointment</li>
                    <li>Ensuring the vehicle is legally parked and accessible</li>
                    <li>Informing us of any known issues or concerns</li>
                  </ul>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold text-foreground mb-4">9. Disputes</h2>
                  <p className="text-muted-foreground">
                    Any disputes should be raised within 7 days of service completion. We will 
                    endeavour to resolve any issues promptly and fairly. These terms are governed 
                    by English law.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold text-foreground mb-4">10. Contact</h2>
                  <p className="text-muted-foreground">
                    For any questions regarding these terms:
                  </p>
                  <div className="mt-4 text-muted-foreground">
                    <p>Email: <a href={`mailto:${BUSINESS_INFO.email}`} className="text-primary hover:underline">{BUSINESS_INFO.email}</a></p>
                    <p>Phone: <a href={`tel:${BUSINESS_INFO.phone}`} className="text-primary hover:underline">{BUSINESS_INFO.phone}</a></p>
                  </div>
                </section>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Terms;
