
import { generateSpeech } from '../../services/geminiService';

export const onRequestPost: any = async (context: { request: Request; env: any }) => {
  const { request, env } = context;

  // Sync shim for consistency to ensure process.env.API_KEY is available for the Gemini SDK
  if (env?.API_KEY) {
    if (typeof process === 'undefined') (globalThis as any).process = { env: {} };
    process.env.API_KEY = env.API_KEY;
  }

  try {
    const { text, voiceName } = await request.json() as any;
    
    if (!text) {
      return new Response(JSON.stringify({ error: "No text for vocalization." }), { status: 400 });
    }

    // Fix: generateSpeech expects only 2 arguments (text, voiceName)
    const base64Audio = await generateSpeech(text, voiceName);

    return new Response(JSON.stringify({ base64Audio }), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (err: any) {
    console.error("API Speech Handler Error:", err);
    return new Response(JSON.stringify({ error: err.message }), { 
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
};
