# 📤 Push to GitHub - Quick Guide

Your code is committed and ready to push!

---

## 🔐 **Get GitHub Token**

1. Go to [GitHub.com](https://github.com) → Click your profile → **Settings**
2. Scroll down → **Developer settings** (left sidebar)
3. **Personal access tokens** → **Tokens (classic)**
4. Click **Generate new token** → **Generate new token (classic)**
5. Name: "Nehemiah Deployment"
6. Select scopes:
   - ✅ **repo** (all repo permissions)
7. Click **Generate token**
8. **COPY THE TOKEN** (you won't see it again!)

---

## 📤 **Push Your Code**

Open terminal and run:

```bash
cd "/Users/oscargalindo/online nexus marketing/nexus-starter 2"

git push -u origin master
```

When prompted:
- **Username**: `Oscar-Galindo`
- **Password**: Paste your token (not your GitHub password!)

---

## ✅ **Verify**

Go to: https://github.com/Oscar-Galindo/Neo-Fundraising-landing-page

You should see all your files! 🎉

---

## 🚀 **Next: Deploy on Vercel**

1. Go to [vercel.com](https://vercel.com)
2. Sign up with GitHub
3. Click **New Project**
4. Import: `Neo-Fundraising-landing-page`
5. Click **Deploy**

**Then add environment variables** (see DEPLOY-GUIDE.md)

---

**Your site will be live in 5 minutes!** 🚀

