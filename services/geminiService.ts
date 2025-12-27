import { GoogleGenAI, Modality } from "@google/genai";

/**
 * Direct resolution of the API key from process.env.
 * Bundlers like Vite/Cloudflare require 'process.env.API_KEY' to be 
 * referenced literally for static replacement during the build.
 */
const resolveApiKey = (): string | undefined => {
  try {
    // Static reference for replacement engine
    const key = process.env.API_KEY;
    if (key && key !== "undefined" && key !== "null" && key.trim() !== "") {
      return key;
    }
  } catch (e) {}
  
  // Fallback for shimmed environments
  try {
    const winKey = (window as any).process?.env?.API_KEY;
    if (winKey && winKey !== "undefined" && winKey.trim() !== "") {
      return winKey;
    }
  } catch (e) {}

  return undefined;
};

/**
 * Diagnostic utility to verify API configuration.
 */
export const getConfigurationError = (): string | null => {
  const apiKey = resolveApiKey();
  if (!apiKey) {
    return "Neural Engine Offline: API_KEY is missing. \n\nTroubleshooting:\n1. Verify variable 'API_KEY' exists in Cloudflare Pages settings.\n2. Ensure it is set for ALL environments (Production & Preview).\n3. You MUST trigger a NEW DEPLOYMENT (Retry Deployment) for changes to take effect.";
  }
  return null;
};

/**
 * Decodes raw 16-bit PCM data into an AudioBuffer.
 */
export async function decodeAudioData(
  data: Uint8Array,
  ctx: AudioContext,
  sampleRate: number,
  numChannels: number,
): Promise<AudioBuffer> {
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
      channelData[i] = dataInt16[i * numChannels + channel] / 32768.0;
    }
  }
  return buffer;
}

/**
 * Generates speech with robust part extraction. 
 */
export const generateSpeech = async (text: string, voiceName: string): Promise<string> => {
  const configError = getConfigurationError();
  if (configError) throw new Error(configError);
  
  try {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    
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
      throw new Error("Neural Engine Error.");
    }

    const candidate = response.candidates[0];
    let base64Audio: string | undefined;
    const parts = candidate.content?.parts || [];
    
    for (const part of parts) {
      if (part.inlineData && part.inlineData.data) {
        base64Audio = part.inlineData.data;
        break; 
      }
    }

    if (!base64Audio) throw new Error(`Audio payload missing.`);
    return base64Audio;
  } catch (error: any) {
    console.error("TTS Pipeline Error:", error);
    throw new Error(error.message || "Neural Handshake Interrupted.");
  }
};

/**
 * Strategic interaction logic for 'Swarup' Assistant.
 * Implements strict training, knowledge base grounding, and anti-hallucination guardrails.
 */
export const chatWithAgent = async (message: string, personaDescription: string) => {
  const configError = getConfigurationError();
  if (configError) throw new Error(configError);

  try {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    
    const systemInstruction = `
      # MISSION
      You are "Swarup," the Strategic AI Assistant for Swarups NXT. Convert Indian MSME business owners into leads. 

      # STYLE: EXTREMELY CONCISE & BULLETED
      - Be extremely brief. Maximum 2 sentences.
      - Use ONLY bullet points for features, ROI, or bottlenecks.
      - Use professional Hinglish if the user does.
      - Total response must be under 40 words.

      # CORE KNOWLEDGE
      - AI Voice Agents: 24/7 capture, 80% fewer missed leads.
      - ROI: 40% revenue boost.
      - Setup: 1-Week MVP deployment.

      # CONVERSATIONAL FUNNEL
      1. One-line acknowledgement.
      2. 2-3 Bullet points of value.
      3. Ask for business type or bottleneck.
      4. CTA: Free AI Audit.
    `;

    const chat = ai.chats.create({
      model: 'gemini-3-flash-preview',
      config: {
        systemInstruction: systemInstruction,
        temperature: 0.4,
      },
    });

    const result = await chat.sendMessage({ message: message });
    return result.text || "Neural link stable but response empty.";
  } catch (error: any) {
    console.error("Chat Error:", error);
    throw new Error(`Link Failed: ${error.message || "Neural connection timeout."}`);
  }
};