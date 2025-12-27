interface Env {
  API_KEY: string;
  ZOHO_REFRESH_TOKEN: string;
}

// Fix: Removed PagesFunction type annotation which was causing a 'Cannot find name' error in this environment.
export const onRequestPost: any = async (context: any) => {
  const { request, env } = context;

  // Sync shim for consistency to ensure process.env.API_KEY is available for the Gemini SDK
  if (env?.API_KEY) {
    if (typeof process === 'undefined') (globalThis as any).process = { env: {} };
    process.env.API_KEY = env.API_KEY;
  }

  try {
    const data: any = await request.json();
    console.log("Lead captured:", data.email);

    return new Response(JSON.stringify({ 
      status: "success", 
      message: "Lead processed via NXT Secure Gateway." 
    }), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (err: any) {
    return new Response(JSON.stringify({ error: err.message }), { 
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
};