import type { VercelRequest, VercelResponse } from '@vercel/node';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

// Professional AA/RAC-style email templates
const getProfessionalCustomerEmail = (data: any) => `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Your FixNow Mechanics quote request</title>
</head>
<body style="margin:0;padding:0;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,'Helvetica Neue',Arial,sans-serif;background-color:#f4f4f4;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#f4f4f4;padding:20px 0;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;background-color:#ffffff;">
          <!-- Header with Brand -->
          <tr>
            <td style="background:linear-gradient(135deg,#FF6B35 0%,#FF8C5A 100%);padding:40px 30px;text-align:center;">
              <h1 style="margin:0;color:#ffffff;font-size:32px;font-weight:700;letter-spacing:-0.5px;">FixNow Mechanics</h1>
              <p style="margin:8px 0 0;color:#ffffff;font-size:14px;opacity:0.95;">Mobile Repairs. No Garages. No Stress.</p>
            </td>
          </tr>
          
          <!-- Success Badge -->
          <tr>
            <td style="padding:30px 30px 20px;text-align:center;">
              <div style="display:inline-block;background:#10b981;width:60px;height:60px;border-radius:50%;position:relative;">
                <svg width="60" height="60" viewBox="0 0 60 60" style="position:absolute;top:0;left:0;">
                  <circle cx="30" cy="30" r="28" fill="#10b981" stroke="#ffffff" stroke-width="2"/>
                  <path d="M20 30 L27 37 L42 22" stroke="#ffffff" stroke-width="4" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </div>
              <h2 style="margin:20px 0 10px;color:#1a1a1a;font-size:24px;font-weight:600;">Quote Request Received 🚗</h2>
              <p style="margin:0;color:#666666;font-size:16px;line-height:1.5;">Thanks for contacting <strong>FixNow Mechanics</strong> — your quote request has been successfully received and added to our system.</p>
            </td>
          </tr>

          <!-- Customer Details -->
          <tr>
            <td style="padding:0 30px 20px;">
              <div style="background:#f8fafc;border-left:4px solid #FF6B35;padding:20px;border-radius:8px;">
                <h3 style="margin:0 0 15px;color:#1a1a1a;font-size:16px;font-weight:600;">📋 Your Submission Details</h3>
                <table width="100%" cellpadding="8" cellspacing="0" style="font-size:14px;">
                  ${data.vehicleMake !== 'Not provided' ? `
                  <tr>
                    <td style="color:#666666;padding:6px 0;width:140px;"><strong>Vehicle:</strong></td>
                    <td style="color:#1a1a1a;padding:6px 0;">${data.vehicleMake} ${data.vehicleModel}${data.vehicleReg !== 'Not provided' ? ` (${data.vehicleReg})` : ''}</td>
                  </tr>
                  ` : ''}
                  <tr>
                    <td style="color:#666666;padding:6px 0;width:140px;"><strong>Service:</strong></td>
                    <td style="color:#1a1a1a;padding:6px 0;">${data.serviceType}</td>
                  </tr>
                  <tr>
                    <td style="color:#666666;padding:6px 0;"><strong>Postcode:</strong></td>
                    <td style="color:#1a1a1a;padding:6px 0;">${data.postcode}</td>
                  </tr>
                  ${data.preferredDate !== 'No preference' ? `
                  <tr>
                    <td style="color:#666666;padding:6px 0;"><strong>Preferred date:</strong></td>
                    <td style="color:#1a1a1a;padding:6px 0;">${data.preferredDate}</td>
                  </tr>
                  ` : ''}
                </table>
              </div>
            </td>
          </tr>

          <!-- What Happens Next -->
          <tr>
            <td style="padding:0 30px 30px;">
              <div style="background:#fff7ed;border:2px solid #FF6B35;border-radius:8px;padding:20px;">
                <h3 style="margin:0 0 15px;color:#1a1a1a;font-size:16px;font-weight:600;">⏱️ What Happens Next</h3>
                <p style="margin:0 0 10px;color:#1a1a1a;font-size:14px;line-height:1.6;">Our team is now reviewing your request and preparing your <strong>fixed price quote</strong>.</p>
                <p style="margin:10px 0 15px;color:#1a1a1a;font-size:14px;line-height:1.6;">You will shortly receive another email with:</p>
                <ul style="margin:0;padding-left:20px;color:#1a1a1a;font-size:14px;line-height:1.8;">
                  <li>✓ Your exact price</li>
                  <li>✓ Parts required (if applicable)</li>
                  <li>✓ Available appointment times</li>
                  <li>✓ Instructions to approve and book</li>
                </ul>
                <p style="margin:15px 0 0;color:#666666;font-size:13px;font-style:italic;">💡 Nothing will be charged unless you approve the quote.</p>
              </div>
            </td>
          </tr>

          <!-- Contact Section -->
          <tr>
            <td style="padding:0 30px 30px;">
              <div style="border-top:1px solid #e5e7eb;padding-top:20px;text-align:center;">
                <p style="margin:0 0 15px;color:#1a1a1a;font-size:14px;font-weight:600;">Need to speak to us?</p>
                <table width="100%" cellpadding="10" cellspacing="0">
                  <tr>
                    <td align="center">
                      <a href="tel:07354915941" style="display:inline-block;background:#FF6B35;color:#ffffff;text-decoration:none;padding:12px 30px;border-radius:6px;font-size:16px;font-weight:600;margin:5px;">📞 07354 915941</a>
                    </td>
                  </tr>
                  <tr>
                    <td align="center">
                      <a href="mailto:support@fixnowmechanics.co.uk" style="color:#FF6B35;text-decoration:none;font-size:14px;">📧 support@fixnowmechanics.co.uk</a>
                    </td>
                  </tr>
                </table>
              </div>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background:#1a1a1a;padding:30px;text-align:center;">
              <p style="margin:0 0 10px;color:#ffffff;font-size:18px;font-weight:600;">FixNow Mechanics</p>
              <p style="margin:0 0 15px;color:#999999;font-size:13px;">Mobile Repairs. No Garages. No Stress.</p>
              <p style="margin:0;color:#999999;font-size:12px;line-height:1.6;">
                <a href="https://www.fixnowmechanics.co.uk" style="color:#FF6B35;text-decoration:none;">www.fixnowmechanics.co.uk</a><br>
                07354 915941 • support@fixnowmechanics.co.uk
              </p>
              <p style="margin:15px 0 0;color:#666666;font-size:11px;font-style:italic;">This is an automated message — replies to this email are not monitored.</p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
`;

