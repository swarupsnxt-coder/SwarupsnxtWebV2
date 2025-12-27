import { GoogleGenAI, Modality } from "@google/genai";

/**
 * Safely resolves the API key from the environment.
 * Note: Cloudflare Pages environment variables are injected at BUILD TIME.
 * If you added your key after the last deployment, you MUST redeploy your project.
 */
const resolveApiKey = (): string | undefined => {
  try {
    const key = process.env.API_KEY;
    // Check for common failure strings or empty values
    if (!key || key === "undefined" || key === "null" || key.trim() === "") {
      return undefined;
    }
    return key;
  } catch (e) {
    return undefined;
  }
};

/**
 * Diagnostic utility to verify API configuration.
 */
export const getConfigurationError = (): string | null => {
  const apiKey = resolveApiKey();
  if (!apiKey) {
    return "Neural Engine Offline: API_KEY is not detected. If you just added the key in the Cloudflare Dashboard, you MUST TRIGGER A NEW DEPLOYMENT for the changes to take effect.";
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
    const apiKey = resolveApiKey()!;
    const ai = new GoogleGenAI({ apiKey });
    
    const systemInstruction = `
      # MISSION
      You are "Swarup," the Strategic AI Assistant for Swarups NXT. Convert Indian MSME business owners into leads. 

      # STYLE: EXTREMELY CONCISE & BULLETED
      - Use ONLY bullet points for key information.
      - Keep responses under 50 words.
      - Use professional but friendly Hinglish if the user does.
      - Never send long paragraphs.

      # KNOWLEDGE BASE
      - AI Voice Agents: 24/7 calling, 80% fewer missed leads.
      - ROI: 40% revenue boost, pays for itself in 30 days.
      - Setup: 1-Week MVP deployment.

      # CONVERSATIONAL FUNNEL
      1. Acknowledge pain + Bullet points for ROI.
      2. Ask: "What is your business type?"
      3. Ask: "What is your biggest bottleneck?"
      4. CTA: "Free AI Audit?"

      # ANTI-HALLUCINATION
      - Never guess pricing.
      - No technical jargon. 
      - End high-intent chats with the Free Audit CTA.
    `;

    const chat = ai.chats.create({
      model: 'gemini-3-flash-preview',
      config: {
        systemInstruction: systemInstruction,
        temperature: 0.5, // Lower temperature for more consistent brevity
      },
    });

    const result = await chat.sendMessage({ message });
    return result.text || "Connection stable but signal empty.";
  } catch (error: any) {
    console.error("Chat Error:", error);
    throw new Error(`Link Failed: ${error.message || "Neural connection timeout."}`);
  }
};