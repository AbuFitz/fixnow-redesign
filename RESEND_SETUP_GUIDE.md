# Resend + Vercel Setup Guide - FREE Professional Email Solution

This guide will help you set up **Resend** (FREE transactional email service) with **Vercel Serverless Functions** for FixNow Mechanics forms. This is a production-grade solution with **zero subscription costs** up to 3,000 emails/month.

## Why This Solution?

✅ **100% FREE** - No credit card required for 3,000 emails/month  
✅ **Professional Deliverability** - Goes to inbox, not junk folder  
✅ **Beautiful Branded Emails** - React Email templates with FixNow branding  
✅ **Complete Customization** - Full control over email design and content  
✅ **Auto-Responders Included** - Customers get instant confirmation  
✅ **Scalable** - Industry standard used by Vercel, Linear, Raycast  

## Architecture Overview

```
User submits form → Vercel Serverless Function → Resend API → 2 Emails Sent
                                                                ├── Business notification
                                                                └── Customer auto-responder
```

---

## Step 1: Create Resend Account (2 minutes)

1. Go to **https://resend.com**
2. Click **"Start Building"**
3. Sign up with your GitHub account (or email)
4. Verify your email address
5. You're in! Free tier gives you **3,000 emails/month** forever

---

## Step 2: Get Your API Key (1 minute)

1. In Resend dashboard, go to **"API Keys"** in the left sidebar
2. Click **"Create API Key"**
3. Name it: `FixNow Production`
4. Permission: Select **"Full access"** (for sending emails)
5. Click **"Add"**
6. **COPY THE KEY** - you'll only see it once!
   - It looks like: `re_123abc456def789ghi012jkl345mno678`

---

## Step 3: Add Domain (For Production - IMPORTANT!)

**Important:** For production emails to work from `noreply@fixnowmechanics.co.uk`, you need to verify your domain.

### Option A: Use Resend Domain (Quick Test - 5 minutes)
For testing, you can use Resend's domain:
- Emails will come from: `noreply@resend.dev`
- Works immediately, no setup needed
- Good for testing but looks less professional

### Option B: Verify Your Domain (Production - 15 minutes)
For production with your brand:

1. In Resend dashboard, go to **"Domains"**
2. Click **"Add Domain"**
3. Enter: `fixnowmechanics.co.uk`
4. Resend will show you **3 DNS records** to add:
   - **SPF** (TXT record)
   - **DKIM** (TXT record)  
   - **DMARC** (TXT record)

5. **Add these records to your domain DNS** (where you bought the domain):
   - If domain is with **Namecheap**: Domain List → Manage → Advanced DNS → Add Records
   - If domain is with **GoDaddy**: My Products → Domain → DNS → Add Records
   - If domain is with **123-reg**: Control Panel → Domain Names → Manage → DNS

6. Wait 5-15 minutes for DNS to propagate
7. In Resend, click **"Verify"** - it should turn green ✓

**Why this matters:** Without domain verification, emails will be from `resend.dev` and might go to spam. With verification, emails come from your domain and have perfect deliverability.

---

## Step 4: Configure Environment Variables (2 minutes)

### Local Development:

1. Open `.env.local` in your project
2. Add your Resend API key:
   ```env
   RESEND_API_KEY=re_your_actual_api_key_here
   BUSINESS_EMAIL=fixnowmechanics@outlook.com
   ```
3. Save the file

### Vercel Production:

1. Go to **https://vercel.com/dashboard**
2. Select your **fixnow-redesign** project
3. Go to **Settings** → **Environment Variables**
4. Add **2 variables**:
   
   **Variable 1:**
   - Key: `RESEND_API_KEY`
   - Value: `re_your_actual_api_key_here`
   - Environment: Select **Production**, **Preview**, **Development** (all three)
   
   **Variable 2:**
   - Key: `BUSINESS_EMAIL`
   - Value: `fixnowmechanics@outlook.com`
   - Environment: Select **Production**, **Preview**, **Development** (all three)

5. Click **"Save"** for each

---

## Step 5: Test Everything (5 minutes)

### Test Locally:

1. In VS Code terminal:
   ```bash
   npm run dev
   ```

2. Open **http://localhost:5173/estimate**

3. Fill out the form with **your personal email**

4. Click Submit

5. **Check 2 places:**
   - **Your Outlook inbox** (fixnowmechanics@outlook.com) - should see business notification
   - **Your personal email** - should see customer auto-responder

6. **Verify the emails contain:**
   - ✅ All customer details (name, email, phone, postcode)
   - ✅ All vehicle details (make, model, year, registration)
   - ✅ Service type and preferred date
   - ✅ FixNow branding with orange gradient header
   - ✅ Professional layout

