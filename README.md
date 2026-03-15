# 💒 Sanjay & Harshini Wedding Website

A beautiful static wedding website for Sanjay & Harshini's special day - **May 27, 2026**.

## 📅 Wedding Details

- **Bride**: Harshini
- **Groom**: Sanjay
- **Date**: 27th May 2026
- **Venue**: Sri Balaji Mahal, Vallalar, Double Road, Vellore - 632009

## 🌟 Features

- Elegant, responsive design
- Live countdown timer to the wedding day
- Wedding muhurtham timing (9:00 AM - 10:30 AM)
- Venue information with directions link
- Smooth scroll animations
- Mobile-friendly layout

## 📁 Project Structure

```
wedding-site/
├── index.html      # Main HTML file
├── styles.css      # CSS styles
├── script.js       # JavaScript functionality
└── README.md       # Documentation
```

## 🏗️ AWS Architecture

This website is designed to be hosted on AWS with the following architecture:

```
Internet
   │
Route53 (DNS)
   │
CloudFront
   │  ├ TLS (ACM)
   │  ├ WAF
   │  └ Shield
   │
S3 Bucket (private)
```

### Components

| Service | Purpose |
|---------|---------|
| **Route53** | DNS management and domain routing |
| **CloudFront** | CDN for global content delivery with low latency |
| **ACM** | SSL/TLS certificate for HTTPS |
| **WAF** | Web Application Firewall for DDoS protection |
| **Shield** | Additional DDoS protection |
| **S3** | Private bucket for static file storage |

## 🚀 Deployment Steps

### 1. Create S3 Bucket
```bash
aws s3 mb s3://harshini-sanjay-wedding --region ap-south-1
```

### 2. Upload Files
```bash
aws s3 sync . s3://harshini-sanjay-wedding --exclude ".git/*" --exclude "README.md"
```

### 3. Create CloudFront Distribution
- Origin: S3 bucket with OAI (Origin Access Identity)
- Enable HTTPS redirect
- Configure custom domain (if applicable)

### 4. Configure ACM Certificate
- Request certificate in us-east-1 (required for CloudFront)
- Validate domain ownership

### 5. Setup WAF & Shield
- Create WAF Web ACL with rate limiting rules
- Enable Shield Standard (automatic) or Shield Advanced

### 6. Configure Route53
- Create hosted zone for your domain
- Add A record pointing to CloudFront distribution

## 🛠️ Local Development

Simply open `index.html` in your browser to view the website locally.

```bash
# Using Python
python -m http.server 8000

# Using Node.js
npx serve .
```

## 📝 Customization

To customize the website:

1. **Images**: Replace placeholder images in the couple section
2. **Colors**: Modify CSS variables in `styles.css`
3. **Content**: Update text content in `index.html`
4. **RSVP**: Connect the form to a backend service (AWS API Gateway + Lambda)

## 💕 Made with Love

For Sanjay & Harshini's beautiful wedding celebration!
