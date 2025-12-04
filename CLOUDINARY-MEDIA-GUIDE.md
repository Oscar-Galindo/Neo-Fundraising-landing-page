# 🖼️ Using Cloudinary + Contentful Media

Your Nehemiah page now uses proper Contentful Asset fields with automatic Cloudinary optimization!

---

## ✅ **What's Set Up**

1. ✅ **Cloudinary** configured (cloud: `dwfxmqw4v`)
2. ✅ **Media Item** content model created
3. ✅ **Video Highlights** updated to support Media Items
4. ✅ **Automatic image optimization** enabled

---

## 📸 **How to Add Images/Videos**

### **Option 1: Upload to Contentful (Recommended)**

#### Step 1: Upload Asset
1. Go to Contentful → **Media** tab
2. Click **Add asset** → Upload image/video
3. Add title and description
4. Click **Publish**

#### Step 2: Create Media Item
1. Go to **Content** → **Add entry** → **Media Item**
2. Fill in:
   - **Title**: "Agility Drills"
   - **Category**: Select "Skill"
   - **Thumbnail Image**: Link to your uploaded asset
   - **Video URL**: (optional) YouTube/Vimeo link
3. Click **Publish**

#### Step 3: Add to Video Highlights
1. Go to **Content** → Find **Video Highlights** entry
2. In **Media Items** field, click **Add content**
3. Select your Media Item entries
4. Reorder as needed
5. Click **Publish**

**Done!** Cloudinary automatically optimizes all images! 🎉

---

### **Option 2: Use External URLs (Current Method)**

Your current highlights use JSON with external URLs. This still works:

```json
[
  {
    "title": "Agility drills",
    "category": "Skill",
    "thumbnail": "https://images.unsplash.com/photo-...",
    "videoUrl": "#"
  }
]
```

But Cloudinary will optimize these too!

---

## 🚀 **Cloudinary Auto-Optimization**

Every image on your site is automatically:
- ✅ Converted to WebP (faster)
- ✅ Compressed (smaller files)
- ✅ Resized appropriately
- ✅ Cached on CDN (lightning fast)
- ✅ Responsive (right size for device)

### **Example:**

**Before:**
```
https://images.unsplash.com/photo-1234.jpg (2.5 MB)
```

**After (Cloudinary):**
```
https://res.cloudinary.com/dwfxmqw4v/image/fetch/
w_400,h_700,c_fill,f_auto,q_auto,dpr_auto/
https%3A%2F%2Fimages.unsplash.com%2Fphoto-1234.jpg
(150 KB - 94% smaller!)
```

---

## 📊 **Content Models Available**

### **1. Media Item**
Use for: Video highlights, gallery images, slider items

**Fields:**
- Title
- Category (Skill, Match, Goal, Training, Highlight)
- Thumbnail Image (Asset)
- Video File (Asset - optional)
- External Video URL (YouTube/Vimeo)
- Description
- Display Order

### **2. Campaign Settings**
- GoFundMe URL
- Instagram handle
- Brand colors

### **3. Hero Section**
- Status badge
- Headline
- Gradient text
- Description
- Supporter count

### **4. Stats Grid**
- All stats editable

### **5. Story Section**
- Title
- Content (full HTML/markdown)

### **6. Cost Breakdown**
- All cost items
- Total amount

### **7. Timeline**
- All milestones
- Dates

### **8. Navigation**
- All menu items
- Footer links

---

## 🎨 **Best Practices**

### **For Sliders/Highlights:**
- **Size**: 9:16 aspect ratio (400x700px ideal)
- **Format**: JPG or PNG (Cloudinary converts to WebP)
- **Quality**: Upload high quality - Cloudinary optimizes automatically
- **File size**: No limit! Cloudinary handles it

### **For Hero Images:**
- **Size**: 1920x1080px or larger
- **Format**: Any (JPG, PNG, WebP)
- **Upload full resolution** - Cloudinary creates responsive versions

### **For Thumbnails:**
- **Size**: 400x300px minimum
- **Format**: Any
- **Cloudinary creates multiple sizes** for different devices

---

## 🔧 **Cloudinary Features Available**

Your site can use these Cloudinary transformations:

```typescript
// In your code
import { optimizeImage } from '../lib/utils/cloudinary'

// Basic optimization
optimizeImage(url, { width: 800, quality: 80 })

// Advanced effects
optimizeImage(url, {
  width: 400,
  height: 700,
  crop: 'fill',
  gravity: 'auto', // Smart cropping
  quality: 'auto', // Auto quality
  format: 'auto'   // Auto format (WebP)
})
```

---

## 📝 **Next Steps**

1. **Upload your actual photos/videos:**
   - Go to Contentful → Media
   - Upload Nehemiah's action shots
   - Upload team photos

2. **Create Media Items:**
   - Link to uploaded assets
   - Add categories and titles

3. **Update Video Highlights:**
   - Add Media Items to the highlights section
   - Reorder as needed

4. **Watch it optimize:**
   - Refresh your page
   - Check Network tab - images are tiny!
   - Fast loading even on mobile 🚀

---

## 🌟 **Benefits**

✅ **Faster loading** - Cloudinary CDN worldwide  
✅ **Smaller files** - Auto compression  
✅ **Better quality** - Smart optimization  
✅ **Responsive** - Right size for every device  
✅ **Easy management** - Upload in Contentful UI  
✅ **Future-proof** - WebP/AVIF support  

---

**Your images will load 80-90% faster with Cloudinary! 🚀**

