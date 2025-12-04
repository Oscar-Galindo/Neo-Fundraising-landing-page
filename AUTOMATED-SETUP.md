# ⚡ 10-Minute Automated Setup

Run a script to automatically create all Contentful content models!

---

## 🎯 Quick Steps

### 1️⃣ Get Management Token (2 minutes)

1. Go to [Contentful](https://app.contentful.com)
2. Click your **profile icon** (top right) → **Settings**
3. Go to **CMA Tokens** tab
4. Click **Generate personal access token**
5. Name: "Fundraiser Setup"
6. **Copy the token** (you only see it once!)

### 2️⃣ Add Token to .env (1 minute)

Open your `.env` file and add this line:

```bash
CONTENTFUL_MANAGEMENT_TOKEN=your_token_here
```

### 3️⃣ Run the Script (30 seconds)

```bash
npm run setup:fundraiser
```

### 4️⃣ Verify in Contentful (1 minute)

1. Go to Contentful → **Content Model**
2. You should see 3 new content types:
   - ✅ Fundraiser Settings
   - ✅ Fundraiser Content  
   - ✅ Fundraiser Update

**Done!** 🎉

---

## 📝 What Happens Next?

Now you need to **add content** to Contentful:

### Minimum Required (5 minutes):

1. **Fundraiser Settings** entry:
   - Fundraiser Name: "Help John Reach Nationals"
   - Goal Amount: 5000
   - Current Amount: 0
   - Primary Donation URL: your GoFundMe link

2. **Hero Section** (Fundraiser Content):
   - Section Name: hero
   - Headline: Your main headline
   - Upload a photo

3. **Story Section** (Fundraiser Content):
   - Section Name: story
   - Headline: "Our Story"
   - Description: Your story text

**Publish all entries!** (Click the Publish button)

---

## 🚀 Test Your Site

```bash
npm run dev
# Visit: http://localhost:4321/fundraiser
```

Your fundraiser page should be live with your content!

---

## 🎨 Want Custom Models?

**Have HTML from Aura or another builder?**

Share it with me and I'll:
1. Analyze your design
2. Create custom Contentful models that match
3. Update the script to generate YOUR specific content types

Just paste your HTML code!

---

## 📖 Full Documentation

- **`SETUP-SCRIPT-INSTRUCTIONS.md`** - Detailed script docs
- **`QUICK-START-FUNDRAISER.md`** - Complete setup guide
- **`FUNDRAISER-SETUP.md`** - All features and examples

---

## ⏱️ Time Estimate

- **Script Setup**: 3 minutes
- **Add Basic Content**: 5 minutes
- **Test Site**: 2 minutes
- **Total**: ~10 minutes

vs. Manual setup: 30-45 minutes ✨

---

**Ready? Let's go! 🚀**

```bash
npm run setup:fundraiser
```

