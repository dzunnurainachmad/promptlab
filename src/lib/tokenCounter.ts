import { getEncoding, Tiktoken } from 'js-tiktoken';
import { ChatMessage } from '@/types';

// Harga per 1M token (input pricing, USD) - update sesuai harga terbaru OpenAI
const MODEL_PRICING: Record<string, number> = {
  'gpt-4o':          2.50,
  'gpt-4o-mini':     0.15,
  'gpt-4-turbo':    10.00,
  'gpt-4':          30.00,
  'gpt-3.5-turbo':   0.50,
};

const DEFAULT_PRICE_PER_1M = 1.00; // fallback

let encoder: Tiktoken | null = null;

function getEncoder(): Tiktoken {
  if (!encoder) {
    // cl100k_base covers GPT-4 and GPT-3.5
    encoder = getEncoding('cl100k_base');
  }
  return encoder as Tiktoken;
}

/**
 * Hitung jumlah token dari array messages.
 * Sesuai formula resmi OpenAI: setiap message punya overhead 3 token,
 * dan reply punya 3 token di awal.
 */
export function countTokens(messages: ChatMessage[]): number {
  try {
    const enc = getEncoder();
    let total = 3; // reply overhead

    for (const msg of messages) {
      total += 3; // per-message overhead (role + separator)
      total += enc.encode(msg.content).length;
    }

    return total;
  } catch {
    // Fallback: estimasi kasar (rata-rata 4 karakter per token)
    const allText = messages.map((m) => m.content).join(' ');
    return Math.ceil(allText.length / 4);
  }
}

/**
 * Estimasi biaya (USD) berdasarkan model dan jumlah token.
 */
export function estimateCost(tokenCount: number, model: string): number {
  const pricePerMillion = MODEL_PRICING[model] ?? DEFAULT_PRICE_PER_1M;
  return (tokenCount / 1_000_000) * pricePerMillion;
}

/**
 * Format cost ke string yang mudah dibaca.
 * < $0.00001  → "< $0.00001"
 * otherwise   → "$0.00042"
 */
export function formatCost(cost: number): string {
  if (cost === 0) return '$0.00000';
  if (cost < 0.00001) return '< $0.00001';
  return `$${cost.toFixed(5)}`;
}
