import { GoogleGenAI, Modality } from "@google/genai";

/**
 * Decodes raw 16-bit PCM data into an AudioBuffer.
 * Used in the frontend.
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
 * Generates speech (TTS) using Gemini 2.5 Flash.
 * Accept 'env' for Cloudflare Worker compatibility.
 */
export const generateSpeech = async (text: string, voiceName: string, env?: any): Promise<string> => {
  // Cloudflare Environment Bridge
  if (env?.API_KEY) {
    if (typeof process === 'undefined') (globalThis as any).process = { env: {} };
    process.env.API_KEY = env.API_KEY;
  }

  try {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });
    
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash-preview-tts",
      contents: [{ parts: [{ text }] }],
      config: {
        responseModalities: [Modality.AUDIO],
        speechConfig: {
          voiceConfig: {
            prebuiltVoiceConfig: { voiceName: voiceName as any },
          },
        },
      },
    });

    const candidate = response.candidates?.[0];
    const base64Audio = candidate?.content?.parts?.find(p => p.inlineData)?.inlineData?.data;

    if (!base64Audio) throw new Error("Vocal signal lost in transmission.");
    return base64Audio;
  } catch (error: any) {
    console.error("TTS Pipeline Error:", error);
    throw error;
  }
};

/**
 * Strategic interaction logic for 'Swarup' Assistant.
 * Accept 'env' for Cloudflare Worker compatibility.
 */
export const chatWithAgent = async (message: string, personaDescription: string, env?: any) => {
  // Cloudflare Environment Bridge
  if (env?.API_KEY) {
    if (typeof process === 'undefined') (globalThis as any).process = { env: {} };
    process.env.API_KEY = env.API_KEY;
  }

  try {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });
    
    const systemInstruction = `
      # IDENTITY
      You are "Swarup," the AI Strategic Assistant for Swarups NXT. 
      Persona: Confident, ROI-focused, "Value for Money."

      # MISSION
      Convert Indian MSME owners into high-intent leads. 

      # RULES
      - BRIEF. Max 25 words.
      - Use Bullet Points only.
      - Use "Hinglish" naturally (e.g., "Missed calls matlab paison ka nuksaan").
      - Never say "I don't know." Say: "Ye hum AI Audit mein finalise karenge."

      # OFFER
      - 80% fewer missed calls.
      - 40% revenue boost.
      - 1-Week MVP Live.

      # FLOW
      1. One-line empathy.
      2. 2 ROI Bullets.
      3. ASK: "What is your business type?"
      4. ASK: "Audit fix karein?"
    `;

    const chat = ai.chats.create({
      model: 'gemini-3-flash-preview',
      config: {
        systemInstruction: systemInstruction,
        temperature: 0.5,
      },
    });

    const result = await chat.sendMessage({ message });
    return result.text || "Signal detected. Ready for protocol.";
  } catch (error: any) {
    console.error("Chat Error:", error);
    throw error;
  }
};