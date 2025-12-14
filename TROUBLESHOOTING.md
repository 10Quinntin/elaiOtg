# Troubleshooting Vercel 404 Errors

If you're getting a `404: NOT_FOUND` error, try these steps:

## 1. Check Deployment Status

- Go to your Vercel dashboard
- Check the **Deployments** tab
- Look for any build errors or warnings
- Check the **Functions** tab to see if `/api/chat` is listed

## 2. Verify File Structure

Make sure your project has this structure:
```
CHATBOT-ELAI/
├── api/
│   └── chat.js          ← Must exist
├── backend/
│   └── routes/
│       └── chat.js      ← Must exist
├── frontend/
│   └── (all frontend files)
├── package.json         ← Must be at root
└── vercel.json          ← Must exist
```

## 3. Check Environment Variables

1. Go to **Settings** → **Environment Variables**
2. Verify `GEMINI_API_KEY` is set
3. Make sure it's enabled for **Production**, **Preview**, and **Development**

## 4. Test the API Endpoint

After deployment, test the endpoint directly:

```bash
curl -X POST https://your-project.vercel.app/api/chat \
  -H "Content-Type: application/json" \
  -d '{"message": "Hello"}'
```

Or use a tool like Postman or the browser's Network tab.

## 5. Check Function Logs

1. Go to your Vercel project dashboard
2. Click on **Functions** tab
3. Click on `/api/chat`
4. Check the **Logs** section for any errors

## 6. Common Issues

### Issue: Function not found
**Solution**: Make sure `api/chat.js` exists and is committed to Git

### Issue: Import errors
**Solution**: Check that all dependencies are in `package.json` at the root

### Issue: Route not matching
**Solution**: Vercel auto-detects `api/` folder routes. No explicit routing needed in `vercel.json` for API routes.

### Issue: CORS errors
**Solution**: The CORS middleware is already configured in `api/chat.js`

## 7. Redeploy After Changes

After making any changes:
1. Commit and push to Git
2. Vercel will auto-deploy, OR
3. Manually trigger a redeploy from the dashboard

## 8. Verify Package.json

Make sure `package.json` at root includes all dependencies:
- `express`
- `cors`
- `@google/genai`
- `dotenv`

## Still Having Issues?

1. Check Vercel's build logs for specific errors
2. Verify your Git repository is properly connected
3. Try deploying a simple test function first to verify setup

