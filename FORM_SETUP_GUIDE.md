# 📧 FixNow Mechanics - Professional Form Setup Guide

## 🎯 What You'll Get

After this setup, when a customer fills out ANY form on your website:

1. **Customer receives** → Beautiful branded email instantly (Auto-Responder)
2. **You receive** → Professional formatted email with all their details
3. **Everyone knows** → Request was received successfully

---

## 📋 STEP-BY-STEP SETUP (30 minutes)

### **STEP 1: Create Web3Forms Account** ⏱️ 5 minutes

1. Go to: https://web3forms.com
2. Click **"Get Started Free"**
3. Sign up with: `fixnowmechanics@outlook.com`
4. Check your email and verify account
5. You'll land on the dashboard

---

### **STEP 2: Create 4 Access Keys** ⏱️ 10 minutes

You need 4 separate forms for tracking:

#### Form 1: General Quote
1. In dashboard, click **"+ New Form"**
2. Name it: `General Quote Form`
3. Copy the **Access Key** (looks like: `abc123-def456...`)
4. Save it somewhere safe!

#### Form 2: Quick Estimate  
1. Click **"+ New Form"** again
2. Name it: `Quick Estimate Form`
3. Copy the **Access Key**
4. Save it!

#### Form 3: Interim Service
1. Click **"+ New Form"**
2. Name it: `Interim Service Booking`
3. Copy the **Access Key**
4. Save it!

#### Form 4: Full Service
1. Click **"+ New Form"**
2. Name it: `Full Service Booking`
3. Copy the **Access Key**
4. Save it!

---

### **STEP 3: Add Keys to Website** ⏱️ 5 minutes

1. In your project, create a file called `.env.local`
2. Copy this template and **replace with your real keys**:

```env
# Web3Forms Access Keys (from Step 2)

# General Quote Form
VITE_WEB3FORMS_QUOTE_KEY=paste_your_quote_key_here

# Quick Estimate Form
VITE_WEB3FORMS_ESTIMATE_KEY=paste_your_estimate_key_here

# Interim Service Booking  
VITE_WEB3FORMS_INTERIM_KEY=paste_your_interim_key_here

# Full Service Booking
VITE_WEB3FORMS_FULL_KEY=paste_your_full_key_here

# Your email where submissions go
VITE_BUSINESS_EMAIL=fixnowmechanics@outlook.com
```

3. Save the file
4. **IMPORTANT:** Never share this file or commit it to GitHub!

---

### **STEP 4: Configure Web3Forms Settings** ⏱️ 10 minutes

For **EACH of your 4 forms** in Web3Forms dashboard:

1. Click on the form name
2. Go to **Settings** tab
3. Configure these options:

#### Email Settings:
- **To Email:** `fixnowmechanics@outlook.com`
- **From Name:** `FixNow Website`
- **Subject:** Keep default (we set it programmatically)

#### Auto-Responder Settings:
- **Enable Auto-Responder:** ✅ YES
- **Subject:** `Thank you for contacting FixNow Mechanics!`
- **From Name:** `FixNow Mechanics`
- **Message:** The code handles this automatically ✨

#### Notifications:
- **Email Notifications:** ✅ ON
- **Slack/Discord:** Optional (you can add later)

#### Spam Protection:
- **Google reCAPTCHA:** Optional (recommended later)
- **Honeypot:** ✅ Already enabled in code

4. Click **Save Settings**
5. Repeat for all 4 forms!

---

### **STEP 5: Add to Vercel Environment** ⏱️ 5 minutes

When you deploy to Vercel:

1. Go to Vercel Dashboard
2. Select your project
3. Go to **Settings** → **Environment Variables**
4. Add each variable:
   - `VITE_WEB3FORMS_QUOTE_KEY` = your_key
   - `VITE_WEB3FORMS_ESTIMATE_KEY` = your_key
   - `VITE_WEB3FORMS_INTERIM_KEY` = your_key
   - `VITE_WEB3FORMS_FULL_KEY` = your_key
   - `VITE_BUSINESS_EMAIL` = fixnowmechanics@outlook.com

5. Click **Save**
6. Redeploy your site

---

## ✅ Testing Your Setup

### Test Each Form:

1. **Quote Form** (`/quote`):
   - Fill out with TEST data
   - Use your personal email
   - Submit

2. **Estimate Form** (`/estimate`):
   - Fill out with TEST data
   - Submit

3. **Interim Service** (`/estimate/interim-service`):
   - Fill out with TEST data
   - Submit

4. **Full Service** (`/estimate/full-service`):
   - Fill out with TEST data
   - Submit

### What to Check:

✅ You receive email at fixnowmechanics@outlook.com  
✅ Test email (your personal) receives auto-responder  
✅ Emails look branded and professional  
✅ All information is formatted nicely  
✅ No errors in browser console

---

## 🎨 Email Design Features

Your branded emails include:

### Customer Auto-Responder:
- ✨ FixNow header with gradient
- 👋 Personal greeting with their name
- ✅ Confirmation message
- 📋 Their request details
- 📞 Quick contact options (Call/WhatsApp)
- 🏢 Business information in footer

### Business Notification (to you):
- 🔔 Clear "New Request" header
- ⚡ "Action Required" reminder
- 👤 Customer contact details (clickable!)
- 🚗 Vehicle information
- 📝 Any messages they sent
- 🎯 Quick action buttons (Call/Email)

---

## 🚨 Troubleshooting

### Not receiving emails?

1. Check spam folder
2. Verify email in Web3Forms settings
3. Check Web3Forms dashboard for submissions
4. Verify .env.local has correct keys

### Customer not getting auto-responder?

1. Check their spam folder
2. Verify auto-responder is enabled in Web3Forms
3. Test with different email provider

### Form not submitting?

1. Open browser console (F12)
2. Look for error messages
3. Check .env.local file exists
4. Verify keys are correct (no spaces!)

---

## 💡 Pro Tips

1. **Test Monthly:** Submit test forms to ensure everything works
2. **Monitor Dashboard:** Check Web3Forms dashboard weekly
3. **Update Templates:** You can customize email designs anytime
4. **Add reCAPTCHA:** After launch, add Google reCAPTCHA for extra spam protection
5. **Track Submissions:** Web3Forms shows submission stats

---

## 🎯 What Happens Next?

After setup, I need to:
1. ✅ Update all 4 form files with new submission code
2. ✅ Add toast notifications for user feedback
3. ✅ Add loading states during submission
4. ✅ Test everything works perfectly

---

## 📞 Need Help?

If you get stuck:
1. Check this guide again
2. Check Web3Forms documentation: https://docs.web3forms.com
3. Ask me for help!

---

## 🚀 Ready?

Once you've completed Steps 1-5 above and have your 4 access keys, tell me:

**"Keys are ready"** 

And I'll update all the forms with the professional submission code!
