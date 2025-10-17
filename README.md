# 🚀 Nexus Starter - Modern Website Kit for Churches & Businesses

A production-ready starter kit that provides WordPress-like flexibility without the complexity. Built with modern technologies and designed to be sold as a complete solution.

## ✨ Features

### For Churches
- 🙏 Prayer request management
- 📅 Event registration system
- 💳 Tithely donation integration
- 📺 Church Online Platform support
- 👥 Member management
- 📧 Ministry-specific workflows

### For Businesses
- 💼 Lead capture & nurturing
- 📊 Quote request system
- 📅 Appointment booking
- 🎯 Sales pipeline integration
- 📈 Marketing automation
- 📱 Mobile-responsive design

### Technical Features
- ⚡ Lightning fast (Astro + React)
- 🎨 Beautiful styling (UnoCSS)
- 📝 Content management (Contentful)
- 🖼️ Automatic image optimization (Cloudinary)
- 🤖 CRM integration (GoHighLevel)
- 🔄 No duplicate contacts
- 📱 Mobile-first design
- 🔒 Secure form handling

## 🛠️ Tech Stack

- **Framework**: Astro v5 with React islands
- **Styling**: UnoCSS (Tailwind alternative)
- **CMS**: Contentful
- **Images**: Cloudinary Fetch Mode
- **CRM/Forms**: GoHighLevel API
- **Language**: TypeScript
- **Church Tools**: Tithely, Church Online Platform

## 📦 Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/nexus-starter.git

# Install dependencies
cd nexus-starter
npm install

# Copy environment variables
cp .env.example .env

# Add your credentials to .env
# See .env.production.example for all options

# Start development server
npm run dev
```

## 🔧 Configuration

### 1. Choose Your Site Type
In `.env`:
```env
SITE_TYPE=church  # or 'business'
```

### 2. Set Up Contentful
1. Create a Contentful space
2. Follow `contentful-setup.md` to create content models
3. Add API tokens to `.env`

### 3. Configure GoHighLevel
1. Get API key from GHL settings
2. Set up workflows for your forms
3. Add credentials to `.env`

### 4. Set Up Cloudinary
1. Create free Cloudinary account
2. Add cloud name to `.env`
3. No API keys needed (Fetch Mode)

## 📂 Project Structure

```
nexus-starter/
├── src/
│   ├── components/       # React components
│   ├── layouts/          # Page layouts
│   ├── lib/
│   │   └── api/         # API clients
│   ├── pages/           # Astro pages
│   └── styles/          # Global styles
├── scripts/             # Migration tools
├── docs/                # Documentation
└── public/              # Static assets
```

## 🧞 Commands

All commands are run from the root of the project:

| Command                   | Action                                           |
| :------------------------ | :----------------------------------------------- |
| `npm install`             | Installs dependencies                            |
| `npm run dev`             | Starts local dev server at `localhost:4321`      |
| `npm run build`           | Build your production site to `./dist/`          |
| `npm run preview`         | Preview your build locally, before deploying     |
| `npm run astro ...`       | Run CLI commands like `astro add`, `astro check` |
| `npm run astro -- --help` | Get help using the Astro CLI                     |

## 🎯 Usage Examples

### Creating a Contact Form
```tsx
<UniversalGHLForm
  config={{
    formType: 'contact',
    formId: 'contact-form',
    title: 'Get in Touch',
    fields: [...],
    ghl: {
      workflowId: 'your-workflow-id',
      updateExisting: true
    }
  }}
  siteType="business"
/>
```

### Church Prayer Request
```tsx
<UniversalGHLForm
  config={{
    formType: 'prayer',
    formId: 'prayer-form',
    title: 'Submit Prayer Request',
    fields: [...],
    ghl: {
      workflowId: 'prayer-workflow',
      tags: ['prayer-request']
    }
  }}
  siteType="church"
/>
```

## 📚 Documentation

- [Deployment Guide](./DEPLOYMENT.md)
- [GoHighLevel Integration](./docs/ghl-integration.md)
- [Contentful Setup](./contentful-setup.md)
- [Migration Scripts](./scripts/README.md)

## 💰 Pricing Model (B2B)

Recommended pricing for agencies:

### Church Package
- **Setup**: $2,997
- **Monthly**: $297
- Includes: All church features, training, support

### Business Package
- **Setup**: $3,497
- **Monthly**: $397
- Includes: All business features, CRM setup, training

### Enterprise
- **Setup**: $5,997+
- **Monthly**: $597+
- Includes: Custom features, priority support

## 🚀 Deployment

### Quick Deploy to Vercel
[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/yourusername/nexus-starter)

### Manual Deployment
```bash
# Build for production
npm run build

# Preview locally
npm run preview

# Deploy to Vercel
vercel --prod
```

## 🧪 Testing

```bash
# Run type checking
npm run typecheck

# Run linting
npm run lint

# Test forms locally
npm run dev
# Visit http://localhost:4321
```

## 📈 Performance

- **Lighthouse Score**: 95-100
- **First Contentful Paint**: <1s
- **Time to Interactive**: <2s
- **Image Optimization**: Automatic via Cloudinary
- **Bundle Size**: <200KB JavaScript

## 🔐 Security

- Environment variables for sensitive data
- Secure form submission endpoints
- HTTPS required for production
- Input validation and sanitization
- Rate limiting on API endpoints

## 🤝 Support

### For Developers
- Check `/docs` for detailed guides
- Review component examples
- Join our Discord community

### For End Users
- Video tutorials available
- Email support included
- Monthly check-ins available

## 📄 License

This is a commercial product. See LICENSE for details.

## 🙏 Credits

Built with:
- [Astro](https://astro.build)
- [React](https://reactjs.org)
- [UnoCSS](https://unocss.dev)
- [Contentful](https://contentful.com)
- [Cloudinary](https://cloudinary.com)
- [GoHighLevel](https://gohighlevel.com)

---

**Ready to launch your next project?** This starter kit has everything you need! 🎉

For custom development or white-label solutions, contact: your@email.com