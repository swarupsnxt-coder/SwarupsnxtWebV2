import { generateSpeech } from '../../services/geminiService';

interface Env {
  API_KEY: string;
}

// Fix: Removed PagesFunction type annotation which was causing a 'Cannot find name' error in this environment.
export const onRequestPost: any = async (context: any) => {
  const { request, env } = context;

  try {
    const { text, voiceName } = await request.json() as any;
    
    if (!text) {
      return new Response(JSON.stringify({ error: "No text for vocalization." }), { status: 400 });
    }

    const base64Audio = await generateSpeech(text, voiceName, env);

    return new Response(JSON.stringify({ base64Audio }), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (err: any) {
    return new Response(JSON.stringify({ error: err.message }), { 
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
};