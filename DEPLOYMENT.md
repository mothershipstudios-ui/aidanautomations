# Deployment Guide

## Overview
This is a Next.js 14 application ready for deployment on Vercel. The site is fully optimized for production.

## Prerequisites
- GitHub account
- Vercel account
- Domain: aidanautomations.com (via GoDaddy)

---

## Step 1: Initialize Git Repository

```bash
cd /home/danie/.openclaw/workspace/projects/aidanautomations/
git init
git add .
git commit -m "Initial commit: Aidan Automations landing page"
git branch -M main
```

---

## Step 2: Create GitHub Repository

1. Go to https://github.com/new
2. Repository name: `aidanautomations`
3. Description: "AI automation consulting for small business"
4. Make it **Public** (for GitHub Pages features)
5. **Do NOT initialize** with README (we already have one)
6. Click "Create repository"

---

## Step 3: Push to GitHub

```bash
git remote add origin https://github.com/YOUR_USERNAME/aidanautomations.git
git push -u origin main
```

Replace `YOUR_USERNAME` with your GitHub username.

---

## Step 4: Deploy to Vercel

### Option A: Vercel CLI (Fastest)

```bash
npm install -g vercel
cd /home/danie/.openclaw/workspace/projects/aidanautomations/
vercel
```

Follow prompts:
- Link to existing project? **No**
- Project name: `aidanautomations`
- Framework: **Next.js**
- Build command: `npm run build`
- Output directory: `.next`
- Install command: `npm install --legacy-peer-deps`

### Option B: Vercel Dashboard (Web UI)

1. Go to https://vercel.com/dashboard
2. Click "New Project"
3. Click "Import Git Repository"
4. Search for and select: `aidanautomations`
5. Click "Import"
6. Configure Project:
   - **Framework Preset:** Next.js
   - **Root Directory:** `./` (default)
   - **Build Command:** `npm run build`
   - **Output Directory:** `.next`
   - **Install Command:** `npm install --legacy-peer-deps`
7. **Deploy**

---

## Step 5: Point Domain to Vercel

### In Vercel Dashboard

1. Go to **Project Settings** → **Domains**
2. Click "Add Domain"
3. Enter: `aidanautomations.com`
4. Vercel will show nameservers:
   ```
   ns1.vercel-dns.com
   ns2.vercel-dns.com
   ns3.vercel-dns.com
   ns4.vercel-dns.com
   ```
5. Copy these nameservers

### In GoDaddy

1. Login to GoDaddy account
2. Go to **My Products** → **Domains**
3. Find `aidanautomations.com` → Click **DNS**
4. Scroll to **Nameservers**
5. Click "Change Nameservers"
6. Replace with Vercel's nameservers (from Step 5)
7. Save changes

**Note:** DNS propagation can take 24-48 hours. Check status:
```bash
nslookup aidanautomations.com
# Should show Vercel's nameservers
```

### Alternative: Direct DNS Records (Faster)

Instead of changing nameservers, you can add A records directly in GoDaddy:

1. In GoDaddy DNS, add these records:

| Type | Name | Value | TTL |
|------|------|-------|-----|
| A | aidanautomations.com | 76.76.19.165 | 3600 |
| CNAME | www | cname.vercel-dns.com | 3600 |

2. Save changes
3. Wait 5-15 minutes for propagation

---

## Step 6: Verify Deployment

### Check Domain Resolution
```bash
ping aidanautomations.com
# Should return Vercel's IP or resolve without error

nslookup aidanautomations.com
# Should show nameserver information
```

### Test in Browser
1. Open https://aidanautomations.com
2. Should load the landing page (not Coming Soon)
3. Test all CTAs:
   - "Get Free Automation Audit" → Tally form
   - "Learn More" → scrolls to problems section
   - "Explore PropertyAnalyzer Pro" → external link
   - Footer links → correct URLs

### Run Lighthouse Audit
1. Open https://aidanautomations.com in Chrome
2. DevTools → Lighthouse
3. Run audit (Performance, Accessibility, Best Practices, SEO)
4. **Target: >90 on all sections**

---

## Post-Deployment

### Immediate (Within 1 hour)
- [ ] Verify site loads without errors
- [ ] Test all links and CTAs
- [ ] Run Lighthouse audit
- [ ] Test on mobile devices

### Within 24 Hours
- [ ] Wait for DNS to fully propagate
- [ ] Add domain to Google Search Console
- [ ] Create Google Analytics 4 account
- [ ] Set up form submission notifications

### Ongoing Maintenance
- [ ] Monitor Vercel Analytics
- [ ] Check for form submissions (Tally)
- [ ] Review Lighthouse scores weekly
- [ ] Update content as needed
- [ ] Deploy updates: `git push origin main` (automatic)

---

## Updates & Future Deployments

Once deployed, updates are automatic:

```bash
# Make changes locally
git add .
git commit -m "Update content"
git push origin main
# Vercel automatically rebuilds and deploys!
```

---

## Troubleshooting

### Domain Not Resolving
- Wait 24-48 hours for DNS propagation
- Verify nameservers are correct in GoDaddy
- Clear browser cache (Ctrl+Shift+Delete)
- Test with: `dig aidanautomations.com @8.8.8.8`

### Build Fails on Vercel
- Check build logs in Vercel dashboard
- Ensure `npm install --legacy-peer-deps` is set
- Verify all dependencies are in package.json
- Run `npm run build` locally to debug

### Site Shows Old Content
- Hard refresh: Ctrl+Shift+R (Windows) or Cmd+Shift+R (Mac)
- Clear Vercel cache: Project Settings → Advanced → Clear Cache
- Check Vercel deployment logs for errors

### Form Not Working
- Verify Tally form URL in components: `https://tally.so/r/wA1xXd`
- Test form directly: https://tally.so/r/wA1xXd
- Check Tally account for submission notifications

---

## Support

- **Vercel Docs:** https://vercel.com/docs
- **Next.js Docs:** https://nextjs.org/docs
- **GoDaddy DNS:** https://www.godaddy.com/help/
- **Tally Forms:** https://tally.so/help

---

## Environment Variables

Currently, no environment variables are needed. If you add them in the future:

1. In Vercel dashboard: Settings → Environment Variables
2. Add key-value pairs
3. Redeploy

Example:
```
NEXT_PUBLIC_FORM_URL=https://tally.so/r/wA1xXd
```

---

## Performance Optimization

Already applied:
- ✅ Next.js static site generation (SSG)
- ✅ CSS purging (only used classes)
- ✅ Image optimization ready
- ✅ Font optimization (Google Fonts)
- ✅ Minified JavaScript

Further optimizations (future):
- [ ] Image compression/WebP
- [ ] Service worker for offline support
- [ ] Caching headers optimization
- [ ] CDN configuration

---

**Ready to deploy!** Start with Step 1 above.

Last updated: March 28, 2026
