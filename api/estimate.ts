import type { VercelRequest, VercelResponse } from '@vercel/node';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

// Professional email templates - clean design, anti-spam optimized
const getProfessionalCustomerEmail = (data: any) => `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <title>Your FixNow Mechanics Quote Request</title>
  <!--[if mso]>
  <style type="text/css">
    body, table, td {font-family: Arial, Helvetica, sans-serif !important;}
  </style>
  <![endif]-->
</head>
<body style="margin:0;padding:0;font-family:Arial,'Helvetica Neue',Helvetica,sans-serif;background-color:#e7e7e7;">
  <table width="100%" cellpadding="0" cellspacing="0" role="presentation" style="background-color:#e7e7e7;">
    <tr>
      <td align="center" style="padding:40px 20px;">
        <table width="600" cellpadding="0" cellspacing="0" role="presentation" style="max-width:600px;width:100%;background-color:#ffffff;border-radius:8px;overflow:hidden;box-shadow:0 2px 4px rgba(0,0,0,0.1);">
          
          <!-- Brand Header -->
          <tr>
            <td align="center" style="padding:40px 20px 30px;background-color:#ffffff;">
              <h1 style="margin:0;font-size:28px;font-weight:800;font-family:'Arial Black', Arial, sans-serif;letter-spacing:-0.5px;">
                <span style="color:#1a1a1a;">Fix</span><span style="color:#FF6B35;">Now</span> <span style="color:#1a1a1a;">Mechanics</span>
              </h1>
            </td>
          </tr>

          <!-- Heading -->
          <tr>
            <td align="center" style="padding:0 20px 15px;">
              <h1 style="margin:0;font-size:26px;font-weight:700;color:#1a1a1a;line-height:1.3;">Quote Request Confirmed</h1>
            </td>
          </tr>

          <!-- Description -->
          <tr>
            <td align="center" style="padding:0 20px 25px;">
              <p style="margin:0;font-size:15px;color:#666666;line-height:1.6;">Thank you for contacting <strong style="color:#FF6B35;">FixNow Mechanics</strong>. Your quote request has been successfully received and our team is now reviewing your submission.</p>
            </td>
          </tr>

          <!-- Details Box -->
          <tr>
            <td style="padding:0 20px 25px;">
              <div style="background:#f8f9fa;border:1px solid #e9ecef;border-radius:8px;padding:20px;">
                <h3 style="margin:0 0 15px;font-size:16px;font-weight:600;color:#1a1a1a;">Your Submission Details</h3>
                <table width="100%" cellpadding="0" cellspacing="0" role="presentation" style="font-size:14px;line-height:1.8;">
                  ${data.vehicleMake !== 'Not provided' ? `
                  <tr>
                    <td style="color:#666666;padding:4px 0;width:130px;">Vehicle:</td>
                    <td style="color:#1a1a1a;padding:4px 0;font-weight:500;">${data.vehicleMake} ${data.vehicleModel}${data.vehicleReg !== 'Not provided' ? ` (${data.vehicleReg})` : ''}</td>
                  </tr>
                  ` : ''}
                  <tr>
                    <td style="color:#666666;padding:4px 0;">Service:</td>
                    <td style="color:#1a1a1a;padding:4px 0;font-weight:500;">${data.serviceType}</td>
                  </tr>
                  <tr>
                    <td style="color:#666666;padding:4px 0;">Postcode:</td>
                    <td style="color:#1a1a1a;padding:4px 0;font-weight:500;">${data.postcode}</td>
                  </tr>
                  ${data.preferredDate !== 'No preference' ? `
                  <tr>
                    <td style="color:#666666;padding:4px 0;">Preferred date:</td>
                    <td style="color:#1a1a1a;padding:4px 0;font-weight:500;">${data.preferredDate}</td>
                  </tr>
                  ` : ''}
                </table>
              </div>
            </td>
          </tr>

          <!-- What Happens Next -->
          <tr>
            <td style="padding:0 20px 25px;">
              <div style="background:#fff3e6;border-left:4px solid #FF6B35;padding:18px;border-radius:6px;">
                <h3 style="margin:0 0 12px;font-size:16px;font-weight:600;color:#1a1a1a;">What Happens Next</h3>
                <p style="margin:0 0 12px;font-size:14px;color:#333333;line-height:1.6;">Our team is now preparing your <strong>fixed price quote</strong>. You will shortly receive another email with:</p>
                <table width="100%" cellpadding="0" cellspacing="0" role="presentation" style="font-size:14px;color:#333333;line-height:1.8;">
                  <tr><td style="padding:2px 0;">• Your exact price</td></tr>
                  <tr><td style="padding:2px 0;">• Parts required (if applicable)</td></tr>
                  <tr><td style="padding:2px 0;">• Available appointment times</td></tr>
                  <tr><td style="padding:2px 0;">• Instructions to approve and book</td></tr>
                </table>
                <p style="margin:12px 0 0;font-size:13px;color:#666666;font-style:italic;">Nothing will be charged unless you approve the quote.</p>
              </div>
            </td>
          </tr>

          <!-- Call to Action -->
          <tr>
            <td align="center" style="padding:0 20px 30px;">
              <table cellpadding="0" cellspacing="0" role="presentation">
                <tr>
                  <td align="center" style="background-color:#FF6B35;border-radius:8px;">
                    <a href="tel:07354915941" style="display:inline-block;padding:14px 32px;font-size:16px;color:#ffffff;text-decoration:none;font-weight:600;">Call Us: 07354 915941</a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Contact Info -->
          <tr>
            <td align="center" style="padding:0 20px 25px;border-top:1px solid #e9ecef;padding-top:25px;">
              <p style="margin:0 0 5px;font-size:14px;color:#666666;">If you have any questions, please email us at</p>
              <p style="margin:0 0 15px;font-size:14px;">
                <a href="mailto:support@fixnowmechanics.co.uk" style="color:#FF6B35;text-decoration:none;font-weight:500;">support@fixnowmechanics.co.uk</a>
              </p>
              <p style="margin:0;font-size:13px;color:#999999;">or visit our <a href="https://www.fixnowmechanics.co.uk/services" style="color:#FF6B35;text-decoration:none;">Services</a> page. You can also chat with a real person during our operating hours.</p>
            </td>
          </tr>

          <!-- Footer Navigation -->
          <tr>
            <td align="center" style="padding:20px 40px;background-color:#f8f9fa;">
              <table cellpadding="0" cellspacing="0" role="presentation">
                <tr>
                  <td style="padding:0 10px;">
                    <a href="https://www.fixnowmechanics.co.uk" style="font-size:13px;color:#666666;text-decoration:none;">Home</a>
                  </td>
                  <td style="padding:0 10px;color:#cccccc;">|</td>
                  <td style="padding:0 10px;">
                    <a href="https://www.fixnowmechanics.co.uk/services" style="font-size:13px;color:#666666;text-decoration:none;">Services</a>
                  </td>
                  <td style="padding:0 10px;color:#cccccc;">|</td>
                  <td style="padding:0 10px;">
                    <a href="https://www.fixnowmechanics.co.uk/locations" style="font-size:13px;color:#666666;text-decoration:none;">Locations</a>
                  </td>
                  <td style="padding:0 10px;color:#cccccc;">|</td>
                  <td style="padding:0 10px;">
                    <a href="https://www.fixnowmechanics.co.uk/quote" style="font-size:13px;color:#666666;text-decoration:none;">Get Quote</a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Legal Footer -->
          <tr>
            <td align="center" style="padding:20px 40px 30px;background-color:#f8f9fa;">
              <p style="margin:0 0 10px;font-size:12px;color:#999999;line-height:1.5;">You have received this email as a customer of <a href="https://www.fixnowmechanics.co.uk" style="color:#17a2b8;text-decoration:none;">fixnowmechanics.co.uk</a></p>
              <p style="margin:0 0 15px;font-size:11px;color:#999999;">FixNow Mechanics • Mobile Repairs • 07354 915941</p>
              <p style="margin:0;font-size:11px;color:#cccccc;">This is an automated confirmation email. Please do not reply directly to this message.</p>
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
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <title>New Quote Request</title>
</head>
<body style="margin:0;padding:0;font-family:Arial,'Helvetica Neue',Helvetica,sans-serif;background-color:#e7e7e7;">
  <table width="100%" cellpadding="0" cellspacing="0" role="presentation" style="background-color:#e7e7e7;">
    <tr>
      <td align="center" style="padding:40px 20px;">
        <table width="600" cellpadding="0" cellspacing="0" role="presentation" style="max-width:600px;width:100%;background-color:#ffffff;border-radius:8px;overflow:hidden;box-shadow:0 2px 4px rgba(0,0,0,0.1);">
          
          <!-- Header -->
          <tr>
            <td style="background-color:#1a1a1a;padding:25px 30px;">
              <h2 style="margin:0;color:#FF6B35;font-size:22px;font-weight:700;">New Quote Request</h2>
              <p style="margin:5px 0 0;color:#cccccc;font-size:13px;">Action Required: Review and Respond</p>
            </td>
          </tr>
          
          <!-- Priority Alert -->
          <tr>
            <td style="padding:20px 30px 0;">
              <div style="background:#fff3cd;border-left:4px solid:#ffc107;padding:12px 15px;border-radius:4px;">
                <p style="margin:0;color:#856404;font-size:13px;font-weight:600;">Priority: Respond within 1 business day</p>
              </div>
            </td>
          </tr>

          <!-- Customer Info -->
          <tr>
            <td style="padding:25px 30px 5px;">
              <h3 style="margin:0 0 15px;font-size:16px;font-weight:600;color:#1a1a1a;border-bottom:2px solid #FF6B35;padding-bottom:8px;">Customer Information</h3>
              <table width="100%" cellpadding="0" cellspacing="0" role="presentation" style="font-size:14px;line-height:1.8;">
                <tr>
                  <td style="color:#666666;padding:4px 0;width:120px;">Name:</td>
                  <td style="color:#1a1a1a;padding:4px 0;font-weight:500;">${data.name}</td>
                </tr>
                <tr>
                  <td style="color:#666666;padding:4px 0;">Email:</td>
                  <td style="color:#1a1a1a;padding:4px 0;"><a href="mailto:${data.email}" style="color:#FF6B35;text-decoration:none;font-weight:500;">${data.email}</a></td>
                </tr>
                <tr>
                  <td style="color:#666666;padding:4px 0;">Phone:</td>
                  <td style="color:#1a1a1a;padding:4px 0;"><a href="tel:${data.phone}" style="color:#FF6B35;text-decoration:none;font-weight:500;">${data.phone}</a></td>
                </tr>
                <tr>
                  <td style="color:#666666;padding:4px 0;">Postcode:</td>
                  <td style="color:#1a1a1a;padding:4px 0;font-weight:600;">${data.postcode}</td>
                </tr>
              </table>
            </td>
          </tr>

          ${data.vehicleMake !== 'Not provided' ? `
          <!-- Vehicle Info -->
          <tr>
            <td style="padding:20px 30px 5px;">
              <h3 style="margin:0 0 15px;font-size:16px;font-weight:600;color:#1a1a1a;border-bottom:2px solid #FF6B35;padding-bottom:8px;">Vehicle Details</h3>
              <table width="100%" cellpadding="0" cellspacing="0" role="presentation" style="font-size:14px;line-height:1.8;">
                <tr>
                  <td style="color:#666666;padding:4px 0;width:120px;">Make/Model:</td>
                  <td style="color:#1a1a1a;padding:4px 0;font-weight:600;">${data.vehicleMake} ${data.vehicleModel}</td>
                </tr>
                ${data.vehicleReg !== 'Not provided' ? `
                <tr>
                  <td style="color:#666666;padding:4px 0;">Registration:</td>
                  <td style="color:#1a1a1a;padding:4px 0;font-family:monospace;font-weight:600;">${data.vehicleReg}</td>
                </tr>
                ` : ''}
                ${data.fuelType ? `
                <tr>
                  <td style="color:#666666;padding:4px 0;">Fuel Type:</td>
                  <td style="color:#1a1a1a;padding:4px 0;font-weight:500;">${data.fuelType}</td>
                </tr>
                ` : ''}
              </table>
            </td>
          </tr>
          ` : ''}

          <!-- Service Info -->
          <tr>
            <td style="padding:20px 30px 25px;">
              <h3 style="margin:0 0 15px;font-size:16px;font-weight:600;color:#1a1a1a;border-bottom:2px solid #FF6B35;padding-bottom:8px;">Service Request</h3>
              <table width="100%" cellpadding="0" cellspacing="0" role="presentation" style="font-size:14px;line-height:1.8;">
                <tr>
                  <td style="color:#666666;padding:4px 0;width:120px;">Service Type:</td>
                  <td style="color:#1a1a1a;padding:4px 0;font-weight:600;">${data.serviceType}</td>
                </tr>
                ${data.preferredDate !== 'No preference' ? `
                <tr>
                  <td style="color:#666666;padding:4px 0;">Preferred Date:</td>
                  <td style="color:#1a1a1a;padding:4px 0;font-weight:500;">${data.preferredDate}</td>
                </tr>
                ` : ''}
                ${data.message !== 'None' ? `
                <tr>
                  <td style="color:#666666;padding:4px 0;vertical-align:top;">Message:</td>
                  <td style="color:#1a1a1a;padding:4px 0;line-height:1.6;">${data.message}</td>
                </tr>
                ` : ''}
              </table>
            </td>
          </tr>

          <!-- Timestamp -->
          <tr>
            <td align="center" style="padding:15px 30px 25px;background-color:#f8f9fa;border-top:1px solid #e9ecef;">
              <p style="margin:0;color:#999999;font-size:12px;">Submitted: ${data.submissionDate || new Date().toLocaleString('en-GB', { dateStyle: 'full', timeStyle: 'short', timeZone: 'Europe/London' })}</p>
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

    // Send business notification
    await resend.emails.send({
      from: 'FixNow Mechanics <noreply@fixnowmechanics.co.uk>',
      replyTo: email, // Customer's email for easy reply
      to: process.env.BUSINESS_EMAIL || 'support@fixnowmechanics.co.uk',
      subject: `New Quote Request from ${name}`,
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
      subject: `Your FixNow Mechanics quote request has been received`,
      html: getProfessionalCustomerEmail(emailData),
      headers: {
        'List-Unsubscribe': '<mailto:support@fixnowmechanics.co.uk?subject=unsubscribe>',
        'X-Entity-Ref-ID': `quote-${Date.now()}`
      }
    });

    return res.status(200).json({ success: true, message: 'Quote request submitted successfully' });
  } catch (error) {
    console.error('Error:', error);
    return res.status(500).json({ success: false, message: 'Failed to send emails', error: error instanceof Error ? error.message : 'Unknown error' });
  }
}
