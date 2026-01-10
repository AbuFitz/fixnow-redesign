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
    // Determine the API endpoint based on form type
    const apiEndpoints = {
      estimate: '/api/estimate',
      interim: '/api/interim-service',
      full: '/api/full-service',
    };

    const endpoint = apiEndpoints[formType];

    // Prepare the submission data for our Vercel serverless function
    const submissionData = {
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      postcode: formData.postcode,
      serviceType: formData.serviceType,
      vehicleMake: formData.vehicleMake || formData.make,
      vehicleModel: formData.vehicleModel || formData.model,
      vehicleYear: formData.vehicleYear || formData.year,
      vehicleReg: formData.vehicleReg || formData.reg,
      fuelType: formData.fuelType,
      preferredDate: formData.preferredDate,
      message: formData.message,
    };

    // Submit to our API endpoint
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify(submissionData),
    });

    // Check if response is actually JSON
    const contentType = response.headers.get('content-type');
    if (!contentType || !contentType.includes('application/json')) {
      console.error('Server returned non-JSON response:', await response.text());
      throw new Error('Server error. Please try again or call us at 07354 915941.');
    }

    let result;
    try {
      result = await response.json();
    } catch (parseError) {
      console.error('Failed to parse response:', parseError);
      throw new Error('Invalid response from server. Please call us at 07354 915941.');
    }

    if (!response.ok) {
      throw new Error(result.message || `Server error (${response.status}). Please call us at 07354 915941.`);
    }

    if (result.success) {
      return {
        success: true,
        message: result.message || 'Request received! We\'ll contact you shortly by call, text, or email.',
      };
    } else {
      throw new Error(result.message || 'Submission failed. Please try again.');
    }

  } catch (error) {
    console.error('Form submission error:', error);
    
    // Provide user-friendly error messages
    if (error instanceof TypeError && error.message.includes('fetch')) {
      return {
        success: false,
        message: 'Network error. Please check your connection and try again.',
      };
    }
    
    return {
      success: false,
      message: error instanceof Error 
        ? error.message 
        : 'Something went wrong. Please call us at 07354 915941.',
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
