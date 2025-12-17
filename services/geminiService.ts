
import { GoogleGenAI, Type } from "@google/genai";
import { Recipe } from "../types";

// Always use process.env.API_KEY
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const recipeSchema = {
  type: Type.ARRAY,
  items: {
    type: Type.OBJECT,
    properties: {
      id: { type: Type.STRING },
      name: { type: Type.STRING },
      description: { type: Type.STRING },
      time: { type: Type.STRING },
      difficulty: { type: Type.STRING },
      calories: { type: Type.STRING },
      moodTag: { type: Type.STRING },
      emojis: { type: Type.ARRAY, items: { type: Type.STRING } },
      imagePrompt: { type: Type.STRING },
      ingredients: {
        type: Type.ARRAY,
        items: {
          type: Type.OBJECT,
          properties: {
            name: { type: Type.STRING },
            amount: { type: Type.STRING },
            category: { type: Type.STRING },
            note: { type: Type.STRING },
          },
          required: ["name", "amount", "category"]
        }
      },
      directions: {
        type: Type.ARRAY,
        items: {
          type: Type.OBJECT,
          properties: {
            title: { type: Type.STRING },
            text: { type: Type.STRING },
          },
          required: ["title", "text"]
        }
      }
    },
    required: ["id", "name", "description", "ingredients", "directions", "time", "difficulty", "calories", "moodTag", "emojis", "imagePrompt"]
  }
};

export async function generateRecipes(mood: string): Promise<Recipe[]> {
  const prompt = `Generate 3 unique and creative recipes for someone feeling: "${mood}". 
  Provide detailed instructions, ingredients categorized by supermarket aisle (Produce, Meat & Dairy, Pantry, etc.), 
  and meta-info like calories and prep time. 
  Include a very detailed imagePrompt (e.g. "Close-up high quality food photography of...") describing the final dish for an AI image generator.`;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: recipeSchema,
      },
    });

    const text = response.text;
    if (!text) throw new Error("No response from AI");
    
    return JSON.parse(text) as Recipe[];
  } catch (error) {
    console.error("Gemini Error:", error);
    return [];
  }
}

export async function generateRecipeImage(prompt: string): Promise<string | null> {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: {
        parts: [{ text: `${prompt}. High quality food photography, professional lighting, appetizing, top-down or 45 degree angle, white plate, wooden table background, garnish, 4k resolution.` }],
      },
      config: {
        imageConfig: {
          aspectRatio: "16:9",
        },
      },
    });

    for (const part of response.candidates[0].content.parts) {
      if (part.inlineData) {
        return `data:${part.inlineData.mimeType};base64,${part.inlineData.data}`;
      }
    }
    return null;
  } catch (error) {
    console.error("Image Generation Error:", error);
    return null;
  }
}