const getProfessionalBusinessEmail = (data: any) => `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>New Quote Request</title>
</head>
<body style="margin:0;padding:0;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Arial,sans-serif;background-color:#f4f4f4;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#f4f4f4;padding:20px 0;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;background-color:#ffffff;border-radius:8px;overflow:hidden;box-shadow:0 2px 8px rgba(0,0,0,0.1);">
          <tr>
            <td style="background:linear-gradient(135deg,#1a1a1a 0%,#2d2d2d 100%);padding:25px 30px;">
              <h2 style="margin:0;color:#FF6B35;font-size:24px;font-weight:700;">🔔 New Quote Request</h2>
              <p style="margin:5px 0 0;color:#cccccc;font-size:14px;">Action Required: Review and Respond</p>
            </td>
          </tr>
          
          <tr>
            <td style="padding:30px;">
              <div style="background:#fef3c7;border-left:4px solid #f59e0b;padding:15px;margin-bottom:25px;border-radius:4px;">
                <p style="margin:0;color:#92400e;font-size:14px;font-weight:600;">⚡ Priority: Respond within 1 business day</p>
              </div>

              <h3 style="margin:0 0 15px;color:#1a1a1a;font-size:18px;font-weight:600;border-bottom:2px solid #FF6B35;padding-bottom:10px;">👤 Customer Information</h3>
              <table width="100%" cellpadding="8" cellspacing="0" style="margin-bottom:25px;">
                <tr>
                  <td style="color:#666666;font-size:14px;padding:8px 0;width:140px;"><strong>Name:</strong></td>
                  <td style="color:#1a1a1a;font-size:14px;padding:8px 0;">${data.name}</td>
                </tr>
                <tr>
                  <td style="color:#666666;font-size:14px;padding:8px 0;"><strong>Email:</strong></td>
                  <td style="color:#1a1a1a;font-size:14px;padding:8px 0;"><a href="mailto:${data.email}" style="color:#FF6B35;text-decoration:none;">${data.email}</a></td>
                </tr>
                <tr>
                  <td style="color:#666666;font-size:14px;padding:8px 0;"><strong>Phone:</strong></td>
                  <td style="color:#1a1a1a;font-size:14px;padding:8px 0;"><a href="tel:${data.phone}" style="color:#FF6B35;text-decoration:none;">${data.phone}</a></td>
                </tr>
                <tr>
                  <td style="color:#666666;font-size:14px;padding:8px 0;"><strong>Postcode:</strong></td>
                  <td style="color:#1a1a1a;font-size:14px;padding:8px 0;font-weight:600;">${data.postcode}</td>
                </tr>
              </table>

              ${data.vehicleMake !== 'Not provided' ? `
              <h3 style="margin:0 0 15px;color:#1a1a1a;font-size:18px;font-weight:600;border-bottom:2px solid #FF6B35;padding-bottom:10px;">🚗 Vehicle Details</h3>
              <table width="100%" cellpadding="8" cellspacing="0" style="margin-bottom:25px;">
                <tr>
                  <td style="color:#666666;font-size:14px;padding:8px 0;width:140px;"><strong>Make/Model:</strong></td>
                  <td style="color:#1a1a1a;font-size:14px;padding:8px 0;font-weight:600;">${data.vehicleMake} ${data.vehicleModel}</td>
                </tr>
                ${data.vehicleReg !== 'Not provided' ? `
                <tr>
                  <td style="color:#666666;font-size:14px;padding:8px 0;"><strong>Registration:</strong></td>
                  <td style="color:#1a1a1a;font-size:14px;padding:8px 0;font-family:monospace;font-weight:600;">${data.vehicleReg}</td>
                </tr>
                ` : ''}
                ${data.fuelType ? `
                <tr>
                  <td style="color:#666666;font-size:14px;padding:8px 0;"><strong>Fuel Type:</strong></td>
                  <td style="color:#1a1a1a;font-size:14px;padding:8px 0;">${data.fuelType}</td>
                </tr>
                ` : ''}
              </table>
              ` : ''}

              <h3 style="margin:0 0 15px;color:#1a1a1a;font-size:18px;font-weight:600;border-bottom:2px solid #FF6B35;padding-bottom:10px;">🔧 Service Request</h3>
              <table width="100%" cellpadding="8" cellspacing="0" style="margin-bottom:25px;">
                <tr>
                  <td style="color:#666666;font-size:14px;padding:8px 0;width:140px;"><strong>Service Type:</strong></td>
                  <td style="color:#1a1a1a;font-size:14px;padding:8px 0;font-weight:600;">${data.serviceType}</td>
                </tr>
                ${data.preferredDate !== 'No preference' ? `
                <tr>
                  <td style="color:#666666;font-size:14px;padding:8px 0;"><strong>Preferred Date:</strong></td>
                  <td style="color:#1a1a1a;font-size:14px;padding:8px 0;">${data.preferredDate}</td>
                </tr>
                ` : ''}
                ${data.message !== 'None' ? `
                <tr>
                  <td style="color:#666666;font-size:14px;padding:8px 0;vertical-align:top;"><strong>Message:</strong></td>
                  <td style="color:#1a1a1a;font-size:14px;padding:8px 0;line-height:1.6;">${data.message}</td>
                </tr>
                ` : ''}
              </table>

              <div style="background:#f3f4f6;padding:15px;border-radius:6px;text-align:center;margin-top:30px;">
                <p style="margin:0;color:#666666;font-size:12px;">📅 Submitted: ${data.submissionDate || new Date().toLocaleString('en-GB', { dateStyle: 'full', timeStyle: 'short', timeZone: 'Europe/London' })}</p>
              </div>
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

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Method not allowed' });
  }

  try {
    const { name, email, phone, postcode, serviceType, vehicleMake, vehicleModel, vehicleYear, vehicleReg, preferredDate, message } = req.body || {};

    if (!name || !email || !phone || !postcode) {
      return res.status(400).json({ success: false, message: 'Please fill in all required fields' });
    }

    const formData = {
      name,
      email,
      phone,
      postcode,
      serviceType: serviceType || 'General Estimate',
      vehicleMake: vehicleMake || 'Not provided',
      vehicleModel: vehicleModel || 'Not provided',
      vehicleYear: vehicleYear || 'Not provided',
      vehicleReg: vehicleReg || 'Not provided',
      fuelType: undefined,
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

    await resend.emails.send({
      from: 'FixNow Mechanics <noreply@fixnowmechanics.co.uk>',
      to: process.env.BUSINESS_EMAIL || 'support@fixnowmechanics.co.uk',
      subject: `🔔 New Quote Request from ${name}`,
      html: getProfessionalBusinessEmail(emailData),
    });

    await resend.emails.send({
      from: 'FixNow Mechanics <noreply@fixnowmechanics.co.uk>',
      to: email,
      subject: `Your FixNow Mechanics quote request has been received 🚗`,
      html: getProfessionalCustomerEmail(emailData),
    });

    return res.status(200).json({ success: true, message: 'Quote request submitted successfully' });
  } catch (error) {
    console.error('Error:', error);
    return res.status(500).json({ success: false, message: 'Failed to send emails', error: error instanceof Error ? error.message : 'Unknown error' });
  }
}
