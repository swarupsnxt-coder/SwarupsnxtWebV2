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
 * Generates speech via Gemini 2.5 TTS
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

    const base64Audio = response.candidates?.[0]?.content?.parts?.find(p => p.inlineData)?.inlineData?.data;
    if (!base64Audio) throw new Error(`Neural speech signal lost.`);
    return base64Audio;
  } catch (error: any) {
    console.error("TTS Error:", error);
    throw error;
  }
};

/**
 * Primary chat interaction logic using direct generateContent.
 */
export const chatWithAgent = async (message: string, personaDescription: string) => {
  try {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    
    const systemInstruction = `
      # MISSION
      You are "Swarup," Strategic AI Assistant for Swarups NXT. Convert Indian MSME owners into leads.

      # STYLE: EXTREMELY BRIEF
      - Use ONLY bullet points for ROI/details.
      - Max 40 words. 
      - Use Hinglish where appropriate.

      # PRODUCT
      - AI Voice Agents: 80% fewer missed calls.
      - ROI: 40% revenue boost.
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: message,
      config: {
        systemInstruction: systemInstruction,
        temperature: 0.5,
      },
    });

    return response.text || "Connection stable, but signal silent.";
  } catch (error: any) {
    console.error("Chat API Error:", error);
    throw error;
  }
};