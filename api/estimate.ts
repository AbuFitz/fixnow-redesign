import type { VercelRequest, VercelResponse } from '@vercel/node';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

// Simple email templates inline
const getSimpleCustomerEmail = (name: string, service: string) => `
<!DOCTYPE html>
<html>
<head><meta charset="UTF-8"></head>
<body style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;padding:20px">
  <div style="background:#FF6B35;padding:30px;text-align:center;border-radius:8px 8px 0 0">
    <h1 style="color:#fff;margin:0">FixNow Mechanics</h1>
  </div>
  <div style="background:#fff;padding:30px;border:1px solid #ddd;border-top:none">
    <h2>Hi ${name},</h2>
    <p>Thank you for your quote request!</p>
    <p><strong>Service:</strong> ${service}</p>
    <p>We've received your request and will contact you within 1 business day with a detailed quote.</p>
    <div style="background:#f0f9ff;padding:15px;border-left:4px solid #3b82f6;margin:20px 0">
      <p style="margin:0"><strong>What to Expect:</strong></p>
      <p style="margin:5px 0">✓ Exact pricing</p>
      <p style="margin:5px 0">✓ Parts required (if any)</p>
      <p style="margin:5px 0">✓ Availability confirmation</p>
    </div>
    <p>If urgent, call us: <a href="tel:07354915941" style="color:#FF6B35">07354 915941</a></p>
  </div>
  <div style="background:#f5f5f5;padding:20px;text-align:center;font-size:12px;color:#666">
    <p>FixNow Mechanics | 07354 915941 | support@fixnowmechanics.co.uk</p>
  </div>
</body>
</html>
`;

const getSimpleBusinessEmail = (data: any) => `
<!DOCTYPE html>
<html>
<head><meta charset="UTF-8"></head>
<body style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;padding:20px">
  <div style="background:#FF6B35;padding:20px;border-radius:8px 8px 0 0">
    <h2 style="color:#fff;margin:0">New Quote Request</h2>
  </div>
  <div style="background:#fff;padding:20px;border:1px solid #ddd;border-top:none">
    <h3>Customer Details</h3>
    <p><strong>Name:</strong> ${data.name}</p>
    <p><strong>Email:</strong> <a href="mailto:${data.email}">${data.email}</a></p>
    <p><strong>Phone:</strong> <a href="tel:${data.phone}">${data.phone}</a></p>
    <p><strong>Postcode:</strong> ${data.postcode}</p>
    ${data.vehicleMake !== 'Not provided' ? `
    <h3>Vehicle</h3>
    <p><strong>Make/Model:</strong> ${data.vehicleMake} ${data.vehicleModel}</p>
    <p><strong>Reg:</strong> ${data.vehicleReg}</p>
    ` : ''}
    <h3>Service</h3>
    <p><strong>Type:</strong> ${data.serviceType}</p>
    ${data.preferredDate !== 'No preference' ? `<p><strong>Date:</strong> ${data.preferredDate}</p>` : ''}
    ${data.message !== 'None' ? `<p><strong>Message:</strong> ${data.message}</p>` : ''}
    <p style="color:#666;font-size:12px;margin-top:20px">Submitted: ${data.submissionDate}</p>
  </div>
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

    await resend.emails.send({
      from: 'FixNow Mechanics <noreply@fixnowmechanics.co.uk>',
      to: process.env.BUSINESS_EMAIL || 'support@fixnowmechanics.co.uk',
      subject: `New Quote Request from ${name}`,
      html: getSimpleBusinessEmail(formData),
    });

    await resend.emails.send({
      from: 'FixNow Mechanics <noreply@fixnowmechanics.co.uk>',
      to: email,
      subject: `We've received your FixNow Mechanics quote request`,
      html: getSimpleCustomerEmail(name, formData.serviceType),
    });

    return res.status(200).json({ success: true, message: 'Quote request submitted successfully' });
  } catch (error) {
    console.error('Error:', error);
    return res.status(500).json({ success: false, message: 'Failed to send emails', error: error instanceof Error ? error.message : 'Unknown error' });
  }
}
