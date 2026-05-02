# Cloudinary Setup Guide - Fix Media Upload Error

## Problem
You're getting a **500 error** when trying to upload thumbnail images in the template edit modal because Cloudinary is not configured.

```
Error: Request failed with status code 500
at uploadMedia (file://...EditTemplateModal.tsx)
```

## Solution: Configure Cloudinary

### Step 1: Create a Free Cloudinary Account
1. Go to [https://cloudinary.com](https://cloudinary.com)
2. Click "Sign Up Free"
3. Complete the registration
4. Verify your email

### Step 2: Get Your API Credentials
1. Login to [Cloudinary Dashboard](https://cloudinary.com/console)
2. Look for the **"API Environment variable"** section (usually on the right side of the Dashboard)
3. Copy these three values:
   - **Cloud Name** 
   - **API Key**
   - **API Secret**

### Step 3: Update Your .env File
Open `sdui-backend/.env` and update these lines with your credentials:

```env
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret
```

**Example:**
```env
CLOUDINARY_CLOUD_NAME=dxyz123abc
CLOUDINARY_API_KEY=123456789012345
CLOUDINARY_API_SECRET=abcdefghijklmnopqr
```

### Step 4: Restart Your Backend Server
1. Stop the current backend server (Ctrl+C)
2. Run: `npm run dev`
3. You should see a message: `✅ Cloudinary configured successfully`

## Test the Fix

1. Go to your app dashboard
2. Navigate to **Templates** page
3. Click the **Edit** button on any template
4. Try uploading a thumbnail image
5. The error should be gone! ✅

## Troubleshooting

### Still Getting 500 Error?
- Make sure you restarted the backend server after updating .env
- Check that credentials are copied correctly (no extra spaces)
- Verify your Cloudinary account is active

### API Key Shows in Error?
Never commit your `.env` file to Git. It contains sensitive credentials.
Add to `.gitignore`:
```
.env
.env.local
.env.*.local
```

## What Happens Now?
With Cloudinary configured:
- ✅ Upload template thumbnails
- ✅ Upload media files (images, videos, documents)
- ✅ Automatic image optimization (WebP, AVIF formats)
- ✅ Cloudinary handles storage and CDN delivery

## Free Tier Limits
Cloudinary's free tier includes:
- 25 GB total storage
- 25 GB monthly bandwidth
- Unlimited uploads
- Basic image transformations

Perfect for development and small projects!

## Support
If you need more help:
- [Cloudinary Documentation](https://cloudinary.com/documentation)
- Check backend logs: `npm run dev` will show Cloudinary errors
