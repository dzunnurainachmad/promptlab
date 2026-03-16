export type TechniqueId = 'zero-shot' | 'few-shot' | 'chain-of-thought' | 'role-prompting' | 'output-format' | 'temperature';

export interface Example {
  input: string;
  output: string;
}

export interface Role {
  label: string;
  prompt: string;
}

export interface OutputFormat {
  label: string;
  instruction: string;
}

export interface TechniqueConfig {
  id: TechniqueId;
  title: string;
  description: string;
  tip: string;
  systemPrompt: string;
  userPrompt: string;
  showSections: string[];
  examples?: Example[];
  cotInstruction?: string;
  roles?: Role[];
  formats?: OutputFormat[];
}

export interface APIConfig {
  apiKey: string;
  model: string;
  temperature: number;
}

export interface ChatMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

export interface HistoryEntry {
  id: string;
  timestamp: number;
  technique: TechniqueId;
  model: string;
  tokenCount: number;
  systemPrompt: string;
  userPrompt: string;
  response: string;
}
