import type { VercelRequest, VercelResponse } from '@vercel/node';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

const getBusinessHTML = (d: any) => `<!DOCTYPE html><html><body style="font-family:sans-serif;max-width:600px;margin:0 auto"><div style="background:linear-gradient(135deg,#FF6B35 0%,#FF8C42 100%);padding:40px;text-align:center"><h1 style="color:#fff;margin:0">FixNow Mechanics</h1><p style="color:#fff;opacity:0.9">New Interim Service Booking</p></div><div style="padding:32px 40px"><h2 style="color:#1f2937">Customer Details</h2><table style="width:100%"><tr><td style="color:#6b7280;padding:8px">Name:</td><td style="color:#1f2937">${d.name}</td></tr><tr><td style="color:#6b7280;padding:8px">Email:</td><td><a href="mailto:${d.email}" style="color:#FF6B35">${d.email}</a></td></tr><tr><td style="color:#6b7280;padding:8px">Phone:</td><td><a href="tel:${d.phone}" style="color:#FF6B35">${d.phone}</a></td></tr><tr><td style="color:#6b7280;padding:8px">Postcode:</td><td style="color:#1f2937">${d.postcode}</td></tr></table><hr style="border:1px solid #e5e7eb"><h2 style="color:#1f2937">Vehicle Details</h2><table style="width:100%"><tr><td style="color:#6b7280;padding:8px">Make:</td><td style="color:#1f2937">${d.vehicleMake}</td></tr><tr><td style="color:#6b7280;padding:8px">Model:</td><td style="color:#1f2937">${d.vehicleModel}</td></tr><tr><td style="color:#6b7280;padding:8px">Year:</td><td style="color:#1f2937">${d.vehicleYear}</td></tr><tr><td style="color:#6b7280;padding:8px">Registration:</td><td style="color:#1f2937">${d.vehicleReg}</td></tr></table><hr style="border:1px solid #e5e7eb"><h2 style="color:#1f2937">Service Details</h2><table style="width:100%"><tr><td style="color:#6b7280;padding:8px">Service:</td><td style="color:#1f2937">${d.serviceType}</td></tr><tr><td style="color:#6b7280;padding:8px">Preferred Date:</td><td style="color:#1f2937">${d.preferredDate}</td></tr>${d.message !== 'None' ? `<tr><td style="color:#6b7280;padding:8px">Message:</td><td style="color:#1f2937">${d.message}</td></tr>` : ''}</table></div><div style="padding:24px 40px;background:#f9fafb"><p style="color:#6b7280;font-size:12px">Submitted: ${d.submissionDate}</p></div></body></html>`;

const getCustomerHTML = (name: string) => `<!DOCTYPE html><html><body style="font-family:sans-serif;max-width:600px;margin:0 auto"><div style="background:linear-gradient(135deg,#FF6B35 0%,#FF8C42 100%);padding:40px;text-align:center"><h1 style="color:#fff;margin:0">FixNow Mechanics</h1><p style="color:#fff;opacity:0.95">Mobile Mechanic Service</p></div><div style="padding:32px 40px"><h2 style="color:#1f2937">Thank You, ${name}!</h2><p style="color:#4b5563;line-height:26px">We've received your <strong>interim service booking</strong> and we're excited to help you.</p><p style="color:#4b5563;line-height:26px">One of our experienced mechanics will contact you within 1 business day.</p></div><div style="padding:32px 40px;background:#fef3f2"><h3 style="color:#1f2937">Why Choose FixNow?</h3><p style="color:#374151">✓ <strong>25 Miles Coverage</strong></p><p style="color:#374151">✓ <strong>Flexible Hours</strong></p><p style="color:#374151">✓ <strong>Experienced Mechanics</strong></p></div><div style="padding:32px 40px;background:#f9fafb;text-align:center"><p style="color:#6b7280;font-size:13px">Phone: <a href="tel:07354915941" style="color:#FF6B35">07354 915941</a></p></div></body></html>`;

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ success: false, message: 'Method not allowed' });

  try {
    const { name, email, phone, postcode, vehicleMake, vehicleModel, vehicleYear, vehicleReg, preferredDate, message } = req.body;

    if (!name || !email || !phone || !postcode) {
      return res.status(400).json({ success: false, message: 'Missing required fields' });
    }

    const formData = {
      name, email, phone, postcode,
      serviceType: 'Interim Service (£120)',
      vehicleMake: vehicleMake || 'Not provided',
      vehicleModel: vehicleModel || 'Not provided',
      vehicleYear: vehicleYear || 'Not provided',
      vehicleReg: vehicleReg || 'Not provided',
      preferredDate: preferredDate || 'No preference',
      message: message || 'None',
      submissionDate: new Date().toLocaleString('en-GB', { dateStyle: 'full', timeStyle: 'short', timeZone: 'Europe/London' }),
    };

    await resend.emails.send({
      from: 'FixNow Mechanics <noreply@fixnowmechanics.co.uk>',
      to: process.env.BUSINESS_EMAIL || 'fixnowmechanics@outlook.com',
      subject: `🚗 New Interim Service Booking from ${name}`,
      html: getBusinessHTML(formData),
    });

    await resend.emails.send({
      from: 'FixNow Mechanics <noreply@fixnowmechanics.co.uk>',
      to: email,
      subject: 'Interim Service Booking Received - FixNow Mechanics',
      html: getCustomerHTML(name),
    });

    return res.status(200).json({ success: true, message: 'Service booking submitted successfully' });
  } catch (error) {
    console.error('Error:', error);
    return res.status(500).json({ success: false, message: 'Failed to send emails', error: error instanceof Error ? error.message : 'Unknown' });
  }
}
