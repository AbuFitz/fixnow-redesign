// Professional HTML Email Templates for FixNow Mechanics
// Designed for maximum deliverability and brand consistency

interface CustomerEmailData {
  name: string;
  email: string;
  phone?: string;
  postcode?: string;
  vehicleMake?: string;
  vehicleModel?: string;
  vehicleYear?: string;
  vehicleReg?: string;
  fuelType?: string;
  serviceType?: string;
  preferredDate?: string;
  message?: string;
}

// Base email styles for consistency and deliverability
const emailStyles = {
  body: 'margin:0;padding:0;background-color:#f5f5f5;font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Helvetica,Arial,sans-serif',
  container: 'max-width:600px;margin:0 auto;background-color:#ffffff',
  header: 'background:linear-gradient(135deg,#FF6B35 0%,#FF8C42 100%);padding:32px 24px;text-align:center',
  headerTitle: 'color:#ffffff;font-size:28px;font-weight:700;margin:0;letter-spacing:-0.5px',
  headerSubtitle: 'color:#ffffff;font-size:14px;font-weight:400;margin:8px 0 0 0;opacity:0.95',
  content: 'padding:32px 24px',
  sectionTitle: 'color:#1f2937;font-size:20px;font-weight:600;margin:0 0 16px 0',
  text: 'color:#4b5563;font-size:15px;line-height:24px;margin:0 0 16px 0',
  textBold: 'color:#1f2937;font-weight:600',
  infoBox: 'background-color:#fef3f2;border-left:4px solid #FF6B35;padding:16px 20px;margin:24px 0;border-radius:4px',
  infoBoxTitle: 'color:#1f2937;font-size:16px;font-weight:600;margin:0 0 12px 0;display:flex;align-items:center',
  infoBoxText: 'color:#374151;font-size:14px;line-height:22px;margin:8px 0',
  table: 'width:100%;border-collapse:collapse;margin:16px 0',
  tableRow: 'border-bottom:1px solid #e5e7eb',
  tableLabel: 'color:#6b7280;font-size:14px;padding:12px 8px 12px 0;text-align:left;font-weight:500;width:40%',
  tableValue: 'color:#1f2937;font-size:14px;padding:12px 0;text-align:left;font-weight:400',
  divider: 'border:0;border-top:1px solid #e5e7eb;margin:24px 0',
  button: 'display:inline-block;background-color:#FF6B35;color:#ffffff;text-decoration:none;padding:14px 32px;border-radius:8px;font-weight:600;font-size:15px;margin:8px 4px',
  buttonOutline: 'display:inline-block;background-color:transparent;color:#FF6B35;text-decoration:none;padding:14px 32px;border-radius:8px;font-weight:600;font-size:15px;border:2px solid #FF6B35;margin:8px 4px',
  footer: 'background-color:#f9fafb;padding:24px;text-align:center;border-top:1px solid #e5e7eb',
  footerText: 'color:#6b7280;font-size:13px;line-height:20px;margin:4px 0',
  footerLink: 'color:#FF6B35;text-decoration:none;font-weight:500',
  icon: 'display:inline-block;width:20px;height:20px;margin-right:8px;vertical-align:middle',
};

// SVG Icons for email (inline, no external dependencies)
const icons = {
  checkCircle: `<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" style="${emailStyles.icon}"><circle cx="10" cy="10" r="9" stroke="#10b981" stroke-width="2" fill="none"/><path d="M6 10l2.5 2.5L14 7.5" stroke="#10b981" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  clock: `<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" style="${emailStyles.icon}"><circle cx="10" cy="10" r="8" stroke="#FF6B35" stroke-width="2" fill="none"/><path d="M10 6v4l3 2" stroke="#FF6B35" stroke-width="2" stroke-linecap="round"/></svg>`,
  phone: `<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" style="${emailStyles.icon}"><path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" stroke="#FF6B35" stroke-width="2" fill="none"/></svg>`,
  mail: `<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" style="${emailStyles.icon}"><path d="M3 4h14a1 1 0 011 1v10a1 1 0 01-1 1H3a1 1 0 01-1-1V5a1 1 0 011-1z" stroke="#FF6B35" stroke-width="2" fill="none"/><path d="M18 5l-8 5-8-5" stroke="#FF6B35" stroke-width="2" stroke-linecap="round"/></svg>`,
  info: `<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" style="${emailStyles.icon}"><circle cx="10" cy="10" r="8" stroke="#3b82f6" stroke-width="2" fill="none"/><path d="M10 10v4M10 6h.01" stroke="#3b82f6" stroke-width="2" stroke-linecap="round"/></svg>`,
};

