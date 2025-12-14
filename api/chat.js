import express from "express";
import cors from "cors";
import chatRoute from "../backend/routes/chat.js";

const app = express();
app.use(cors());
app.use(express.json());

// Mount the chat route
app.use("/", chatRoute);

// Export as serverless function
export default app;

