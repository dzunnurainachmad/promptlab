import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { TechniqueId, Example, Role, OutputFormat, ChatMessage, APIConfig, HistoryEntry } from '@/types';
import { TECHNIQUES } from '@/lib/constants';

interface PlaygroundState {
  currentTechnique: TechniqueId;
  systemPrompt: string;
  userPrompt: string;
  cotInstruction: string;
  formatInstruction: string;
  examples: Example[];
  isGenerating: boolean;
  responses: Record<string, string>; // techniqueId -> response
  tempResponses: Record<number, string>; // temp -> response (for temperature mode)
  streamingResponse: string; // real-time streaming text
  history: HistoryEntry[];
  apiConfig: APIConfig;

  // Actions
  setTechnique: (id: TechniqueId) => void;
  setSystemPrompt: (prompt: string) => void;
  setUserPrompt: (prompt: string) => void;
  setCotInstruction: (instruction: string) => void;
  setFormatInstruction: (instruction: string) => void;
  setExamples: (examples: Example[]) => void;
  addExample: () => void;
  removeExample: (index: number) => void;
  updateExample: (index: number, field: keyof Example, value: string) => void;
  setGenerating: (isGenerating: boolean) => void;
  setResponse: (techniqueId: string, response: string) => void;
  setTempResponse: (temp: number, response: string) => void;
  setApiConfig: (config: Partial<APIConfig>) => void;
  setStreamingResponse: (text: string) => void;
  appendStreamingResponse: (chunk: string) => void;
  clearStreamingResponse: () => void;
  addHistory: (entry: HistoryEntry) => void;
  removeHistory: (id: string) => void;
  clearHistory: () => void;
  restoreEntry: (entry: HistoryEntry) => void;
  resetPrompt: () => void;
}

export const usePlaygroundStore = create<PlaygroundState>()(
  persist(
    (set, get) => ({
      currentTechnique: 'zero-shot',
      systemPrompt: TECHNIQUES['zero-shot'].systemPrompt,
      userPrompt: TECHNIQUES['zero-shot'].userPrompt,
      cotInstruction: '',
      formatInstruction: '',
      examples: [],
      isGenerating: false,
      responses: {},
      tempResponses: {},
      streamingResponse: '',
      history: [],
      apiConfig: {
        apiKey: '',
        model: 'gpt-4o-mini',
        temperature: 0.7,
      },

      setTechnique: (id) => {
        const config = TECHNIQUES[id];
        set({
          currentTechnique: id,
          systemPrompt: config.systemPrompt,
          userPrompt: config.userPrompt,
          cotInstruction: config.cotInstruction || '',
          formatInstruction: config.formats?.[0]?.instruction || '',
          examples: config.examples || [],
        });
      },

      setSystemPrompt: (systemPrompt) => set({ systemPrompt }),
      setUserPrompt: (userPrompt) => set({ userPrompt }),
      setCotInstruction: (cotInstruction) => set({ cotInstruction }),
      setFormatInstruction: (formatInstruction) => set({ formatInstruction }),
      setExamples: (examples) => set({ examples }),
      
      addExample: () => set((state) => ({ 
        examples: [...state.examples, { input: '', output: '' }] 
      })),
      
      removeExample: (index) => set((state) => ({
        examples: state.examples.filter((_, i) => i !== index)
      })),
      
      updateExample: (index, field, value) => set((state) => ({
        examples: state.examples.map((ex, i) => i === index ? { ...ex, [field]: value } : ex)
      })),

      setGenerating: (isGenerating) => set({ isGenerating }),
      
      setResponse: (id, response) => set((state) => ({
        responses: { ...state.responses, [id]: response }
      })),

      setTempResponse: (temp, response) => set((state) => ({
        tempResponses: { ...state.tempResponses, [temp]: response }
      })),

      setApiConfig: (config) => set((state) => ({
        apiConfig: { ...state.apiConfig, ...config }
      })),

      setStreamingResponse: (text) => set({ streamingResponse: text }),
      appendStreamingResponse: (chunk) => set((state) => ({
        streamingResponse: state.streamingResponse + chunk
      })),
      clearStreamingResponse: () => set({ streamingResponse: '' }),

      addHistory: (entry) => set((state) => ({
        history: [entry, ...state.history].slice(0, 50),
      })),
      removeHistory: (id) => set((state) => ({
        history: state.history.filter((e) => e.id !== id),
      })),
      clearHistory: () => set({ history: [] }),
      restoreEntry: (entry) => {
        const config = TECHNIQUES[entry.technique];
        set({
          currentTechnique: entry.technique,
          systemPrompt: entry.systemPrompt || config.systemPrompt,
          userPrompt: entry.userPrompt || config.userPrompt,
          cotInstruction: config.cotInstruction || '',
          formatInstruction: config.formats?.[0]?.instruction || '',
          examples: config.examples || [],
        });
      },

      resetPrompt: () => {
        const id = get().currentTechnique;
        const config = TECHNIQUES[id];
        set({
          systemPrompt: config.systemPrompt,
          userPrompt: config.userPrompt,
          cotInstruction: config.cotInstruction || '',
          formatInstruction: config.formats?.[0]?.instruction || '',
          examples: config.examples || [],
        });
      },
    }),
    {
      name: 'promptlab-storage',
      partialize: (state) => ({ apiConfig: state.apiConfig, history: state.history }),
    }
  )
);
