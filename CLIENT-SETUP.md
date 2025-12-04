# Nexus Starter Kit - Client Setup Guide

Welcome! This guide will walk you through setting up your Nexus Starter Kit website in just a few minutes.

## Table of Contents

1. [Quick Start (5 minutes)](#quick-start)
2. [System Requirements](#system-requirements)
3. [Detailed Setup](#detailed-setup)
4. [Configuration](#configuration)
5. [Common Issues](#common-issues)
6. [Support](#support)

---

## Quick Start

The fastest way to get started:

```bash
# 1. Clone the repository (already done if you're reading this)
# 2. Run the automated setup script
./setup-client.sh

# 3. Edit your configuration
nano .env

# 4. Start developing
npm run dev
```

That's it! Your site will be available at `http://localhost:3000`

---

## System Requirements

- **Node.js** 18.0 or higher ([Download](https://nodejs.org/))
- **npm** 9.0 or higher (comes with Node.js)
- **Git** (for version control)
- A text editor (VS Code, Sublime Text, etc.)

To check your versions:
```bash
node --version
npm --version
git --version
```

---

## Detailed Setup

### Step 1: Install Dependencies

```bash
npm install
```

This installs all required packages including:
- **Astro** - Static site generator
- **React** - Interactive components
- **Contentful** - Headless CMS
- **UnoCSS** - Styling engine
- **Radix UI** - Component library

### Step 2: Set Up Environment Variables

Copy the template and fill in your values:

```bash
cp .env.example .env
```

Open `.env` and add your API keys:

```bash
nano .env
# or
code .env
# or open it in your favorite editor
```

### Step 3: Configure Your Site Details

In your `.env` file, update these settings:

```env
# Your site information
SITE_NAME=Your Business Name
SITE_URL=https://yourdomain.com
SITE_DOMAIN=yourdomain.com
SITE_TYPE=business  # or "church"
```

---

## Configuration

### 1. Contentful Setup (CMS)

Your content management system:

1. Go to [contentful.com](https://contentful.com) and create an account
2. Create a new space
3. Get your API keys: **Settings → API Keys**
4. Add to `.env`:

```env
CONTENTFUL_SPACE_ID=your_space_id
PUBLIC_CONTENTFUL_ACCESS_TOKEN=your_delivery_token
CONTENTFUL_PREVIEW_TOKEN=your_preview_token
```

5. Follow the instructions in `contentful-setup.md` to set up your content models
6. Create your first content in the Contentful web interface

### 2. Cloudinary Setup (Image Optimization)

For optimized images and CDN:

1. Go to [cloudinary.com](https://cloudinary.com) and create an account
2. Go to **Dashboard → Settings**
3. Copy your Cloud Name
4. Add to `.env`:

```env
PUBLIC_CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_CLOUD_NAME=your_cloud_name
```

### 3. GoHighLevel Setup (CRM)

For contact management and forms:

1. Go to your GoHighLevel dashboard
2. Go to **Settings → Integrations**
3. Find your API Key and Location ID
4. Add to `.env`:

```env
GHL_API_KEY=your_api_key
GHL_LOCATION_ID=your_location_id
```

See `docs/ghl-integration.md` for detailed integration steps.

### 4. License Configuration

If using the commercial Nexus Starter Kit:

```env
NEXUS_LICENSE_KEY=your_license_key
NEXUS_AGENCY_ID=your_agency_id
NEXUS_SECRET=your_secret
```

---

## Project Structure

```
nexus-starter/
├── src/
│   ├── pages/           # Website pages & routes
│   ├── components/      # Reusable React/Astro components
│   ├── layouts/         # Page templates
│   ├── lib/
│   │   ├── api/        # API integrations
│   │   └── config/     # Configuration files
│   └── styles/         # Global styles
├── public/             # Static assets
├── .env.example        # Environment variable template
├── .env                # Your actual configuration (not committed)
├── package.json        # Project dependencies
└── astro.config.mjs    # Astro configuration
```

---

## Commands

### Development

```bash
# Start development server with hot reload
npm run dev
```

Opens at `http://localhost:3000` by default

### Production

```bash
# Build for production
npm run build

# Preview production build locally
npm run preview
```

### Other Commands

```bash
# Run Astro CLI directly
npm run astro -- [command]

# Validate commercial license
npm run validate-license

# Build with license protection
npm run build:protected
```

---

## Common Issues

### Issue: "Port 3000 already in use"

**Solution:**
```bash
# Kill the process using port 3000
lsof -i :3000
kill -9 <PID>

# Or use a different port
npm run dev -- --port 3001
```

### Issue: "Cannot find module 'contentful'"

**Solution:**
```bash
# Reinstall dependencies
rm node_modules package-lock.json
npm install
```

### Issue: ".env file not found"

**Solution:**
```bash
cp .env.example .env
# Then edit .env with your API keys
```

### Issue: "CONTENTFUL_SPACE_ID is missing"

**Solution:**
1. Make sure `.env` file exists in the project root
2. Check that `CONTENTFUL_SPACE_ID` is set
3. Verify there are no extra spaces in the variable name

### Issue: Styles not showing up

**Solution:**
1. Clear build cache: `rm -rf .astro dist`
2. Rebuild: `npm run build`
3. Check that UnoCSS is configured in `uno.config.ts`

---

## Next Steps

Once setup is complete:

1. **Review the documentation:**
   - `SETUP.md` - Full configuration guide
   - `contentful-setup.md` - CMS content models
   - `docs/ghl-integration.md` - CRM integration
   - `DEPLOYMENT.md` - Deployment guide

2. **Create your content:**
   - Add content in Contentful CMS
   - Use the dashboard to manage pages, blog posts, etc.

3. **Customize your site:**
   - Edit components in `src/components/`
   - Update styles in `uno.config.ts`
   - Modify layouts in `src/layouts/`

4. **Deploy:**
   - See `DEPLOYMENT.md` for hosting options
   - Popular choices: Vercel, Netlify, AWS Amplify

---

## Environment Variables Reference

### Contentful

- `CONTENTFUL_SPACE_ID` - Your Contentful space ID
- `PUBLIC_CONTENTFUL_ACCESS_TOKEN` - Content Delivery API token
- `CONTENTFUL_ACCESS_TOKEN` - Content Management API token
- `CONTENTFUL_PREVIEW_TOKEN` - Preview API token
- `CONTENTFUL_ENVIRONMENT` - Environment name (default: master)

### Cloudinary

- `PUBLIC_CLOUDINARY_CLOUD_NAME` - Your Cloudinary cloud name

### GoHighLevel

- `GHL_API_KEY` - API key for GoHighLevel
- `GHL_LOCATION_ID` - Your GoHighLevel location ID

### Site Configuration

- `SITE_NAME` - Display name for your site
- `SITE_URL` - Full URL (used for SEO)
- `SITE_TYPE` - 'business' or 'church'
- `SITE_DOMAIN` - Domain name

### Licensing

- `NEXUS_LICENSE_KEY` - Commercial license key
- `NEXUS_AGENCY_ID` - Your agency ID
- `NEXUS_SECRET` - Security secret

---

## Getting Help

- 📖 **Documentation:** See `/docs` folder
- 🐛 **Issues:** Check the GitHub issues page
- 💬 **Support:** Contact support@nexus-starter.com
- 🌐 **Web:** https://nexus-starter.com

---

## Security Notes

⚠️ **Important:**

- Never commit `.env` to version control
- Never share your API keys
- Rotate keys if compromised
- Keep dependencies updated: `npm update`
- Use environment variable validation in production

---

**Happy building! 🚀**
