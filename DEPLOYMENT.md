# Greek Life App Deployment Guide

## Option 1: GitHub Pages (Recommended - Free)

### Step 1: Create GitHub Repository
1. Go to [GitHub.com](https://github.com) and sign in
2. Click the "+" icon in the top right and select "New repository"
3. Name it `greek-life`
4. Make it **Public** (required for free GitHub Pages)
5. Don't initialize with README (we'll push existing code)
6. Click "Create repository"

### Step 2: Update Homepage URL
Edit `package.json` and replace `yourusername` with your actual GitHub username:
```json
"homepage": "https://yourusername.github.io/greek-life"
```

### Step 3: Initialize Git and Push to GitHub
```bash
# Initialize git repository
git init

# Add all files
git add .

# Commit changes
git commit -m "Initial commit"

# Add GitHub as remote (replace YOUR_USERNAME with your GitHub username)
git remote add origin https://github.com/YOUR_USERNAME/greek-life.git

# Push to GitHub
git branch -M main
git push -u origin main
```

### Step 4: Deploy to GitHub Pages
```bash
# Deploy the app
npm run deploy
```

### Step 5: Enable GitHub Pages
1. Go to your repository on GitHub
2. Click "Settings" tab
3. Scroll down to "Pages" section
4. Under "Source", select "Deploy from a branch"
5. Select "gh-pages" branch and "/(root)" folder
6. Click "Save"

Your app will be available at: `https://yourusername.github.io/greek-life`

---

## Option 2: Netlify (Alternative - Free)

### Step 1: Build the App
```bash
npm run build
```

### Step 2: Deploy to Netlify
1. Go to [Netlify.com](https://netlify.com) and sign up/login
2. Drag and drop your `build` folder to the Netlify dashboard
3. Or connect your GitHub repository for automatic deployments

### Step 3: Custom Domain (Optional)
- Netlify provides a random URL like `https://amazing-app-123456.netlify.app`
- You can customize this in the site settings

---

## Option 3: Vercel (Alternative - Free)

### Step 1: Install Vercel CLI
```bash
npm install -g vercel
```

### Step 2: Deploy
```bash
vercel
```

Follow the prompts to connect your GitHub account and deploy.

---

## Option 4: Firebase Hosting (Alternative - Free)

### Step 1: Install Firebase CLI
```bash
npm install -g firebase-tools
```

### Step 2: Login and Initialize
```bash
firebase login
firebase init hosting
```

### Step 3: Build and Deploy
```bash
npm run build
firebase deploy
```

---

## Troubleshooting

### Common Issues:

1. **404 Errors on GitHub Pages**: Make sure your `homepage` field in `package.json` matches your repository name exactly.

2. **Build Errors**: Run `npm run build` locally first to check for any build issues.

3. **Routing Issues**: If you have client-side routing, you might need to configure your hosting provider for SPA routing.

### For GitHub Pages with React Router:
Add a `404.html` file in the `public` folder:
```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title>Greek Life App</title>
    <script type="text/javascript">
      var pathSegmentsToKeep = 1;
      var l = window.location;
      l.replace(
        l.protocol + '//' + l.hostname + (l.port ? ':' + l.port : '') +
        l.pathname.split('/').slice(0, 1 + pathSegmentsToKeep).join('/') + '/?/' +
        l.pathname.slice(1).split('/').slice(pathSegmentsToKeep).join('/').replace(/&/g, '~and~') +
        (l.search ? '&' + l.search.slice(1).replace(/&/g, '~and~') : '') +
        l.hash
      );
    </script>
  </head>
  <body>
  </body>
</html>
```

And add this script to your `public/index.html` before the closing `</head>` tag:
```html
<script type="text/javascript">
  (function(l) {
    if (l.search[1] === '/' ) {
      var decoded = l.search.slice(1).split('&').map(function(s) { 
        return s.replace(/~and~/g, '&')
      }).join('?');
      window.history.replaceState(null, null,
          l.pathname.slice(0, -1) + decoded + l.hash
      );
    }
  }(window.location))
</script>
```

## Quick Start Commands

For GitHub Pages (most common):
```bash
# 1. Update package.json homepage field with your username
# 2. Initialize git and push to GitHub
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/YOUR_USERNAME/greek-life.git
git branch -M main
git push -u origin main

# 3. Deploy
npm run deploy
```

Your app will be live and shareable! 🎉 