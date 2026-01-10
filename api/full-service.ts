import type { VercelRequest, VercelResponse } from '@vercel/node';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

// Professional email templates - clean design, anti-spam optimized
interface EmailData {
  name: string;
  email: string;
  phone: string;
  postcode: string;
  serviceType: string;
  vehicleMake: string;
  vehicleModel: string;
  vehicleYear: string;
  vehicleReg: string;
  fuelType: string;
  preferredDate: string;
  message: string;
  submissionDate?: string;
}

const getProfessionalCustomerEmail = (data: EmailData) => `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>🚗 Your FixNow Mechanics request has been received</title>
  <meta name="x-apple-disable-message-reformatting">
  <meta name="format-detection" content="telephone=no,address=no,email=no,date=no,url=no">
</head>
<body style="margin:0;padding:0;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Arial,sans-serif;background-color:#000000;">
  <table width="100%" cellpadding="0" cellspacing="0" role="presentation" style="background-color:#000000;min-height:100vh;">
    <tr>
      <td align="center" style="padding:0;">
        <table width="600" cellpadding="0" cellspacing="0" role="presentation" style="max-width:600px;width:100%;background-color:#000000;">
          
          <!-- Header -->
          <tr>
            <td style="background-color:#141a22;padding:32px;text-align:center;border-bottom:3px solid #FECF00;">
              <h1 style="margin:0;font-size:28px;font-weight:700;color:#ffffff;"><span style="color:#ffffff;">Fix</span><span style="color:#FECF00;">Now</span><span style="color:#ffffff;"> Mechanics</span></h1>
              <p style="margin:8px 0 0;font-size:14px;color:#8b92a0;">Mobile Repairs. No Garages. No Stress.</p>
            </td>
          </tr>

          <!-- Title -->
          <tr>
            <td style="padding:40px 32px 24px;text-align:center;">
              <h2 style="margin:0;font-size:24px;font-weight:700;color:#ffffff;">Request Received</h2>
              <p style="margin:12px 0 0;font-size:15px;color:#8b92a0;line-height:1.6;">Your request has been logged and is now being reviewed by our team.</p>
            </td>
          </tr>

          <!-- Submission Details Card -->
          <tr>
            <td style="padding:0 32px 24px;">
              <table width="100%" cellpadding="0" cellspacing="0" role="presentation" style="background-color:#141a22;border:1px solid #1f2937;border-radius:8px;">
                <tr>
                  <td style="padding:24px;">
                    <h3 style="margin:0 0 16px;font-size:16px;font-weight:600;color:#ffffff;border-bottom:2px solid #FECF00;padding-bottom:8px;display:inline-block;">Your Details</h3>
                    <table width="100%" cellpadding="0" cellspacing="0" role="presentation" style="font-size:14px;line-height:2;">
                      ${data.vehicleMake !== 'Not provided' && data.vehicleModel !== 'Not provided' ? `
                      <tr>
                        <td style="color:#8b92a0;padding:6px 0;width:140px;vertical-align:top;">Vehicle</td>
                        <td style="color:#ffffff;padding:6px 0;font-weight:500;">${data.vehicleMake} ${data.vehicleModel}${data.vehicleReg !== 'Not provided' ? ` (${data.vehicleReg})` : ''}</td>
                      </tr>
                      ` : data.vehicleReg !== 'Not provided' ? `
                      <tr>
                        <td style="color:#8b92a0;padding:6px 0;width:140px;vertical-align:top;">Registration</td>
                        <td style="color:#ffffff;padding:6px 0;font-weight:500;font-family:monospace;">${data.vehicleReg}</td>
                      </tr>
                      ` : ''}
                      ${data.fuelType ? `
                      <tr>
                        <td style="color:#8b92a0;padding:6px 0;vertical-align:top;">Fuel Type</td>
                        <td style="color:#ffffff;padding:6px 0;font-weight:500;">${data.fuelType}</td>
                      </tr>
                      ` : ''}
                      <tr>
                        <td style="color:#8b92a0;padding:6px 0;vertical-align:top;">Service</td>
                        <td style="color:#ffffff;padding:6px 0;font-weight:500;">${data.serviceType}</td>
                      </tr>
                      <tr>
                        <td style="color:#8b92a0;padding:6px 0;vertical-align:top;">Postcode</td>
                        <td style="color:#ffffff;padding:6px 0;font-weight:500;">${data.postcode}</td>
                      </tr>
                      ${data.preferredDate && data.preferredDate !== 'No preference' ? `
                      <tr>
                        <td style="color:#8b92a0;padding:6px 0;vertical-align:top;">Preferred Date</td>
                        <td style="color:#ffffff;padding:6px 0;font-weight:500;">${data.preferredDate}</td>
                      </tr>
                      ` : ''}
                      ${data.message && data.message !== 'No additional information provided' && data.message !== 'None' ? `
                      <tr>
                        <td style="color:#8b92a0;padding:6px 0;vertical-align:top;">Notes</td>
                        <td style="color:#ffffff;padding:6px 0;">${data.message}</td>
                      </tr>
                      ` : ''}
                    </table>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- What Happens Next Card -->
          <tr>
            <td style="padding:0 32px 32px;">
              <table width="100%" cellpadding="0" cellspacing="0" role="presentation" style="background-color:#141a22;border:1px solid#1f2937;border-left:3px solid #FECF00;border-radius:8px;">
                <tr>
                  <td style="padding:24px;">
                    <h3 style="margin:0 0 16px;font-size:16px;font-weight:600;color:#FECF00;">What Happens Next</h3>
                    <table width="100%" cellpadding="0" cellspacing="0" role="presentation">
                      <tr><td style="padding:8px 0;font-size:14px;color:#d1d5db;line-height:1.6;"><strong style="color:#ffffff;">1.</strong> We review your request</td></tr>
                      <tr><td style="padding:8px 0;font-size:14px;color:#d1d5db;line-height:1.6;"><strong style="color:#ffffff;">2.</strong> We calculate parts, labour, and call-out costs</td></tr>
                      <tr><td style="padding:8px 0;font-size:14px;color:#d1d5db;line-height:1.6;"><strong style="color:#ffffff;">3.</strong> We contact you by <strong style="color:#ffffff;">email, text, or phone</strong> with a fixed price quote</td></tr>
                      <tr><td style="padding:8px 0;font-size:14px;color:#d1d5db;line-height:1.6;"><strong style="color:#ffffff;">4.</strong> You approve the quote</td></tr>
                      <tr><td style="padding:8px 0;font-size:14px;color:#d1d5db;line-height:1.6;"><strong style="color:#ffffff;">5.</strong> We book the job and dispatch a mechanic</td></tr>
                    </table>
                    <p style="margin:16px 0 0;padding:16px;background-color:#FECF00;border-radius:8px;font-size:14px;color:#000000;line-height:1.6;font-weight:500;"><strong style="color:#000000;font-weight:700;">Important:</strong> Nothing is booked and nothing is charged until you approve the quote.</p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Support Section -->
          <tr>
            <td style="padding:0 32px 40px;">
              <table width="100%" cellpadding="0" cellspacing="0" role="presentation" style="background-color:#141a22;border:1px solid #1f2937;border-radius:8px;">
                <tr>
                  <td style="padding:24px;text-align:center;">
                    <h3 style="margin:0 0 16px;font-size:16px;font-weight:600;color:#ffffff;">Need Help?</h3>
                    <p style="margin:0 0 12px;font-size:14px;color:#d1d5db;">
                      <a href="mailto:support@fixnowmechanics.co.uk" style="color:#FECF00;text-decoration:none;font-weight:500;">support@fixnowmechanics.co.uk</a>
                    </p>
                    <p style="margin:0 0 16px;font-size:14px;color:#d1d5db;">
                      <a href="tel:07354915941" style="color:#FECF00;text-decoration:none;font-weight:500;">07354 915941</a>
                    </p>
                    <p style="margin:0;font-size:12px;color:#6b7280;font-style:italic;">This inbox (noreply@) is not monitored. Please use the contact details above.</p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding:32px;text-align:center;border-top:1px solid #1f2937;">
              <p style="margin:0 0 8px;font-size:16px;font-weight:600;"><span style="color:#ffffff;">Fix</span><span style="color:#FECF00;">Now</span><span style="color:#ffffff;"> Mechanics</span></p>
              <p style="margin:0 0 16px;font-size:13px;color:#6b7280;">Mobile Repairs. No Garages. No Stress.</p>
              <p style="margin:0;font-size:12px;color:#4b5563;">
                <a href="https://www.fixnowmechanics.co.uk/services" style="color:#8b92a0;text-decoration:none;margin:0 8px;">Services</a>
                <span style="color:#374151;">|</span>
                <a href="https://www.fixnowmechanics.co.uk/locations" style="color:#8b92a0;text-decoration:none;margin:0 8px;">Locations</a>
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
`;

