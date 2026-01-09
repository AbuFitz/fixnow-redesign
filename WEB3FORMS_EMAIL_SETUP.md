# Web3Forms Email Configuration Guide

## Critical Issues to Fix

### 1. Email Template Configuration in Web3Forms Dashboard

**Problem:** Emails are not using custom templates and missing information.

**Solution:** Configure each form in Web3Forms dashboard:

1. Go to https://web3forms.com/dashboard
2. For EACH of your 3 forms, configure:

#### General Settings:
- **To Email:** fixnowmechanics@outlook.com
- **From Name:** FixNow Website
- **Subject Template:** New {formType} Request from {name}

#### Email Template (Business Notification):
Enable "Custom Email Template" and paste this HTML:

```html
<h2>New Customer Request</h2>
<p><strong>Service Type:</strong> {{serviceType}}</p>
<h3>Customer Details:</h3>
<ul>
  <li><strong>Name:</strong> {{name}}</li>
  <li><strong>Email:</strong> <a href="mailto:{{email}}">{{email}}</a></li>
  <li><strong>Phone:</strong> <a href="tel:{{phone}}">{{phone}}</a></li>
  <li><strong>Postcode:</strong> {{postcode}}</li>
</ul>
<h3>Vehicle Details:</h3>
<ul>
  <li><strong>Make:</strong> {{vehicle_make}}</li>
  <li><strong>Model:</strong> {{vehicle_model}}</li>
  <li><strong>Year:</strong> {{vehicle_year}}</li>
  <li><strong>Registration:</strong> {{vehicle_registration}}</li>
  <li><strong>Fuel Type:</strong> {{fuel_type}}</li>
</ul>
<h3>Additional Information:</h3>
<p><strong>Preferred Date:</strong> {{preferred_date}}</p>
<p><strong>Message:</strong> {{message}}</p>
<hr>
<p><small>Submitted: {{submission_date}}</small></p>
```

#### Auto-Responder Settings:
- **Enable Auto-Responder:** ✅ YES
- **Subject:** Thank you for contacting FixNow Mechanics!
- **Auto-Responder Email Template:**

```html
<h2>Thank you, {{name}}!</h2>
<p>We've received your request and will get back to you soon.</p>
<h3>What happens next?</h3>
<ol>
  <li>Our team will review your details</li>
  <li>We'll contact you within 1 business day</li>
  <li>We'll provide a clear, honest quote</li>
</ol>
<p><strong>Your Details:</strong></p>
<ul>
  <li>Service: {{service_type}}</li>
  <li>Vehicle: {{vehicle_make}} {{vehicle_model}}</li>
</ul>
<hr>
<p>FixNow Mechanics<br>
📞 07354 915941<br>
📧 fixnowmechanics@outlook.com</p>
```

### 2. Spam/Junk Email Prevention

**Why emails go to junk:**
- No SPF/DKIM authentication
- Web3Forms free tier uses shared IPs
- First-time sender domain

**Solutions:**

#### Option A: Use Web3Forms Pro ($9/month)
- Dedicated IP address
- Custom domain authentication
- Better deliverability
- Up to 10,000 emails/month

#### Option B: Add to Safe Senders (Free)
1. Check your Outlook junk folder
2. Right-click the Web3Forms email
3. Select "Mark as safe" or "Add sender to safe list"
4. This will train Outlook that these emails are legitimate

#### Option C: Email Forwarding Rule (Free)
1. In Outlook, create a rule:
   - FROM: noreply@web3forms.com
   - MOVE TO: Inbox
   - MARK AS: Not Junk

### 3. Missing Customer Auto-Responder

**Problem:** Customers not receiving confirmation emails.

**Check:**
1. In Web3Forms dashboard, ensure "Auto-Responder" is enabled for ALL 3 forms
2. Verify the customer email field is named exactly "email" in submission
3. Check customer's spam folder
4. Test with your personal email first

### 4. Field Mapping Reference

Make sure these exact field names are used in submission:

```javascript
{
  access_key: "your-key-here",
  
  // Customer Info
  name: "Customer Name",
  email: "customer@email.com",
  phone: "07XXX XXXXXX",
  postcode: "HP2 7DE",
  
  // Vehicle Info
  vehicle_make: "Ford",
  vehicle_model: "Focus",
  vehicle_year: "2020",
  vehicle_registration: "AB12CDE",
  fuel_type: "Petrol",
  
  // Service Info
  service_type: "Full Service",
  preferred_date: "2026-01-15",
  message: "Customer message here",
  
  // Metadata
  form_type: "estimate",
  submission_date: "2026-01-09T10:30:00Z"
}
```

## Testing Checklist

After configuration:

- [ ] Submit test form with your personal email
- [ ] Check fixnowmechanics@outlook.com inbox (and junk)
- [ ] Check your personal email inbox (and junk)
- [ ] Verify all fields appear in business email
- [ ] Verify auto-responder arrives with correct details
- [ ] Test all 3 forms (Estimate, Interim, Full)

## Support

If issues persist:
- Web3Forms Support: https://web3forms.com/support
- Check Web3Forms status: https://status.web3forms.com
