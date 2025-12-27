
import { chatWithAgent } from '../../services/geminiService';

export const onRequestPost: any = async (context: { request: Request; env: any }) => {
  const { request, env } = context;

  // Sync shim for consistency to ensure process.env.API_KEY is available for the Gemini SDK
  if (env?.API_KEY) {
    if (typeof process === 'undefined') (globalThis as any).process = { env: {} };
    process.env.API_KEY = env.API_KEY;
  }

  try {
    const { message } = await request.json() as any;
    
    if (!message) {
      return new Response(JSON.stringify({ error: "Empty signal detected." }), { status: 400 });
    }

    // Fix: chatWithAgent expects only 1 argument (message)
    const reply = await chatWithAgent(message);

    return new Response(JSON.stringify({ reply }), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (err: any) {
    console.error("API Chat Handler Error:", err);
    return new Response(JSON.stringify({ error: err.message }), { 
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
};