const getProfessionalBusinessEmail = (data: EmailData) => `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <title>New Quote Request</title>
</head>
<body style="margin:0;padding:0;font-family:Arial,'Helvetica Neue',Helvetica,sans-serif;background-color:#e7e7e7;">
  <table width="100%" cellpadding="0" cellspacing="0" role="presentation" style="background-color:#e7e7e7;">
    <tr>
      <td align="center" style="padding:40px 20px;">
        <table width="600" cellpadding="0" cellspacing="0" role="presentation" style="max-width:600px;width:100%;background-color:#ffffff;border:1px solid #e0e0e0;">
          
          <!-- Header -->
          <tr>
            <td style="background-color:#ffffff;padding:30px;border-bottom:3px solid #FECF00;">
              <h2 style="margin:0;color:#FECF00;font-size:24px;font-weight:700;">New Quote Request</h2>
              <p style="margin:8px 0 0;color:#666666;font-size:14px;">Action Required: Review and Respond</p>
            </td>
          </tr>
          
          <tr>
            <td style="padding:25px 30px;">
              <h3 style="margin:0 0 15px;font-size:16px;font-weight:600;color:#1a1a1a;">Customer Information</h3>
              <table width="100%" cellpadding="0" cellspacing="0" role="presentation" style="font-size:14px;line-height:1.8;">
                <tr>
                  <td style="color:#666666;padding:6px 0;width:130px;">Name:</td>
                  <td style="color:#1a1a1a;padding:6px 0;font-weight:500;">${data.name}</td>
                </tr>
                <tr>
                  <td style="color:#666666;padding:6px 0;">Email:</td>
                  <td style="color:#1a1a1a;padding:6px 0;"><a href="mailto:${data.email}" style="color:#1a1a1a;text-decoration:underline;">${data.email}</a></td>
                </tr>
                <tr>
                  <td style="color:#666666;padding:6px 0;">Phone:</td>
                  <td style="color:#1a1a1a;padding:6px 0;"><a href="tel:${data.phone}" style="color:#1a1a1a;text-decoration:underline;">${data.phone}</a></td>
                </tr>
                <tr>
                  <td style="color:#666666;padding:6px 0;">Postcode:</td>
                  <td style="color:#1a1a1a;padding:6px 0;font-weight:600;">${data.postcode}</td>
                </tr>
              </table>
            </td>
          </tr>

          ${data.vehicleMake !== 'Not provided' ? `
          <!-- Vehicle Info -->
          <tr>
            <td style="padding:0 30px 25px;">
              <h3 style="margin:0 0 15px;font-size:16px;font-weight:600;color:#1a1a1a;">Vehicle Details</h3>
              <table width="100%" cellpadding="0" cellspacing="0" role="presentation" style="font-size:14px;line-height:1.8;">
                <tr>
                  <td style="color:#666666;padding:6px 0;width:130px;">Make/Model:</td>
                  <td style="color:#1a1a1a;padding:6px 0;font-weight:600;">${data.vehicleMake} ${data.vehicleModel}</td>
                </tr>
                ${data.vehicleReg !== 'Not provided' ? `
                <tr>
                  <td style="color:#666666;padding:6px 0;">Registration:</td>
                  <td style="color:#1a1a1a;padding:6px 0;font-family:monospace;font-weight:600;">${data.vehicleReg}</td>
                </tr>
                ` : ''}
                ${data.fuelType ? `
                <tr>
                  <td style="color:#666666;padding:6px 0;">Fuel Type:</td>
                  <td style="color:#1a1a1a;padding:6px 0;font-weight:500;">${data.fuelType}</td>
                </tr>
                ` : ''}
              </table>
            </td>
          </tr>
          ` : ''}

          <!-- Service Info -->
          <tr>
            <td style="padding:0 30px 30px;">
              <h3 style="margin:0 0 15px;font-size:16px;font-weight:600;color:#1a1a1a;">Service Request</h3>
              <table width="100%" cellpadding="0" cellspacing="0" role="presentation" style="font-size:14px;line-height:1.8;">
                <tr>
                  <td style="color:#666666;padding:6px 0;width:130px;">Service Type:</td>
                  <td style="color:#1a1a1a;padding:6px 0;font-weight:600;">${data.serviceType}</td>
                </tr>
                ${data.preferredDate !== 'No preference' ? `
                <tr>
                  <td style="color:#666666;padding:6px 0;">Preferred Date:</td>
                  <td style="color:#1a1a1a;padding:6px 0;font-weight:500;">${data.preferredDate}</td>
                </tr>
                ` : ''}
                ${data.message !== 'None' ? `
                <tr>
                  <td style="color:#666666;padding:6px 0;vertical-align:top;">Message:</td>
                  <td style="color:#1a1a1a;padding:6px 0;line-height:1.6;">${data.message}</td>
                </tr>
                ` : ''}
              </table>
            </td>
          </tr>

          <!-- Timestamp -->
          <tr>
            <td align="center" style="padding:15px 30px 25px;background-color:#f8f9fa;border-top:1px solid #e9ecef;">
              <p style="margin:0;color:#999999;font-size:13px;">Submitted: ${data.submissionDate || new Date().toLocaleString('en-GB', { dateStyle: 'full', timeStyle: 'short', timeZone: 'Europe/London' })}</p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
`;


