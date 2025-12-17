# Quick Reference - Common Commands

## Start Development

### Start everything (recommended):
```bash
npm run dev:all
```

### Or start separately:

**Terminal 1 - Frontend:**
```bash
npm run dev
```

**Terminal 2 - Backend:**
```bash
npm run dev:server
```

## Test Payment Flow

1. Open: http://localhost:5173
2. Click: "Apply Now"
3. Fill form
4. Select: "Test Payment" (₹1)
5. Use test card: 4111 1111 1111 1111
6. CVV: 123
7. Expiry: 12/26

## Environment Variables Needed

```env
VITE_RAZORPAY_KEY_ID=rzp_test_xxxxx
VITE_RAZORPAY_KEY_SECRET=xxxxx
```

## Check if Backend is Running

Visit: http://localhost:3001/health

Should return: `{"status":"ok","message":"Server is running"}`

## Common Issues

**"Network Error"** → Backend not running  
**"Invalid keys"** → Check Razorpay keys in .env  
**"SDK failed to load"** → Check internet connection  

## Useful URLs

- Razorpay Dashboard: https://dashboard.razorpay.com
- Razorpay Test Cards: https://razorpay.com/docs/payments/payments/test-card-details/
- Supabase Dashboard: https://app.supabase.com

## Payment Test Scenarios

| Scenario | Test Card | Expected Result |
|----------|-----------|-----------------|
| Success | 4111 1111 1111 1111 | Payment succeeds |
| Declined | 4000 0000 0000 0002 | Card declined error |
| Low Balance | 4000 0000 0000 0259 | Insufficient funds |
| Network Fail | 4000 0000 0000 0069 | Network error |

## Database Check

After payment, check Supabase:
1. Go to Table Editor
2. Open `applications` table
3. Look for your test entry
4. Check `payment_status` column

Should be one of: `pending`, `completed`, `failed`, `cancelled`
