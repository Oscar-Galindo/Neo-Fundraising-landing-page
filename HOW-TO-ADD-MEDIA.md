# 🎬 How to Add Images/Videos to Your Slider

Quick guide to adding your photos and videos to the highlights slider.

---

## 📸 **Adding Image Highlights (No Video)**

### **Step 1: Upload Your Image**

1. Go to Contentful → **Media** tab
2. Click **Add asset** → **Upload files**
3. Select your image (action shot, game photo, etc.)
4. Add a title: "Nehemiah scoring goal"
5. Click **Publish**

---

### **Step 2: Create Media Item**

1. Go to **Content** → **Add entry** → **Media Item**
2. Fill in:

```
Title: Scoring against rivals
Category: Goal (choose from dropdown)
Thumbnail Image: Click "Add media" → Select your uploaded image
Video File: LEAVE EMPTY (this is for uploaded video files)
OR External Video URL: LEAVE EMPTY (unless it's a YouTube/Instagram link)
Description: (optional) Game-winning goal
Display Order: 1 (controls position in slider)
```

3. Click **Publish**

---

### **Step 3: Add to Video Highlights**

1. Go to **Content** → Find **Video Highlights** entry
2. Scroll to **Media Items** field
3. Click **Add content**
4. Select your Media Item
5. Repeat for more items
6. **Drag to reorder** them
7. Click **Publish**

Done! 🎉

---

## 🎥 **Adding External Videos (YouTube/Instagram)**

Same process, but:

```
Title: Training session highlights
Category: Training
Thumbnail Image: Upload a screenshot from the video
Video File: LEAVE EMPTY
OR External Video URL: https://youtube.com/watch?v=...
```

---

## 🎯 **About the Icons**

### **In Contentful UI:**
- You'll see icons next to fields (🖼️ for images, 🎬 for video)
- **This is normal!** It's just showing the field type
- Don't worry about these icons

### **On Your Website:**
- All highlights show a ▶️ PLAY button (correct!)
- The **Category** determines the label:
  - "Skill" = yellow label
  - "Match" = yellow label  
  - "Goal" = yellow label
  - etc.

---

## 📊 **Category Options**

When creating a Media Item, choose from:
- **Skill** - Training drills, skills showcase
- **Match** - Game footage
- **Goal** - Scoring highlights
- **Training** - Practice sessions
- **Highlight** - General highlights

The category appears as the yellow text on the thumbnail!

---

## ❌ **Common Issues**

### **"Error adding media items"**
- Make sure you **Published** the Media Item
- Make sure the **Thumbnail Image** is linked
- Try refreshing Contentful

### **"Can't link Media Item"**
- Click **Add content** (not Add media)
- Select from existing Media Items
- Make sure Media Item is published

### **"Wrong order"**
- Use the **Display Order** field (1, 2, 3...)
- OR drag items in the Media Items field to reorder

---

## 🚀 **Quick Workflow**

```
1. Upload image → Media tab
2. Create Media Item → Link to image
3. Add to Video Highlights → Link Media Items
4. Publish all → Done!
```

---

## 💡 **Pro Tips**

1. **Batch upload**: Upload multiple images at once in Media tab
2. **Use order numbers**: 1, 2, 3, 4 to control slider order
3. **Optimize before upload**: Not required! Cloudinary does it automatically
4. **Video thumbnails**: Upload a screenshot if using YouTube links

---

**Still seeing issues? Let me know which step is causing problems!**

