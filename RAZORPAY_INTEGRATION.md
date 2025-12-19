# Razorpay Integration - Complete Setup Guide

## 🎉 Integration Complete!

Your project now has **full Razorpay payment gateway integration** with direct checkout (no redirects). Users stay on your website during the entire payment process.

---

## 📦 What Was Implemented

### Backend (Express Server)
✅ **Server Location**: `server/index.js`
- Create Razorpay orders
- Verify payment signatures
- Handle payment success/failure/cancellation
- Update Supabase database
- Webhook support for production

### Frontend (React)
✅ **Updated Component**: `src/components/ApplicationModal.tsx`
- Razorpay checkout modal integration
- Real-time payment status updates
- Comprehensive error handling
- User-friendly UI for all states

### Database
✅ **Migration File**: `supabase/migrations/20251216000000_add_razorpay_fields.sql`
- Added Razorpay-specific fields to applications table
- Payment tracking columns
- Proper indexing for performance

---

## 🚀 How to Run

### Step 1: Update Environment Variables

Edit your `.env` file with your actual Razorpay keys:

```env
VITE_RAZORPAY_KEY_ID=rzp_test_your_actual_key_id
VITE_RAZORPAY_KEY_SECRET=your_actual_key_secret
```

**Get your keys from**: https://dashboard.razorpay.com/app/keys
**IMPORTANT**: Use **TEST MODE** keys for development!

### Step 2: Run Database Migration

Go to your Supabase dashboard → SQL Editor → Run this query:

```sql
-- Copy contents from: supabase/migrations/20251216000000_add_razorpay_fields.sql
```

Or use Supabase CLI:
```bash
supabase db push
```

### Step 3: Start Both Servers

**Option A - Run both together:**
```bash
npm run dev:all
```

**Option B - Run separately in two terminals:**

Terminal 1 (Frontend):
```bash
npm run dev
```

Terminal 2 (Backend):
```bash
npm run dev:server
```

### Step 4: Test the Integration

1. Open **http://localhost:5173** (or whatever port Vite assigns)
2. Click "Apply Now"
3. Fill the form
4. Select "Test Payment" (₹1)
5. Click "Proceed to Payment"
6. Razorpay modal will open on your site
7. Use test card: `4111 1111 1111 1111`, CVV: `123`, Expiry: `12/26`
8. Payment completes and shows success message

---

## 🛡️ Edge Cases Handled

### ✅ Payment Flow
1. **Double Submission Prevention** - Prevents multiple clicks
2. **Network Errors** - Graceful handling with retry option
3. **Payment Timeout** - 15-minute timeout with proper messaging
4. **Payment Cancellation** - User can cancel and retry
5. **Payment Failure** - Shows specific error messages
6. **Signature Verification** - Security check on backend
7. **Database Sync** - All states saved to Supabase

### ✅ User Experience
1. **Loading States** - Clear feedback at every step
2. **Success Screen** - Confirmation with auto-close
3. **Failure Screen** - Error message with retry button
4. **Cancelled Screen** - Option to retry or close
5. **Form Validation** - Client-side validation
6. **Disabled Inputs** - During processing to prevent changes

### ✅ Technical
1. **Script Loading** - Razorpay SDK loads dynamically
2. **Cleanup** - Proper cleanup on component unmount
3. **Ref Usage** - Prevents stale closures
4. **Type Safety** - Full TypeScript support
5. **API Proxy** - Vite proxy for development
6. **CORS** - Properly configured for development

---

## 🔐 Security Features

1. **Signature Verification** - Server-side verification using HMAC SHA256
2. **Order ID Validation** - Ensures payment matches order
3. **No Sensitive Data in Frontend** - Key secret only on backend
4. **Payment Status Tracking** - All statuses logged in database
5. **Webhook Support** - Optional production webhook for extra security

---

## 📊 Database Schema Updates

New columns added to `applications` table:

| Column | Type | Description |
|--------|------|-------------|
| `razorpay_order_id` | text | Razorpay order ID |
| `razorpay_payment_id` | text | Razorpay payment ID |
| `razorpay_signature` | text | Payment signature for verification |
| `payment_completed_at` | timestamptz | When payment was completed |
| `failure_reason` | text | Reason if payment failed |

---

## 🧪 Testing Guide

### Test Cards (Razorpay Test Mode)

**Success:**
- Card: `4111 1111 1111 1111`
- CVV: Any 3 digits
- Expiry: Any future date

**Card Declined:**
- Card: `4000 0000 0000 0002`

**Insufficient Balance:**
- Card: `4000 0000 0000 0259`

**Network Error:**
- Card: `4000 0000 0000 0069`

