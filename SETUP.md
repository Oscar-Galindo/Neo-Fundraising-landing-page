# Nexus Starter - Setup Guide

## Complete Church/Business Website Starter Kit

This starter kit provides everything you need to launch a modern website for churches or small businesses with CMS integration, forms, donations, and more.

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Copy environment variables
cp .env.example .env

# Run development server
npm run dev
```

## 📦 What's Included

### Core Stack
- **Astro v5** - Static site generator with React islands
- **TypeScript** - Type safety throughout
- **UnoCSS** - Atomic CSS (Tailwind alternative)
- **React 18** - For interactive components

### Integrations
- **Contentful CMS** - Content management
- **Cloudinary Fetch Mode** - Automatic image optimization
- **GoHighLevel** - CRM, forms, automation
- **Church Online Platform** - Live streaming (churches)
- **Tithely** - Donations (churches)

### Features
- ✅ Page builder approach with Contentful
- ✅ Automatic image optimization via Cloudinary
- ✅ Form handling via GHL
- ✅ Event management
- ✅ Blog/News section
- ✅ Team/Staff pages
- ✅ Service times (churches)
- ✅ Online giving (churches)
- ✅ Live streaming (churches)
- ✅ SEO optimized
- ✅ Mobile responsive

## 🔧 Configuration Steps

### 1. Contentful Setup

1. Create a free Contentful account at [contentful.com](https://contentful.com)
2. Create a new space
3. Go to Settings → API Keys
4. Create a new API key and copy:
   - Space ID → `CONTENTFUL_SPACE_ID`
   - Content Delivery API Token → `CONTENTFUL_ACCESS_TOKEN`
   - Content Preview API Token → `CONTENTFUL_PREVIEW_TOKEN`

### 2. Contentful Content Models

Create these content types in Contentful:

#### Hero Section
- `title` (Text, Required)
- `subtitle` (Text)
- `description` (Text, Long)
- `backgroundImage` (Media)
- `primaryCTA` (Object with `label`, `href`, `openInNewTab`)
- `secondaryCTA` (Object with `label`, `href`, `openInNewTab`)
- `variant` (Dropdown: center, left, right)
- `height` (Dropdown: full, large, medium)

#### Page
- `title` (Text, Required)
- `slug` (Text, Required, Unique)
- `sections` (References, Many)
- `seo` (Object with meta fields)

#### Event
- `title` (Text, Required)
- `date` (Date & Time, Required)
- `endDate` (Date & Time)
- `description` (Rich Text)
- `location` (Text)
- `image` (Media)
- `registrationUrl` (URL)
- `category` (Tags)
- `isFeatured` (Boolean)

#### Team Member
- `name` (Text, Required)
- `role` (Text, Required)
- `bio` (Rich Text)
- `image` (Media)
- `email` (Email)
- `phone` (Text)
- `order` (Number)

#### Blog Post
- `title` (Text, Required)
- `slug` (Text, Required, Unique)
- `excerpt` (Text, Long)
- `content` (Rich Text, Required)
- `featuredImage` (Media)
- `author` (Reference to Team Member)
- `publishDate` (Date, Required)
- `category` (Tags)
- `tags` (Tags)

### 3. Cloudinary Setup

1. Create a free account at [cloudinary.com](https://cloudinary.com)
2. From your dashboard, copy:
   - Cloud Name → `CLOUDINARY_CLOUD_NAME`

That's it! Fetch mode works without API keys.

### 4. GoHighLevel Setup

1. Get your GHL API key from Settings → Business Profile → API Key
2. Get your Location ID from Settings → Business Profile
3. Add to .env:
   - `GHL_API_KEY`
   - `GHL_LOCATION_ID`

### 5. Church-Specific Setup (Optional)

#### Church Online Platform
1. Sign up at [online.church](https://online.church)
2. Get your Church ID → `CHURCH_ONLINE_ID`

#### Tithely
1. Sign up at [tithe.ly](https://tithe.ly)
2. Get your Church ID → `TITHELY_CHURCH_ID`

### 6. Site Configuration

Update `.env` with your site details:
```env
SITE_URL=https://yourdomain.com
SITE_NAME="Your Church/Business Name"
SITE_TYPE=church # or 'business'
```

## 📝 Content Management Workflow

### For Churches:
1. **Home Page**: Hero, Service Times, Upcoming Events, Latest Sermons
2. **About**: Beliefs, Vision, Leadership Team
3. **Connect**: Small Groups, Ministries, Volunteer
4. **Events**: Calendar, Registration via GHL
5. **Give**: Tithely integration
6. **Watch**: Live stream, Sermon Archive

### For Businesses:
1. **Home Page**: Hero, Services, Testimonials, CTA
2. **About**: Company Story, Team, Values
3. **Services**: Service Offerings, Pricing
4. **Portfolio/Work**: Case Studies, Gallery
5. **Blog**: Industry Insights, Company News
6. **Contact**: Contact Form via GHL, Location

## 🎨 Customization

### Styling
Edit `uno.config.ts` to customize:
- Colors
- Fonts
- Spacing
- Custom shortcuts

### Components
All components are in `src/components/`:
- `sections/` - Page sections (Hero, Features, etc.)
- `ui/` - Reusable UI elements
- `forms/` - Form components connected to GHL

## 🚀 Deployment

### Vercel (Recommended)
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

### Environment Variables
Add all `.env` variables to your Vercel project settings.

## 💰 Pricing Structure

### For Selling This Starter:
- **Setup Fee**: $3,497 - $4,997
- **Monthly Maintenance**: $397/month
  - Includes 2 hours support
  - Hosting management
  - Content updates
  - Security monitoring

### Platform Costs:
- **Contentful**: Free (up to 10 users, 100K API calls)
- **Cloudinary**: Free (25GB bandwidth)
- **GHL**: $297/month (full platform)
- **Vercel**: Free (small sites) or $20/month (Pro)

## 📚 Resources

- [Astro Docs](https://docs.astro.build)
- [Contentful Docs](https://www.contentful.com/developers/docs/)
- [GHL API Docs](https://highlevel.stoplight.io)
- [UnoCSS Docs](https://unocss.dev)

## 🤝 Support

For issues or questions about this starter kit, contact your developer or refer to the documentation above.