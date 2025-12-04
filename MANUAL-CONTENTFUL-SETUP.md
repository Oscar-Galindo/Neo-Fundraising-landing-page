# 📝 Manual Contentful Setup (10 Minutes)

Quick manual setup for your fundraiser content models - no token issues!

---

## 🎯 Create 3 Content Types

### **Content Type 1: Fundraiser Settings**

1. Go to **Content Model** → **Add Content Type**
2. Name: `Fundraiser Settings`
3. API Identifier: `fundraiserSettings`
4. Click **Create**

**Add these fields** (click "Add field" for each):

| Field | Type | ID | Required | Settings |
|-------|------|----|---------:|----------|
| Fundraiser Name | Short text | `fundraiserName` | ✅ Yes | Max 200 chars |
| Organizer Name | Short text | `organizerName` | No | - |
| Goal Amount | Number, Integer | `goalAmount` | ✅ Yes | Min value: 1 |
| Current Amount | Number, Integer | `currentAmount` | ✅ Yes | Min value: 0 |
| Donor Count | Number, Integer | `donorCount` | No | Min value: 0 |
| End Date | Date & time | `endDate` | No | - |
| Primary Donation URL | Short text | `primaryDonationUrl` | ✅ Yes | - |
| Secondary Donation URL | Short text | `secondaryDonationUrl` | No | - |
| Contact Email | Short text | `contactEmail` | No | - |
| Social Links | JSON object | `socialLinks` | No | - |
| Brand Colors | JSON object | `brandColors` | No | - |

**Set Display Field**:
- Click ⚙️ Settings → Entry title → Select "fundraiserName"
- Click **Save**

---

### **Content Type 2: Fundraiser Content**

1. Go to **Content Model** → **Add Content Type**
2. Name: `Fundraiser Content`
3. API Identifier: `fundraiserContent`
4. Click **Create**

**Add these fields**:

| Field | Type | ID | Required | Settings |
|-------|------|----|---------:|----------|
| Section Name | Short text | `sectionName` | ✅ Yes | **See dropdown setup below** |
| Headline | Short text | `headline` | No | Max 200 chars |
| Subheadline | Long text | `subheadline` | No | Max 500 chars |
| Description | Long text | `description` | No | - |
| Items | JSON object | `items` | No | - |
| Image | Media, One file | `image` | No | Accept: Images only |
| CTA Text | Short text | `ctaText` | No | Max 50 chars |
| CTA URL | Short text | `ctaUrl` | No | - |

**For "Section Name" field - Make it a dropdown**:
1. Click on the "Section Name" field
2. Go to **Validations** tab
3. Select "Accept only specified values"
4. Add these values (one per line):
   - `hero`
   - `story`
   - `goal`
   - `milestones`
   - `impact`
   - `updates`
   - `supporters`
   - `faq`
   - `contact`
5. Click **Confirm**

**Set Display Field**:
- Settings → Entry title → Select "sectionName"
- Save

---

### **Content Type 3: Fundraiser Update**

1. Go to **Content Model** → **Add Content Type**
2. Name: `Fundraiser Update`
3. API Identifier: `fundraiserUpdate`
4. Click **Create**

**Add these fields**:

| Field | Type | ID | Required | Settings |
|-------|------|----|---------:|----------|
| Title | Short text | `title` | ✅ Yes | Max 150 chars |
| Date | Date & time | `date` | ✅ Yes | - |
| Content | Long text | `content` | ✅ Yes | - |
| Image | Media, One file | `image` | No | Accept: Images only |
| Pin to Top | Boolean | `isImportant` | No | - |

**Set Display Field**:
- Settings → Entry title → Select "title"
- Save

---

## ✅ You're Done with Content Models!

Now let's add some content...

---

## 📝 Add Your First Content

### **1. Create Fundraiser Settings Entry**

1. Go to **Content** → **Add entry** → **Fundraiser Settings**
2. Fill in:

```
Fundraiser Name: Help [Your Son's Name] Reach [Goal]
Organizer Name: The [Your Last Name] Family
Goal Amount: 5000
Current Amount: 0
Donor Count: 0
End Date: 2025-06-30
Primary Donation URL: https://gofundme.com/your-campaign
Contact Email: your@email.com
```

