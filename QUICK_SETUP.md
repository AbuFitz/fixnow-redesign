# 🚀 Quick Setup Checklist - Resend Email

Follow these steps to get your FREE professional email system working:

## ✅ Step 1: Create Resend Account (2 min)
- [ ] Go to https://resend.com
- [ ] Sign up (FREE - no credit card)
- [ ] Verify your email

## ✅ Step 2: Get API Key (1 min)
- [ ] Dashboard → API Keys → Create API Key
- [ ] Name: "FixNow Production"
- [ ] Permission: "Full access"
- [ ] Copy the key (starts with `re_`)

## ✅ Step 3: Add API Key to .env.local (30 sec)
```env
RESEND_API_KEY=re_your_actual_key_here
BUSINESS_EMAIL=fixnowmechanics@outlook.com
```

## ✅ Step 4: Test Locally (2 min)
```bash
npm run dev
```
- [ ] Go to http://localhost:5173/estimate
- [ ] Fill form with your email
- [ ] Check both inboxes (business + customer)

## ✅ Step 5: Deploy to Vercel (3 min)
1. Push code to GitHub (already done ✓)
2. Go to https://vercel.com/dashboard
3. Settings → Environment Variables → Add:
   - Key: `RESEND_API_KEY` | Value: `re_your_key`
   - Key: `BUSINESS_EMAIL` | Value: `fixnowmechanics@outlook.com`
4. Redeploy the site

## ✅ Step 6: Verify Domain (15 min - IMPORTANT!)
**For production emails from @fixnowmechanics.co.uk**

- [ ] Resend Dashboard → Domains → Add Domain
- [ ] Enter: `fixnowmechanics.co.uk`
- [ ] Add 3 DNS records to your domain provider:
  - SPF (TXT)
  - DKIM (TXT)
  - DMARC (TXT)
- [ ] Wait 5-15 minutes
- [ ] Click "Verify" in Resend

## ✅ Step 7: Update Email "From" Address
**After domain verification**, in these 3 files:
- `api/estimate.ts` (line 47)
- `api/interim-service.ts` (line 40)
- `api/full-service.ts` (line 49)

Keep as:
```typescript
from: 'FixNow Mechanics <noreply@fixnowmechanics.co.uk>',
```

Or change to (if using Resend domain for testing):
```typescript
from: 'FixNow Mechanics <noreply@resend.dev>',
```

## ✅ Step 8: Test on Live Site
- [ ] Go to https://fixnowmechanics.co.uk/estimate
- [ ] Submit test with your email
- [ ] Verify 2 emails received:
  - Business notification (fixnowmechanics@outlook.com)
  - Customer confirmation (your email)

---

## 🎉 Done!

You now have:
- ✅ **FREE professional emails** (3000/month)
- ✅ **Perfect deliverability** (inbox, not spam)
- ✅ **Beautiful branded templates**
- ✅ **Automatic customer confirmations**
- ✅ **Complete customization**

---

## 🆘 Troubleshooting

**Emails not arriving?**
1. Check spam folder (shouldn't be there after domain verification)
2. Resend Dashboard → Logs (see all sent emails)
3. Verify environment variables in Vercel

**"API key not found" error?**
- Add `RESEND_API_KEY` to Vercel environment variables
- Redeploy after adding

**Wrong "from" address?**
- Complete Step 6 (domain verification)
- Update Step 7 (email addresses in API files)

---

## 📚 Full Guide
See `RESEND_SETUP_GUIDE.md` for detailed instructions.
