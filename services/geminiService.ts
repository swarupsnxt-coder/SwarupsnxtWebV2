
import { GoogleGenAI, Modality } from "@google/genai";

/**
 * Safely resolves the API key from the environment.
 */
const resolveApiKey = (): string | undefined => {
  try {
    return (window as any).process?.env?.API_KEY || (process as any)?.env?.API_KEY;
  } catch (e) {
    return undefined;
  }
};

/**
 * Diagnostic utility to verify API configuration.
 * Returns a user-friendly error message if configuration is missing or invalid.
 */
export const getConfigurationError = (): string | null => {
  const apiKey = resolveApiKey();
  if (!apiKey || apiKey.trim() === "" || apiKey === "undefined") {
    return "Service Configuration Problem: The Neural Engine API key is missing. Please check your environment settings.";
  }
  return null;
};

/**
 * Decodes raw PCM data into an AudioBuffer
 */
export async function decodeAudioData(
  data: Uint8Array,
  ctx: AudioContext,
  sampleRate: number,
  numChannels: number,
): Promise<AudioBuffer> {
  const dataInt16 = new Int16Array(data.buffer);
  const frameCount = dataInt16.length / numChannels;
  const buffer = ctx.createBuffer(numChannels, frameCount, sampleRate);

  for (let channel = 0; channel < numChannels; channel++) {
    const channelData = buffer.getChannelData(channel);
    for (let i = 0; i < frameCount; i++) {
      channelData[i] = dataInt16[i * numChannels + channel] / 32768.0;
    }
  }
  return buffer;
}

export const generateSpeech = async (text: string, voiceName: string): Promise<string> => {
  const configError = getConfigurationError();
  if (configError) throw new Error(configError);
  
  if (!text.trim()) {
    throw new Error("Input Error: No text provided for neural synthesis.");
  }

  try {
    const apiKey = resolveApiKey()!;
    const ai = new GoogleGenAI({ apiKey });
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

    const candidate = response.candidates?.[0];
    if (candidate?.finishReason === 'SAFETY') {
      throw new Error("Safety Protocol: The requested content was flagged by neural filters.");
    }

    const base64Audio = candidate?.content?.parts?.[0]?.inlineData?.data;
    if (!base64Audio) {
      throw new Error("Neural Engine Error: No audio data returned from the service.");
    }
    return base64Audio;
  } catch (error: any) {
    const msg = error.message || "";
    if (msg.includes('API key not valid') || msg.includes('403') || msg.includes('API_KEY_INVALID')) {
      throw new Error("Service Configuration Problem: The provided API key is invalid or has insufficient permissions.");
    }
    if (msg.includes('429')) {
      throw new Error("Quota Exceeded: The Neural Engine is processing too many requests. Please try again later.");
    }
    throw new Error(msg || "An unexpected error occurred during neural synthesis.");
  }
};

export const chatWithAgent = async (message: string, personaDescription: string) => {
  const configError = getConfigurationError();
  if (configError) throw new Error(configError);

  if (!message.trim()) {
    throw new Error("Transmission Error: Empty message signal.");
  }
  
  try {
    const apiKey = resolveApiKey()!;
    const ai = new GoogleGenAI({ apiKey });
    const chat = ai.chats.create({
      model: 'gemini-3-flash-preview',
      config: {
        systemInstruction: `You are a digital employee at Swarups NXT. Persona: ${personaDescription}. Be concise and professional.`,
      },
    });

    const result = await chat.sendMessage({ message });
    
    if (result.candidates?.[0]?.finishReason === 'SAFETY') {
      return "[NEURAL BLOCK]: Content restricted by safety protocols.";
    }

    return result.text || "Empty signal received from neural core.";
  } catch (error: any) {
    const msg = error.message || "";
    if (msg.includes('API key not valid') || msg.includes('403') || msg.includes('API_KEY_INVALID')) {
      throw new Error("Service Configuration Problem: Invalid Neural Link credentials.");
    }
    throw new Error(`Neural Link Error: ${msg || "Connection timed out."}`);
  }
};