export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Set headers for all responses
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Content-Type', 'application/json');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ success: false, message: 'Method not allowed' });

  try {
    const { name, email, phone, postcode, vehicleMake, vehicleModel, vehicleYear, vehicleReg, fuelType, preferredDate, message } = req.body || {};

    if (!name || !email || !phone || !postcode || !fuelType) {
      return res.status(400).json({ success: false, message: 'Please fill in all required fields' });
    }

    const price = fuelType === 'petrol' ? '£150' : '£180';
    const formData = {
      name, 
      email, 
      phone, 
      postcode,
      serviceType: `Full Service - ${price} (${fuelType.charAt(0).toUpperCase() + fuelType.slice(1)})`,
      vehicleMake: vehicleMake || 'Not provided',
      vehicleModel: vehicleModel || 'Not provided',
      vehicleYear: vehicleYear || 'Not provided',
      vehicleReg: vehicleReg || 'Not provided',
      fuelType: fuelType.charAt(0).toUpperCase() + fuelType.slice(1),
      preferredDate: preferredDate || 'No preference',
      message: message || 'None',
    };

    const submissionDate = new Date().toLocaleString('en-GB', { 
      dateStyle: 'full', 
      timeStyle: 'short', 
      timeZone: 'Europe/London' 
    });

    const emailData = {
      ...formData,
      submissionDate
    };

    // Send business notification
    await resend.emails.send({
      from: 'FixNow Mechanics <noreply@fixnowmechanics.co.uk>',
      replyTo: email,
      to: process.env.BUSINESS_EMAIL || 'support@fixnowmechanics.co.uk',
      subject: `New Full Service Booking from ${name}`,
      html: getProfessionalBusinessEmail(emailData),
      headers: {
        'X-Priority': '1',
        'X-MSMail-Priority': 'High',
        'Importance': 'high'
      }
    });

    // Send customer confirmation
    await resend.emails.send({
      from: 'FixNow Mechanics <noreply@fixnowmechanics.co.uk>',
      replyTo: 'support@fixnowmechanics.co.uk',
      to: email,
      subject: `🚗 Your FixNow Mechanics service booking has been received`,
      html: getProfessionalCustomerEmail(emailData),
      headers: {
        'List-Unsubscribe': '<mailto:support@fixnowmechanics.co.uk?subject=unsubscribe>',
        'X-Entity-Ref-ID': `full-${Date.now()}`
      }
    });

    return res.status(200).json({ success: true, message: 'Service booking submitted successfully' });
  } catch (error) {
    console.error('Error:', error);
    return res.status(500).json({ success: false, message: 'Failed to send emails', error: error instanceof Error ? error.message : 'Unknown' });
  }
}
