# GitHub Pages Deployment Guide

## Quick Setup Instructions

### 1. Create GitHub Repository

1. Go to [GitHub](https://github.com) and create a new repository
2. Name it something like `atnl-website` or `debt-recovery-website`
3. Make it public (required for free GitHub Pages)
4. Don't initialize with README (we already have one)

### 2. Upload Your Files

**Option A: Using GitHub Web Interface**
1. Click "uploading an existing file"
2. Drag and drop all files from your project:
   - `index.html`
   - `style.css`
   - `scripts.js`
   - `assets/logo.svg`
   - `README.md`
   - `.gitignore`
3. Write commit message: "Initial website deployment"
4. Click "Commit changes"

**Option B: Using Git Commands**
```bash
git init
git add .
git commit -m "Initial website deployment"
git branch -M main
git remote add origin https://github.com/yourusername/your-repo-name.git
git push -u origin main
```

### 3. Enable GitHub Pages

1. Go to your repository on GitHub
2. Click on **Settings** tab
3. Scroll down to **Pages** in the left sidebar
4. Under **Source**, select "Deploy from a branch"
5. Choose **main** branch
6. Select **/ (root)** folder
7. Click **Save**

### 4. Access Your Website

- Your website will be available at: `https://yourusername.github.io/repository-name/`
- It may take a few minutes for the first deployment
- You'll see a green checkmark when it's ready

## File Structure for GitHub Pages

Your repository should look like this:
```
your-repo-name/
├── index.html          # Required: Main page
├── style.css           # Stylesheet
├── scripts.js          # JavaScript
├── assets/             # Assets folder
│   └── logo.svg        # Logo file
├── README.md           # Project documentation
├── .gitignore          # Git ignore file
└── DEPLOYMENT.md       # This guide
```

## Important Notes

- **index.html must be in the root directory** for GitHub Pages to work
- All file paths are relative (no absolute paths needed)
- CDN links (Google Fonts, Font Awesome) work perfectly with GitHub Pages
- The website is automatically HTTPS enabled
- Updates to your repository will automatically redeploy the site

## Custom Domain (Optional)

If you want to use a custom domain:
1. Add a `CNAME` file with your domain name
2. Configure DNS settings with your domain provider
3. Enable "Enforce HTTPS" in GitHub Pages settings

## Troubleshooting

- **404 Error**: Make sure `index.html` is in the root directory
- **Broken Links**: Check that all file paths are relative
- **Images Not Loading**: Verify the `assets/` folder is uploaded correctly
- **CSS/JS Not Working**: Check file names match exactly (case-sensitive)

Your ATNL website is now ready for professional deployment on GitHub Pages!