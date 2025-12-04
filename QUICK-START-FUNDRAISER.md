# 🚀 Quick Start - Fundraiser Landing Page

Get your fundraiser page up and running in 30 minutes!

## ⚡ Fast Track (TL;DR)

```bash
# 1. Install dependencies
npm install

# 2. Set up environment
cp .env.fundraiser.example .env

# 3. Edit .env with your Contentful keys
nano .env

# 4. Start development server
npm run dev

# 5. Visit http://localhost:4321/fundraiser
```

---

## 📋 Step-by-Step Setup

### Step 1: Get Contentful API Keys (5 minutes)

1. Go to [contentful.com](https://contentful.com) → Sign up (free!)
2. Create a new Space (name it anything)
3. Go to **Settings** → **API Keys** → **Add API Key**
4. Copy these three values:
   - **Space ID**
   - **Content Delivery API access token**
   - **Content Preview API access token**

### Step 2: Configure Environment (2 minutes)

```bash
# Copy the template
cp .env.fundraiser.example .env

# Edit the file
nano .env
# or use your favorite editor
```

Add your Contentful keys:
```env
CONTENTFUL_SPACE_ID=abc123xyz
PUBLIC_CONTENTFUL_ACCESS_TOKEN=your_delivery_token
CONTENTFUL_PREVIEW_TOKEN=your_preview_token
```

### Step 3: Create Content Models in Contentful (10 minutes)

In Contentful, create three content types. Full details in `FUNDRAISER-SETUP.md`, but here's the quick version:

#### Content Type 1: Fundraiser Settings
- Name: `Fundraiser Settings`
- API ID: `fundraiserSettings`
- Fields:
  - Fundraiser Name (text) *required*
  - Goal Amount (number) *required*
  - Current Amount (number) *required*
  - Primary Donation URL (text) *required*
  - Donor Count (number)
  - End Date (date)
  - Contact Email (text)

#### Content Type 2: Fundraiser Content
- Name: `Fundraiser Content`
- API ID: `fundraiserContent`
- Fields:
  - Section Name (text, dropdown) *required*
  - Headline (text)
  - Subheadline (text)
  - Description (text)
  - Items (JSON object)
  - Image (media)
  - CTA Text (text)
  - CTA URL (text)

**Section Name options**: hero, story, goal, milestones, impact, faq

#### Content Type 3: Fundraiser Update
- Name: `Fundraiser Update`
- API ID: `fundraiserUpdate`
- Fields:
  - Title (text) *required*
  - Date (date) *required*
  - Content (text) *required*
  - Image (media)

### Step 4: Add Your First Content (10 minutes)

In Contentful, go to **Content** → **Add entry**:

#### Create: Fundraiser Settings
```
Fundraiser Name: Help [Name] Reach [Goal]
Goal Amount: 5000
Current Amount: 0
Donor Count: 0
Primary Donation URL: https://gofundme.com/your-link
Contact Email: your@email.com
```
**Click Publish!**

#### Create: Hero Section
```
Section Name: hero
Headline: Help [Name] Achieve Their Dream
Subheadline: Every donation brings us closer to our goal
CTA Text: Donate Now
Upload an image
```
**Click Publish!**

#### Create: Story Section
```
Section Name: story
Headline: Our Story
Description: Write your fundraiser story here...
Upload an image
```
**Click Publish!**

### Step 5: Start Your Site (2 minutes)

```bash
# Install dependencies (first time only)
npm install

# Start development server
npm run dev

# Open in browser
open http://localhost:4321/fundraiser
```

🎉 **You should see your fundraiser page!**

---

## 🎨 Make It Your Homepage (Optional)

Want the fundraiser at the root URL (`/` instead of `/fundraiser`)?

```bash
mv src/pages/index.astro src/pages/index-backup.astro
mv src/pages/fundraiser.astro src/pages/index.astro
```

Now your fundraiser is at `http://localhost:4321/`

---

## 📝 Updating Your Fundraiser

### Update Amount Raised
1. Go to Contentful
2. Find **Fundraiser Settings** entry
3. Edit **Current Amount** and **Donor Count**
4. Click **Publish**
5. Refresh your website!

### Post an Update
1. Go to Contentful → **Content** → **Add entry** → **Fundraiser Update**
2. Fill in:
   - Title: "We hit 50% of our goal!"
   - Date: Today
   - Content: "Thank you to everyone..."
3. **Publish**

---

## 🚀 Deploy Your Site (Pick One)

### Option A: Vercel (Recommended - 5 minutes)

1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Click **New Project** → Import your repo
4. Add environment variables from your `.env` file
5. Deploy!

Your site will be live at `https://your-project.vercel.app`

### Option B: Netlify (Alternative - 5 minutes)

1. Push to GitHub
2. Go to [netlify.com](https://netlify.com)
3. **Add new site** → Import from GitHub
4. Add environment variables
5. Deploy!

### Auto-Updates (Optional)

Want your site to rebuild when you update Contentful?

1. In Vercel/Netlify: **Settings** → **Build Hooks** → Create hook
2. Copy the URL
3. In Contentful: **Settings** → **Webhooks** → Add webhook
4. Paste URL, select "Publish" and "Unpublish" events
5. Save!

Now your site auto-rebuilds when you publish changes! 🎉

---

## 🆘 Troubleshooting

**"Content not showing"**
- Make sure all entries are **Published** in Contentful (not just saved)
- Check that API keys in `.env` are correct
- Restart dev server: `Ctrl+C` then `npm run dev`

**"CONTENTFUL_SPACE_ID not found"**
- Make sure `.env` file exists in project root
- Restart dev server after editing `.env`

**"Images not loading"**
- Images must be published in Contentful
- Check that image field is properly linked

---

## 📚 Next Steps

- **Customize colors**: Edit `uno.config.ts`
- **Add more sections**: Follow examples in `FUNDRAISER-SETUP.md`
- **Set up donation platform**: GoFundMe, PayPal, etc.
- **Share on social media**: Add Open Graph images in Contentful

---

## 📖 Full Documentation

- `FUNDRAISER-SETUP.md` - Complete setup guide with examples
- `contentful-fundraiser-model.json` - Full content model reference
- `REMOVE-GHL-GUIDE.md` - Clean up GHL dependencies (optional)

---

**Need Help?**

Check the documentation files or review the example content in `contentful-fundraiser-model.json`

**Good luck with your fundraiser! 🎉**

You've got this! Remember to:
- Update the raised amount regularly
- Post updates to keep donors engaged
- Share widely on social media
- Thank your donors!

