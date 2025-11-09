
import { GoogleGenAI } from "@google/genai";

if (!process.env.API_KEY) {
    throw new Error("API_KEY environment variable is not set.");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

interface FileData {
  mimeType: string;
  data: string; // Base64 encoded string
}

const fileToGenerativePart = (fileData: FileData) => {
  return {
    inlineData: {
      data: fileData.data,
      mimeType: fileData.mimeType,
    },
  };
};

export const generateContent = async (prompt: string, file?: FileData): Promise<string> => {
    try {
        const model = 'gemini-2.5-flash';
        
        if (file) {
            const imagePart = fileToGenerativePart(file);
            const response = await ai.models.generateContent({
                model: model,
                contents: { parts: [{ text: prompt }, imagePart] },
            });
            return response.text;
        } else {
             const response = await ai.models.generateContent({
                model: model,
                contents: prompt,
            });
            return response.text;
        }
    } catch (error) {
        console.error("Error generating content:", error);
        return "Sorry, I encountered an error. Please check the console for details.";
    }
};
