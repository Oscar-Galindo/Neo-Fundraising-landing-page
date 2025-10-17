import { defineMiddleware } from 'astro:middleware';
import { validateLicenseMiddleware } from './lib/license-validator';

export const onRequest = defineMiddleware(async (context, next) => {
  // Skip license check for static assets
  const isStaticAsset = /\.(js|css|png|jpg|jpeg|gif|svg|ico|woff|woff2)$/.test(context.url.pathname);
  if (isStaticAsset) {
    return next();
  }

  // Validate license on production
  if (!import.meta.env.DEV) {
    try {
      await validateLicenseMiddleware();
    } catch (error) {
      console.error('License validation failed:', error);

      // Return license error page
      return new Response(`
        <!DOCTYPE html>
        <html>
          <head>
            <title>License Required</title>
            <style>
              body {
                font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
                display: flex;
                justify-content: center;
                align-items: center;
                min-height: 100vh;
                margin: 0;
                background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
              }
              .container {
                background: white;
                padding: 3rem;
                border-radius: 10px;
                box-shadow: 0 20px 40px rgba(0,0,0,0.1);
                max-width: 500px;
                text-align: center;
              }
              h1 {
                color: #333;
                margin-bottom: 1rem;
              }
              p {
                color: #666;
                line-height: 1.6;
                margin: 1rem 0;
              }
              .error {
                background: #fee;
                border: 1px solid #fcc;
                color: #c33;
                padding: 1rem;
                border-radius: 5px;
                margin: 1rem 0;
              }
              a {
                color: #667eea;
                text-decoration: none;
                font-weight: 600;
              }
              a:hover {
                text-decoration: underline;
              }
            </style>
          </head>
          <body>
            <div class="container">
              <h1>🔒 License Required</h1>
              <div class="error">
                ${error.message}
              </div>
              <p>
                This site is powered by Nexus Starter Kit and requires a valid license to operate in production.
              </p>
              <p>
                Please contact your administrator or visit
                <a href="https://nexus-starter.com">nexus-starter.com</a>
                to obtain a license.
              </p>
            </div>
          </body>
        </html>
      `, {
        status: 403,
        headers: {
          'Content-Type': 'text/html; charset=utf-8'
        }
      });
    }
  }

  return next();
});