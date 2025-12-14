# Vercel Deployment Guide

This guide will help you deploy your CHATBOT-ELAI application to Vercel using the **web dashboard**.

## Quick Start (Web Dashboard)

1. **Push code to Git** → Commit and push all changes to your repository
2. **Go to Vercel** → https://vercel.com/new → Import your repository
3. **Configure** → Framework: "Other", Root: `./`, Build/Output: leave empty
4. **Add Environment Variable** → `GEMINI_API_KEY` = your API key (select all environments)
5. **Deploy** → Click "Deploy" and wait for completion
6. **Done!** → Your app is live at `https://your-project.vercel.app`

## Prerequisites

1. A Vercel account (sign up at https://vercel.com)
2. Git repository (GitHub, GitLab, or Bitbucket)
3. Your `GEMINI_API_KEY` environment variable

## Deployment Steps

### 1. Push Your Code to Git

Make sure all your changes are committed and pushed to your Git repository:

```bash
git add .
git commit -m "Setup for Vercel deployment"
git push origin main
```

**Important**: Your code must be in a Git repository (GitHub, GitLab, or Bitbucket) for Vercel web deployment.

### 2. Deploy via Vercel Web Dashboard

1. **Go to Vercel Dashboard**
   - Visit https://vercel.com and sign in (or create an account)
   - Click **"Add New..."** → **"Project"**

2. **Import Your Repository**
   - Connect your Git provider (GitHub, GitLab, or Bitbucket) if not already connected
   - Search for and select your `CHATBOT-ELAI` repository
   - Click **"Import"**

3. **Configure Project Settings**
   - **Framework Preset**: Select **"Other"** or leave as **"No Framework"**
   - **Root Directory**: Leave as **`./`** (root of repository)
   - **Build Command**: Leave **empty** (Vercel will auto-detect from `vercel.json`)
   - **Output Directory**: Leave **empty** (static files are served from `frontend/`)
   - **Install Command**: Leave as default (`npm install`)

4. **Set Environment Variables** (IMPORTANT - Do this before deploying!)
   - Before clicking "Deploy", expand the **"Environment Variables"** section
   - Click **"Add"** to add a new variable:
     - **Key**: `GEMINI_API_KEY`
     - **Value**: Your **PRODUCTION** Google Gemini API key
       - 💡 **Best Practice**: Use a different API key for production than your development key
       - Your local `.env` file will continue using your dev key
       - Vercel will use this production key
     - **Environments**: Select all (Production, Preview, Development)
   - Click **"Add"** to save

5. **Deploy**
   - Click the **"Deploy"** button
   - Wait for the build to complete (usually 1-2 minutes)
   - Once deployed, you'll see a success message with your deployment URL

### 3. Verify Deployment

After deployment completes:
- Your app will be live at: `https://your-project-name.vercel.app`
- Test the main page: `https://your-project-name.vercel.app/`
- Test the AI Assistant: `https://your-project-name.vercel.app/assistant.html`
- Test the API endpoint: `https://your-project-name.vercel.app/api/chat`

### Alternative: Using Vercel CLI (Optional)

If you prefer command-line deployment:

1. Install Vercel CLI: `npm install -g vercel`
2. Login: `vercel login`
3. Deploy: `vercel --prod`

### 4. Update Environment Variables (If Needed Later)

If you need to add or update environment variables after deployment:

1. Go to your project dashboard on Vercel
2. Navigate to **Settings** → **Environment Variables**
3. Add or edit variables as needed
4. **Redeploy** your project for changes to take effect (click "Redeploy" in the Deployments tab)

## Project Structure

```
CHATBOT-ELAI/
├── api/
│   └── chat.js           # Vercel serverless function for /api/chat endpoint
├── backend/
│   ├── routes/
│   │   └── chat.js       # Chat API route logic
│   └── server.js         # Local development server
├── frontend/
│   ├── *.html            # Frontend pages (index.html, assistant.html, etc.)
│   ├── chat.js           # Frontend chat logic (updated for Vercel)
│   └── style.css         # Styles
├── package.json          # Root package.json for Vercel (dependencies)
├── vercel.json           # Vercel configuration (routing & builds)
└── .vercelignore         # Files to ignore during deployment
```

## Important Notes

1. **Environment Variables**: 
   - Set `GEMINI_API_KEY` in Vercel dashboard with your **PRODUCTION** API key
   - Your local `.env` file uses your **DEVELOPMENT** API key
   - These are completely separate - you can use different keys for each environment (recommended!)

2. **API Routes**: The API is accessible at `/api/chat` endpoint. The frontend automatically detects the correct API URL based on the current domain.

3. **Local Development**: For local development, continue using:
   ```bash
   cd backend
   npm start
   ```
   The frontend will work with localhost:3000 when running locally.
   - Uses API key from `.env` file (development key)
   - Vercel deployment uses environment variable (production key)

4. **Static Files**: All frontend files are served from the `/frontend` directory.

## Troubleshooting

### API Not Working
- Check that `GEMINI_API_KEY` is set in Vercel environment variables
- Verify the API route is accessible at `/api/chat`
- Check Vercel function logs in the dashboard

### Frontend Not Loading
- Verify `vercel.json` routes are correctly configured
- Check that frontend files are in the `frontend/` directory
- Review Vercel build logs for errors

### Build Errors
- Ensure `package.json` is at the root directory
- Check that all dependencies are listed in `package.json`
- Verify Node.js version compatibility (Vercel uses Node.js 18.x by default)

## Additional Resources

- [Vercel Documentation](https://vercel.com/docs)
- [Vercel Serverless Functions](https://vercel.com/docs/functions)
- [Environment Variables in Vercel](https://vercel.com/docs/concepts/projects/environment-variables)

