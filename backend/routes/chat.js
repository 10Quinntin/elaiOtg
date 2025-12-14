import express from "express";
import { GoogleGenAI } from "@google/genai";

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const userMessage = req.body.message;

    // Validate API key presence for Gemini
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      console.error("GEMINI_API_KEY is not set in environment");
      console.error("Available env vars:", Object.keys(process.env).filter(k => k.includes('GEMINI') || k.includes('API')));
      return res.status(500).json({ 
        reply: "Server misconfigured: missing GEMINI_API_KEY. Please check your Vercel environment variables settings.",
        error: "GEMINI_API_KEY not found"
      });
    }
    
    // Log that API key is found (but don't log the actual key)
    console.log("GEMINI_API_KEY found:", apiKey ? `${apiKey.substring(0, 10)}...` : "NOT FOUND");

    // Initialize Gemini client
    const ai = new GoogleGenAI({ apiKey });
 /// System prompt: makes AI behave like a confident, slightly rude motor rental assistant
 const systemPrompt = `
 You are OntheGo, a confident, blunt motor rental assistant. Address users as "Boss" or "Bossing".
 
 Language: Use ENGLISH for explanations (prices, steps, rules). Use TAGALOG with a "kupal/makapal ang mukha" tone for casual reactions and when pushing decisions. Use aggressive Tagalog ("Ano ba hanap mo?! Gulo?!") ONLY when users are indecisive, unclear, or repeatedly changing requirements. Never start aggressive; don't be aggressive for normal questions.
 
 You're helpful but not polite—get users the right motorcycle efficiently. Answer rental questions, recommend bikes (city/long trips/style/budget), calculate costs, explain policies. Stay concise and direct. Only answer motor rental questions; no legal/medical advice. Stay in character.
 `;

    // Combine system prompt with user message
    const contents = `${systemPrompt}\n\nUser: ${userMessage}`;

    // Generate content
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: contents,
    });

    const aiText = response.text;

    res.json({ reply: aiText });

  } catch (error) {
    console.error("Gemini API error:", error?.message || error);
    console.error("Full error:", error);
    
    let errorMessage = "AI failed to respond";
    
    if (error?.message?.includes("API_KEY_INVALID") || error?.message?.includes("API key")) {
      errorMessage = "AI API error: Invalid API key. Please verify your GEMINI_API_KEY in Vercel environment variables is correct and active.";
    } else if (error?.message?.includes("quota") || error?.message?.includes("limit")) {
      errorMessage = "AI API error: API quota exceeded or rate limit reached. Please check your Google Cloud API usage.";
    } else if (error?.message) {
      errorMessage = `AI API error: ${error.message}`;
    }
    
    res.status(500).json({ reply: errorMessage, error: error?.message || "Unknown error" });
  }
});

export default router;