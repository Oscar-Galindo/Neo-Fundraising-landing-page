# WordPress to Contentful Migration Script

This script helps you migrate all media assets from a WordPress site to Contentful CMS.

## Features

- ✅ Migrates all image types (JPEG, PNG, GIF, SVG, WebP, ICO)
- ✅ Avoids duplicates by checking existing assets
- ✅ Handles rate limiting and connection errors
- ✅ Provides detailed progress tracking
- ✅ Saves migration statistics

## Setup

1. **Install dependencies:**
   ```bash
   npm install contentful-management axios dotenv
   ```

2. **Configure environment variables:**

   Create a `.env` file in the project root:
   ```env
   CONTENTFUL_SPACE_ID=your_space_id
   CONTENTFUL_MANAGEMENT_TOKEN=your_management_token
   CONTENTFUL_ENVIRONMENT=master
   WORDPRESS_URL=https://yourwordpresssite.com
   ```

3. **Get your credentials:**

   - **Contentful Space ID**: Found in Settings → General
   - **Management Token**: Settings → API keys → Content management tokens
   - **WordPress URL**: Your WordPress site URL (must have REST API enabled)

## Usage

Run the migration:
```bash
node scripts/wordpress-to-contentful.cjs
```

## What it does

1. Connects to your Contentful space
2. Fetches all media from WordPress via REST API
3. Checks for existing assets to avoid duplicates
4. Uploads new images to Contentful
5. Publishes each asset automatically
6. Saves a detailed log file

## Output

The script creates a `migration-stats-{timestamp}.json` file with:
- Total items processed
- Number uploaded
- Number skipped
- Any errors encountered

## Options

To migrate ALL media types (not just images), comment out lines 116-120 in the script:
```javascript
// Skip non-image files (optional - remove if you want all media)
// if (!mediaItem.mime_type.startsWith('image/')) {
//   console.log(' ⏭️  SKIPPED (not an image)');
//   stats.skipped++;
//   return true;
// }
```

## Security Notes

- **Never commit your `.env` file** - it's in `.gitignore`
- Delete the management token after migration if not needed
- Use read-only delivery tokens for production

## Troubleshooting

- **Rate limits**: Script includes 1-second delays between uploads
- **Connection errors**: Automatic retry with exponential backoff
- **Large migrations**: Run during off-peak hours

## Clean Up

After successful migration:
1. Delete the management token from Contentful
2. Remove `CONTENTFUL_MANAGEMENT_TOKEN` from `.env`
3. Keep the script for future migrations