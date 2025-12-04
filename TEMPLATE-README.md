# 🚀 Nexus Starter Kit - Your New Website

Welcome to your professional, high-performance website builder! This template gives you everything you need to launch a stunning website in minutes.

## ⚡ Quick Start (Choose One)

### Option 1: Automated Setup (Recommended)
```bash
./setup-client.sh
```

### Option 2: Manual Setup
```bash
# Install dependencies
npm install

# Create configuration file
cp .env.example .env

# Edit your config
nano .env

# Start developing
npm run dev
```

Then open [http://localhost:3000](http://localhost:3000)

## 📋 What's Included

✅ **Astro + React** - Lightning-fast static site with interactive components  
✅ **Contentful CMS** - Manage all your content without coding  
✅ **Responsive Design** - Beautiful on all devices  
✅ **SEO Optimized** - Built-in best practices  
✅ **Image Optimization** - Via Cloudinary CDN  
✅ **Form Integration** - GoHighLevel CRM support  
✅ **Radix UI** - Professional component library  

## 🎯 First Steps

1. **Run the setup script** (see Quick Start above)
2. **Fill in your API keys** in the `.env` file
3. **Create your content** in Contentful CMS
4. **View your site** at http://localhost:3000
5. **Deploy** when ready!

## 📚 Documentation

- **`CLIENT-SETUP.md`** ← Start here for detailed setup instructions
- **`SETUP.md`** - Full configuration guide
- **`contentful-setup.md`** - CMS content model setup
- **`docs/ghl-integration.md`** - GoHighLevel CRM integration
- **`DEPLOYMENT.md`** - How to go live

## 🔑 You'll Need These API Keys

Get them from:
1. **Contentful** → https://app.contentful.com/spaces  
2. **Cloudinary** → https://cloudinary.com/console  
3. **GoHighLevel** → Your GHL dashboard  

Add them to `.env` file (see `CLIENT-SETUP.md`)

## 📦 Available Commands

```bash
npm run dev       # Start development server
npm run build     # Create production build
npm run preview   # Preview production build
npm run astro     # Run Astro CLI
```

## 🤔 Getting Help

- 📖 See the **CLIENT-SETUP.md** for common questions
- 🐛 Check **SETUP.md** for troubleshooting
- 📧 Contact support if stuck

## 🎨 Customization

Your site is fully customizable:
- Modify components in `src/components/`
- Edit layouts in `src/layouts/`
- Update styles in `uno.config.ts`
- Manage content in Contentful CMS

## 🚀 Ready to Deploy?

See **DEPLOYMENT.md** for hosting on:
- Vercel (recommended)
- Netlify
- AWS Amplify
- Any static hosting

## 📄 Project Structure

```
.
├── src/
│   ├── components/    # React & Astro components
│   ├── pages/         # Website pages
│   ├── layouts/       # Page templates
│   ├── lib/          # APIs & utilities
│   └── styles/       # Global styles
├── public/           # Static assets
├── .env.example      # Environment variables template
├── package.json      # Project metadata
└── README.md         # This file
```

## ⚙️ Tech Stack

- **Framework:** Astro v5
- **Styling:** UnoCSS
- **CMS:** Contentful
- **Components:** React + Radix UI
- **Images:** Cloudinary
- **CRM:** GoHighLevel
- **Hosting:** Any static host (Vercel, Netlify, AWS, etc.)

## 🎓 Learning Resources

- [Astro Docs](https://docs.astro.build/)
- [React Docs](https://react.dev/)
- [Contentful Docs](https://www.contentful.com/developers/)
- [UnoCSS Docs](https://unocss.dev/)

---

**Ready?** Let's go! 🎉

```bash
./setup-client.sh
```

Questions? Check `CLIENT-SETUP.md` or see `SETUP.md` for detailed instructions.
