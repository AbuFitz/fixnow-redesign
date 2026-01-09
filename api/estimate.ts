import type { VercelRequest, VercelResponse } from '@vercel/node';
import { Resend } from 'resend';
import { getCustomerConfirmationHTML, getBusinessNotificationHTML } from './emailTemplates';

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Method not allowed' });
  }

  try {
    const { name, email, phone, postcode, serviceType, vehicleMake, vehicleModel, vehicleYear, vehicleReg, preferredDate, message } = req.body;

    if (!name || !email || !phone || !postcode) {
      return res.status(400).json({ success: false, message: 'Missing required fields' });
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
      html: getBusinessNotificationHTML(formData, submissionDate),
    });

    await resend.emails.send({
      from: 'FixNow Mechanics <noreply@fixnowmechanics.co.uk>',
      to: email,
      subject: `We've received your FixNow Mechanics quote request`,
      html: getCustomerConfirmationHTML(formData),
    });

    return res.status(200).json({ success: true, message: 'Quote request submitted successfully' });
  } catch (error) {
    console.error('Error:', error);
    return res.status(500).json({ success: false, message: 'Failed to send emails', error: error instanceof Error ? error.message : 'Unknown error' });
  }
}
