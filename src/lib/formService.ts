import { generateBusinessNotification, generateCustomerAutoResponder } from './emailTemplates';

interface FormData {
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

interface SubmissionResponse {
  success: boolean;
  message: string;
}

export const submitForm = async (
  formData: FormData,
  formType: 'quote' | 'estimate' | 'interim' | 'full'
): Promise<SubmissionResponse> => {
  try {
    // Get the appropriate access key based on form type
    const accessKeys = {
      quote: import.meta.env.VITE_WEB3FORMS_QUOTE_KEY,
      estimate: import.meta.env.VITE_WEB3FORMS_ESTIMATE_KEY,
      interim: import.meta.env.VITE_WEB3FORMS_INTERIM_KEY,
      full: import.meta.env.VITE_WEB3FORMS_FULL_KEY,
    };

    const accessKey = accessKeys[formType];
    
    if (!accessKey) {
      throw new Error('Form configuration error. Please contact support.');
    }

    // Prepare the submission data
    const submissionData = {
      access_key: accessKey,
      
      // Customer details
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      postcode: formData.postcode,
      
      // Vehicle details
      vehicle_make: formData.make,
      vehicle_model: formData.model,
      ...(formData.year && { vehicle_year: formData.year }),
      vehicle_registration: formData.reg,
      ...(formData.fuelType && { fuel_type: formData.fuelType }),
      
      // Service details
      ...(formData.serviceType && { service_type: formData.serviceType }),
      ...(formData.preferredDate && { preferred_date: formData.preferredDate }),
      ...(formData.message && { message: formData.message }),
      
      // Metadata
      form_type: formType,
      submission_date: new Date().toISOString(),
      
      // Custom email templates (Web3Forms will use these)
      subject: `New ${formType.charAt(0).toUpperCase() + formType.slice(1)} Request - ${formData.name}`,
      
      // Business notification email (HTML)
      from_name: 'FixNow Mechanics Website',
      replyto: formData.email,
      
      // This tells Web3Forms to send the formatted email
      '_template': {
        business: generateBusinessNotification(formData, formType),
        customer: generateCustomerAutoResponder(formData, formType)
      },
      
      // Auto-responder configuration
      autoresponse: {
        enabled: true,
        subject: 'Thank you for contacting FixNow Mechanics!',
        message: generateCustomerAutoResponder(formData, formType)
      },
      
      // Redirect after success (optional)
      redirect: false,
      
      // Honeypot for spam protection
      botcheck: '',
    };

    // Submit to Web3Forms
    const response = await fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(submissionData)
    });

    const result = await response.json();

    if (result.success) {
      return {
        success: true,
        message: 'Thank you! We\'ve received your request and will get back to you within 1 hour.'
      };
    } else {
      throw new Error(result.message || 'Submission failed');
    }

  } catch (error) {
    console.error('Form submission error:', error);
    return {
      success: false,
      message: error instanceof Error ? error.message : 'Something went wrong. Please call us at 07354 915941.'
    };
  }
};

// Form validation helpers
export const validateEmail = (email: string): boolean => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

export const validatePhone = (phone: string): boolean => {
  // UK phone number validation (basic)
  const cleaned = phone.replace(/\s+/g, '');
  return /^(\+44|0)[0-9]{10}$/.test(cleaned);
};

export const validatePostcode = (postcode: string): boolean => {
  // UK postcode validation (basic)
  return /^[A-Z]{1,2}[0-9]{1,2}[A-Z]?\s?[0-9][A-Z]{2}$/i.test(postcode.trim());
};
