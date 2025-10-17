#!/usr/bin/env node

/**
 * Build script for protected distribution
 * Creates obfuscated production build for agency partners
 */

import { exec } from 'child_process';
import { promisify } from 'util';
import fs from 'fs/promises';
import path from 'path';
import crypto from 'crypto';
import JavaScriptObfuscator from 'javascript-obfuscator';

const execAsync = promisify(exec);

const BUILD_CONFIG = {
  inputDir: './dist',
  outputDir: './dist-protected',
  excludePatterns: [
    '*.map',
    '*.md',
    '.env*',
    'scripts/',
    'tests/',
  ],
  obfuscateOptions: {
    compact: true,
    controlFlowFlattening: true,
    controlFlowFlatteningThreshold: 0.75,
    deadCodeInjection: true,
    deadCodeInjectionThreshold: 0.4,
    debugProtection: true,
    debugProtectionInterval: true,
    disableConsoleOutput: false, // Keep for debugging
    domainLock: [],
    identifierNamesGenerator: 'hexadecimal',
    log: false,
    numbersToExpressions: true,
    renameGlobals: false,
    rotateStringArray: true,
    selfDefending: true,
    shuffleStringArray: true,
    simplify: true,
    splitStrings: true,
    splitStringsChunkLength: 10,
    stringArray: true,
    stringArrayEncoding: ['base64'],
    stringArrayIndexShift: true,
    stringArrayWrappersCount: 2,
    stringArrayWrappersChainedCalls: true,
    stringArrayWrappersParametersMaxCount: 4,
    stringArrayWrappersType: 'function',
    stringArrayThreshold: 0.75,
    transformObjectKeys: true,
    unicodeEscapeSequence: false
  }
};

class ProtectedBuilder {
  constructor() {
    this.stats = {
      filesProcessed: 0,
      filesObfuscated: 0,
      totalSize: 0,
      protectedSize: 0
    };
  }

  async build() {
    console.log('🔨 Building protected distribution...\n');

    try {
      // Step 1: Build production version
      await this.buildProduction();

      // Step 2: Create protected directory
      await this.createProtectedDirectory();

      // Step 3: Copy and protect files
      await this.protectFiles();

      // Step 4: Add license validation
      await this.injectLicenseValidation();

      // Step 5: Create distribution package
      await this.createDistributionPackage();

      // Step 6: Generate checksums
      await this.generateChecksums();

      // Print summary
      this.printSummary();

    } catch (error) {
      console.error('❌ Build failed:', error);
      process.exit(1);
    }
  }

  async buildProduction() {
    console.log('📦 Building production version...');
    const { stdout, stderr } = await execAsync('npm run build');

    if (stderr && !stderr.includes('warning')) {
      throw new Error(`Build error: ${stderr}`);
    }

    console.log('✅ Production build complete\n');
  }

  async createProtectedDirectory() {
    console.log('📁 Creating protected directory...');

    // Remove existing protected directory
    await fs.rm(BUILD_CONFIG.outputDir, { recursive: true, force: true });

    // Create new directory
    await fs.mkdir(BUILD_CONFIG.outputDir, { recursive: true });

    console.log('✅ Protected directory created\n');
  }

  async protectFiles() {
    console.log('🔐 Protecting files...');

    const files = await this.getFilesToProtect();

    for (const file of files) {
      await this.processFile(file);
    }

    console.log(`✅ Protected ${this.stats.filesObfuscated} JavaScript files\n`);
  }

  async getFilesToProtect() {
    const files = [];

    async function walkDir(dir) {
      const entries = await fs.readdir(dir, { withFileTypes: true });

      for (const entry of entries) {
        const fullPath = path.join(dir, entry.name);

        if (entry.isDirectory()) {
          // Skip excluded directories
          if (!['node_modules', '.git', 'scripts', 'tests'].includes(entry.name)) {
            await walkDir(fullPath);
          }
        } else {
          // Check if file should be excluded
          const shouldExclude = BUILD_CONFIG.excludePatterns.some(pattern => {
            const regex = new RegExp(pattern.replace('*', '.*'));
            return regex.test(entry.name);
          });

          if (!shouldExclude) {
            files.push(fullPath);
          }
        }
      }
    }

    await walkDir(BUILD_CONFIG.inputDir);
    return files;
  }

