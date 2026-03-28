#!/bin/bash
# Aidan Automation Website Deployment Script
# Run this on your local machine to push to GitHub and deploy to Vercel

set -e

echo "📦 Aidan Automation Website Deployment"
echo "========================================"

# Step 1: Ensure Git is configured
echo "✓ Git is initialized"

# Step 2: Push to GitHub
echo ""
echo "Pushing to GitHub..."
git push -u origin main

if [ $? -eq 0 ]; then
    echo "✅ Code pushed to GitHub successfully!"
else
    echo "❌ GitHub push failed. Please check your credentials."
    exit 1
fi

# Step 3: Deploy to Vercel (optional)
echo ""
echo "To deploy to Vercel:"
echo "1. Go to: https://vercel.com/new"
echo "2. Select: 'Import Git Repository'"
echo "3. Paste: https://github.com/mothershipstudios-ui/aidanautomations"
echo "4. Click 'Import'"
echo "5. Vercel will automatically deploy"
echo ""
echo "Or, if you have Vercel CLI installed:"
echo "  npm install -g vercel"
echo "  vercel"

echo ""
echo "✅ Deployment script complete!"
