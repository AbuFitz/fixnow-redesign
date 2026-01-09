// Professional Email Templates for FixNow Mechanics

interface QuoteFormData {
  serviceType?: string;
  make: string;
  model: string;
  year?: string;
  reg: string;
  fuelType?: string;
  name: string;
  email: string;
  phone: string;
  postcode: string;
  preferredDate?: string;
  message?: string;
}

// FixNow brand colors
const PRIMARY_COLOR = "#FF6B35"; // Adjust to match your exact primary color
const BACKGROUND_COLOR = "#FFFFFF";
const TEXT_COLOR = "#1a1a1a";
const MUTED_COLOR = "#6b7280";

// Email header with FixNow branding
const emailHeader = `
  <div style="background: linear-gradient(135deg, ${PRIMARY_COLOR} 0%, ${PRIMARY_COLOR}dd 100%); padding: 30px 20px; text-align: center; border-radius: 12px 12px 0 0;">
    <h1 style="color: white; margin: 0; font-size: 28px; font-weight: bold; font-family: 'Segoe UI', Arial, sans-serif;">
      FixNow Mechanics
    </h1>
    <p style="color: rgba(255,255,255,0.9); margin: 8px 0 0 0; font-size: 14px;">
      Mobile Mechanic Services at Your Location
    </p>
  </div>
`;

// Email footer
const emailFooter = `
  <div style="margin-top: 30px; padding-top: 20px; border-top: 2px solid #e5e7eb; text-align: center; color: ${MUTED_COLOR}; font-size: 13px;">
    <p style="margin: 5px 0;"><strong>FixNow Mechanics</strong></p>
    <p style="margin: 5px 0;">📞 07354 915941 | 📧 fixnowmechanics@outlook.com</p>
    <p style="margin: 5px 0;">📍 Hemel Hempstead, HP2 7DE</p>
    <p style="margin: 5px 0;">🕒 Mon-Fri: 7am-10pm | Sat-Sun: 8am-10pm</p>
    <p style="margin: 10px 0 5px 0; font-size: 12px;">Covering 25 miles including St Albans, Watford, Luton & surrounding areas</p>
  </div>
`;

// Container style
const containerStyle = `
  max-width: 600px;
  margin: 0 auto;
  background: ${BACKGROUND_COLOR};
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 6px rgba(0,0,0,0.1);
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
`;

const contentStyle = `
  padding: 30px 25px;
  color: ${TEXT_COLOR};
  line-height: 1.6;
`;

