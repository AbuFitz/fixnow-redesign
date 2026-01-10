import type { VercelRequest, VercelResponse } from '@vercel/node';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

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
    <p>Thank you for booking ${service}!</p>
    <p>We've received your booking and will contact you within 1 business day to confirm the appointment.</p>
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
    <h2 style="color:#fff;margin:0">New Service Booking</h2>
  </div>
  <div style="background:#fff;padding:20px;border:1px solid #ddd;border-top:none">
    <h3>Customer</h3>
    <p><strong>Name:</strong> ${data.name}</p>
    <p><strong>Email:</strong> ${data.email}</p>
    <p><strong>Phone:</strong> ${data.phone}</p>
    <p><strong>Postcode:</strong> ${data.postcode}</p>
    <h3>Vehicle</h3>
    <p><strong>Make/Model:</strong> ${data.vehicleMake} ${data.vehicleModel}</p>
    <p><strong>Reg:</strong> ${data.vehicleReg}</p>
    <h3>Service</h3>
    <p><strong>Type:</strong> ${data.serviceType}</p>
    ${data.preferredDate !== 'No preference' ? `<p><strong>Date:</strong> ${data.preferredDate}</p>` : ''}
    ${data.message !== 'None' ? `<p><strong>Notes:</strong> ${data.message}</p>` : ''}
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

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ success: false, message: 'Method not allowed' });

  try {
    const { name, email, phone, postcode, vehicleMake, vehicleModel, vehicleYear, vehicleReg, preferredDate, message } = req.body || {};

    if (!name || !email || !phone || !postcode) {
      return res.status(400).json({ success: false, message: 'Please fill in all required fields' });
    }

    const formData = {
      name, 
      email, 
      phone, 
      postcode,
      serviceType: 'Interim Service - £110',
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
      subject: `New Interim Service Booking from ${name}`,
      html: getSimpleBusinessEmail(formData),
    });

    await resend.emails.send({
      from: 'FixNow Mechanics <noreply@fixnowmechanics.co.uk>',
      to: email,
      subject: `We've received your FixNow Mechanics service booking`,
      html: getSimpleCustomerEmail(name, 'Interim Service'),
    });

    return res.status(200).json({ success: true, message: 'Service booking submitted successfully' });
  } catch (error) {
    console.error('Error:', error);
    return res.status(500).json({ success: false, message: 'Failed to send emails', error: error instanceof Error ? error.message : 'Unknown' });
  }
}
