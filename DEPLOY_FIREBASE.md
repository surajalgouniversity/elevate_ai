# Firebase Hosting Deployment Guide

## Quick Deploy Steps

### 1. Install Firebase CLI (First time only)
```bash
npm install -g firebase-tools
```

### 2. Login to Firebase
```bash
firebase login
```

### 3. Initialize Firebase (Already done - skip this)
Firebase is configured for project: **algo-elevate-ai**

### 4. Build Your Project
```bash
npm run build
```

### 5. Deploy to Firebase
```bash
firebase deploy
```

---

## Important Notes

⚠️ **Backend Server (Express API):** 
Firebase Hosting only hosts static files (frontend). Your backend (`server/index.js`) needs separate hosting:

### Options for Backend:
1. **Render.com** (Free) - Recommended
2. **Railway.app** (Free tier)
3. **Heroku** (Paid)
4. **Firebase Functions** (Requires converting Express to Cloud Functions)

---

## After Deployment

### Update Backend URL
Once backend is hosted, update in your frontend `.env`:
```
VITE_API_URL=https://your-backend-url.com
```

Then rebuild and redeploy:
```bash
npm run build
firebase deploy
```

---

## Backend Deployment (Render.com - Recommended)

1. Go to https://render.com
2. Sign up with GitHub
3. Click "New +" → "Web Service"
4. Connect your GitHub repo
5. Configure:
   - **Build Command:** `cd server && npm install`
   - **Start Command:** `cd server && node index.js`
   - **Environment:** Add all variables from `server/.env`
6. Click "Create Web Service"

---

## Current Setup
- **Frontend:** Firebase Hosting (static files)
- **Backend:** Needs separate hosting (Express server)
- **Database:** Supabase (already configured)
- **Payments:** Razorpay (configured)

---

## Your Firebase Config
```javascript
Project ID: algo-elevate-ai
Auth Domain: algo-elevate-ai.firebaseapp.com
```

After deployment, your site will be at:
`https://algo-elevate-ai.web.app`
