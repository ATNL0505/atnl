# ATNL Chatbot Production Deployment Guide

## Overview
Your ATNL website with AI chatbot integration is ready for production deployment. Since GitHub Pages only supports static files, you'll need to use a platform that supports serverless functions for the chatbot to work.

## Recommended Deployment Options

### Option 1: Vercel (Recommended)
**Why Vercel:** Free tier, easy GitHub integration, supports Node.js, automatic deployments

**Steps:**
1. **Connect Repository to Vercel:**
   - Go to [vercel.com](https://vercel.com)
   - Sign in with GitHub
   - Click "Import Project"
   - Select your `atnl0505/atnl` repository

2. **Configure Environment Variables:**
   - In Vercel dashboard → Settings → Environment Variables
   - Add: `OPENAI_API_KEY` = your_openai_api_key
   - Add: `VITE_GA_MEASUREMENT_ID` = your_ga_measurement_id

3. **Deploy:**
   - Vercel will automatically build and deploy
   - Your site will be available at: `https://atnl-[project-id].vercel.app`
   - You can add a custom domain later

### Option 2: Netlify
**Why Netlify:** Free tier, form handling, supports serverless functions

**Steps:**
1. **Connect to Netlify:**
   - Go to [netlify.com](https://netlify.com)
   - Sign in with GitHub
   - Click "Import from Git"
   - Select your `atnl0505/atnl` repository

2. **Configure Environment Variables:**
   - In Netlify dashboard → Site Settings → Environment Variables
   - Add: `OPENAI_API_KEY` = your_openai_api_key
   - Add: `VITE_GA_MEASUREMENT_ID` = your_ga_measurement_id

3. **Deploy:**
   - Netlify will automatically deploy
   - Your site will be available at: `https://[site-name].netlify.app`

### Option 3: Railway/Render (Full Server)
**For complete Node.js hosting if you prefer a traditional server setup**

## Files Added for Production

I've created these deployment configuration files:

1. **`vercel.json`** - Vercel deployment configuration
2. **`netlify.toml`** - Netlify deployment configuration  
3. **`api/chat.js`** - Vercel serverless function for chatbot
4. **`functions/chat.js`** - Netlify serverless function for chatbot

## Required Environment Variables

You need to obtain and set these in your deployment platform:

### 1. OpenAI API Key
- Go to [platform.openai.com/api-keys](https://platform.openai.com/api-keys)
- Create a new API key
- Copy the key (starts with `sk-...`)

### 2. Google Analytics Measurement ID
- Go to [analytics.google.com](https://analytics.google.com)
- Create a new property for your website
- Get the Measurement ID (starts with `G-...`)

## Quick Deployment Checklist

1. **Upload all files to your GitHub repository**
2. **Choose deployment platform (Vercel recommended)**
3. **Connect your GitHub repository**
4. **Add environment variables**
5. **Deploy and test**

## Testing Your Deployed Chatbot

After deployment, test these features:

1. **Basic Chatbot Interaction:**
   - Open the chatbot
   - Type "hi" - should respond with greeting
   - Test service inquiries

2. **Fallback Responses:**
   - Even without OpenAI API, chatbot should respond intelligently
   - Test various greetings and common questions

3. **Analytics:**
   - Verify Google Analytics is tracking visitors
   - Check chatbot interaction events

4. **Contact Forms:**
   - Test form submissions
   - Verify emails are sent to support@atnl.com

## Post-Deployment

### Monitor Performance
- Check analytics dashboard for visitor behavior
- Monitor chatbot usage and common questions
- Track contact form conversions

### Updates
- Any changes pushed to GitHub will automatically redeploy
- Monitor for any API rate limits or issues

### Custom Domain (Optional)
- Both Vercel and Netlify support custom domains
- Configure DNS to point to your deployment
- Free SSL certificates included

## Troubleshooting

**Chatbot not responding:**
- Check environment variables are set correctly
- Verify OpenAI API key is valid and has credits
- Fallback responses should still work

**Analytics not tracking:**
- Verify Google Analytics Measurement ID is correct
- Check if ad blockers are interfering
- Events may take 24 hours to appear in GA4

**Forms not working:**
- Verify Formspree integration is active
- Check spam folder for test emails
- Ensure form endpoint URL is correct

Your ATNL website with AI chatbot is ready for professional deployment!