3. **Click Publish** (top right)

---

### **2. Create Hero Section**

1. Go to **Content** → **Add entry** → **Fundraiser Content**
2. Fill in:

```
Section Name: hero (select from dropdown)
Headline: Help [Name] Achieve Their Dream
Subheadline: Every contribution brings us one step closer to making this possible. Your support means the world to us.
CTA Text: Donate Now
CTA URL: [your GoFundMe link]
```

3. **Add an Image**:
   - Click "Add media" in the Image field
   - Upload a great photo of your son
4. **Click Publish**

---

### **3. Create Story Section**

1. **Content** → **Add entry** → **Fundraiser Content**
2. Fill in:

```
Section Name: story
Headline: Our Story
Description: 
[Your son's name] has worked incredibly hard to earn this opportunity to [describe what - compete in nationals, go on mission trip, attend program, etc.].

This is more than just [the activity] - it's a chance for [him/her] to [describe the impact - develop leadership skills, build confidence, make lifelong friendships, etc.].

The costs include [travel, accommodation, equipment, registration fees, etc.]. As a family, we're committed to supporting [his/her] dreams, but we can't do it alone.

Your generosity will help make this dream a reality. Every dollar counts, and we're grateful for any support you can provide.
```

3. **Add a photo**
4. **Click Publish**

---

### **4. Create Goal Breakdown (Optional but Recommended)**

1. **Content** → **Add entry** → **Fundraiser Content**
2. Fill in:

```
Section Name: goal
Headline: What We're Raising Money For
Items:
[
  {
    "title": "Travel Expenses",
    "amount": 2000,
    "description": "Round-trip airfare and local transportation"
  },
  {
    "title": "Accommodation",
    "amount": 1500,
    "description": "Hotel stays for the duration"
  },
  {
    "title": "Equipment & Gear",
    "amount": 800,
    "description": "Required equipment and uniforms"
  },
  {
    "title": "Program Fees",
    "amount": 700,
    "description": "Registration and participation costs"
  }
]
```

3. **Click Publish**

---

### **5. Create Milestones Section (Optional)**

1. **Content** → **Add entry** → **Fundraiser Content**
2. Fill in:

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
    "title": "Almost There",
    "description": "Purchase all equipment"
  },
  {
    "percentage": 100,
    "title": "Goal Reached!",
    "description": "Everything is covered!"
  }
]
```

3. **Click Publish**

---

### **6. Create FAQ Section**

1. **Content** → **Add entry** → **Fundraiser Content**
2. Fill in:

```
Section Name: faq
Headline: Frequently Asked Questions
Items:
[
  {
    "question": "How can I donate?",
    "answer": "Click any 'Donate Now' button to be taken to our secure donation page. We accept all major payment methods."
  },
  {
    "question": "Is my donation tax-deductible?",
    "answer": "Please consult with your tax advisor regarding the deductibility of your contribution."
  },
  {
    "question": "What if you exceed your goal?",
    "answer": "Any additional funds will go towards future opportunities and expenses for [name]."
  },
  {
    "question": "How will I know my donation was received?",
    "answer": "You'll receive a confirmation from our donation platform, and we'll personally thank all donors."
  }
]
```

3. **Click Publish**

---

## 🎉 You're All Set!

Now test your site:

```bash
npm run dev
```

Visit: `http://localhost:4321/fundraiser`

Your fundraiser page should be live with all your content! 🚀

---

## 📊 Updating Your Fundraiser

### **Update Amount Raised:**
1. Go to Content → Fundraiser Settings
2. Edit "Current Amount" and "Donor Count"
3. Click Publish
4. Your site updates automatically!

### **Post an Update:**
1. Content → Add entry → Fundraiser Update
2. Add title, date, content, and photo
3. Publish

---

## 🎨 Next Steps

- Customize colors in `uno.config.ts`
- Add more photos
- Share on social media
- Deploy to Vercel or Netlify

See `QUICK-START-FUNDRAISER.md` for deployment instructions!

