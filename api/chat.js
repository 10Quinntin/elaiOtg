import { GoogleGenAI } from "@google/genai";

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const userMessage = req.body.message;

    // Validate API key presence for Gemini
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      console.error("GEMINI_API_KEY is not set in environment");
      return res.status(500).json({ reply: "Server misconfigured: missing GEMINI_API_KEY. Add it to .env and restart the server." });
    }

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
    const userMessage = (error && error.message && error.message.includes("API_KEY_INVALID"))
      ? "AI API error: API key invalid. Check your GEMINI_API_KEY and that the Generative Language API is enabled in Google Cloud."
      : "AI failed to respond";
    res.status(500).json({ reply: userMessage });
  }
}