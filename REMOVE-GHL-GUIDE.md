# Removing GoHighLevel (GHL) Dependencies

Since you're not using GoHighLevel for your fundraiser, here's what you can safely remove or ignore:

## 📂 Files You Can Delete (Optional)

These files are GHL-specific and not needed for the fundraiser:

```bash
# GHL Form Components
src/components/forms/CustomGHLForm.tsx
src/components/forms/GHLForm.astro
src/components/forms/GHLForm.tsx

# GHL API Integration
src/lib/ghl/client.ts
src/lib/api/ghl.ts

# GHL API Endpoints
src/pages/api/ghl/submit-form.ts

# GHL Test Scripts
scripts/test-ghl-connection.js
scripts/test-ghl-forms.js
scripts/test-ghl-opportunity.js

# GHL Documentation
docs/ghl-integration.md
GHL_SETUP.md
```

### To Delete These Files:

```bash
# Run from project root
rm -rf src/components/forms
rm -rf src/lib/ghl
rm -rf src/pages/api/ghl
rm scripts/test-ghl-*.js
rm docs/ghl-integration.md
rm GHL_SETUP.md
```

## 📝 Components That Reference GHL

### IntentBar Component
File: `src/components/IntentBar.tsx`

This component is used on the marketing landing page (index.astro). For your fundraiser:

**Option 1: Don't use it** - The fundraiser page (`/fundraiser`) doesn't use this component

**Option 2: Delete it if not needed**
```bash
rm src/components/IntentBar.tsx
```

### Original Index Page
File: `src/pages/index.astro`

This is the marketing/agency landing page. For your fundraiser:

**Option 1: Replace it**
Replace the content of `index.astro` with a redirect to your fundraiser:

```astro
---
// src/pages/index.astro
---
<script>
  window.location.href = '/fundraiser';
</script>
```

**Option 2: Use fundraiser as homepage**
Rename the files:
```bash
mv src/pages/index.astro src/pages/index-marketing.astro.bak
mv src/pages/fundraiser.astro src/pages/index.astro
```

## 🔧 Environment Variables

You can ignore these GHL variables in `.env`:

```bash
# NOT NEEDED for fundraiser
GHL_API_KEY=...
GHL_LOCATION_ID=...
GHL_VERSION=...
```

Use `.env.fundraiser.example` instead as your template.

## 📦 Package Dependencies

These packages are used by GHL but also used by other parts of the app, so **keep them**:

- `axios` - Used for API calls (general purpose)
- `react-hook-form` - Used in other forms
- `zod` - Used for validation

You don't need to remove any packages from `package.json`.

## ✅ What You're Using Instead

For your fundraiser, you're using:

### Content Management
- ✅ **Contentful** - For all fundraiser content
- ✅ Fundraiser-specific content models

### Forms
- ✅ **SimpleContactForm** component - Uses mailto or can integrate with:
  - [Formspree](https://formspree.io) (free)
  - [Netlify Forms](https://www.netlify.com/products/forms/) (free with Netlify)
  - [Web3Forms](https://web3forms.com) (free)

### Donations
- ✅ **Donation buttons** link to:
  - GoFundMe
  - PayPal
  - Venmo
  - Or any donation platform you choose

## 🎯 Recommended Cleanup Steps

For a clean fundraiser-only setup:

1. **Remove GHL files** (optional but cleaner):
```bash
rm -rf src/components/forms
rm -rf src/lib/ghl
rm src/components/IntentBar.tsx
rm -rf src/pages/api/ghl
```

2. **Use fundraiser as homepage**:
```bash
mv src/pages/index.astro src/pages/index-marketing-backup.astro
mv src/pages/fundraiser.astro src/pages/index.astro
```

3. **Use the fundraiser env template**:
```bash
cp .env.fundraiser.example .env
# Then edit .env with your Contentful keys
```

4. **Clean up documentation** (keep what's useful):
```bash
# Keep these:
# - FUNDRAISER-SETUP.md
# - contentful-fundraiser-model.json
# - README.md

# Optional - archive these:
mkdir _archive
mv GHL_SETUP.md _archive/
mv AGENCY-PARTNER-GUIDE.md _archive/
mv DELIVERY-CHECKLIST.md _archive/
```

## 🚀 You're All Set!

After cleanup, your project focuses only on the fundraiser with:
- ✅ Contentful CMS for easy content updates
- ✅ Beautiful fundraiser components
- ✅ No CRM dependencies
- ✅ Simple contact forms
- ✅ Direct donation buttons
- ✅ Clean, maintainable code

Need help? See `FUNDRAISER-SETUP.md` for complete setup instructions!

