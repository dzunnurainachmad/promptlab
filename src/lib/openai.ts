import OpenAI from 'openai';

export const getOpenAIClient = (apiKey: string) => {
  return new OpenAI({
    apiKey,
    dangerouslyAllowBrowser: false, // We'll call this from server actions
  });
};
