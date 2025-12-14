# Vercel Environment Variable Setup Guide

## Problem: "Having trouble connecting" after deployment

This usually means the `GEMINI_API_KEY` environment variable is either:
1. Not set in Vercel
2. Set incorrectly (wrong value or name)
3. Not applied to the deployment

## Step-by-Step Fix

### 1. Get Your Production API Key

**Best Practice**: Use separate API keys for development and production!

1. **Go to [Google AI Studio](https://makersuite.google.com/app/apikey)**
2. **Create a NEW API key for production** (recommended)
   - This allows you to:
     - Track usage separately
     - Revoke/rotate keys independently
     - Set different quotas/limits
     - Keep production secure if dev key is compromised
3. **OR use your existing production key** if you already have one

**Note**: Your local development will continue using the key in your `.env` file. Vercel will use the key you set in environment variables - they are completely separate!

### 2. Set Environment Variable in Vercel

1. **Go to Vercel Dashboard**
   - Visit https://vercel.com
   - Select your project

2. **Navigate to Settings**
   - Click on **"Settings"** tab
   - Click on **"Environment Variables"** in the left sidebar

3. **Add/Update the Variable**
   - **Key**: `GEMINI_API_KEY` (must be EXACTLY this, case-sensitive)
   - **Value**: Paste your **PRODUCTION** Google Gemini API key (different from your dev key)
   - **Environments**: Select ALL three:
     - ✅ Production
     - ✅ Preview  
     - ✅ Development
   
   **Important**: This is your PRODUCTION key. Your local `.env` file will continue using your development key.

4. **Save**
   - Click **"Save"** button
   - Wait for confirmation

### 3. Redeploy Your Project

**CRITICAL**: Environment variables only apply to NEW deployments!

After setting/updating environment variables:

1. **Option A: Manual Redeploy**
   - Go to **"Deployments"** tab
   - Click the **"⋯"** (three dots) menu on the latest deployment
   - Click **"Redeploy"**
   - Confirm the redeploy

2. **Option B: Trigger via Git**
   - Make a small change (add a comment, update README)
   - Commit and push to trigger auto-deployment

### 4. Verify the Environment Variable

After redeployment, check if it's working:

1. **Check Function Logs**
   - Go to **"Functions"** tab
   - Click on `/api/chat`
   - Click **"Logs"** tab
   - Look for: `GEMINI_API_KEY found: AIza...` (should show first 10 chars)
   - If you see: `GEMINI_API_KEY not found` → Variable not set correctly

2. **Test the API**
   - Try using the chat interface
   - Or test directly:
     ```bash
     curl -X POST https://your-project.vercel.app/api/chat \
       -H "Content-Type: application/json" \
       -d '{"message": "Hello"}'
     ```

### 5. Common Mistakes to Avoid

❌ **Wrong variable name**
- Wrong: `GEMINI_API_KEY_VERCEL`
- Wrong: `gemini_api_key` (case-sensitive!)
- ✅ Correct: `GEMINI_API_KEY`

❌ **Not selecting all environments**
- Make sure Production, Preview, AND Development are all checked

❌ **Not redeploying after setting variable**
- Environment variables only apply to NEW deployments
- You MUST redeploy after adding/updating variables

❌ **Copy-paste errors**
- Make sure there are no extra spaces before/after the API key
- Don't include quotes around the value
- Don't include `GEMINI_API_KEY=` prefix (just the key itself)

❌ **Using expired/invalid API key**
- Verify your API key works by testing it locally first
- Make sure the API key has proper permissions in Google Cloud Console

## Troubleshooting

### Still getting "trouble connecting"?

1. **Check the exact error message**
   - Go to Vercel → Functions → `/api/chat` → Logs
   - Look for the specific error

2. **Verify variable is set**
   - In Vercel dashboard → Settings → Environment Variables
   - Confirm `GEMINI_API_KEY` exists and has a value

3. **Check API key validity**
   - Test the same API key locally in your `.env` file
   - If it works locally but not on Vercel, it's a Vercel config issue
   - If it doesn't work locally either, the API key might be invalid

4. **Verify deployment includes the variable**
   - After redeploying, check the deployment logs
   - Look for any warnings about environment variables

5. **Check Google Cloud API status**
   - Make sure Generative Language API is enabled
   - Check if there are any quota/usage limits

## Quick Checklist

- [ ] **Production API key** is valid and active (can be different from dev key)
- [ ] Variable name is exactly `GEMINI_API_KEY` (case-sensitive)
- [ ] Variable value is correct (no extra spaces/quotes)
- [ ] All environments are selected (Production, Preview, Development)
- [ ] Project has been redeployed AFTER setting the variable
- [ ] Function logs show the API key is being found
- [ ] Google Cloud API is enabled and has quota available
- [ ] Local `.env` file still has your development key (for local testing)

## Separate Development and Production Keys

**Current Setup:**
- **Local Development**: Uses `.env` file → `GEMINI_API_KEY=your_dev_key`
- **Vercel Production**: Uses environment variables → `GEMINI_API_KEY=your_production_key`

This is the **recommended approach** because:
- ✅ Security: If dev key is exposed, production stays safe
- ✅ Tracking: Separate usage metrics for dev vs production
- ✅ Control: Can revoke/rotate keys independently
- ✅ Quotas: Can set different limits for each environment

## Still Need Help?

If you've checked everything above and it's still not working:

1. Check Vercel function logs for the exact error
2. Verify your API key works in a local test
3. Try creating a fresh API key and updating it in Vercel
4. Check Vercel's status page for any service issues

