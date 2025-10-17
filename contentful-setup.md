# Contentful Content Model Setup

Your Space ID: `jn2q4lg00k6r`

## 🎯 Dynamic Page Routing

This starter uses dynamic routing - **ALL pages are managed from Contentful!**

### How It Works:
1. Create a Page in Contentful with a unique `slug`
2. The site automatically creates a route at `/{slug}`
3. Add sections to build your page visually

### URL Examples:
- Slug: `home` → URL: `/` (homepage)
- Slug: `about` → URL: `/about`
- Slug: `services/web-design` → URL: `/services/web-design`
- Slug: `contact` → URL: `/contact`

### Benefits:
- ✅ Create unlimited pages without touching code
- ✅ Change URLs anytime from Contentful
- ✅ SEO-friendly URLs
- ✅ Automatic 404 handling
- ✅ Preview draft pages before publishing

## Step-by-Step Content Model Creation

### 1. Hero Section Content Type

1. Go to Content Model → Add Content Type
2. Name: `Hero Section`
3. API Identifier: `heroSection`

Add these fields:

| Field Name | Field Type | Field ID | Required | Notes |
|------------|-----------|----------|----------|--------|
| Title | Text | title | Yes | Short text |
| Subtitle | Text | subtitle | No | Short text |
| Description | Text | description | No | Long text |
| Background Image | Media | backgroundImage | No | Accept only images |
| Primary CTA | JSON Object | primaryCTA | No | Structure: {label, href, openInNewTab} |
| Secondary CTA | JSON Object | secondaryCTA | No | Structure: {label, href, openInNewTab} |
| Variant | Text (Dropdown) | variant | No | Options: center, left, right |
| Height | Text (Dropdown) | height | No | Options: full, large, medium |

### 2. Page Content Type

1. Name: `Page`
2. API Identifier: `page`

Fields:
| Field Name | Field Type | Field ID | Required | Notes |
|------------|-----------|----------|----------|--------|
| Title | Text | title | Yes | Page title |
| Slug | Text | slug | Yes | URL slug (unique) |
| Sections | References (Many) | sections | No | Accept: Hero Section, Features, etc. |
| SEO | JSON Object | seo | No | {metaTitle, metaDescription, ogImage} |

### 3. Event Content Type

1. Name: `Event`
2. API Identifier: `event`

Fields:
| Field Name | Field Type | Field ID | Required | Notes |
|------------|-----------|----------|----------|--------|
| Title | Text | title | Yes | Event name |
| Date | Date & Time | date | Yes | Start date/time |
| End Date | Date & Time | endDate | No | End date/time |
| Description | Rich Text | description | No | Event details |
| Location | Text | location | No | Physical address |
| Image | Media | image | No | Event image |
| Registration URL | Text | registrationUrl | No | Link to register |
| Category | Text (List) | category | No | Event categories |
| Is Featured | Boolean | isFeatured | No | Show on homepage |

### 4. Team Member Content Type

1. Name: `Team Member`
2. API Identifier: `teamMember`

Fields:
| Field Name | Field Type | Field ID | Required | Notes |
|------------|-----------|----------|----------|--------|
| Name | Text | name | Yes | Full name |
| Role | Text | role | Yes | Job title |
| Bio | Rich Text | bio | No | Biography |
| Image | Media | image | No | Profile photo |
| Email | Text | email | No | Contact email |
| Phone | Text | phone | No | Contact phone |
| Order | Number | order | No | Display order |

### 5. Blog Post Content Type

1. Name: `Blog Post`
2. API Identifier: `blogPost`

Fields:
| Field Name | Field Type | Field ID | Required | Notes |
|------------|-----------|----------|----------|--------|
| Title | Text | title | Yes | Article title |
| Slug | Text | slug | Yes | URL slug (unique) |
| Excerpt | Text | excerpt | No | Short description |
| Content | Rich Text | content | Yes | Article content |
| Featured Image | Media | featuredImage | No | Hero image |
| Author | Reference | author | No | Link to Team Member |
| Publish Date | Date | publishDate | Yes | Publication date |
| Category | Text (List) | category | No | Categories |
| Tags | Text (List) | tags | No | Tags |

### 6. Service Content Type (Business)

1. Name: `Service`
2. API Identifier: `service`

Fields:
| Field Name | Field Type | Field ID | Required | Notes |
|------------|-----------|----------|----------|--------|
| Title | Text | title | Yes | Service name |
| Description | Rich Text | description | No | Full description |
| Short Description | Text | shortDescription | No | Brief overview |
| Image | Media | image | No | Service image |
| Price | Text | price | No | Pricing info |
| Features | Text (List) | features | No | Bullet points |
| CTA Label | Text | ctaLabel | No | Button text |
| CTA Link | Text | ctaLink | No | Button URL |

### 7. Testimonial Content Type

1. Name: `Testimonial`
2. API Identifier: `testimonial`

Fields:
| Field Name | Field Type | Field ID | Required | Notes |
|------------|-----------|----------|----------|--------|
| Quote | Text | quote | Yes | Long text |
| Author | Text | author | Yes | Person's name |
| Role | Text | role | No | Job title |
| Company | Text | company | No | Organization |
| Image | Media | image | No | Author photo |
| Rating | Number | rating | No | 1-5 stars |

### 8. Site Settings (Singleton)

1. Name: `Site Settings`
2. API Identifier: `siteSettings`

Fields:
| Field Name | Field Type | Field ID | Required | Notes |
|------------|-----------|----------|----------|--------|
| Site Name | Text | siteName | Yes | Organization name |
| Logo | Media | logo | No | Site logo |
| Primary Color | Text | primaryColor | No | Hex color |
| Contact Email | Text | contactEmail | No | Main email |
| Contact Phone | Text | contactPhone | No | Main phone |
| Address | JSON Object | address | No | {street, city, state, zip} |
| Social Links | JSON Object | socialLinks | No | {facebook, instagram, twitter, etc} |

## Creating Your First Content

### 1. Create Site Settings
1. Go to Content → Add Entry → Site Settings
2. Fill in your organization details
3. Publish

### 2. Create a Hero Section
1. Go to Content → Add Entry → Hero Section
2. Example content:
   - Title: "Welcome to Nexus Starter"
   - Subtitle: "Modern Web Solutions"
   - Description: "Build beautiful, fast websites with our flexible starter kit"
   - Add CTAs and background image
3. Publish

### 3. Create Home Page
1. Go to Content → Add Entry → Page
2. Set:
   - Title: "Home"
   - Slug: "home"
   - Sections: Link to your Hero Section
3. Publish

## Testing the Integration

1. Restart your dev server:
```bash
npm run dev
```

2. Your homepage should now pull content from Contentful
3. Any changes in Contentful will reflect on your site after refreshing

## Tips

- Use the Preview API token for staging/preview environments
- Set up webhooks to trigger rebuilds when content changes
- Use Contentful's built-in image transformations for thumbnails
- Create content templates for consistency
- Use validations to ensure data quality