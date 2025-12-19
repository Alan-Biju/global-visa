
import { GoogleGenAI } from "@google/genai";

// Prompt provided in the requirements
const HERO_IMAGE_PROMPT = "Create a minimal hero illustration for a dark, modern landing page: an abstract low-poly 3D geometric shape with smooth purple and teal gradient. Add a subtle soft glow, faint ambient light, and gentle grain texture. Center composition, clean edges, futuristic aesthetic. Transparent background. Ultra-high quality. Resolution 2400x1200 PNG.";

export const generateHeroImage = async (): Promise<string | null> => {
  // Always initialize right before making an API call to ensure use of correct API key
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

  try {
    // Using gemini-2.5-flash-image for generation as it's efficient for this abstract geometric task
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: {
        parts: [
          { text: HERO_IMAGE_PROMPT }
        ]
      },
      config: {
        imageConfig: {
            aspectRatio: "16:9",
        }
      }
    });

    // Iterate through all parts to find the image part, as per @google/genai best practices
    for (const part of response.candidates?.[0]?.content?.parts || []) {
        if (part.inlineData) {
            return `data:image/png;base64,${part.inlineData.data}`;
        }
    }

    return null;

  } catch (error) {
    console.error("Error generating image:", error);
    return null;
  }
};
