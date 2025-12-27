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
    // Literal reference for Vite/Cloudflare build-time replacement
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
 * Optimized for Indian MSME lead generation.
 */
export const chatWithAgent = async (message: string, personaDescription: string) => {
  try {
    // Literal reference for Vite/Cloudflare build-time replacement
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });
    
    const systemInstruction = `
      # IDENTITY
      You are "Swarup," the Strategic AI Assistant for Swarups NXT. 
      Persona: Confident, direct, ROI-focused, "Value for Money."

      # MISSION
      Convert Indian MSME/SMB owners into leads. 

      # CONVERSATIONAL STYLE
      - EXTREMELY BRIEF. Under 25 words.
      - Use ONLY bullet points for value.
      - Use "Hinglish" naturally (e.g., "Missed calls matlab leads ka loss").
      - Never say "I don't know." Say: "Ye specific detail hum AI Audit mein discuss karenge."

      # CORE KNOWLEDGE
      - AI Voice Agents: 24/7 capture, 80% fewer missed calls.
      - ROI: 40% revenue boost.
      - Speed: 1-Week MVP Live.

      # FLOW
      1. Acknowledge pain point (missed calls/manual work).
      2. 2 Bullets on ROI.
      3. ASK: "What is your business type?"
      4. END WITH: "Should we schedule a Free AI Audit to map your 40% revenue boost?"
    `;

    const chat = ai.chats.create({
      model: 'gemini-3-flash-preview',
      config: {
        systemInstruction: systemInstruction,
        temperature: 0.4,
      },
    });

    const result = await chat.sendMessage({ message });
    return result.text || "Neural link established. Awaiting input.";
  } catch (error: any) {
    console.error("Chat Error:", error);
    if (error.message?.includes("API_KEY_INVALID") || error.message?.includes("403")) {
      throw new Error("Neural Auth Failed. Please verify API_KEY in Cloudflare and Redeploy.");
    }
    throw error;
  }
};