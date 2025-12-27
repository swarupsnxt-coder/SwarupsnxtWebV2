import { chatWithAgent } from '../../services/geminiService';

interface Env {
  API_KEY: string;
}

// Fix: Removed PagesFunction type annotation which was causing a 'Cannot find name' error in this environment.
export const onRequestPost: any = async (context: any) => {
  const { request, env } = context;

  try {
    const { message, persona } = await request.json() as any;
    
    if (!message) {
      return new Response(JSON.stringify({ error: "Empty signal detected." }), { status: 400 });
    }

    const reply = await chatWithAgent(message, persona, env);

    return new Response(JSON.stringify({ reply }), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (err: any) {
    return new Response(JSON.stringify({ error: err.message }), { 
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
};