### Testing Scenarios

1. **Successful Payment**
   - Fill form → Select Test Payment → Pay with success card
   - Should show success screen and save to database

2. **Failed Payment**
   - Use declined card → Should show error and allow retry
   - Check database - status should be "failed"

3. **Cancelled Payment**
   - Close Razorpay modal → Should show cancelled screen
   - Check database - status should be "cancelled"

4. **Network Error**
   - Stop backend server → Try to create order
   - Should show network error message

5. **Invalid Signature**
   - Backend will catch this automatically
   - Payment won't be marked as completed

---

## 📁 Project Structure

```
elevate_algouniversity-main/
├── server/
│   ├── index.js          # Backend API server
│   ├── package.json      # Backend dependencies
│   └── node_modules/
├── src/
│   └── components/
│       └── ApplicationModal.tsx  # Updated with Razorpay
├── supabase/
│   └── migrations/
│       ├── 20251202145301_create_applications_table.sql
│       └── 20251216000000_add_razorpay_fields.sql  # NEW
├── .env                  # Environment variables
├── vite.config.ts        # Proxy configuration
└── package.json          # Updated scripts
```

---

## 🔄 Payment Flow Diagram

```
User Fills Form
      ↓
Creates Order (Backend API)
      ↓
Saves Application to DB (status: pending)
      ↓
Opens Razorpay Checkout Modal
      ↓
User Completes Payment
      ↓
Frontend Receives Response
      ↓
Verifies Signature (Backend API)
      ↓
Updates DB (status: completed)
      ↓
Shows Success Screen
```

---

## 🐛 Troubleshooting

### Issue: "Network Error"
**Solution**: Make sure backend server is running on port 3001

```bash
npm run dev:server
```

### Issue: "Razorpay SDK failed to load"
**Solution**: Check internet connection, firewall, or ad blockers

### Issue: "Invalid signature"
**Solution**: 
1. Check if `VITE_RAZORPAY_KEY_SECRET` is correct in `.env`
2. Restart backend server after changing `.env`

### Issue: Payment successful but database not updated
**Solution**:
1. Check Supabase connection in backend logs
2. Verify migration was run
3. Check Supabase RLS policies

### Issue: "Failed to create order"
**Solution**:
1. Check Razorpay keys are in TEST mode
2. Verify keys are correct in `.env`
3. Check backend console for errors

---

## 🚀 Production Deployment

### Before Going Live:

1. **Switch to Live Mode Keys**
   ```env
   VITE_RAZORPAY_KEY_ID=rzp_live_your_live_key
   VITE_RAZORPAY_KEY_SECRET=your_live_secret
   ```

2. **Set Up Webhook** (Recommended)
   - Go to Razorpay Dashboard → Webhooks
   - Add webhook URL: `https://yourdomain.com/api/webhook`
   - Select events: `payment.captured`, `payment.failed`
   - Add webhook secret to `.env`

3. **Environment Variables on Server**
   - Set all env variables in your hosting platform
   - Never commit `.env` to git

4. **Deploy Backend**
   - Deploy Express server (Heroku, Railway, Render, etc.)
   - Update `CLIENT_URL` in backend `.env`

5. **Update Frontend**
   - Update Vite proxy or use backend URL directly in production
   - Build: `npm run build`
   - Deploy dist folder

---

## 📞 Support & Resources

- **Razorpay Docs**: https://razorpay.com/docs/
- **Razorpay Test Cards**: https://razorpay.com/docs/payments/payments/test-card-details/
- **Supabase Docs**: https://supabase.com/docs
- **This Project's GitHub**: (add your repo URL)

---

## ✨ Features Summary

### Payment Integration
✅ Direct Razorpay checkout (modal on your site)  
✅ No page redirects  
✅ Real-time payment verification  
✅ Secure signature verification  
✅ Test mode support  

### User Experience
✅ Loading indicators  
✅ Success/failure screens  
✅ Retry functionality  
✅ Clear error messages  
✅ Form validation  

### Technical
✅ TypeScript support  
✅ API rate limiting ready  
✅ CORS configured  
✅ Error logging  
✅ Database integration  

### Security
✅ HMAC signature verification  
✅ Server-side validation  
✅ Secure key storage  
✅ Payment status tracking  
✅ Webhook support  

---

## 🎓 Next Steps

1. **Test thoroughly** in test mode
2. **Update payment amounts** if needed
3. **Add email notifications** (optional)
4. **Set up webhooks** for production
5. **Monitor payments** in Razorpay dashboard
6. **Go live** when ready!

---

**Need Help?** Check the console logs in both frontend and backend for detailed error messages.

**Happy Coding! 🚀**
