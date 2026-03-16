"use server";

import { getOpenAIClient } from "@/lib/openai";
import { ChatMessage, APIConfig } from "@/types";

export async function runPromptAction(messages: ChatMessage[], config: APIConfig) {
  if (!config.apiKey) {
    throw new Error("API Key is required");
  }

  const openai = getOpenAIClient(config.apiKey);

  try {
    const response = await openai.chat.completions.create({
      model: config.model,
      messages: messages,
      temperature: config.temperature,
      max_tokens: 1024,
    });

    return response.choices[0].message.content || "";
  } catch (error: any) {
    console.error("OpenAI API Error:", error);
    throw new Error(error.message || "Failed to generate response");
  }
}
