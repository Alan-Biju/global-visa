import { GoogleGenAI } from "@google/genai";

// Prompt provided in the requirements
const HERO_IMAGE_PROMPT = "Create a minimal hero illustration for a dark, modern landing page: an abstract low-poly 3D geometric shape with smooth purple and teal gradient. Add a subtle soft glow, faint ambient light, and gentle grain texture. Center composition, clean edges, futuristic aesthetic. Transparent background. Ultra-high quality. Resolution 2400x1200 PNG.";

export const generateHeroImage = async (): Promise<string | null> => {
  const apiKey = process.env.API_KEY;
  if (!apiKey) {
    console.warn("API Key not found in environment variables.");
    return null;
  }

  try {
    const ai = new GoogleGenAI({ apiKey });
    // Using gemini-2.5-flash-image for generation as it's efficient for this task
    // unless high fidelity is strictly required, but flash-image is usually sufficient and faster.
    // If the prompt strictly requested 4k/complex detail, we might use gemini-3-pro-image-preview
    // but the prompt is abstract low-poly, which flash handles well.
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
