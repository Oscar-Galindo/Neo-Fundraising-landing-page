# 🎯 Fundraiser Landing Page Setup Guide

This guide will help you set up a beautiful fundraiser landing page for your son's campaign using Contentful for easy content management.

---

## 📋 Quick Start Checklist

- [ ] Set up Contentful account
- [ ] Create content models in Contentful
- [ ] Configure environment variables
- [ ] Add your fundraiser content
- [ ] Set up donation platform (GoFundMe, PayPal, etc.)
- [ ] Test the site
- [ ] Deploy to production

---

## 1️⃣ Contentful Setup

### Step 1: Create Contentful Account

1. Go to [contentful.com](https://contentful.com) and sign up (free plan works great!)
2. Create a new space - name it something like "My Fundraiser"
3. Get your API credentials:
   - Go to **Settings → API Keys → Add API Key**
   - Copy these values:
     - **Space ID**
     - **Content Delivery API - access token**
     - **Content Preview API - access token**

### Step 2: Create Content Models

In Contentful, go to **Content Model** and create these three content types:

#### A. Fundraiser Settings

Click **Add Content Type**
- **Name**: `Fundraiser Settings`
- **Api Identifier**: `fundraiserSettings`

Add these fields (click **Add field** for each):

| Field Name | Type | Field ID | Required | Notes |
|------------|------|----------|----------|-------|
| Fundraiser Name | Short text | fundraiserName | Yes | Main title of your fundraiser |
| Organizer Name | Short text | organizerName | No | Who's running it |
| Goal Amount | Number, Integer | goalAmount | Yes | Your fundraising goal |
| Current Amount | Number, Integer | currentAmount | Yes | Amount raised so far (update regularly!) |
| Donor Count | Number, Integer | donorCount | No | Number of people who donated |
| End Date | Date | endDate | No | When does fundraiser end |
| Primary Donation URL | Short text | primaryDonationUrl | Yes | GoFundMe, PayPal link, etc. |
| Contact Email | Short text | contactEmail | No | Contact email |
| Social Links | JSON object | socialLinks | No | Your social media links |
| Brand Colors | JSON object | brandColors | No | Custom colors |

**Set Display Field**: Click Settings (gear icon) → Entry title → Select "fundraiserName"

#### B. Fundraiser Content

Click **Add Content Type**
- **Name**: `Fundraiser Content`
- **Api Identifier**: `fundraiserContent`

Add these fields:

| Field Name | Type | Field ID | Required | Validations |
|------------|------|----------|----------|-------------|
| Section Name | Short text, Dropdown | sectionName | Yes | Options: hero, story, goal, milestones, impact, updates, faq, contact |
| Headline | Short text | headline | No | Max 200 chars |
| Subheadline | Long text | subheadline | No | Max 500 chars |
| Description | Long text | description | No | Main body text |
| Items | JSON object | items | No | For lists/arrays |
| Image | Media, One file | image | No | Accept images only |
| CTA Text | Short text | ctaText | No | Button text |
| CTA URL | Short text | ctaUrl | No | Button link |

**For Section Name dropdown**:
- Click on the field → Validations → Accept only specified values
- Add: `hero`, `story`, `goal`, `milestones`, `impact`, `updates`, `faq`, `contact`

**Set Display Field**: sectionName

#### C. Fundraiser Update

Click **Add Content Type**
- **Name**: `Fundraiser Update`  
- **Api Identifier**: `fundraiserUpdate`

Add these fields:

| Field Name | Type | Field ID | Required |
|------------|------|----------|----------|
| Title | Short text | title | Yes |
| Date | Date & time | date | Yes |
| Content | Long text | content | Yes |
| Image | Media | image | No |
| Pin to Top | Boolean | isImportant | No |

**Set Display Field**: title

---

## 2️⃣ Add Your Fundraiser Content

### Create Fundraiser Settings Entry

1. Go to **Content** → **Add entry** → **Fundraiser Settings**
2. Fill in your details:

```
Fundraiser Name: Help John Reach Nationals
Organizer Name: The Smith Family
Goal Amount: 5000
Current Amount: 0 (update this as donations come in!)
Donor Count: 0
End Date: 2025-06-30
Primary Donation URL: https://gofundme.com/your-campaign-link
Contact Email: yourfamily@email.com
Social Links:
{
  "facebook": "https://facebook.com/yourpage",
  "instagram": "https://instagram.com/youraccount"
}
```

3. Click **Publish**

### Create Content Sections

For each section below, go to **Content** → **Add entry** → **Fundraiser Content**

#### Hero Section
```
Section Name: hero
Headline: Help [Name] Achieve Their Dream
Subheadline: Every contribution brings us one step closer to making this possible
CTA Text: Donate Now
CTA URL: [your GoFundMe link]
Image: [Upload a great photo]
```

#### Story Section
```
Section Name: story
Headline: Our Story
Description: 
[Your son's name] has worked incredibly hard to earn this opportunity. 
[Explain what the fundraiser is for - sports team, mission trip, education, medical, etc.]
This is a once-in-a-lifetime chance that will help them [explain the impact].

Your support will not only help cover costs but will also show [him/her] that 
dreams are achievable with hard work and community support.
Image: [Upload a relevant photo]
```

#### Goal Breakdown Section
```
Section Name: goal
Headline: What We're Raising Money For
Items:
[
  {
    "title": "Travel Expenses",
    "amount": 2000,
    "description": "Flights and transportation"
  },
  {
    "title": "Accommodation",
    "amount": 1500,
    "description": "Hotel during the event"
  },
  {
    "title": "Equipment",
    "amount": 800,
    "description": "Necessary gear and supplies"
  },
  {
    "title": "Program Fees",
    "amount": 700,
    "description": "Registration costs"
  }
]
```

#### Milestones Section
```
Section Name: milestones
Headline: Our Progress Milestones
Items:
[
  {
    "percentage": 25,
    "title": "First Milestone",
    "description": "Cover registration fees"
  },
  {
    "percentage": 50,
    "title": "Halfway There!",
    "description": "Secure travel arrangements"
  },
  {
    "percentage": 75,
    "title": "Almost Done",
    "description": "Purchase equipment"
  },
  {
    "percentage": 100,
    "title": "Goal Reached!",
    "description": "Everything is covered!"
  }
]
```

#### Impact Section
```
Section Name: impact
Headline: How Your Donation Helps
Items:
[
  {
    "amount": "$25",
    "impact": "Covers meals for one day"
  },
  {
    "amount": "$50",
    "impact": "Helps with equipment costs"
  },
  {
    "amount": "$100",
    "impact": "Supports transportation"
  },
  {
    "amount": "$250+",
    "impact": "Major impact on our goal!"
  }
]
```

#### FAQ Section
```
Section Name: faq
Headline: Frequently Asked Questions
Items:
[
  {
    "question": "How can I donate?",
    "answer": "Click any 'Donate Now' button to be taken to our secure donation page."
  },
  {
    "question": "Is my donation tax-deductible?",
    "answer": "Please consult with your tax advisor regarding deductibility."
  },
  {
    "question": "What if you exceed your goal?",
    "answer": "Any additional funds will go towards future expenses and opportunities."
  }
]
```

**Remember to PUBLISH each entry!**

---

## 3️⃣ Environment Variables Setup

Create a `.env` file in your project root:

```bash
# Contentful API Keys
CONTENTFUL_SPACE_ID=your_space_id_here
PUBLIC_CONTENTFUL_ACCESS_TOKEN=your_delivery_token_here
CONTENTFUL_PREVIEW_TOKEN=your_preview_token_here
CONTENTFUL_ENVIRONMENT=master

# Site Information
SITE_NAME="Your Fundraiser Name"
SITE_URL=https://yoursite.com
SITE_TYPE=fundraiser

# Optional: Cloudinary for image optimization
PUBLIC_CLOUDINARY_CLOUD_NAME=your_cloudinary_name
```

---

## 4️⃣ Test Your Site

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Open http://localhost:4321 in your browser
```

Your fundraiser page should now load with all your Contentful content!

---

## 5️⃣ Updating Your Fundraiser

### Update Amount Raised

1. Go to Contentful → Content
2. Find your **Fundraiser Settings** entry
3. Edit **Current Amount** field
4. Update **Donor Count** if needed
5. Click **Publish**
6. Your site will update automatically!

### Post Updates

1. Go to Content → Add entry → Fundraiser Update
2. Add your update:
   - Title: "We reached 50% of our goal!"
   - Date: Today
   - Content: "Thanks to everyone who donated..."
   - Add a photo if you want
3. Publish

---

## 6️⃣ Deployment Options

### Option A: Vercel (Easiest)

1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Click "New Project"
4. Import your GitHub repository
5. Add your environment variables
6. Deploy!

### Option B: Netlify

1. Push to GitHub
2. Go to [netlify.com](https://netlify.com)
3. Click "Add new site" → "Import an existing project"
4. Connect to GitHub
5. Add environment variables
6. Deploy!

### Set Up Webhooks (Optional)

To auto-rebuild when you update Contentful:

1. In Vercel/Netlify, go to Settings → Build Hooks
2. Create a new build hook, copy the URL
3. In Contentful, go to Settings → Webhooks
4. Add new webhook, paste the URL
5. Select "Publish" and "Unpublish" events
6. Save!

Now your site automatically updates when you change content in Contentful!

---

## 🎨 Customization Tips

### Change Colors

Edit `uno.config.ts`:

```typescript
brand: {
  accentBlue: '#YOUR_COLOR',    // Main accent color
  accentOrange: '#YOUR_COLOR',  // Secondary color
  accentRed: '#YOUR_COLOR',     // Highlight color
}
```

### Add Team Colors

If it's for a sports team, match their colors!

---

## 💡 Tips for Success

1. **Update regularly** - Keep the "Current Amount" field updated in Contentful
2. **Share updates** - Post Fundraiser Updates to keep donors engaged
3. **Great photos** - Use high-quality, compelling images
4. **Tell the story** - Make it personal and heartfelt
5. **Thank donors** - Post updates thanking people
6. **Share widely** - Use social media, email, text messages
7. **Set realistic goals** - Break it down into achievable milestones

---

## 📱 Donation Platform Options

### GoFundMe (Most Popular)
- **Pros**: Easy to use, built-in social sharing, trusted brand
- **Cons**: 2.9% + $0.30 per donation fee
- **Best for**: General fundraising, medical, personal causes

### PayPal
- **Pros**: Fast setup, widely recognized
- **Cons**: Fees (2.9% + $0.30)
- **Best for**: Simple donations, international support

### Venmo
- **Pros**: Free for personal accounts, popular with younger donors
- **Cons**: Less formal, harder to track
- **Best for**: Friends and family donations

### Give Butter (Nonprofit)
- **Pros**: No fees for nonprofits
- **Cons**: Requires 501(c)(3) status
- **Best for**: Officially registered nonprofits

---

## 🆘 Need Help?

### Common Issues

**Content not showing?**
- Check that all entries are Published in Contentful
- Verify environment variables are correct
- Restart dev server after env variable changes

**Images not loading?**
- Make sure images are published in Contentful
- Check that Cloudinary is configured (optional)

**Styling issues?**
- Clear cache: `rm -rf .astro dist`
- Rebuild: `npm run build && npm run dev`

---

## 📞 Support

Check these files for more info:
- `README.md` - General project info
- `CLIENT-SETUP.md` - Technical setup details
- `contentful-fundraiser-model.json` - Full content model reference

---

**Good luck with your fundraiser! 🎉**

Remember: People give to people, not just causes. Share your story authentically and keep your community updated on progress!

