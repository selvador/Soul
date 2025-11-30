import { GoogleGenAI, Type } from "@google/genai";

// Initialize the API client
// Note: In a real production build, ensure API_KEY is set in environment variables.
const apiKey = process.env.API_KEY || ''; 
const ai = new GoogleGenAI({ apiKey });

export const analyzeJournalEntry = async (entry: string): Promise<any> => {
  if (!apiKey) {
    console.warn("No API Key provided for Gemini.");
    return {
      sentiment: "Neutral",
      supportiveMessage: "Thank you for sharing. (AI analysis requires API Key)",
      suggestedAction: "Take a deep breath."
    };
  }

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: `Analyze the following journal entry from a mental health patient. 
      Provide a response in JSON format with three fields:
      1. 'sentiment' (one word: Positive, Neutral, Negative, Anxious, Hopeful, etc.)
      2. 'supportiveMessage' (A compassionate, brief 1-2 sentence response validating their feelings)
      3. 'suggestedAction' (A simple, actionable self-care step, e.g., 'Try a 5-minute breathing exercise' or 'Go for a short walk')
      
      Journal Entry: "${entry}"`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            sentiment: { type: Type.STRING },
            supportiveMessage: { type: Type.STRING },
            suggestedAction: { type: Type.STRING }
          }
        }
      }
    });

    const text = response.text;
    if (!text) throw new Error("No response from AI");
    
    return JSON.parse(text);
  } catch (error) {
    console.error("Error analyzing journal:", error);
    return {
      sentiment: "Unknown",
      supportiveMessage: "We hear you. It takes courage to write this down.",
      suggestedAction: "Consider reaching out to a friend or therapist if you need immediate support."
    };
  }
};

export const getTriageAnalysis = async (patientNotes: string): Promise<string> => {
   if (!apiKey) return "AI Risk Assessment Unavailable (Missing Key)";

   try {
     const response = await ai.models.generateContent({
       model: "gemini-2.5-flash",
       contents: `Act as a clinical triage assistant. Analyze these patient notes for risk factors (Self-harm, Severe Depression, Manic Episode). 
       Summarize the risk level (Low, Medium, High) and key concerns in max 30 words.
       
       Notes: "${patientNotes}"`
     });
     return response.text || "Analysis failed.";
   } catch (e) {
     return "Error generating analysis.";
   }
}