// Helper to format date
function formatDate(dateString: string): string {
  if (!dateString || dateString === 'No preference') return 'No preference';
  try {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });
  } catch {
    return dateString;
  }
}

// Helper to conditionally render table row
function renderTableRow(label: string, value: string | undefined, skipValues: string[] = ['Not provided', 'None', '', undefined]): string {
  if (!value || skipValues.includes(value)) return '';
  return `<tr style="${emailStyles.tableRow}"><td style="${emailStyles.tableLabel}">${label}</td><td style="${emailStyles.tableValue}">${value}</td></tr>`;
}

// Customer Confirmation Email - Professional, informative, reassuring
export function getCustomerConfirmationHTML(data: CustomerEmailData): string {
  const hasVehicle = data.vehicleMake && data.vehicleMake !== 'Not provided';
  const hasMessage = data.message && data.message !== 'None';
  const formattedDate = data.preferredDate ? formatDate(data.preferredDate) : null;
  
  return `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
  <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <meta name="x-apple-disable-message-reformatting">
  <title>Quote Request Received - FixNow Mechanics</title>
</head>
<body style="${emailStyles.body}">
  <table role="presentation" cellspacing="0" cellpadding="0" border="0" align="center" width="100%" style="max-width:600px;margin:0 auto">
    <tr>
      <td>
        <!-- Header -->
        <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
          <tr>
            <td style="${emailStyles.header}">
              <h1 style="${emailStyles.headerTitle}">FixNow Mechanics</h1>
              <p style="${emailStyles.headerSubtitle}">Mobile Mechanic Service</p>
            </td>
          </tr>
        </table>

        <!-- Main Content -->
        <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background-color:#ffffff">
          <tr>
            <td style="${emailStyles.content}">
              <!-- Confirmation Message -->
              <h2 style="${emailStyles.sectionTitle}">Hi ${data.name},</h2>
              <p style="${emailStyles.text}">Thank you for contacting FixNow Mechanics. We've received your quote request and our team is now reviewing the details.</p>

              <!-- Request Summary -->
              <div style="${emailStyles.infoBox}">
                <h3 style="${emailStyles.infoBoxTitle}">${icons.checkCircle}Your Request Summary</h3>
                <table role="presentation" style="${emailStyles.table}">
                  ${hasVehicle ? `
                    ${renderTableRow('Vehicle', `${data.vehicleMake} ${data.vehicleModel}${data.vehicleYear ? ' (' + data.vehicleYear + ')' : ''}`)}
                    ${renderTableRow('Registration', data.vehicleReg)}
                    ${renderTableRow('Fuel Type', data.fuelType ? data.fuelType.charAt(0).toUpperCase() + data.fuelType.slice(1) : undefined)}
                  ` : ''}
                  ${renderTableRow('Service Requested', data.serviceType)}
                  ${formattedDate ? renderTableRow('Preferred Date', formattedDate) : ''}
                  ${renderTableRow('Postcode', data.postcode)}
                </table>
                ${hasMessage ? `<p style="${emailStyles.infoBoxText}"><span style="${emailStyles.textBold}">Your Notes:</span><br/>${data.message}</p>` : ''}
              </div>

              <!-- What Happens Next -->
              <h3 style="${emailStyles.sectionTitle}">What Happens Next</h3>
              <p style="${emailStyles.text}">Our team is now reviewing your request and will reach out directly with:</p>
              <table role="presentation" style="margin:16px 0">
                <tr><td style="padding:6px 0"><span style="color:#10b981;font-weight:600;margin-right:8px">✓</span><span style="${emailStyles.text};margin:0">The exact price for your service</span></td></tr>
                <tr><td style="padding:6px 0"><span style="color:#10b981;font-weight:600;margin-right:8px">✓</span><span style="${emailStyles.text};margin:0">Parts required (if any)</span></td></tr>
                <tr><td style="padding:6px 0"><span style="color:#10b981;font-weight:600;margin-right:8px">✓</span><span style="${emailStyles.text};margin:0">Availability for your area</span></td></tr>
              </table>

              <!-- Transparency Box -->
              <div style="background-color:#f0f9ff;border-left:4px solid #3b82f6;padding:16px 20px;margin:24px 0;border-radius:4px">
                <h4 style="${emailStyles.infoBoxTitle}">${icons.info}No Vague Estimates</h4>
                <p style="${emailStyles.infoBoxText}">We provide proper quotes with full transparency:</p>
                <p style="${emailStyles.infoBoxText};margin:4px 0;padding-left:8px">• Labour costs clearly stated</p>
                <p style="${emailStyles.infoBoxText};margin:4px 0;padding-left:8px">• Parts prices (if needed)</p>
                <p style="${emailStyles.infoBoxText};margin:4px 0;padding-left:8px">• Call-out fees (if applicable)</p>
                <p style="${emailStyles.infoBoxText}">So you can decide with confidence before we proceed.</p>
              </div>

              <!-- Response Time -->
              <div style="background-color:#ecfdf5;border:1px solid #10b981;padding:16px;border-radius:8px;margin:24px 0;text-align:center">
                <p style="color:#065f46;font-size:14px;font-weight:600;margin:0">${icons.clock}Expected Response: Within 1 Business Day</p>
              </div>

              <!-- Urgent Contact -->
              <p style="${emailStyles.text}">If your issue is urgent, you can call us directly:</p>
              <div style="text-align:center;margin:20px 0">
                <a href="tel:07354915941" style="${emailStyles.button}">
                  ${icons.phone}Call 07354 915941
                </a>
              </div>

              <!-- Why Choose FixNow -->
              <hr style="${emailStyles.divider}" />
              <h3 style="${emailStyles.sectionTitle}">Why Choose FixNow Mechanics</h3>
              <table role="presentation" style="margin:16px 0">
                <tr><td style="padding:8px 0"><span style="color:#FF6B35;font-size:20px;margin-right:12px">🚗</span><span style="${emailStyles.text};margin:0"><strong>Mobile Service</strong> - We come to you, no garage needed</span></td></tr>
                <tr><td style="padding:8px 0"><span style="color:#FF6B35;font-size:20px;margin-right:12px">📍</span><span style="${emailStyles.text};margin:0"><strong>25-Mile Coverage</strong> - Serving your area</span></td></tr>
                <tr><td style="padding:8px 0"><span style="color:#FF6B35;font-size:20px;margin-right:12px">⏰</span><span style="${emailStyles.text};margin:0"><strong>Flexible Hours</strong> - Mon-Fri 7am-10pm, Weekends 8am-10pm</span></td></tr>
                <tr><td style="padding:8px 0"><span style="color:#FF6B35;font-size:20px;margin-right:12px">✅</span><span style="${emailStyles.text};margin:0"><strong>Transparent Pricing</strong> - No hidden fees, clear quotes</span></td></tr>
              </table>

              <p style="${emailStyles.text};margin-top:32px">Thanks again for choosing FixNow Mechanics.</p>
              <p style="${emailStyles.text}">Mobile repairs. No garages. No stress.</p>
            </td>
          </tr>
        </table>

        <!-- Footer -->
        <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
          <tr>
            <td style="${emailStyles.footer}">
              <p style="${emailStyles.footerText}"><strong>FixNow Mechanics</strong></p>
              <p style="${emailStyles.footerText}">
                ${icons.phone}<a href="tel:07354915941" style="${emailStyles.footerLink}">07354 915941</a>
              </p>
              <p style="${emailStyles.footerText}">
                ${icons.mail}<a href="mailto:support@fixnowmechanics.co.uk" style="${emailStyles.footerLink}">support@fixnowmechanics.co.uk</a>
              </p>
              <p style="${emailStyles.footerText}">
                <a href="https://www.fixnowmechanics.co.uk" style="${emailStyles.footerLink}">www.fixnowmechanics.co.uk</a>
              </p>
              <hr style="border:0;border-top:1px solid #e5e7eb;margin:16px 0" />
              <p style="${emailStyles.footerText};font-size:11px;color:#9ca3af">
                This is an automated confirmation email. If you need to make changes or have questions, please call us at 07354 915941 or reply to this email at support@fixnowmechanics.co.uk
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

// Business Notification Email - Clean, scannable, all details
export function getBusinessNotificationHTML(data: CustomerEmailData, submissionDate: string): string {
  const hasVehicle = data.vehicleMake && data.vehicleMake !== 'Not provided';
  const hasMessage = data.message && data.message !== 'None';
  const formattedDate = data.preferredDate ? formatDate(data.preferredDate) : null;

  return `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
  <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>New Quote Request - ${data.name}</title>
</head>
<body style="${emailStyles.body}">
  <table role="presentation" cellspacing="0" cellpadding="0" border="0" align="center" width="100%" style="max-width:600px;margin:0 auto">
    <tr>
      <td>
        <!-- Header -->
        <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
          <tr>
            <td style="${emailStyles.header}">
              <h1 style="${emailStyles.headerTitle}">FixNow Mechanics</h1>
              <p style="${emailStyles.headerSubtitle}">New Quote Request</p>
            </td>
          </tr>
        </table>

        <!-- Main Content -->
        <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background-color:#ffffff">
          <tr>
            <td style="${emailStyles.content}">
              <!-- Customer Details -->
              <h2 style="${emailStyles.sectionTitle}">Customer Details</h2>
              <table role="presentation" style="${emailStyles.table}">
                ${renderTableRow('Name', data.name)}
                <tr style="${emailStyles.tableRow}">
                  <td style="${emailStyles.tableLabel}">Email</td>
                  <td style="${emailStyles.tableValue}"><a href="mailto:${data.email}" style="color:#FF6B35;text-decoration:none">${data.email}</a></td>
                </tr>
                ${data.phone ? `
                <tr style="${emailStyles.tableRow}">
                  <td style="${emailStyles.tableLabel}">Phone</td>
                  <td style="${emailStyles.tableValue}"><a href="tel:${data.phone}" style="color:#FF6B35;text-decoration:none">${data.phone}</a></td>
                </tr>
                ` : ''}
                ${renderTableRow('Postcode', data.postcode)}
              </table>

              ${hasVehicle ? `
              <hr style="${emailStyles.divider}" />
              <h2 style="${emailStyles.sectionTitle}">Vehicle Details</h2>
              <table role="presentation" style="${emailStyles.table}">
                ${renderTableRow('Make', data.vehicleMake)}
                ${renderTableRow('Model', data.vehicleModel)}
                ${renderTableRow('Year', data.vehicleYear)}
                ${renderTableRow('Registration', data.vehicleReg)}
                ${renderTableRow('Fuel Type', data.fuelType ? data.fuelType.charAt(0).toUpperCase() + data.fuelType.slice(1) : undefined)}
              </table>
              ` : ''}

              <hr style="${emailStyles.divider}" />
              <h2 style="${emailStyles.sectionTitle}">Service Details</h2>
              <table role="presentation" style="${emailStyles.table}">
                ${renderTableRow('Service Type', data.serviceType)}
                ${formattedDate ? renderTableRow('Preferred Date', formattedDate) : renderTableRow('Preferred Date', 'No preference')}
              </table>

              ${hasMessage ? `
              <div style="${emailStyles.infoBox}">
                <h3 style="${emailStyles.infoBoxTitle}">Customer Notes</h3>
                <p style="${emailStyles.infoBoxText}">${data.message}</p>
              </div>
              ` : ''}

              <!-- Quick Action Buttons -->
              <div style="text-align:center;margin:32px 0">
                <a href="tel:${data.phone}" style="${emailStyles.button}">Call Customer</a>
                <a href="mailto:${data.email}" style="${emailStyles.buttonOutline}">Email Customer</a>
              </div>
            </td>
          </tr>
        </table>

        <!-- Footer -->
        <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
          <tr>
            <td style="${emailStyles.footer}">
              <p style="${emailStyles.footerText};color:#6b7280;font-size:12px">Submitted: ${submissionDate}</p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}
