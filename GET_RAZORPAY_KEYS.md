# 🔑 How to Get Your Razorpay Test Keys

## Current Status: Demo Mode ✨

Your project is currently running in **DEMO MODE** - it simulates the payment flow without real Razorpay integration. This is perfect for learning!

---

## 📝 Step-by-Step: Get Your Razorpay Test Keys

### Step 1: Access Razorpay Dashboard

1. Open your browser
2. Go to: **https://dashboard.razorpay.com**
3. Login with your Razorpay account

### Step 2: Switch to Test Mode

⚠️ **IMPORTANT**: Make sure you're in **TEST MODE**

- Look at the **top-right corner** of the dashboard
- You'll see a toggle switch
- It should show **"Test Mode"** with a yellow/orange indicator
- If it says "Live Mode", click to switch to Test Mode

![Test Mode Toggle](https://i.imgur.com/example.png)

### Step 3: Navigate to API Keys

1. Click on **"Settings"** in the left sidebar (gear icon)
2. Click on **"API Keys"**
3. You'll see a section for **Test Keys**

### Step 4: Generate Test Keys (if needed)

If you don't have test keys yet:
1. Click **"Generate Test Key"** button
2. Keys will be generated instantly
3. You'll see two keys:
   - **Key ID** (starts with `rzp_test_`)
   - **Key Secret** (long string, hidden by default)

### Step 5: Copy Your Keys

1. **Key ID**: 
   - Shows directly, click to copy
   - Example: `rzp_test_1A2b3C4d5E6f7G8h`

2. **Key Secret**:
   - Click **"Show"** or **"Reveal"** button
   - Copy the entire string
   - Example: `ABc123XyZ456...` (long string)

### Step 6: Add Keys to Your Project

1. Open your project folder
2. Find the **`.env`** file
3. Replace the demo values:

```env
# BEFORE (Demo Mode)
VITE_RAZORPAY_KEY_ID=rzp_test_demo
VITE_RAZORPAY_KEY_SECRET=demo_secret_key_for_testing

# AFTER (Your Real Test Keys)
VITE_RAZORPAY_KEY_ID=rzp_test_1A2b3C4d5E6f7G8h
VITE_RAZORPAY_KEY_SECRET=YOUR_ACTUAL_KEY_SECRET_HERE
```

4. **Save** the file

### Step 7: Restart Your Servers

Stop both servers (Ctrl+C) and start again:

```bash
npm run dev:all
```

---

## 🎯 What You'll See

### In Demo Mode (Current):
- ✅ Form submission works
- ✅ Order creation works
- ✅ Payment flow is simulated (2 second delay)
- ✅ Success message shows
- ✅ Data saved to database with `demo_completed` status
- ❌ No real Razorpay checkout modal
- ❌ No real payment processing

### With Real Keys:
- ✅ Everything above PLUS:
- ✅ Real Razorpay checkout modal opens
- ✅ Can use test cards
- ✅ Real payment processing
- ✅ Signature verification
- ✅ Full production-like experience

---

## 🧪 Test Cards (After Adding Real Keys)

Once you have real keys, use these test cards:

| Card Number | CVV | Expiry | Result |
|-------------|-----|--------|--------|
| 4111 1111 1111 1111 | 123 | 12/26 | ✅ Success |
| 4000 0000 0000 0002 | 123 | 12/26 | ❌ Declined |
| 4000 0000 0000 0259 | 123 | 12/26 | 💰 Low Balance |

---

## 🔒 Security Notes

### Test Mode vs Live Mode

| Feature | Test Mode | Live Mode |
|---------|-----------|-----------|
| Real Money | ❌ No | ✅ Yes |
| Test Cards | ✅ Yes | ❌ No |
| Real Cards | ❌ No | ✅ Yes |
| For Development | ✅ Yes | ❌ No |
| For Production | ❌ No | ✅ Yes |

### Key Safety

✅ **DO:**
- Keep keys in `.env` file
- Add `.env` to `.gitignore`
- Use test keys for development
- Switch to live keys only in production

❌ **DON'T:**
- Commit keys to Git
- Share keys publicly
- Use live keys in development
- Hardcode keys in code

---

## 🐛 Troubleshooting

### "I can't find API Keys in Settings"
- Make sure you're logged in
- Check if your account is verified
- Try refreshing the page

### "I don't see Test Mode toggle"
- Look at top-right corner
- It might be labeled differently in your region
- Try the dashboard homepage

### "Keys not working after adding to .env"
- Make sure you saved the file
- Restart both servers
- Check for typos in key ID
- Verify key secret is complete

### "Still seeing Demo Mode after adding keys"
- Check `.env` file has no spaces
- Restart servers completely
- Check terminal logs for errors

---

## 📞 Need Help?

### Razorpay Resources:
- **Dashboard**: https://dashboard.razorpay.com
- **Docs**: https://razorpay.com/docs/
- **Support**: support@razorpay.com
- **Test Keys Guide**: https://razorpay.com/docs/payments/dashboard/account-settings/api-keys/

### Common Questions:

**Q: Is demo mode safe for testing?**  
A: Yes! Demo mode simulates everything locally. No real API calls.

**Q: Will demo mode work without internet?**  
A: Yes! It's completely local simulation.

**Q: When should I add real keys?**  
A: Add them when you want to test actual payment flow with test cards.

**Q: Can I test without Razorpay account?**  
A: Yes! Demo mode lets you see the entire flow. But you'll need an account for real testing.

---

## ✅ Checklist

Before adding real keys:
- [ ] I understand test mode vs live mode
- [ ] I have a Razorpay account
- [ ] I'm in test mode on dashboard
- [ ] I've generated test keys
- [ ] I've copied both Key ID and Secret
- [ ] I know where my `.env` file is

After adding real keys:
- [ ] Updated `.env` file
- [ ] Saved the file
- [ ] Restarted both servers
- [ ] Terminal shows "Razorpay initialized"
- [ ] Tested with test card 4111 1111 1111 1111

---

## 🎓 For Your Learning

### Current Demo Mode Shows You:

1. **Form handling** - How to collect user data
2. **API communication** - Frontend to backend calls
3. **Database integration** - Saving to Supabase
4. **State management** - React state for payment flow
5. **Error handling** - Try/catch, user feedback
6. **UI/UX patterns** - Loading states, success/error screens

### With Real Keys You'll Learn:

7. **Payment gateway integration** - Razorpay SDK
8. **Security** - Signature verification
9. **Webhooks** - Server-side notifications
10. **Production patterns** - Real-world payment flow

---

**Take your time! Demo mode is perfect for understanding the architecture first.** 🚀

When you're ready, add your test keys and experience the real integration!
