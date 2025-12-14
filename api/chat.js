// Vercel serverless function for /api/chat endpoint
import express from "express";
import cors from "cors";
import chatRoute from "../backend/routes/chat.js";

const app = express();

// Enable CORS for all origins
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type']
}));

app.use(express.json());

// Mount the chat route
app.use("/", chatRoute);

// Handle OPTIONS requests for CORS preflight
app.options("*", (req, res) => {
  res.sendStatus(200);
});

// Export the Express app
// Vercel automatically converts Express apps to serverless functions
export default app;
