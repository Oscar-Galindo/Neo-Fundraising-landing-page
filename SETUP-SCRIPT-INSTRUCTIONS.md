# 🤖 Automated Contentful Setup Script

This script will automatically create all fundraiser content models in Contentful!

---

## 📋 Prerequisites

### 1. Get Your Management Token

You need a **Management API Token** (different from the delivery token you already have).

1. Go to [Contentful](https://app.contentful.com)
2. Click your profile (top right)
3. Go to **Settings** → **CMA Tokens** (Content Management API Tokens)
4. Click **Generate personal access token**
5. Name it: "Fundraiser Setup"
6. Copy the token (you'll only see it once!)

---

## ⚙️ Setup

### Add the Management Token to your .env file

Open your `.env` file and add this line:

```bash
CONTENTFUL_MANAGEMENT_TOKEN=your_management_token_here
```

Your `.env` file should now look like:

```bash
# Contentful API Keys
CONTENTFUL_SPACE_ID=rpwkj4sr23ch
PUBLIC_CONTENTFUL_ACCESS_TOKEN=ZHxmtSN-wWT7z1tXy6Hod0XttZNJC_JkwmGq65AClVw
CONTENTFUL_PREVIEW_TOKEN=E9sQb6CdDqWFgQiMydUTUxnOHtfHc3JOZASQiL_YQGA
CONTENTFUL_MANAGEMENT_TOKEN=YOUR_MANAGEMENT_TOKEN_HERE  # ← Add this line
CONTENTFUL_ENVIRONMENT=master
```

---

## 🚀 Run the Script

```bash
npm run setup:fundraiser
```

That's it! The script will automatically create:
- ✅ **Fundraiser Settings** content type
- ✅ **Fundraiser Content** content type
- ✅ **Fundraiser Update** content type

---

## 📝 What Gets Created

### 1. Fundraiser Settings
Fields:
- Fundraiser Name *
- Organizer Name
- Goal Amount *
- Current Amount *
- Donor Count
- End Date
- Primary Donation URL *
- Secondary Donation URL
- Contact Email
- Social Links (JSON)
- Brand Colors (JSON)

### 2. Fundraiser Content
Fields:
- Section Name * (dropdown: hero, story, goal, milestones, impact, etc.)
- Headline
- Subheadline
- Description
- Items (JSON)
- Image
- CTA Text
- CTA URL

### 3. Fundraiser Update
Fields:
- Title *
- Date *
- Content *
- Image
- Pin to Top

---

## ✅ After Running the Script

1. Go to [Contentful](https://app.contentful.com)
2. Navigate to **Content Model** - you should see 3 new content types!
3. Go to **Content** → **Add entry**
4. Start creating your fundraiser content

---

## 🎨 Custom Content Models from Aura HTML

**Want content models that match your Aura-built design?**

Share your HTML code and I'll:
1. ✅ Analyze the structure
2. ✅ Identify all unique sections
3. ✅ Create custom content models that match exactly
4. ✅ Update the script to create your custom models

Just paste your HTML in the chat!

---

## 🆘 Troubleshooting

### Error: "Missing required environment variables"
- Make sure `.env` file exists in project root
- Make sure `CONTENTFUL_MANAGEMENT_TOKEN` is added to `.env`
- Restart terminal after editing `.env`

### Error: "already exists"
- The content types are already created (this is fine!)
- The script will skip existing content types

### Error: "Unauthorized" or "Invalid token"
- Check that your Management Token is correct
- Make sure you copied the entire token
- Try creating a new Management Token

---

## 📖 Next Steps

After running the script:
1. ✅ Content models are created
2. ✅ Add your fundraiser content in Contentful
3. ✅ Run `npm run dev` to see your fundraiser page
4. ✅ Deploy to production!

See `QUICK-START-FUNDRAISER.md` for what content to create.

