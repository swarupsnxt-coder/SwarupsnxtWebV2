import { GoogleGenAI, Modality } from "@google/genai";

/**
 * Decodes raw 16-bit PCM data into an AudioBuffer.
 * The Gemini TTS API returns raw PCM data without headers.
 */
export async function decodeAudioData(
  data: Uint8Array,
  ctx: AudioContext,
  sampleRate: number = 24000,
  numChannels: number = 1,
): Promise<AudioBuffer> {
  const dataInt16 = new Int16Array(data.buffer, data.byteOffset, data.byteLength / 2);
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
 * Helper to decode base64 string to Uint8Array
 */
export function decodeBase64(base64: string): Uint8Array {
  const binaryString = atob(base64);
  const len = binaryString.length;
  const bytes = new Uint8Array(len);
  for (let i = 0; i < len; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  return bytes;
}

/**
 * Generates speech (TTS) using Gemini 2.5 Flash Preview TTS.
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
            prebuiltVoiceConfig: { voiceName: voiceName as any },
          },
        },
      },
    });

    const base64Audio = response.candidates?.[0]?.content?.parts?.find(p => p.inlineData)?.inlineData?.data;
    if (!base64Audio) throw new Error("Vocal signal lost in transmission.");
    return base64Audio;
  } catch (error: any) {
    console.error("TTS Pipeline Error:", error);
    throw error;
  }
};

/**
 * Strategic interaction logic for 'Swarup' Assistant.
 * Optimized for maximum ROI impact and extreme brevity.
 */
export const chatWithAgent = async (message: string) => {
  try {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    
    const systemInstruction = `
# IDENTITY
You are "Swarup," the Strategic AI Assistant for Swarups NXT.

# PROTOCOL: EXTREME BREVITY
- Max 35 words total.
- Use Hinglish where appropriate (e.g., "Seedha ROI focus").

# RESPONSE STRUCTURE (STRICT)
1. Quick validation of the user's input.
2. Provide your main answer in 1 to 3 crisp bullet points.
3. Use business value logic (savings, efficiency, speed).
4. DO NOT repeat the "80% missed calls" or "40% revenue boost" stats in every response. Use different ROI angles.
5. End with a qualification question: "What business are you in?" or "Ready for an audit?"

# ANTI-HALLUCINATION
- Stick to 1-week MVP timeline.
- Never guess pricing.
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: message,
      config: {
        systemInstruction: systemInstruction,
        temperature: 0.7,
      },
    });

    return response.text || "NXT Core Ready. Protocol engaged.";
  } catch (error: any) {
    console.error("Chat Interaction Error:", error);
    throw error;
  }
};