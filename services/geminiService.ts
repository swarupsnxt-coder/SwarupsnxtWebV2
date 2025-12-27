import { GoogleGenAI, Modality } from "@google/genai";

/**
 * Safely resolves the API key from the environment.
 */
const resolveApiKey = (): string | undefined => {
  try {
    return process.env.API_KEY;
  } catch (e) {
    return undefined;
  }
};

/**
 * Diagnostic utility to verify API configuration.
 */
export const getConfigurationError = (): string | null => {
  const apiKey = resolveApiKey();
  if (!apiKey || apiKey.trim() === "" || apiKey === "undefined") {
    return "Neural Engine Offline: API key is missing. Please ensure your environment is configured correctly.";
  }
  return null;
};

/**
 * Decodes raw 16-bit PCM data into an AudioBuffer.
 * Optimized for the raw PCM stream (S16_LE) returned by the Gemini TTS model.
 */
export async function decodeAudioData(
  data: Uint8Array,
  ctx: AudioContext,
  sampleRate: number,
  numChannels: number,
): Promise<AudioBuffer> {
  // Ensure the byte length is even for Int16 conversion
  const evenLength = data.byteLength - (data.byteLength % 2);
  const dataInt16 = new Int16Array(
    data.buffer,
    data.byteOffset,
    evenLength / 2
  );
  
  const frameCount = dataInt16.length / numChannels;
  const buffer = ctx.createBuffer(numChannels, frameCount, sampleRate);

  for (let channel = 0; channel < numChannels; channel++) {
    const channelData = buffer.getChannelData(channel);
    for (let i = 0; i < frameCount; i++) {
      // Normalize Int16 range [-32768, 32767] to Float32 range [-1.0, 1.0]
      channelData[i] = dataInt16[i * numChannels + channel] / 32768.0;
    }
  }
  return buffer;
}

/**
 * Generates speech with robust part extraction. 
 * Optimized to prevent 'OTHER' finish reasons by using shorter, clearer prompts.
 */
export const generateSpeech = async (text: string, voiceName: string): Promise<string> => {
  const configError = getConfigurationError();
  if (configError) throw new Error(configError);
  
  try {
    const apiKey = resolveApiKey()!;
    const ai = new GoogleGenAI({ apiKey });
    
    // The TTS model is highly sensitive to prompt structure.
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash-preview-tts",
      contents: [{ parts: [{ text }] }],
      config: {
        responseModalities: [Modality.AUDIO],
        speechConfig: {
          voiceConfig: {
            prebuiltVoiceConfig: { voiceName },
          },
        },
      },
    });

    if (!response.candidates || response.candidates.length === 0) {
      throw new Error("Neural Engine Error: The model returned no candidates.");
    }

    const candidate = response.candidates[0];
    
    // Safety check
    if (candidate.finishReason === 'SAFETY') {
      throw new Error("Content Filter Block: The requested text was flagged by safety protocols.");
    }

    // Extraction loop for the inlineData part
    let base64Audio: string | undefined;
    const parts = candidate.content?.parts || [];
    
    for (const part of parts) {
      if (part.inlineData && part.inlineData.data) {
        base64Audio = part.inlineData.data;
        break; 
      }
    }

    if (!base64Audio) {
      const reason = candidate.finishReason || "UNKNOWN";
      const textPart = parts.find(p => p.text)?.text;
      
      if (textPart) {
        throw new Error(`Neural Refusal: ${textPart}`);
      }
      
      throw new Error(`Neural Sync Failure: Audio payload missing from response. Finish Reason: ${reason}.`);
    }

    return base64Audio;
  } catch (error: any) {
    console.error("TTS Pipeline Error:", error);
    throw new Error(error.message || "Neural Handshake Interrupted.");
  }
};

/**
 * Standard chat interaction logic with ROI-focused persona.
 * Enforces concise bulleted responses.
 */
export const chatWithAgent = async (message: string, personaDescription: string) => {
  const configError = getConfigurationError();
  if (configError) throw new Error(configError);

  try {
    const apiKey = resolveApiKey()!;
    const ai = new GoogleGenAI({ apiKey });
    const chat = ai.chats.create({
      model: 'gemini-3-flash-preview',
      config: {
        systemInstruction: `
          You are 'Swarup', a Strategic AI Assistant for Swarups NXT.
          RULES:
          1. Keep responses EXTREMELY concise.
          2. Use BULLET POINTS for all lists/features.
          3. Focus on ROI and business value (80% fewer missed calls, 40% revenue boost).
          4. If user asks for pricing, explain that it is an investment starting at $1.50/hr that pays for itself in 30 days.
          5. End high-intent messages with a CTA for a Free AI Audit.
        `,
      },
    });

    const result = await chat.sendMessage({ message });
    return result.text || "Connection stable but signal empty.";
  } catch (error: any) {
    console.error("Chat Error:", error);
    throw new Error(`Link Failed: ${error.message || "Neural connection timeout."}`);
  }
};
