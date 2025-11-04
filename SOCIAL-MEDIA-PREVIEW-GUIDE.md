# Social Media Preview Testing Guide

Complete guide for testing and optimizing social media previews across all platforms.

## 🎯 What We've Implemented

### Open Graph Images
- ✅ **1200x630 landscape** - Primary OG image for Twitter/X, LinkedIn, Facebook
- ✅ **1200x1200 square** - For Instagram, WhatsApp, and platforms preferring square
- ✅ **Dynamic generation** - Real-time image creation with brand colors
- ✅ **Proper metadata** - Width, height, alt text, and type declarations

### Metadata Coverage
- ✅ **Open Graph**: Complete og:title, og:description, og:image, og:type, og:url
- ✅ **Twitter Cards**: twitter:card, twitter:title, twitter:description, twitter:image
- ✅ **Page-specific metadata**: Homepage, Press, Policies all have custom OG data
- ✅ **Image dimensions**: Explicitly declared for all platforms

### Brand Consistency
- ✅ **Volt Yellow (#D4FF00)** - Signature color prominent in all images
- ✅ **Black background (#232324)** - Strong contrast
- ✅ **Tagline**: "FAST. REBELLIOUS. FEMALE." - Always visible
- ✅ **Full mission**: "Play Football. Drive Impact. Change the World."

## 📱 Platform-Specific Requirements

### Twitter/X
**Image Requirements:**
- ✅ Size: 1200x630 (landscape)
- ✅ Aspect ratio: 1.91:1
- ✅ File size: < 5MB
- ✅ Format: PNG (we use)
- ✅ Card type: summary_large_image

**Metadata:**
```html
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:site" content="@sensationalleague">
<meta name="twitter:creator" content="@sensationalleague">
<meta name="twitter:title" content="...">
<meta name="twitter:description" content="...">
<meta name="twitter:image" content="...">
```

**Test URL:**
https://cards-dev.twitter.com/validator

### Facebook
**Image Requirements:**
- ✅ Size: 1200x630 (landscape) - MINIMUM 600x314
- ✅ Aspect ratio: 1.91:1 recommended
- ✅ File size: < 8MB
- ✅ Format: PNG, JPG

**Metadata:**
```html
<meta property="og:title" content="...">
<meta property="og:description" content="...">
<meta property="og:image" content="...">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta property="og:url" content="...">
<meta property="og:type" content="website">
<meta property="og:site_name" content="Sensational League">
```

**Test URL:**
https://developers.facebook.com/tools/debug/

### Instagram
**Image Requirements:**
- ✅ Size: 1200x1200 (square) preferred
- ✅ Also supports: 1200x630 (landscape)
- ✅ Format: PNG, JPG

**Notes:**
- Instagram Stories share: Uses square image
- Instagram Feed share: Can use either format
- We provide BOTH formats for maximum compatibility

### LinkedIn
**Image Requirements:**
- ✅ Size: 1200x627 (our 1200x630 works perfectly)
- ✅ Aspect ratio: 1.91:1
- ✅ File size: < 5MB
- ✅ Format: PNG, JPG

**Test URL:**
https://www.linkedin.com/post-inspector/

### WhatsApp
**Image Requirements:**
- ✅ Size: 1200x630 or 1200x1200
- ✅ Format: PNG, JPG
- ✅ Uses Open Graph tags

**Notes:**
- Desktop WhatsApp shows landscape
- Mobile WhatsApp may crop to square
- Our square image ensures no important content is cropped

### TikTok (when sharing links)
**Image Requirements:**
- ✅ Size: 1200x1200 (square preferred)
- ✅ Format: PNG, JPG

**Notes:**
- TikTok link sharing uses Open Graph
- Square images perform best
- Keep text large and readable

### Discord
**Image Requirements:**
- ✅ Size: 1200x630
- ✅ Format: PNG, JPG
- ✅ Uses Open Graph tags

### Slack
**Image Requirements:**
- ✅ Size: 1200x630 or smaller
- ✅ Format: PNG, JPG
- ✅ Uses Open Graph tags

## 🧪 Testing Checklist

### Pre-Deployment Testing
- [ ] Build and deploy to staging/production
- [ ] Wait 5-10 minutes for CDN propagation
- [ ] Test all URLs with validators below

### Validator Tools

1. **Twitter Card Validator**
   - URL: https://cards-dev.twitter.com/validator
   - Test: https://sensationalleague.com
   - Expected: Large image card with logo and tagline

2. **Facebook Sharing Debugger**
   - URL: https://developers.facebook.com/tools/debug/
   - Test: https://sensationalleague.com
   - Click "Scrape Again" if no image shows
   - Expected: 1200x630 image with all metadata

3. **LinkedIn Post Inspector**
   - URL: https://www.linkedin.com/post-inspector/
   - Test: https://sensationalleague.com
   - Expected: Professional preview with logo

4. **Open Graph Checker**
   - URL: https://www.opengraph.xyz/
   - Test all pages
   - Expected: All OG tags present

5. **Meta Tags Checker**
   - URL: https://metatags.io/
   - Test: https://sensationalleague.com
   - Shows preview for multiple platforms

### Manual Testing

Test each platform by actually sharing:

- [ ] **Twitter/X**: Tweet the URL, check preview
- [ ] **Facebook**: Post to timeline, check preview
- [ ] **LinkedIn**: Share post, check preview
- [ ] **WhatsApp**: Send to yourself, check preview
- [ ] **Discord**: Paste URL in channel, check embed
- [ ] **Slack**: Paste URL in channel, check unfurl
- [ ] **Instagram Stories**: Share link in bio, check preview
- [ ] **iMessage**: Send URL to yourself, check preview

### Pages to Test

Test social previews for:
- [ ] Homepage: https://sensationalleague.com
- [ ] Press: https://sensationalleague.com/press
- [ ] Policies: https://sensationalleague.com/policies/[slug]

## 🔧 Troubleshooting

### Image Not Showing

**Problem**: No image appears in social preview

**Solutions:**
1. **Clear cache**: Most platforms cache for 24-48 hours
   - Facebook: Use "Scrape Again" button
   - Twitter: Use validator to refresh
   - LinkedIn: Use Post Inspector

2. **Check image URL**: Must be absolute, not relative
   - ✅ Good: https://sensationalleague.com/opengraph-image
   - ❌ Bad: /opengraph-image

3. **Check HTTPS**: All images must be served over HTTPS
   - ✅ Our setup uses HTTPS

4. **Check image size**: Must meet platform requirements
   - ✅ Our images: 1200x630 and 1200x1200

### Wrong Image Showing

**Problem**: Old or incorrect image appears

**Solutions:**
1. **Clear platform cache**:
   ```bash
   # Force Facebook to refresh
   https://developers.facebook.com/tools/debug/?q=YOUR_URL

   # Force LinkedIn to refresh
   https://www.linkedin.com/post-inspector/inspect/YOUR_URL
   ```

2. **Check metadata**:
   - View page source and verify og:image URL
   - Ensure no duplicate og:image tags

3. **Wait for CDN**:
   - After deployment, wait 5-10 minutes
   - CDN needs time to propagate changes

### Text Too Small

**Problem**: Text unreadable in preview

**Solutions:**
1. ✅ Our design uses large font sizes (76px+ for main text)
2. ✅ High contrast (Yellow on Black)
3. ✅ No text smaller than 32px

### Image Cropped

**Problem**: Important content cut off

**Solutions:**
1. ✅ We provide square format for platforms that crop
2. ✅ Safe zone: Keep important content in center 80%
3. ✅ Our design keeps logo and text centered

## 📊 Best Practices

### Image Design
- ✅ **High contrast**: Yellow (#D4FF00) on Black (#232324)
- ✅ **Large text**: Minimum 32px, headlines 76px+
- ✅ **Safe zones**: 60px padding on all sides
- ✅ **Brand consistency**: Always include logo and tagline
- ✅ **No clutter**: Clean, bold design

### Text Content
- ✅ **Title**: 60 characters max for best display
- ✅ **Description**: 155-160 characters optimal
- ✅ **Keywords**: Include in description naturally
- ✅ **Call to action**: "Play Football. Drive Impact. Change the World."

### Technical
- ✅ **Absolute URLs**: Always use full https:// URLs
- ✅ **Image format**: PNG for graphics, JPG for photos
- ✅ **File size**: Keep under 1MB for fast loading
- ✅ **Multiple formats**: Provide both landscape and square
- ✅ **Alt text**: Always include descriptive alt text

## 🎨 Our Implementation

### Homepage Preview
```
Title: Sensational League - Fast. Rebellious. Female.
Description: Women's 7v7 football league combining athletic excellence with social impact. Play Football. Drive Impact. Change the World.
Image: 1200x630 + 1200x1200
Colors: Volt Yellow (#D4FF00) on Black (#232324)
```

### Press Page Preview
```
Title: [Headline] - Sensational League
Description: [Subheadline or custom SEO description]
Image: Same brand image
Type: article
```

### Policy Pages Preview
```
Title: [Policy Name] | Sensational League
Description: Read Sensational League's [Policy Name] - Fast. Rebellious. Female.
Image: Same brand image
Type: article
```

## 🚀 Going Live Checklist

Before launching:
- [ ] Update Twitter handle in metadata if different from @sensationalleague
- [ ] Test all pages with Facebook Debugger
- [ ] Test all pages with Twitter Validator
- [ ] Test all pages with LinkedIn Inspector
- [ ] Manually share on each platform
- [ ] Check mobile previews on each platform
- [ ] Save screenshots of good previews for reference
- [ ] Set up monitoring for broken images (Google Search Console)

## 📈 Monitoring

After launch, monitor:
- [ ] Click-through rates from social platforms (Google Analytics)
- [ ] Social share counts (if using social plugins)
- [ ] Image load times (PageSpeed Insights)
- [ ] 404s on image URLs (server logs)
- [ ] Platform-specific errors (Search Console)

## 🔗 Quick Links

- Twitter Card Validator: https://cards-dev.twitter.com/validator
- Facebook Debugger: https://developers.facebook.com/tools/debug/
- LinkedIn Inspector: https://www.linkedin.com/post-inspector/
- Open Graph Checker: https://www.opengraph.xyz/
- Meta Tags Checker: https://metatags.io/

---

**Last Updated:** 2025-11-04
**Status:** Production Ready ✅