  async processFile(filePath) {
    const relativePath = path.relative(BUILD_CONFIG.inputDir, filePath);
    const outputPath = path.join(BUILD_CONFIG.outputDir, relativePath);

    // Ensure output directory exists
    await fs.mkdir(path.dirname(outputPath), { recursive: true });

    this.stats.filesProcessed++;

    // Check if file is JavaScript
    if (filePath.endsWith('.js') && !filePath.includes('.min.')) {
      await this.obfuscateFile(filePath, outputPath);
    } else {
      // Copy non-JavaScript files as-is
      await fs.copyFile(filePath, outputPath);
    }

    // Update size stats
    const stats = await fs.stat(outputPath);
    this.stats.protectedSize += stats.size;
  }

  async obfuscateFile(inputPath, outputPath) {
    try {
      const code = await fs.readFile(inputPath, 'utf8');

      // Skip already minified files
      if (code.length < 500 || code.includes('/*!')) {
        await fs.writeFile(outputPath, code);
        return;
      }

      // Obfuscate the code
      const obfuscationResult = JavaScriptObfuscator.obfuscate(
        code,
        BUILD_CONFIG.obfuscateOptions
      );

      await fs.writeFile(outputPath, obfuscationResult.getObfuscatedCode());
      this.stats.filesObfuscated++;

    } catch (error) {
      console.warn(`⚠️  Could not obfuscate ${inputPath}: ${error.message}`);
      // Copy original if obfuscation fails
      await fs.copyFile(inputPath, outputPath);
    }
  }

  async injectLicenseValidation() {
    console.log('💉 Injecting license validation...');

    // Add license check to main entry point
    const entryFile = path.join(BUILD_CONFIG.outputDir, 'entry.js');

    if (await this.fileExists(entryFile)) {
      const content = await fs.readFile(entryFile, 'utf8');
      const licenseCheck = `
        (function(){
          if(typeof window!=='undefined'){
            var l=localStorage.getItem('nxs_lic');
            if(!l||!l.includes(location.hostname)){
              document.body.innerHTML='<div style="padding:50px;text-align:center;font-family:sans-serif"><h1>License Required</h1><p>Please contact your administrator</p></div>';
              throw new Error('Invalid license');
            }
          }
        })();
      `;

      await fs.writeFile(entryFile, licenseCheck + content);
    }

    console.log('✅ License validation injected\n');
  }

  async createDistributionPackage() {
    console.log('📦 Creating distribution package...');

    // Create package.json for distribution
    const packageJson = {
      name: 'nexus-starter-protected',
      version: '1.0.0',
      private: true,
      license: 'SEE LICENSE IN LICENSE-COMMERCIAL.md',
      scripts: {
        start: 'node server.js',
        'validate-license': 'node scripts/validate.js'
      },
      dependencies: {
        // Only include runtime dependencies
      }
    };

    await fs.writeFile(
      path.join(BUILD_CONFIG.outputDir, 'package.json'),
      JSON.stringify(packageJson, null, 2)
    );

    // Copy license files
    await fs.copyFile(
      './LICENSE-COMMERCIAL.md',
      path.join(BUILD_CONFIG.outputDir, 'LICENSE-COMMERCIAL.md')
    );

    // Copy agency guide
    await fs.copyFile(
      './AGENCY-PARTNER-GUIDE.md',
      path.join(BUILD_CONFIG.outputDir, 'AGENCY-PARTNER-GUIDE.md')
    );

    console.log('✅ Distribution package created\n');
  }

  async generateChecksums() {
    console.log('🔏 Generating checksums...');

    const checksums = {};
    const files = await this.getFilesToProtect();

    for (const file of files) {
      const content = await fs.readFile(file);
      const hash = crypto.createHash('sha256').update(content).digest('hex');
      const relativePath = path.relative(BUILD_CONFIG.outputDir, file);
      checksums[relativePath] = hash;
    }

    await fs.writeFile(
      path.join(BUILD_CONFIG.outputDir, 'checksums.json'),
      JSON.stringify(checksums, null, 2)
    );

    console.log('✅ Checksums generated\n');
  }

  async fileExists(filePath) {
    try {
      await fs.access(filePath);
      return true;
    } catch {
      return false;
    }
  }

  printSummary() {
    console.log('=' .repeat(50));
    console.log('🎉 Protected build complete!\n');
    console.log(`📊 Build Statistics:`);
    console.log(`   Files processed: ${this.stats.filesProcessed}`);
    console.log(`   Files obfuscated: ${this.stats.filesObfuscated}`);
    console.log(`   Output size: ${(this.stats.protectedSize / 1024 / 1024).toFixed(2)} MB`);
    console.log(`\n📁 Output directory: ${BUILD_CONFIG.outputDir}`);
    console.log('=' .repeat(50));
  }
}

// Run the builder
const builder = new ProtectedBuilder();
builder.build();