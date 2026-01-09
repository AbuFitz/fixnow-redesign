import { generateBusinessNotification, generateCustomerAutoResponder } from './emailTemplates';

interface FormData {
  // Customer details
  name: string;
  email: string;
  phone: string;
  postcode: string;
  
  // Vehicle details
  vehicleMake?: string;
  vehicleModel?: string;
  vehicleYear?: string;
  vehicleReg?: string;
  
  // Legacy field names for backward compatibility
  make?: string;
  model?: string;
  year?: string;
  reg?: string;
  fuelType?: string;
  
  // Service details
  serviceType?: string;
  preferredDate?: string;
  message?: string;
}

interface SubmissionResponse {
  success: boolean;
  message: string;
}

export const submitForm = async (
  formData: FormData,
  formType: 'estimate' | 'interim' | 'full'
): Promise<SubmissionResponse> => {
  try {
    // Get the appropriate access key based on form type
    const accessKeys = {
      estimate: import.meta.env.VITE_WEB3FORMS_ESTIMATE_KEY,
      interim: import.meta.env.VITE_WEB3FORMS_INTERIM_KEY,
      full: import.meta.env.VITE_WEB3FORMS_FULL_KEY,
    };

    const accessKey = accessKeys[formType];
    
    if (!accessKey) {
      throw new Error('Form configuration error. Please contact support.');
    }

    // Prepare the submission data - send ALL fields to Web3Forms
    const submissionData = {
      access_key: accessKey,
      
      // Customer details
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      postcode: formData.postcode,
      
      // Vehicle details (use whichever field names are provided)
      vehicle_make: formData.vehicleMake || formData.make || 'Not provided',
      vehicle_model: formData.vehicleModel || formData.model || 'Not provided',
      vehicle_year: formData.vehicleYear || formData.year || 'Not provided',
      vehicle_registration: formData.vehicleReg || formData.reg || 'Not provided',
      fuel_type: formData.fuelType || 'Not provided',
      
      // Service details
      service_type: formData.serviceType || 'Not specified',
      preferred_date: formData.preferredDate || 'No preference',
      additional_message: formData.message || 'None',
      
      // Metadata
      form_type: `${formType.charAt(0).toUpperCase() + formType.slice(1)} Form`,
      submission_date: new Date().toLocaleString('en-GB', { 
        dateStyle: 'full', 
        timeStyle: 'short',
        timeZone: 'Europe/London'
      }),
      
      // Email configuration for Web3Forms
      subject: `🚗 New ${formType.charAt(0).toUpperCase() + formType.slice(1)} Request from ${formData.name}`,
      from_name: 'FixNow Mechanics Website',
      replyto: formData.email,
      
      // Redirect after success (disable to handle in app)
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
