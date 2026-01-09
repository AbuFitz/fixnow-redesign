import type { VercelRequest, VercelResponse } from '@vercel/node';
import { Resend } from 'resend';
import { render } from '@react-email/render';
import BusinessNotification from '../emails/BusinessNotification';
import CustomerAutoResponder from '../emails/CustomerAutoResponder';

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Method not allowed' });
  }

  try {
    const {
      name,
      email,
      phone,
      postcode,
      serviceType,
      vehicleMake,
      vehicleModel,
      vehicleYear,
      vehicleReg,
      preferredDate,
      message,
    } = req.body;

    // Validation
    if (!name || !email || !phone || !postcode) {
      return res.status(400).json({ 
        success: false, 
        message: 'Missing required fields' 
      });
    }

    // Prepare data for emails
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
      preferredDate: preferredDate || 'No preference',
      message: message || 'None',
      submissionDate: new Date().toLocaleString('en-GB', {
        dateStyle: 'full',
        timeStyle: 'short',
        timeZone: 'Europe/London',
      }),
    };

    // Send business notification
    const businessEmail = await resend.emails.send({
      from: 'FixNow Mechanics <noreply@fixnowmechanics.co.uk>',
      to: process.env.BUSINESS_EMAIL || 'fixnowmechanics@outlook.com',
      subject: `🚗 New Estimate Request from ${name}`,
      html: render(BusinessNotification({ formData, formType: 'estimate' })),
    });

    // Send customer auto-responder
    const customerEmail = await resend.emails.send({
      from: 'FixNow Mechanics <noreply@fixnowmechanics.co.uk>',
      to: email,
      subject: 'Thank you for your enquiry - FixNow Mechanics',
      html: render(CustomerAutoResponder({ customerName: name, formType: 'estimate' })),
    });

    console.log('Business email sent:', businessEmail);
    console.log('Customer email sent:', customerEmail);

    return res.status(200).json({
      success: true,
      message: 'Quote request submitted successfully',
    });
  } catch (error) {
    console.error('Error sending emails:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to send emails. Please try again.',
      error: error instanceof Error ? error.message : 'Unknown error',
    });
  }
}