### Test on Vercel (After Deployment):

1. Go to **https://fixnowmechanics.co.uk/estimate**
2. Submit a real test with your email
3. Check both inboxes again
4. Should work identically to local

---

## Step 6: Update Email Template (IMPORTANT for Domain!)

After domain verification, update the "from" address in your API files:

### In `/api/estimate.ts`:
Change line 47 from:
```typescript
from: 'FixNow Mechanics <noreply@fixnowmechanics.co.uk>',
```

To (if using resend.dev for testing):
```typescript
from: 'FixNow Mechanics <noreply@resend.dev>',
```

Or keep as is after domain verification!

**Do the same** for:
- `/api/interim-service.ts` (line 40)
- `/api/full-service.ts` (line 49)

---

## Troubleshooting

### ❌ "API key not found" Error
**Solution:** Make sure you added `RESEND_API_KEY` to environment variables in Vercel dashboard. After adding, redeploy the site.

### ❌ "Domain not verified" Error  
**Solution:** Complete Step 3 (Option B) to verify your domain with DNS records.

### ❌ Emails not arriving
**Check these:**
1. Spam/junk folder (should NOT be there with proper domain setup)
2. Resend dashboard → Logs → See if emails were sent
3. Check API key is correct in environment variables
4. Verify domain is verified (green checkmark in Resend)

### ❌ Wrong "from" address
**Solution:** If domain is verified, update the 3 API files (Step 6 above) to use `@fixnowmechanics.co.uk`. If not verified, use `@resend.dev` temporarily.

### ❌ API endpoint not found (404)
**Solution:** Vercel needs to detect the `/api` folder. Make sure files are in the root `/api` directory (not `/src/api`). Redeploy after moving.

---

## Pricing & Limits

### Resend FREE Tier:
- ✅ **3,000 emails/month** - plenty for small business
- ✅ **100 emails/day**
- ✅ Custom domains
- ✅ Full API access
- ✅ Email tracking
- ✅ React Email templates

### When to Upgrade (Optional):
If you exceed 3,000 emails/month, upgrade to Resend Pro:
- **$20/month** for 50,000 emails
- Dedicated IP address
- Priority support
- Higher sending limits

**For FixNow:** 3,000 free emails = ~100 leads/month. Perfect for current scale!

---

## File Structure

```
fixnow-redesign/
├── api/                          # Vercel Serverless Functions
│   ├── estimate.ts              # Handles /estimate form
│   ├── interim-service.ts       # Handles interim booking
│   └── full-service.ts          # Handles full service booking
│
├── emails/                       # React Email Templates
│   ├── BusinessNotification.tsx # Email to fixnowmechanics@outlook.com
│   └── CustomerAutoResponder.tsx # Confirmation to customer
│
├── src/
│   └── lib/
│       └── formService.ts       # Updated to call /api endpoints
│
└── .env.local                    # Environment variables (not committed)
    ├── RESEND_API_KEY
    └── BUSINESS_EMAIL
```

---

## What Changed?

### Old System (Web3Forms):
- ❌ Required $16/month for custom templates
- ❌ Emails went to junk folder
- ❌ Basic email formatting
- ❌ No full customization

### New System (Resend):
- ✅ **100% FREE** up to 3,000 emails/month
- ✅ Perfect inbox delivery (when domain verified)
- ✅ Beautiful React Email templates
- ✅ Complete control over design and content
- ✅ Industry-standard solution
- ✅ Automatic customer confirmations

---

## Support

### Resend Documentation:
- **Main Docs:** https://resend.com/docs
- **React Email:** https://react.email/docs
- **API Reference:** https://resend.com/docs/api-reference

### Need Help?
1. Check Resend dashboard → Logs (see all sent emails)
2. Review error messages in Vercel → Functions → Logs
3. Test locally first before deploying
4. Verify environment variables are set correctly

---

## Next Steps

1. ✅ Complete domain verification (Step 3 - Option B)
2. ✅ Test all 3 forms (estimate, interim, full)
3. ✅ Deploy to Vercel
4. ✅ Add environment variables to Vercel
5. ✅ Test on live site
6. 🚀 Launch!

---

## Summary

You now have a **professional, free, fully customizable email system** that:
- Sends to inbox, not spam
- Includes branded templates with your colors
- Automatically sends customer confirmations  
- Handles 3,000 emails/month at zero cost
- Scales with your business

**This is the same system used by multi-million dollar companies.** You're getting enterprise-grade email infrastructure for free! 🎉
