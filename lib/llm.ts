// Single place for the model call. To switch provider (Groq, Claude, OpenAI, ...), change
// generateReply() only; the API route and UI don't need to know. Do not add Gemini (CLAUDE.md rule 12).

// Current Workers AI model (checked against developers.cloudflare.com/workers-ai/models, Nov 2026).
// Replaces '@cf/meta/llama-3.1-8b-instruct-fp8', which Cloudflare deprecates on 2026-11-20.
// No deprecation date listed; same messages in / `response` string out; better multilingual
// quality. About 70-100 neurons per chat message (~2.5k-token system prompt).
// Before switching models, check the model page: some newer ones return OpenAI-style
// `choices[]` instead of `response`, which generateReply() would need to handle.
export const MODEL_ID = '@cf/meta/llama-4-scout-17b-16e-instruct';

export const MAX_OUTPUT_TOKENS = 220;
export const MODEL_TIMEOUT_MS = 15000;

export interface ChatMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

// Minimal shape of the Workers AI binding we use.
export interface AiBinding {
  run(model: string, input: Record<string, unknown>): Promise<{ response?: string } | unknown>;
}

export async function generateReply(ai: AiBinding, messages: ChatMessage[]): Promise<string> {
  const run = ai.run(MODEL_ID, {
    messages,
    max_tokens: MAX_OUTPUT_TOKENS,
    temperature: 0.5,
  });

  let timer: ReturnType<typeof setTimeout> | undefined;
  const timeout = new Promise<never>((_, reject) => {
    timer = setTimeout(() => reject(new Error('Model timed out')), MODEL_TIMEOUT_MS);
  });

  try {
    const result = await Promise.race([run, timeout]) as { response?: unknown };
    const text = typeof result?.response === 'string' ? result.response.trim() : '';
    if (!text) throw new Error('Empty model response');
    return text;
  } finally {
    clearTimeout(timer);
  }
}
