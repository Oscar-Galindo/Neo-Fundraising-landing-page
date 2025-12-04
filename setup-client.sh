#!/bin/bash

# ═══════════════════════════════════════════════════════════════════════
# Nexus Starter Kit - Client Onboarding Setup Script
# ═══════════════════════════════════════════════════════════════════════
# This script automates the initial setup for new clients

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Print header
echo -e "${BLUE}"
echo "╔═══════════════════════════════════════════════════════════════╗"
echo "║         NEXUS STARTER KIT - CLIENT SETUP WIZARD              ║"
echo "╚═══════════════════════════════════════════════════════════════╝"
echo -e "${NC}"

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo -e "${RED}✗ Node.js is not installed. Please install it first.${NC}"
    exit 1
fi

echo -e "${GREEN}✓ Node.js $(node --version) detected${NC}"

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    echo -e "${RED}✗ npm is not installed. Please install it first.${NC}"
    exit 1
fi

echo -e "${GREEN}✓ npm $(npm --version) detected${NC}"
echo ""

# Create .env from .env.example if it doesn't exist
if [ ! -f .env ]; then
    echo -e "${YELLOW}→ Creating .env file from template...${NC}"
    cp .env.example .env
    echo -e "${GREEN}✓ .env created${NC}"
    echo -e "${YELLOW}⚠ Please fill in your API keys in .env${NC}"
else
    echo -e "${GREEN}✓ .env already exists${NC}"
fi

echo ""
echo -e "${YELLOW}→ Installing dependencies...${NC}"
npm install

echo ""
echo -e "${YELLOW}→ Building project...${NC}"
npm run build

echo ""
echo -e "${BLUE}╔═══════════════════════════════════════════════════════════════╗"
echo -e "║                  SETUP COMPLETE! 🎉                         ║"
echo -e "╚═══════════════════════════════════════════════════════════════╝${NC}"

echo ""
echo -e "${YELLOW}Next steps:${NC}"
echo "1. Edit .env and add your API keys:"
echo "   - Contentful Space ID & Tokens"
echo "   - Cloudinary Cloud Name"
echo "   - GoHighLevel API Key & Location ID"
echo "   - Site configuration (name, URL, type)"
echo ""
echo "2. Start development server:"
echo -e "   ${GREEN}npm run dev${NC}"
echo ""
echo "3. Open http://localhost:3000 in your browser"
echo ""
echo "📚 For detailed setup instructions, see:"
echo "   - CLIENT-SETUP.md (step-by-step guide)"
echo "   - SETUP.md (full configuration guide)"
echo "   - contentful-setup.md (Contentful content models)"
echo ""
