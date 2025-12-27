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
    // Direct use of process.env.API_KEY for bundler replacement
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
 * Optimized for Indian MSME lead generation and high-conversion brevity.
 */
export const chatWithAgent = async (message: string, personaDescription: string) => {
  try {
    // Direct use of process.env.API_KEY for bundler replacement
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });
    
    const systemInstruction = `
      # IDENTITY
      You are "Swarup," the AI Strategic Assistant for Swarups NXT. 

      # MISSION
      Convert Indian MSME owners into leads. 

      # CONVERSATIONAL RULES
      - Be EXTREMELY BRIEF. Under 30 words per response.
      - Use ONLY bullet points for ROI or features.
      - Use Hinglish phrases naturally (e.g., "Missed calls matlab loss").
      - Never say "I don't know." Instead: "Let's discuss this in your Free AI Audit."

      # CORE OFFER
      - 80% fewer missed calls.
      - 40% revenue boost.
      - 1-Week MVP Deployment.

      # FLOW
      1. Short empathy/value line.
      2. 2 Bullet points.
      3. Ask: "What is your business type?"
      4. If they seem interested, ask: "Shall we schedule a Free AI Audit to map your 40% revenue boost?"
    `;

    const chat = ai.chats.create({
      model: 'gemini-3-flash-preview',
      config: {
        systemInstruction: systemInstruction,
        temperature: 0.5,
      },
    });

    const result = await chat.sendMessage({ message });
    return result.text || "Neural connection established, but signal is quiet.";
  } catch (error: any) {
    console.error("Chat Pipeline Error:", error);
    // Specifically handle the missing key error from the SDK
    if (error.message?.includes("API_KEY_INVALID") || error.message?.includes("403") || error.message?.includes("API key")) {
      throw new Error("Neural Authentication Failed. Ensure API_KEY is set in Cloudflare and the app is REDEPLOYED.");
    }
    throw error;
  }
};