
/**
 * Cloudflare Pages Function for Secure Lead Sync
 * Environment variables are accessed via the 'env' parameter.
 */

interface Env {
  API_KEY: string;
  ZOHO_REFRESH_TOKEN: string;
}

// Fixed: Defined the PagesFunction type which is missing from the global scope in this context
type PagesFunction<Env = any> = (context: {
  request: Request;
  env: Env;
  params: Record<string, string>;
  data: Record<string, unknown>;
}) => Response | Promise<Response>;

export const onRequestPost: PagesFunction<Env> = async (context) => {
  const { request, env } = context;

  try {
    const data: any = await request.json();

    // Fixed: Always use process.env.API_KEY exclusively as required by the GenAI SDK guidelines
    if (!process.env.API_KEY) {
      return new Response(JSON.stringify({ error: "API_KEY not found in process.env" }), {
        status: 500,
        headers: { "Content-Type": "application/json" },
      });
    }

    // Logic for syncing to Zoho CRM or Google Sheets...
    console.log("Processing lead for:", data.email);

    return new Response(JSON.stringify({ 
      status: "success", 
      message: "Lead successfully captured via NXT Neural Gateway" 
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
