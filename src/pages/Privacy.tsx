import Layout from "@/components/layout/Layout";
import { BUSINESS_INFO } from "@/lib/constants";

const Privacy = () => {
  return (
    <Layout>
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-8">
              Privacy Policy
            </h1>
            
            <div className="prose prose-invert max-w-none">
              <p className="text-muted-foreground mb-6">
                Last updated: {new Date().toLocaleDateString('en-GB', { month: 'long', year: 'numeric' })}
              </p>

              <div className="space-y-8">
                <section>
                  <h2 className="text-2xl font-semibold text-foreground mb-4">1. Introduction</h2>
                  <p className="text-muted-foreground">
                    {BUSINESS_INFO.name} ("we", "our", "us") is committed to protecting your privacy. 
                    This Privacy Policy explains how we collect, use, and safeguard your information 
                    when you use our website or services.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold text-foreground mb-4">2. Information We Collect</h2>
                  <p className="text-muted-foreground mb-4">We may collect the following types of information:</p>
                  <ul className="list-disc list-inside text-muted-foreground space-y-2">
                    <li>Name and contact details (email, phone number)</li>
                    <li>Vehicle information (make, model, registration)</li>
                    <li>Location information for service delivery</li>
                    <li>Communication records when you contact us</li>
                    <li>Website usage data through cookies</li>
                  </ul>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold text-foreground mb-4">3. How We Use Your Information</h2>
                  <p className="text-muted-foreground mb-4">We use your information to:</p>
                  <ul className="list-disc list-inside text-muted-foreground space-y-2">
                    <li>Provide and improve our mobile mechanic services</li>
                    <li>Respond to your enquiries and quote requests</li>
                    <li>Schedule and perform vehicle repairs</li>
                    <li>Send service reminders and updates</li>
                    <li>Process payments</li>
                  </ul>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold text-foreground mb-4">4. Data Protection</h2>
                  <p className="text-muted-foreground">
                    We implement appropriate security measures to protect your personal information 
                    against unauthorised access, alteration, disclosure, or destruction. Your data 
                    is stored securely and only accessed when necessary to provide our services.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold text-foreground mb-4">5. Your Rights</h2>
                  <p className="text-muted-foreground mb-4">Under UK GDPR, you have the right to:</p>
                  <ul className="list-disc list-inside text-muted-foreground space-y-2">
                    <li>Access your personal data</li>
                    <li>Correct inaccurate data</li>
                    <li>Request deletion of your data</li>
                    <li>Object to processing of your data</li>
                    <li>Request transfer of your data</li>
                  </ul>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold text-foreground mb-4">6. Cookies</h2>
                  <p className="text-muted-foreground">
                    Our website uses cookies to improve your browsing experience. You can control 
                    cookie settings through your browser. Essential cookies are required for the 
                    website to function properly.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold text-foreground mb-4">7. Contact Us</h2>
                  <p className="text-muted-foreground">
                    If you have any questions about this Privacy Policy or wish to exercise your 
                    rights, please contact us:
                  </p>
                  <div className="mt-4 text-muted-foreground space-y-2">
                    <p>General Enquiries: <a href={`mailto:${BUSINESS_INFO.email}`} className="text-primary hover:underline">{BUSINESS_INFO.email}</a></p>
                    <p>Legal & Compliance: <a href="mailto:legal@fixnowmechanics.co.uk" className="text-primary hover:underline">legal@fixnowmechanics.co.uk</a></p>
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

export default Privacy;
