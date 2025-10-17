/**
 * License Validation System
 * Protects the Nexus Starter Kit from unauthorized use
 */

import crypto from 'crypto';

interface LicenseConfig {
  key: string;
  domain: string;
  agencyId: string;
  tier: 'starter' | 'professional' | 'enterprise';
  expiresAt: string;
}

interface ValidationResponse {
  valid: boolean;
  message?: string;
  deploymentCount?: number;
  maxDeployments?: number;
}

class LicenseValidator {
  private static instance: LicenseValidator;
  private licenseKey: string = '';
  private validationCache: Map<string, { result: ValidationResponse; timestamp: number }> = new Map();
  private readonly CACHE_DURATION = 3600000; // 1 hour
  private readonly API_ENDPOINT = 'https://api.nexus-starter.com/validate';

  private constructor() {
    this.licenseKey = import.meta.env.NEXUS_LICENSE_KEY || '';
  }

  static getInstance(): LicenseValidator {
    if (!LicenseValidator.instance) {
      LicenseValidator.instance = new LicenseValidator();
    }
    return LicenseValidator.instance;
  }

  /**
   * Validates license on startup
   */
  async validateLicense(): Promise<ValidationResponse> {
    if (import.meta.env.DEV) {
      // Development mode - show watermark but allow usage
      console.log('🔓 Nexus Starter Kit - Development Mode');
      return {
        valid: true,
        message: 'Development mode - License validation bypassed'
      };
    }

    if (!this.licenseKey) {
      return {
        valid: false,
        message: 'No license key provided. Please set NEXUS_LICENSE_KEY in your environment variables.'
      };
    }

    // Check cache first
    const cacheKey = this.generateCacheKey();
    const cached = this.validationCache.get(cacheKey);

    if (cached && Date.now() - cached.timestamp < this.CACHE_DURATION) {
      return cached.result;
    }

    try {
      const validation = await this.validateWithAPI();

      // Cache the result
      this.validationCache.set(cacheKey, {
        result: validation,
        timestamp: Date.now()
      });

      return validation;
    } catch (error) {
      console.error('License validation error:', error);

      // Fail open in case of network issues (grace period)
      return {
        valid: true,
        message: 'License validation temporarily unavailable - grace period active'
      };
    }
  }

  /**
   * Validates with remote API
   */
  private async validateWithAPI(): Promise<ValidationResponse> {
    const domain = this.getCurrentDomain();
    const agencyId = import.meta.env.NEXUS_AGENCY_ID || '';

    const payload = {
      licenseKey: this.licenseKey,
      domain,
      agencyId,
      timestamp: Date.now(),
      signature: this.generateSignature(this.licenseKey, domain, agencyId)
    };

    try {
      const response = await fetch(this.API_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        throw new Error(`Validation failed: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      // Fallback to local validation
      return this.validateLocally();
    }
  }

  /**
   * Local validation fallback
   */
  private validateLocally(): ValidationResponse {
    // Basic local validation using encrypted license format
    const parts = this.licenseKey.split('-');

    if (parts.length !== 4) {
      return {
        valid: false,
        message: 'Invalid license key format'
      };
    }

    // Check expiration (encoded in part 3)
    const expirationEncoded = parts[2];
    const expiration = this.decodeExpiration(expirationEncoded);

    if (new Date() > new Date(expiration)) {
      return {
        valid: false,
        message: 'License has expired'
      };
    }

    // Basic checksum validation
    const checksum = parts[3];
    const expectedChecksum = this.generateChecksum(parts.slice(0, 3).join('-'));

    if (checksum !== expectedChecksum) {
      return {
        valid: false,
        message: 'Invalid license key'
      };
    }

    return {
      valid: true,
      message: 'License validated locally'
    };
  }

  /**
   * Generates signature for API requests
   */
  private generateSignature(key: string, domain: string, agencyId: string): string {
    const secret = import.meta.env.NEXUS_SECRET || 'default-secret';
    const data = `${key}:${domain}:${agencyId}:${Date.now()}`;
    return crypto.createHmac('sha256', secret).update(data).digest('hex');
  }

  /**
   * Generates checksum for local validation
   */
  private generateChecksum(data: string): string {
    return crypto.createHash('md5').update(data).digest('hex').substring(0, 8);
  }

  /**
   * Decodes expiration from license key
   */
  private decodeExpiration(encoded: string): string {
    try {
      const decoded = Buffer.from(encoded, 'base64').toString();
      return decoded;
    } catch {
      return new Date().toISOString(); // Default to now if decoding fails
    }
  }

  /**
   * Gets current domain
   */
  private getCurrentDomain(): string {
    if (typeof window !== 'undefined') {
      return window.location.hostname;
    }
    return import.meta.env.SITE_DOMAIN || 'localhost';
  }

  /**
   * Generates cache key
   */
  private generateCacheKey(): string {
    return `${this.licenseKey}-${this.getCurrentDomain()}`;
  }

  /**
   * Injects watermark in development
   */
  injectDevelopmentWatermark(): void {
    if (import.meta.env.DEV && typeof document !== 'undefined') {
      const watermark = document.createElement('div');
      watermark.innerHTML = 'Nexus Starter Kit - Development Mode';
      watermark.style.cssText = `
        position: fixed;
        bottom: 10px;
        right: 10px;
        background: rgba(0,0,0,0.7);
        color: white;
        padding: 5px 10px;
        font-size: 12px;
        border-radius: 4px;
        z-index: 999999;
        pointer-events: none;
      `;
      document.body.appendChild(watermark);
    }
  }

  /**
   * Validates deployment count
   */
  async checkDeploymentLimit(): Promise<boolean> {
    const validation = await this.validateLicense();

    if (!validation.valid) {
      return false;
    }

    if (validation.maxDeployments && validation.deploymentCount) {
      return validation.deploymentCount < validation.maxDeployments;
    }

    return true;
  }
}

// Export singleton instance
export const licenseValidator = LicenseValidator.getInstance();

// Export validation middleware for Astro
export async function validateLicenseMiddleware() {
  const validator = LicenseValidator.getInstance();
  const result = await validator.validateLicense();

  if (!result.valid) {
    throw new Error(`License validation failed: ${result.message}`);
  }

  // Inject watermark in development
  if (import.meta.env.DEV) {
    validator.injectDevelopmentWatermark();
  }

  return result;
}