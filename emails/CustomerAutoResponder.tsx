import * as React from 'react';
import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Preview,
  Section,
  Text,
  Link,
  Hr,
} from '@react-email/components';

interface CustomerAutoResponderProps {
  customerName: string;
  formType: 'estimate' | 'interim' | 'full';
}

export default function CustomerAutoResponder({
  customerName,
  formType,
}: CustomerAutoResponderProps) {
  const formTypeText =
    formType === 'estimate'
      ? 'quote request'
      : formType === 'interim'
      ? 'interim service booking'
      : 'full service booking';

  return (
    <Html>
      <Head />
      <Preview>Thank you for your enquiry - FixNow Mechanics</Preview>
      <Body style={main}>
        <Container style={container}>
          {/* Header */}
          <Section style={header}>
            <Heading style={headerTitle}>FixNow Mechanics</Heading>
            <Text style={headerSubtitle}>Mobile Mechanic Service</Text>
          </Section>

          {/* Main Content */}
          <Section style={section}>
            <Heading style={mainTitle}>
              Thank You, {customerName}!
            </Heading>
            <Text style={paragraph}>
              We've received your <strong>{formTypeText}</strong> and we're excited to help you.
            </Text>
            <Text style={paragraph}>
              One of our experienced mechanics will contact you within 1 business day to:
            </Text>
            <ul style={list}>
              <li style={listItem}>Confirm your vehicle details</li>
              <li style={listItem}>Discuss your service requirements</li>
              <li style={listItem}>Schedule a convenient time for your service</li>
              <li style={listItem}>Provide a clear, honest quote</li>
            </ul>
          </Section>

          <Hr style={divider} />

          {/* What Happens Next */}
          <Section style={section}>
            <Heading style={sectionTitle}>What Happens Next?</Heading>
            <Text style={paragraph}>
              <strong>1. Confirmation Call</strong><br />
              We'll contact you to confirm details and answer any questions.
            </Text>
            <Text style={paragraph}>
              <strong>2. Schedule Service</strong><br />
              We'll work with your preferred date to find the best time.
            </Text>
            <Text style={paragraph}>
              <strong>3. We Come To You</strong><br />
              Our mobile mechanic arrives at your location with all necessary tools.
            </Text>
          </Section>

          <Hr style={divider} />

          {/* Contact Info */}
          <Section style={section}>
            <Heading style={sectionTitle}>Need Help Right Away?</Heading>
            <Text style={paragraph}>
              <strong>Phone:</strong>{' '}
              <Link href="tel:07354915941" style={link}>
                07354 915941
              </Link>
            </Text>
            <Text style={paragraph}>
              <strong>Email:</strong>{' '}
              <Link href="mailto:fixnowmechanics@outlook.com" style={link}>
                fixnowmechanics@outlook.com
              </Link>
            </Text>
            <Text style={paragraph}>
              <strong>WhatsApp:</strong>{' '}
              <Link
                href="https://wa.me/447354915941?text=Hi%2C%20I%27m%20contacting%20about%20my%20recent%20enquiry"
                style={link}
              >
                Message Us
              </Link>
            </Text>
          </Section>

          <Hr style={divider} />

          {/* Why Choose Us */}
          <Section style={highlightSection}>
            <Heading style={sectionTitle}>Why Choose FixNow?</Heading>
            <Text style={highlightText}>
              ✓ <strong>25 Miles Coverage</strong> - We come to you anywhere within 25 miles of HP2 7DE
            </Text>
            <Text style={highlightText}>
              ✓ <strong>Flexible Hours</strong> - Mon-Fri: 7am-10pm, Sat-Sun: 8am-10pm
            </Text>
            <Text style={highlightText}>
              ✓ <strong>Experienced Mechanics</strong> - Professional service you can trust
            </Text>
            <Text style={highlightText}>
              ✓ <strong>Transparent Pricing</strong> - No hidden fees, clear quotes upfront
            </Text>
          </Section>

          {/* Footer */}
          <Section style={footer}>
            <Text style={footerText}>
              FixNow Mechanics - Professional Mobile Mechanic Service
            </Text>
            <Text style={footerText}>
              Coverage Area: 25 miles from HP2 7DE
            </Text>
            <Text style={footerText}>
              Mon-Fri: 7am-10pm | Sat-Sun: 8am-10pm
            </Text>
            <Text style={footerText}>
              <Link href="https://fixnowmechanics.co.uk" style={footerLink}>
                fixnowmechanics.co.uk
              </Link>
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
}

// Styles
const main = {
  backgroundColor: '#f6f9fc',
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Ubuntu,sans-serif',
};

const container = {
  backgroundColor: '#ffffff',
  margin: '0 auto',
  padding: '20px 0 48px',
  marginBottom: '64px',
  maxWidth: '600px',
};

const header = {
  background: 'linear-gradient(135deg, #FF6B35 0%, #FF8C42 100%)',
  padding: '40px 40px',
  textAlign: 'center' as const,
};

const headerTitle = {
  color: '#ffffff',
  fontSize: '36px',
  fontWeight: 'bold',
  margin: '0 0 8px',
  lineHeight: '1.2',
};

const headerSubtitle = {
  color: '#ffffff',
  fontSize: '16px',
  margin: '0',
  opacity: 0.95,
  letterSpacing: '0.5px',
};

const section = {
  padding: '32px 40px',
};

const highlightSection = {
  padding: '32px 40px',
  backgroundColor: '#fef3f2',
};

const mainTitle = {
  color: '#1f2937',
  fontSize: '28px',
  fontWeight: '600',
  margin: '0 0 24px',
  lineHeight: '1.3',
};

const sectionTitle = {
  color: '#1f2937',
  fontSize: '20px',
  fontWeight: '600',
  margin: '0 0 16px',
};

const paragraph = {
  color: '#4b5563',
  fontSize: '16px',
  lineHeight: '26px',
  margin: '0 0 16px',
};

const list = {
  margin: '0 0 16px',
  paddingLeft: '20px',
};

const listItem = {
  color: '#4b5563',
  fontSize: '16px',
  lineHeight: '26px',
  marginBottom: '8px',
};

const highlightText = {
  color: '#374151',
  fontSize: '15px',
  lineHeight: '24px',
  margin: '0 0 12px',
};

const link = {
  color: '#FF6B35',
  textDecoration: 'none',
  fontWeight: '600',
};

const divider = {
  borderColor: '#e5e7eb',
  margin: '0',
};

const footer = {
  padding: '32px 40px',
  backgroundColor: '#f9fafb',
  textAlign: 'center' as const,
};

const footerText = {
  color: '#6b7280',
  fontSize: '13px',
  lineHeight: '20px',
  margin: '4px 0',
};

const footerLink = {
  color: '#FF6B35',
  textDecoration: 'none',
};
