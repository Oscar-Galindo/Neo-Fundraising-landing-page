# 🚀 Deploy Nehemiah's Site - Step by Step

Get your fundraiser live in 15 minutes!

---

## 📋 **What You Need**

1. ✅ GitHub account (free)
2. ✅ Vercel account (free)
3. ✅ Domain name (optional - $10-15/year)

---

## 🌐 **Step 1: Buy a Domain** (5 minutes)

### **Recommended: Namecheap**

1. Go to [namecheap.com](https://namecheap.com)
2. Search for your domain:
   - `nehemiah-madrid.com`
   - `roadtomadrid.com`
   - `madrid-dream.com`
3. Add to cart (~$10-15/year)
4. Checkout
5. **Don't configure anything yet** - we'll do this after Vercel setup

---

## 🚀 **Step 2: Deploy to Vercel** (10 minutes)

### **2A: Push to GitHub**

Run these commands:

```bash
# Add all files
git add .

# Commit
git commit -m "Nehemiah's Madrid fundraiser ready"

# Push to GitHub
git push origin master
```

If you don't have a GitHub repo yet:
1. Go to [github.com](https://github.com) → Create account
2. Click **New Repository**
3. Name: `nehemiah-madrid`
4. Click **Create**
5. Follow the commands it shows

---

### **2B: Deploy on Vercel**

1. Go to [vercel.com](https://vercel.com)
2. Click **Sign up** (use GitHub account)
3. Click **Add New** → **Project**
4. **Import** your GitHub repository
5. Click **Deploy** (don't configure anything yet!)

**Wait 2-3 minutes** for first deployment...

---

### **2C: Add Environment Variables**

After deployment:

1. Go to your project → **Settings** → **Environment Variables**
2. Add each of these:

```
CONTENTFUL_SPACE_ID = rpwkj4sr23ch
PUBLIC_CONTENTFUL_ACCESS_TOKEN = ZHxmtSN-wW7TztIXy6Hod0XtfZNJC_JkwmGq65ACLVw
CONTENTFUL_PREVIEW_TOKEN = E9sQb6CdDqWFgQiMydUIUxn0tHTHc3J0ZASQiL_YQGA
CONTENTFUL_ENVIRONMENT = master
SITE_NAME = Nehemiah's Road to Madrid
SITE_TYPE = fundraiser
PUBLIC_CLOUDINARY_CLOUD_NAME = dwfxmqw4v
CLOUDINARY_CLOUD_NAME = dwfxmqw4v
```

3. Click **Save**
4. Go to **Deployments** tab
5. Click **...** on latest deployment → **Redeploy**

---

### **2D: Get Your Live URL**

Your site is now live at:
```
https://your-project-name.vercel.app
```

Test it! Share it! It's live! 🎉

---

## 🔗 **Step 3: Connect Your Domain** (5 minutes)

### **In Vercel:**

1. Go to your project → **Settings** → **Domains**
2. Add your domain: `nehemiah-madrid.com`
3. Vercel will show you DNS settings

### **In Namecheap (or your domain registrar):**

1. Go to **Domain List** → Your domain → **Manage**
2. Find **Nameservers** section
3. Select **Custom DNS**
4. Add Vercel's nameservers (shown in Vercel)
   - OR -
5. Use **Advanced DNS** and add:
   - **A Record** → `@` → Vercel's IP
   - **CNAME** → `www` → `cname.vercel-dns.com`

### **Wait 5-60 minutes** for DNS to propagate

Then your site will be live at:
```
https://nehemiah-madrid.com ✨
```

---

## 🔄 **Auto-Deploy (Set It and Forget It)**

### **Webhook for Contentful:**

Make your site auto-rebuild when you update content:

1. **In Vercel:**
   - Settings → Git → **Deploy Hooks**
   - Create hook: "Contentful Updates"
   - Copy the URL

2. **In Contentful:**
   - Settings → Webhooks → **Add webhook**
   - Name: "Vercel Deploy"
   - URL: Paste Vercel hook URL
   - Select: **Publish** and **Unpublish** events
   - Save

**Now when you update content in Contentful:**
- It triggers automatic rebuild
- Site updates in 2-3 minutes
- No manual work needed! 🎉

---

## 💰 **Costs**

- **Vercel Hosting**: FREE forever
- **Domain**: $10-15/year
- **Contentful**: FREE (up to 25k records)
- **Cloudinary**: FREE (25 GB/month)

**Total: ~$10-15/year!** 🎉

---

## 🎯 **Alternative: Netlify**

Same process, just use [netlify.com](https://netlify.com) instead of Vercel.
Both are excellent and free!

---

## ✅ **Your Site Will Be:**

- ✅ **Live 24/7** worldwide
- ✅ **Lightning fast** (CDN)
- ✅ **SSL/HTTPS** (secure)
- ✅ **Auto-updates** from Contentful
- ✅ **Professional domain**
- ✅ **Free hosting**

---

## 🆘 **Troubleshooting**

### **"Build failed"**
- Check Environment Variables are all added
- Redeploy after adding them

### **"Domain not working"**
- Wait 30-60 minutes for DNS
- Check nameservers are correct
- Try www.yourdomain.com

### **"Content not showing"**
- Make sure all Contentful entries are **Published**
- Check environment variables are correct
- Redeploy on Vercel

---

## 📱 **After Deployment**

### **Share Your Fundraiser:**
```
🏆 Help Nehemiah reach Real Madrid!
https://nehemiah-madrid.com
Every donation counts! ⚽❤️
```

### **Update Progress:**
1. Edit in Contentful
2. Click Publish
3. Site auto-rebuilds in 2-3 minutes!

---

**Want me to help you commit and push to GitHub now?** 🚀