// Customer Auto-Responder Email (Sent to customer immediately)
export const generateCustomerAutoResponder = (formData: QuoteFormData, formType: string): string => {
  const formTypeNames: Record<string, string> = {
    quote: "quote request",
    estimate: "estimate request",
    interim: "interim service booking",
    full: "full service booking"
  };

  const serviceName = formTypeNames[formType] || "enquiry";

  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
    </head>
    <body style="margin: 0; padding: 20px; background-color: #f3f4f6;">
      <div style="${containerStyle}">
        ${emailHeader}
        
        <div style="${contentStyle}">
          <h2 style="color: ${PRIMARY_COLOR}; margin-top: 0; font-size: 22px;">
            👋 Hi ${formData.name}!
          </h2>
          
          <p style="font-size: 16px; margin: 15px 0;">
            Thank you for your <strong>${serviceName}</strong> with FixNow Mechanics!
          </p>
          
          <div style="background: #f9fafb; padding: 20px; border-radius: 8px; border-left: 4px solid ${PRIMARY_COLOR}; margin: 20px 0;">
            <p style="margin: 0 0 10px 0; font-size: 15px;">
              <strong>✅ We've received your request</strong>
            </p>
            <p style="margin: 0; color: ${MUTED_COLOR}; font-size: 14px;">
              Our team will review your details and get back to you within <strong style="color: ${TEXT_COLOR};">1 hour</strong> during business hours.
            </p>
          </div>
          
          <div style="margin: 25px 0;">
            <h3 style="color: ${TEXT_COLOR}; font-size: 16px; margin-bottom: 12px;">📋 Your Request Details:</h3>
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 8px 0; color: ${MUTED_COLOR}; font-size: 14px;">Vehicle:</td>
                <td style="padding: 8px 0; font-weight: 600; font-size: 14px;">${formData.make} ${formData.model}${formData.year ? ` (${formData.year})` : ''}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: ${MUTED_COLOR}; font-size: 14px;">Registration:</td>
                <td style="padding: 8px 0; font-weight: 600; font-size: 14px;">${formData.reg}</td>
              </tr>
              ${formData.preferredDate ? `
              <tr>
                <td style="padding: 8px 0; color: ${MUTED_COLOR}; font-size: 14px;">Preferred Date:</td>
                <td style="padding: 8px 0; font-weight: 600; font-size: 14px;">${formData.preferredDate}</td>
              </tr>
              ` : ''}
              <tr>
                <td style="padding: 8px 0; color: ${MUTED_COLOR}; font-size: 14px;">Location:</td>
                <td style="padding: 8px 0; font-weight: 600; font-size: 14px;">${formData.postcode}</td>
              </tr>
            </table>
          </div>
          
          <div style="background: linear-gradient(135deg, ${PRIMARY_COLOR}15 0%, ${PRIMARY_COLOR}05 100%); padding: 18px; border-radius: 8px; margin: 25px 0;">
            <p style="margin: 0 0 8px 0; font-size: 14px; color: ${TEXT_COLOR};">
              <strong>💬 Need to talk to us urgently?</strong>
            </p>
            <p style="margin: 0;">
              <a href="tel:07354915941" style="color: ${PRIMARY_COLOR}; text-decoration: none; font-weight: 600; font-size: 18px;">
                📞 Call: 07354 915941
              </a>
            </p>
            <p style="margin: 8px 0 0 0;">
              <a href="https://wa.me/447354915941" style="color: #25D366; text-decoration: none; font-weight: 600;">
                💬 WhatsApp: Chat Now
              </a>
            </p>
          </div>
          
          <p style="font-size: 14px; color: ${MUTED_COLOR}; margin: 20px 0 0 0;">
            Thanks for choosing FixNow Mechanics!<br>
            We look forward to helping you with your vehicle.
          </p>
        </div>
        
        ${emailFooter}
      </div>
    </body>
    </html>
  `;
};

// Business Notification Email (Sent to you with form details)
export const generateBusinessNotification = (formData: QuoteFormData, formType: string): string => {
  const formTypeNames: Record<string, string> = {
    quote: "Quote Request",
    estimate: "Quick Estimate",
    interim: "Interim Service Booking",
    full: "Full Service Booking"
  };

  const title = formTypeNames[formType] || "New Enquiry";

  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
    </head>
    <body style="margin: 0; padding: 20px; background-color: #f3f4f6;">
      <div style="${containerStyle}">
        ${emailHeader}
        
        <div style="${contentStyle}">
          <h2 style="color: ${PRIMARY_COLOR}; margin-top: 0; font-size: 22px;">
            🔔 New ${title}
          </h2>
          
          <p style="font-size: 15px; color: ${MUTED_COLOR};">
            Received: ${new Date().toLocaleString('en-GB', { 
              dateStyle: 'full', 
              timeStyle: 'short' 
            })}
          </p>
          
          <div style="background: #fffbeb; border: 2px solid #fbbf24; padding: 15px; border-radius: 8px; margin: 20px 0;">
            <p style="margin: 0; font-weight: 600; color: #92400e;">
              ⚡ Action Required: Contact customer within 1 hour
            </p>
          </div>
          
          <h3 style="color: ${TEXT_COLOR}; font-size: 18px; margin: 25px 0 15px 0; border-bottom: 2px solid #e5e7eb; padding-bottom: 8px;">
            👤 Customer Details
          </h3>
          
          <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
            <tr style="background: #f9fafb;">
              <td style="padding: 12px; font-weight: 600; width: 150px;">Name:</td>
              <td style="padding: 12px;">${formData.name}</td>
            </tr>
            <tr>
              <td style="padding: 12px; font-weight: 600;">Email:</td>
              <td style="padding: 12px;">
                <a href="mailto:${formData.email}" style="color: ${PRIMARY_COLOR}; text-decoration: none;">
                  ${formData.email}
                </a>
              </td>
            </tr>
            <tr style="background: #f9fafb;">
              <td style="padding: 12px; font-weight: 600;">Phone:</td>
              <td style="padding: 12px;">
                <a href="tel:${formData.phone}" style="color: ${PRIMARY_COLOR}; text-decoration: none; font-weight: 600; font-size: 16px;">
                  ${formData.phone}
                </a>
              </td>
            </tr>
            <tr>
              <td style="padding: 12px; font-weight: 600;">Postcode:</td>
              <td style="padding: 12px;">${formData.postcode}</td>
            </tr>
          </table>
          
          <h3 style="color: ${TEXT_COLOR}; font-size: 18px; margin: 25px 0 15px 0; border-bottom: 2px solid #e5e7eb; padding-bottom: 8px;">
            🚗 Vehicle Information
          </h3>
          
          <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
            ${formData.serviceType ? `
            <tr style="background: #f9fafb;">
              <td style="padding: 12px; font-weight: 600; width: 150px;">Service Type:</td>
              <td style="padding: 12px;">${formData.serviceType}</td>
            </tr>
            ` : ''}
            <tr ${!formData.serviceType ? 'style="background: #f9fafb;"' : ''}>
              <td style="padding: 12px; font-weight: 600; ${!formData.serviceType ? 'width: 150px;' : ''}">Make & Model:</td>
              <td style="padding: 12px;"><strong>${formData.make} ${formData.model}</strong></td>
            </tr>
            ${formData.year ? `
            <tr ${formData.serviceType ? 'style="background: #f9fafb;"' : ''}>
              <td style="padding: 12px; font-weight: 600;">Year:</td>
              <td style="padding: 12px;">${formData.year}</td>
            </tr>
            ` : ''}
            <tr ${(formData.serviceType && !formData.year) || (!formData.serviceType && formData.year) ? 'style="background: #f9fafb;"' : ''}>
              <td style="padding: 12px; font-weight: 600;">Registration:</td>
              <td style="padding: 12px;"><strong style="font-size: 16px; color: ${PRIMARY_COLOR};">${formData.reg}</strong></td>
            </tr>
            ${formData.fuelType ? `
            <tr>
              <td style="padding: 12px; font-weight: 600;">Fuel Type:</td>
              <td style="padding: 12px;">${formData.fuelType}</td>
            </tr>
            ` : ''}
          </table>
          
          ${formData.preferredDate || formData.message ? `
          <h3 style="color: ${TEXT_COLOR}; font-size: 18px; margin: 25px 0 15px 0; border-bottom: 2px solid #e5e7eb; padding-bottom: 8px;">
            📝 Additional Information
          </h3>
          ` : ''}
          
          ${formData.preferredDate ? `
          <div style="background: #f0fdf4; padding: 15px; border-radius: 8px; margin-bottom: 15px; border-left: 4px solid #22c55e;">
            <p style="margin: 0; font-weight: 600; color: #15803d;">📅 Preferred Date:</p>
            <p style="margin: 5px 0 0 0; font-size: 16px;">${formData.preferredDate}</p>
          </div>
          ` : ''}
          
          ${formData.message ? `
          <div style="background: #f9fafb; padding: 15px; border-radius: 8px; border: 1px solid #e5e7eb;">
            <p style="margin: 0 0 8px 0; font-weight: 600; color: ${TEXT_COLOR};">💬 Customer Message:</p>
            <p style="margin: 0; white-space: pre-wrap; line-height: 1.6;">${formData.message}</p>
          </div>
          ` : ''}
          
          <div style="margin-top: 30px; padding: 20px; background: linear-gradient(135deg, ${PRIMARY_COLOR}10 0%, ${PRIMARY_COLOR}05 100%); border-radius: 8px; text-align: center;">
            <p style="margin: 0 0 15px 0; font-size: 16px; font-weight: 600; color: ${TEXT_COLOR};">
              Quick Actions
            </p>
            <a href="tel:${formData.phone}" style="display: inline-block; background: ${PRIMARY_COLOR}; color: white; padding: 12px 24px; border-radius: 6px; text-decoration: none; font-weight: 600; margin: 5px;">
              📞 Call Customer
            </a>
            <a href="mailto:${formData.email}" style="display: inline-block; background: #1a1a1a; color: white; padding: 12px 24px; border-radius: 6px; text-decoration: none; font-weight: 600; margin: 5px;">
              ✉️ Email Customer
            </a>
          </div>
        </div>
        
        ${emailFooter}
      </div>
    </body>
    </html>
  `;
};
