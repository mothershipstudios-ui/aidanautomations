# Aidan Automations Landing Page

AI automation consulting for small business. Cut manual work. Stay competitive. Grow faster.

## 🚀 Quick Start

### Development
```bash
npm install
npm run dev
# Open http://localhost:3000
```

### Production Build
```bash
npm run build
npm start
```

## 📁 Project Structure

```
├── app/
│   ├── layout.tsx       # Root layout + metadata
│   ├── page.tsx         # Main page
│   └── globals.css      # Global styles
├── components/
│   ├── Header.tsx       # Navigation header
│   ├── Footer.tsx       # Footer
│   └── sections/
│       ├── Hero.tsx
│       ├── Problems.tsx
│       ├── Solutions.tsx
│       └── CTASection.tsx
├── public/              # Static assets
├── tailwind.config.ts   # Tailwind configuration
├── tsconfig.json        # TypeScript config
└── next.config.js       # Next.js config
```

## 🎨 Design System

### Brand Colors
- **Primary:** `#0A5FFF` (Aidan Blue)
- **Dark:** `#0D1B3D` (Primary text)
- **Cyan:** `#00D9FF` (Accents)
- **Lavender:** `#8B7FF5` (Supporting)
- **Gray BG:** `#F5F7FA` (Sections)

### Typography
- **Font:** Inter (Google Fonts)
- **Headings:** 600-700 weight
- **Body:** 400 weight, 16px, 1.6 line-height

## 🔗 Key Links

- **Free Audit Form:** https://tally.so/r/wA1xXd
- **PropertyAnalyzer Pro:** https://propertyanalyzerpro.com
- **Contact Email:** aidan@aidanautomations.com
- **Twitter:** @AidanAutomation

## 📊 Performance

- **First Load JS:** ~99 kB
- **Lighthouse Target:** >90 (all categories)
- **Mobile:** Fully responsive (320px+)
- **Accessibility:** WCAG AA compliant

## 🚀 Deployment

### To Vercel
1. Push to GitHub: `aidanautomations`
2. Connect GitHub repo in Vercel dashboard
3. Deploy (automatic on push)
4. Point domain (aidanautomations.com) in Vercel settings
5. Update GoDaddy nameservers to Vercel's

## ✅ Features

- Responsive design (mobile, tablet, desktop)
- Hero section with dual CTAs
- Problem/Solution sections with icons
- Industry-specific use cases
- Footer with contact + social links
- SEO optimized metadata
- Accessibility compliant (WCAG AA)
- Form integration (Tally)

## 📝 Content

### Hero
- Headline: "AI Automation Consulting for Small Business"
- Subheading: "Cut manual work. Stay competitive. Grow faster."
- CTAs: "Get Free Automation Audit" + "Learn More"

### Problems
- Wasted time on manual work
- Losing revenue opportunities
- Team burnout & errors

### Solutions
- Speed, accuracy, scale, focus
- Industry use cases: Real Estate, E-Commerce, Marketing, Consulting

### CTA Section
- Primary: "Start Your Free Automation Audit"
- Secondary: "Explore PropertyAnalyzer Pro"

## 🔒 Privacy & Terms

- Privacy Policy: `/privacy`
- Terms of Service: `/terms`

(Add these pages in `app/privacy/page.tsx` and `app/terms/page.tsx`)

## 📞 Support

Email: aidan@aidanautomations.com

---

Built with Next.js 14, React 19, TypeScript, and Tailwind CSS  
Design system based on brand guidelines by Suzainne
