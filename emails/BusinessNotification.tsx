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
  Hr,
} from '@react-email/components';

interface BusinessNotificationProps {
  formData: {
    name: string;
    email: string;
    phone: string;
    postcode: string;
    serviceType: string;
    vehicleMake: string;
    vehicleModel: string;
    vehicleYear: string;
    vehicleReg: string;
    fuelType?: string;
    preferredDate: string;
    message: string;
    submissionDate: string;
  };
  formType: 'estimate' | 'interim' | 'full';
}

export default function BusinessNotification({
  formData,
  formType,
}: BusinessNotificationProps) {
  const formTypeTitle =
    formType === 'estimate'
      ? 'New Quote Request'
      : formType === 'interim'
      ? 'New Interim Service Booking'
      : 'New Full Service Booking';

  return (
    <Html>
      <Head />
      <Preview>{formTypeTitle} from {formData.name}</Preview>
      <Body style={main}>
        <Container style={container}>
          {/* Header */}
          <Section style={header}>
            <Heading style={headerTitle}>FixNow Mechanics</Heading>
            <Text style={headerSubtitle}>{formTypeTitle}</Text>
          </Section>

          {/* Customer Details */}
          <Section style={section}>
            <Heading style={sectionTitle}>Customer Details</Heading>
            <table style={table}>
              <tr>
                <td style={labelCell}>Name:</td>
                <td style={valueCell}>{formData.name}</td>
              </tr>
              <tr>
                <td style={labelCell}>Email:</td>
                <td style={valueCell}>
                  <a href={`mailto:${formData.email}`} style={link}>
                    {formData.email}
                  </a>
                </td>
              </tr>
              <tr>
                <td style={labelCell}>Phone:</td>
                <td style={valueCell}>
                  <a href={`tel:${formData.phone}`} style={link}>
                    {formData.phone}
                  </a>
                </td>
              </tr>
              <tr>
                <td style={labelCell}>Postcode:</td>
                <td style={valueCell}>{formData.postcode}</td>
              </tr>
            </table>
          </Section>

          <Hr style={divider} />

          {/* Vehicle Details */}
          <Section style={section}>
            <Heading style={sectionTitle}>Vehicle Details</Heading>
            <table style={table}>
              <tr>
                <td style={labelCell}>Make:</td>
                <td style={valueCell}>{formData.vehicleMake}</td>
              </tr>
              <tr>
                <td style={labelCell}>Model:</td>
                <td style={valueCell}>{formData.vehicleModel}</td>
              </tr>
              <tr>
                <td style={labelCell}>Year:</td>
                <td style={valueCell}>{formData.vehicleYear}</td>
              </tr>
              <tr>
                <td style={labelCell}>Registration:</td>
                <td style={valueCell}>{formData.vehicleReg}</td>
              </tr>
              {formData.fuelType && (
                <tr>
                  <td style={labelCell}>Fuel Type:</td>
                  <td style={valueCell}>{formData.fuelType}</td>
                </tr>
              )}
            </table>
          </Section>

          <Hr style={divider} />

          {/* Service Details */}
          <Section style={section}>
            <Heading style={sectionTitle}>Service Details</Heading>
            <table style={table}>
              <tr>
                <td style={labelCell}>Service Type:</td>
                <td style={valueCell}>{formData.serviceType}</td>
              </tr>
              <tr>
                <td style={labelCell}>Preferred Date:</td>
                <td style={valueCell}>{formData.preferredDate}</td>
              </tr>
              {formData.message !== 'None' && (
                <tr>
                  <td style={labelCell}>Additional Message:</td>
                  <td style={valueCell}>{formData.message}</td>
                </tr>
              )}
            </table>
          </Section>

          {/* Footer */}
          <Section style={footer}>
            <Text style={footerText}>
              Submitted: {formData.submissionDate}
            </Text>
            <Text style={footerText}>
              Quick Actions:{' '}
              <a href={`mailto:${formData.email}`} style={link}>
                Email Customer
              </a>{' '}
              |{' '}
              <a href={`tel:${formData.phone}`} style={link}>
                Call Customer
              </a>
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
  padding: '32px 40px',
  textAlign: 'center' as const,
};

const headerTitle = {
  color: '#ffffff',
  fontSize: '32px',
  fontWeight: 'bold',
  margin: '0 0 8px',
  lineHeight: '1.2',
};

const headerSubtitle = {
  color: '#ffffff',
  fontSize: '18px',
  margin: '0',
  opacity: 0.9,
};

const section = {
  padding: '24px 40px',
};

const sectionTitle = {
  color: '#1f2937',
  fontSize: '20px',
  fontWeight: '600',
  margin: '0 0 16px',
};

const table = {
  width: '100%',
  borderCollapse: 'collapse' as const,
};

const labelCell = {
  color: '#6b7280',
  fontSize: '14px',
  fontWeight: '500',
  padding: '8px 16px 8px 0',
  verticalAlign: 'top' as const,
  width: '140px',
};

const valueCell = {
  color: '#1f2937',
  fontSize: '14px',
  padding: '8px 0',
  verticalAlign: 'top' as const,
};

const link = {
  color: '#FF6B35',
  textDecoration: 'none',
  fontWeight: '500',
};

const divider = {
  borderColor: '#e5e7eb',
  margin: '0',
};

const footer = {
  padding: '24px 40px',
  backgroundColor: '#f9fafb',
};

const footerText = {
  color: '#6b7280',
  fontSize: '12px',
  lineHeight: '20px',
  margin: '4px 0',
};
