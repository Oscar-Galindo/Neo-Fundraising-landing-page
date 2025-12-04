# 🌐 Connect Your Cloudflare Domain to Vercel

Step-by-step guide to connect your domain!

---

## 🚀 **Step 1: Deploy on Vercel First**

1. Go to [vercel.com](https://vercel.com)
2. Click **Sign Up** → Use GitHub
3. Click **New Project**
4. Find **Neo-Fundraising-landing-page**
5. Click **Import**
6. **Don't change anything** → Click **Deploy**
7. Wait 2-3 minutes...
8. **Deployment Complete!** ✅

Your site is now live at:
```
https://neo-fundraising-landing-page.vercel.app
```

---

## ⚙️ **Step 2: Add Environment Variables**

**IMPORTANT:** Your site won't work yet because it needs Contentful keys!

1. In Vercel, go to your project → **Settings** → **Environment Variables**
2. Add these one by one:

```
Name: CONTENTFUL_SPACE_ID
Value: rpwkj4sr23ch
```

```
Name: PUBLIC_CONTENTFUL_ACCESS_TOKEN
Value: ZHxmtSN-wW7TztIXy6Hod0XtfZNJC_JkwmGq65ACLVw
```

```
Name: CONTENTFUL_PREVIEW_TOKEN
Value: E9sQb6CdDqWFgQiMydUIUxn0tHTHc3J0ZASQiL_YQGA
```

```
Name: CONTENTFUL_ENVIRONMENT
Value: master
```

```
Name: PUBLIC_CLOUDINARY_CLOUD_NAME
Value: dwfxmqw4v
```

```
Name: CLOUDINARY_CLOUD_NAME
Value: dwfxmqw4v
```

```
Name: SITE_NAME
Value: Nehemiah's Road to Madrid
```

```
Name: SITE_TYPE
Value: fundraiser
```

3. Click **Save** after each one
4. Go to **Deployments** tab
5. Click **...** on latest deployment → **Redeploy**
6. Wait 2 minutes...

**Test your site!** Visit:
```
https://neo-fundraising-landing-page.vercel.app/nehemiah
```

Should show Nehemiah's page! ✅

---

## 🌍 **Step 3: Connect Your Cloudflare Domain**

### **What's Your Domain?**
(Example: `nehemiah-madrid.com`)

---

### **In Vercel:**

1. Go to your project → **Settings** → **Domains**
2. Click **Add Domain**
3. Enter your domain: `yourdomain.com`
4. Click **Add**

**Vercel will show you DNS settings** - keep this tab open!

---

### **In Cloudflare:**

1. Go to [Cloudflare Dashboard](https://dash.cloudflare.com)
2. Click on your domain
3. Go to **DNS** → **Records**

#### **Add These DNS Records:**

**Record 1:**
```
Type: CNAME
Name: @
Target: cname.vercel-dns.com
Proxy: OFF (DNS only - click the cloud to turn off)
```

**Record 2:**
```
Type: CNAME
Name: www
Target: cname.vercel-dns.com
Proxy: OFF (DNS only)
```

4. Click **Save** for each

---

### **Back in Vercel:**

1. Wait 1-2 minutes
2. Refresh the Domains page
3. Should show: ✅ Valid Configuration

---

## ⏱️ **Wait for DNS Propagation**

- **Typically**: 5-30 minutes
- **Maximum**: 24 hours (rare)

You can check status:
- [whatsmydns.net](https://whatsmydns.net)
- Enter your domain
- Check if it points to Vercel

---

## 🎉 **You're Live!**

Once DNS propagates, your site will be at:
```
https://yourdomain.com/nehemiah
```

---

## 🔒 **SSL Certificate**

Vercel automatically creates FREE SSL certificates!
- Takes 5-10 minutes after domain connects
- Your site will have HTTPS automatically
- No configuration needed

---

## 🔄 **Auto-Deploy Setup** (Optional but Recommended)

Make your site rebuild when you update Contentful:

### **In Vercel:**
1. Settings → **Git** → **Deploy Hooks**
2. Create hook: "Contentful Updates"
3. **Copy the webhook URL**

### **In Contentful:**
1. Settings → **Webhooks** → **Add webhook**
2. Name: "Vercel Deploy"
3. URL: Paste Vercel webhook URL
4. Trigger: Select **Publish** and **Unpublish**
5. **Save**

**Now:** Update content in Contentful → Site rebuilds automatically! 🎉

---

## 🎯 **Summary**

✅ **Deploy to Vercel** → Get temporary URL  
✅ **Add environment variables** → Site works  
✅ **Connect domain in Vercel** → Get DNS settings  
✅ **Update Cloudflare DNS** → Point to Vercel  
✅ **Wait for DNS** → 5-30 minutes  
✅ **Site is LIVE!** → Share your fundraiser!  

---

## 📝 **Your URLs:**

- **Vercel**: `https://neo-fundraising-landing-page.vercel.app/nehemiah`
- **Custom Domain**: `https://yourdomain.com/nehemiah`

---

**What's your domain name? I'll give you the exact DNS settings!** 🚀

