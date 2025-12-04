/**
 * License Validation System - DISABLED FOR FUNDRAISER
 * This file is kept for compatibility but always returns valid
 */

interface ValidationResponse {
  valid: boolean;
  message?: string;
  deploymentCount?: number;
  maxDeployments?: number;
}

class LicenseValidator {
  private static instance: LicenseValidator;

  private constructor() {
    // No initialization needed for fundraiser
  }

  static getInstance(): LicenseValidator {
    if (!LicenseValidator.instance) {
      LicenseValidator.instance = new LicenseValidator();
    }
    return LicenseValidator.instance;
  }

  /**
   * Validates license on startup - ALWAYS RETURNS VALID FOR FUNDRAISER
   */
  async validateLicense(): Promise<ValidationResponse> {
    // Always allow for fundraiser use - no license needed
    return {
      valid: true,
      message: 'License validation bypassed for fundraiser'
    };
  }

  /**
   * Validates deployment count - ALWAYS RETURNS TRUE FOR FUNDRAISER
   */
  async checkDeploymentLimit(): Promise<boolean> {
    return true;
  }
}

// Export singleton instance
export const licenseValidator = LicenseValidator.getInstance();

// Export validation middleware for Astro - ALWAYS PASSES FOR FUNDRAISER
export async function validateLicenseMiddleware() {
  // Always pass for fundraiser - no license needed, never throws
  return {
    valid: true,
    message: 'License validation bypassed for fundraiser'
  };
}