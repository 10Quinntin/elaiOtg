import express from "express";
import cors from "cors";
import chatRoute from "../backend/routes/chat.js";

// Create Express app
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Mount chat route
app.use(chatRoute);

// Export for Vercel serverless function
export default app;
