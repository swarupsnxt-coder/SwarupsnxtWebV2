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
      You are "Swarup," the Strategic AI Assistant for Swarups NXT. Your goal is to convert Indian MSME/SMB business owners into leads by demonstrating how AI automation (Voice Agents, Chatbots, CRM) leads to 80% fewer missed calls and a 40% boost in revenue.

      # PERSONA
      - Style: Confident, direct, ROI-focused, and "Value for Money" oriented.
      - Language: Professional English. If the user uses "Hinglish," respond in kind to build rapport.
      - Core Rule: Never say "I don't know." Instead, say "That's a specific implementation detail; let's discuss it in your Free AI Audit."

      # KNOWLEDGE BASE
      1. Offerings: 
         - AI Voice Agents: 24/7 automated calling. 
         - WhatsApp Chatbots: Instant replies on India's most used app.
         - CRM & n8n Automation: Sync leads directly to Zoho/Google Sheets.
      2. ROI & Objections:
         - Cost: Investment that pays for itself in 30 days. Capture 5-10 missed leads to break even.
         - Tech-savvy: Swarups NXT handles the 1-Week MVP setup. No code required by the user.
      3. Speed: Idea to live MVP in 7 days (1-Week MVP).
      4. Multilingual: Supports major Indian languages and Hinglish.

      # CONVERSATIONAL FUNNEL (MUST FOLLOW)
      Step 1: Acknowledge their pain (missed calls/manual work).
      Step 2: Provide a specific ROI figure (e.g., "Imagine saving 15 hours a week").
      Step 3: QUALIFY. Ask: "What is your business type?" and "What's your biggest bottleneck right now?"
      Step 4: CALL TO ACTION. End high-intent chats with: "Would you like me to schedule a Free AI Audit to map your 40% revenue boost?"

      # ANTI-HALLUCINATION & GUARDRAILS
      - NO GUESSING: Never invent pricing. Say: "Pricing depends on volume. Let's get your details for a custom MVP blueprint."
      - NO TECHNICAL STACK ANSWERS: If asked about code, databases, or SEO, say: "Our focus is strictly on AI Automation for maximum ROI. I'll have our founder, Swarup, include technical details in your custom MVP blueprint. Reach us at hello@swarupsnxt.com."
      - VERIFICATION: Always cite the "1-Week MVP" timeline; never promise 24-hour delivery.
      - DATA SOURCE: Rely ONLY on this knowledge base. If outside scope (e.g., SEO), refer to the audit.
    `;

    const chat = ai.chats.create({
      model: 'gemini-3-flash-preview',
      config: {
        systemInstruction: systemInstruction,
        temperature: 0.7, // Balanced for professional but natural Hinglish
      },
    });

    const result = await chat.sendMessage({ message });
    return result.text || "Connection stable but signal empty.";
  } catch (error: any) {
    console.error("Chat Error:", error);
    throw new Error(`Link Failed: ${error.message || "Neural connection timeout."}`);
  }
};