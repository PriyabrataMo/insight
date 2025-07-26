import { GoogleGenerativeAI } from "@google/generative-ai";

const API_KEY = process.env.NEXT_PUBLIC_GEMINI_API_KEY;

if (!API_KEY) {
  throw new Error("Missing NEXT_PUBLIC_GEMINI_API_KEY environment variable");
}

const genAI = new GoogleGenerativeAI(API_KEY);

export async function generateActionItems(
  transcript: string
): Promise<string[]> {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash-lite" });
    const prompt = `
      Analyze the following meeting transcript and extract actionable tasks. 
      Return ONLY a JSON array of strings, where each string is a specific, actionable task.
      Each task should be clear, concise, and include who should do it if mentioned.
      
      Example format: ["John will send the quarterly report by Friday", "Schedule follow-up meeting with client", "Review budget proposal and provide feedback"]
      
      Meeting transcript:
      ${transcript}
      
      Return only the JSON array, no additional text or formatting:
    `;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    console.log("Raw response text:", text);
    // Clean the response and parse JSON
    const cleanText = text.replace(/```json|```/g, "").trim();

    try {
      const actionItems = JSON.parse(cleanText);
      return Array.isArray(actionItems) ? actionItems : [];
    } catch (parseError) {
      console.error("Failed to parse action items:", parseError);
      // Fallback: extract items from text if JSON parsing fails
      const lines = text
        .split("\n")
        .filter((line) => line.trim() && !line.includes("```"));
      return lines
        .map((line) => line.replace(/^[-*•]\s*/, "").trim())
        .filter((item) => item.length > 0);
    }
  } catch (error) {
    console.error("Error generating action items:", error);
    throw new Error("Failed to generate action items. Please try again.");
  }
}
