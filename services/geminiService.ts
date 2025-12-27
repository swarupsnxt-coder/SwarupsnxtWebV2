import { GoogleGenAI, Modality } from "@google/genai";

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
 * Optimized for mobile lead conversion and Indian MSME ROI.
 */
export const chatWithAgent = async (message: string, personaDescription: string) => {
  try {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    
    const systemInstruction = `
      # MISSION
      You are "Swarup," the Strategic AI Assistant for Swarups NXT. Convert Indian MSME business owners into leads.

      # STYLE: EXTREMELY BRIEF & BULLETED
      - Use ONLY bullet points for key details.
      - Maximum 40 words per response.
      - Use professional Hinglish (e.g., "Missed calls matlab missed revenue") to build rapport.

      # KNOWLEDGE BASE
      - AI Voice Agents: 24/7 capture, 80% fewer missed leads.
      - ROI: 40% revenue boost.
      - Timeline: 1-Week MVP.

      # CONVERSATIONAL STEPS
      1. One-line empathetic acknowledgement.
      2. 2-3 specific ROI bullet points.
      3. ASK: "What is your business type?" or "What's your biggest bottleneck?"
      4. END HIGH-INTENT CHATS WITH: "Shall we schedule a Free AI Audit?"
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
    if (error.message?.includes("API_KEY_INVALID") || error.message?.includes("403")) {
      throw new Error("Auth Failed: Ensure API_KEY is set in Cloudflare and the app is redeployed.");
    }
    throw new Error(`Link Failed: ${error.message || "Neural connection timeout."}`);
  }
};