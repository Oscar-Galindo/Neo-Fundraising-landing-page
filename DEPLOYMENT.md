# 🚀 Deployment Guide

## Pre-Deployment Checklist

### 1. **Security - IMPORTANT!**
- [ ] Delete Contentful Management Token from Contentful settings
- [ ] Remove any hardcoded credentials
- [ ] Set up environment variables in hosting platform
- [ ] Enable HTTPS (required for forms)

### 2. **Contentful Setup**
- [ ] Create Delivery API token (read-only)
- [ ] Create Preview API token
- [ ] Set up webhook for deployments (optional)
- [ ] Create content models as per `contentful-setup.md`
- [ ] Create initial content (home page minimum)

### 3. **GoHighLevel Setup**
- [ ] Get API key from GHL Settings → API
- [ ] Note your Location ID
- [ ] Create workflows for each form type
- [ ] Set up custom fields
- [ ] Configure pipelines

### 4. **Cloudinary Setup**
- [ ] Create free account at cloudinary.com
- [ ] Get Cloud Name from dashboard
- [ ] No API keys needed (using Fetch Mode)

## Deployment Options

### Option 1: Vercel (Recommended)
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Set environment variables in Vercel dashboard
```

**Vercel Environment Variables:**
1. Go to Project Settings → Environment Variables
2. Add all variables from `.env.production.example`
3. Deploy

### Option 2: Netlify
```bash
# Build command
npm run build

# Publish directory
dist/

# Set environment variables in Netlify dashboard
```

### Option 3: AWS Amplify
```bash
# Connect GitHub repo
# Build settings:
version: 1
frontend:
  phases:
    preBuild:
      commands:
        - npm ci
    build:
      commands:
        - npm run build
  artifacts:
    baseDirectory: dist
    files:
      - '**/*'
```

## Environment Variables Setup

### For Churches:
```env
SITE_TYPE=church
SITE_NAME="Grace Community Church"
CHURCH_ONLINE_ID=your_id
TITHELY_CHURCH_ID=your_id
```

### For Businesses:
```env
SITE_TYPE=business
SITE_NAME="Nexus Digital Agency"
```

## GoHighLevel Workflows Setup

### Church Workflows

#### 1. Prayer Request Workflow
- **Trigger**: Tag "prayer-request"
- **Actions**:
  1. Add to Prayer List
  2. If pastoral care needed → Create task for pastor
  3. Send confirmation email
  4. Add to prayer team notifications

#### 2. First-Time Visitor
- **Trigger**: Tag "first-time-visitor"
- **Actions**:
  1. Send welcome email series (3 emails)
  2. Create follow-up task for pastor
  3. Add to newcomers class list
  4. Send church info packet

#### 3. Event Registration
- **Trigger**: Tag "event-registration"
- **Actions**:
  1. Send confirmation with details
  2. Add to event attendee list
  3. Send reminder 24 hours before
  4. Follow up after event

### Business Workflows

#### 1. Lead Capture
- **Trigger**: Tag "contact"
- **Actions**:
  1. Create opportunity in pipeline
  2. Assign to sales rep
  3. Send instant notification
  4. Add to email nurture sequence

#### 2. Quote Request
- **Trigger**: Tag "quote"
- **Actions**:
  1. Create high-priority opportunity
  2. Send pricing information
  3. Schedule follow-up call
  4. Add to sales pipeline

## Testing Checklist

### Before Going Live:
- [ ] Test all forms with real email
- [ ] Verify GHL workflows trigger correctly
- [ ] Check existing contact updates (no duplicates)
- [ ] Test on mobile devices
- [ ] Verify images load via Cloudinary
- [ ] Test dynamic pages from Contentful
- [ ] Check SSL certificate active

### Form Testing:
1. **New Contact Test**:
   - Submit form with new email
   - Verify contact created in GHL
   - Check workflow triggered
   - Confirm email received

2. **Existing Contact Test**:
   - Submit with existing email
   - Verify contact updated (not duplicated)
   - Check new tags added
   - Verify note added to contact

## Post-Deployment

### 1. Monitor Performance
- Set up Google Analytics
- Monitor Cloudinary bandwidth
- Check GHL API usage
- Review form submission rates

### 2. Maintenance Tasks
- [ ] Weekly: Check form submissions
- [ ] Monthly: Review GHL workflows
- [ ] Quarterly: Update content in Contentful
- [ ] Yearly: Review API limits

## Troubleshooting

### Forms Not Submitting
1. Check browser console for errors
2. Verify API endpoint URL correct
3. Check GHL API key valid
4. Verify CORS settings

### Images Not Loading
1. Check Cloudinary cloud name
2. Verify image URLs in Contentful
3. Check Cloudinary fetch URL restrictions

### Workflows Not Triggering
1. Verify workflow active in GHL
2. Check tags being applied correctly
3. Review workflow trigger conditions
4. Check API permissions

## Support Resources

- **Contentful**: https://www.contentful.com/developers/docs/
- **GoHighLevel**: https://help.gohighlevel.com/
- **Cloudinary**: https://cloudinary.com/documentation
- **Astro**: https://docs.astro.build/

## Emergency Rollback

If something goes wrong:
1. Revert to previous deployment
2. Check error logs
3. Verify environment variables
4. Test locally with production data

## Security Best Practices

1. **Never commit `.env` files**
2. **Use read-only tokens in production**
3. **Rotate API keys quarterly**
4. **Monitor for unusual activity**
5. **Keep dependencies updated**

---

## Quick Start Commands

```bash
# Local development
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Deploy to Vercel
vercel --prod

# Check for issues
npm run lint
npm run typecheck
```

## Need Help?

- Check `/docs` folder for detailed guides
- Review component examples in Storybook
- Contact support for API issues

---

Ready to deploy? Follow the checklist above and your site will be live! 🎉