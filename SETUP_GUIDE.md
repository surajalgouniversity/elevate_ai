# AlgoUniversity Landing Page - Setup Guide

## 🚀 Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Set Up Supabase (Required for Application Form)

#### Option A: Create Your Own Supabase Project
1. Go to [supabase.com](https://supabase.com) and sign up/login
2. Create a new project
3. Wait for the project to finish setting up (2-3 minutes)
4. Go to **Project Settings** → **API**
5. Copy the following:
   - **Project URL** (looks like: `https://xxxxx.supabase.co`)
   - **anon public key** (long string starting with `eyJ...`)
6. Update `.env` file with your credentials:
   ```
   VITE_SUPABASE_URL=https://your-project.supabase.co
   VITE_SUPABASE_ANON_KEY=your_anon_key_here
   ```

7. Create the database table:
   - Go to **SQL Editor** in Supabase dashboard
   - Copy the contents of `supabase/migrations/20251202145301_create_applications_table.sql`
   - Paste and run it in the SQL Editor

#### Option B: Run Without Database (Form won't work)
If you just want to see the design without database functionality:
1. Keep the `.env` file with placeholder values
2. The application form will display but won't save data

### 3. Run the Development Server
```bash
npm run dev
```

The site will open at `http://localhost:5173` (or another port if 5173 is busy)

## 📋 Available Commands

- `npm run dev` - Start development server
- `npm run build` - Build for production  
- `npm run preview` - Preview production build locally
- `npm run lint` - Run ESLint
- `npm run typecheck` - Check TypeScript types

## 🛠 Tech Stack

- **React 18** - UI framework
- **TypeScript** - Type safety
- **Vite** - Build tool & dev server
- **Tailwind CSS** - Styling
- **GSAP** - Animations
- **Supabase** - Backend & database
- **Lucide React** - Icons

## 🔧 Troubleshooting

### Issue: "Nothing loads in the browser"
**Solution:** Make sure you have the `.env` file set up. Even if you don't have real Supabase credentials, create the file with placeholder values.

### Issue: "Port already in use"
**Solution:** Vite will automatically use the next available port (5174, 5175, etc.). Check the terminal output for the actual URL.

### Issue: "Application form doesn't work"
**Solution:** You need to set up Supabase properly (see Option A above).

### Issue: Outdated browserslist warning
**Solution:** Run `npx update-browserslist-db@latest`

## 📁 Project Structure

```
├── src/
│   ├── components/       # React components
│   ├── hooks/           # Custom React hooks (GSAP animations)
│   ├── lib/             # Utilities (Supabase client)
│   ├── App.tsx          # Main app component
│   └── main.tsx         # Entry point
├── supabase/
│   └── migrations/      # Database schema
├── public/              # Static assets
└── .env                 # Environment variables (YOU NEED TO CREATE THIS)
```

## 🎨 Customization

### Change Colors
Edit `tailwind.config.js` and your component styles

### Change Content
Edit the component files in `src/components/`

### Add More Features
The codebase is well-structured and uses TypeScript for safety

## 📦 Deployment

### Deploy to Vercel (Recommended)
1. Push code to GitHub
2. Import project in Vercel
3. Add environment variables in Vercel dashboard
4. Deploy!

### Deploy to Netlify
1. Push code to GitHub
2. Import project in Netlify
3. Build command: `npm run build`
4. Publish directory: `dist`
5. Add environment variables in Netlify dashboard

## 💡 Making Your Own Replica

1. **Fork or clone this project**
2. **Update content** in component files
3. **Set up your own Supabase project** (follow Option A)
4. **Customize styling** in Tailwind classes
5. **Change branding** - update title, meta tags in `index.html`
6. **Deploy** to your hosting platform

## 🔐 Environment Variables

Required variables in `.env`:
- `VITE_SUPABASE_URL` - Your Supabase project URL
- `VITE_SUPABASE_ANON_KEY` - Your Supabase anonymous key

## 📞 Need Help?

- Check the browser console for errors (F12)
- Check the terminal for server errors
- Ensure all dependencies are installed: `npm install`
- Make sure Node.js version is 16 or higher: `node --version`
