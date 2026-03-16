"use client";

import { usePlaygroundStore } from '@/store/usePlaygroundStore';
import { countTokens, estimateCost, formatCost } from '@/lib/tokenCounter';
import { ChatMessage } from '@/types';

export function PromptPreview() {
  const { 
    currentTechnique, 
    systemPrompt, 
    userPrompt, 
    cotInstruction, 
    formatInstruction, 
    examples,
    apiConfig 
  } = usePlaygroundStore();

  const buildPayload = () => {
    const messages: ChatMessage[] = [];

    // System prompt
    let sys = systemPrompt.trim();
    if (currentTechnique === 'chain-of-thought' && cotInstruction.trim()) {
      sys += '\n\n' + cotInstruction.trim();
    }
    if (currentTechnique === 'output-format' && formatInstruction.trim()) {
      sys += '\n\nOUTPUT FORMAT:\n' + formatInstruction.trim();
    }
    
    if (sys) messages.push({ role: 'system', content: sys });

    // Few-shot
    if (currentTechnique === 'few-shot') {
      examples.forEach(ex => {
        if (ex.input.trim() && ex.output.trim()) {
          messages.push({ role: 'user', content: ex.input.trim() });
          messages.push({ role: 'assistant', content: ex.output.trim() });
        }
      });
    }

    // User prompt
    if (userPrompt.trim()) {
      messages.push({ role: 'user', content: userPrompt.trim() });
    }

    return {
      model: apiConfig.model,
      messages,
      temperature: apiConfig.temperature,
      max_tokens: 1024,
    };
  };

  const payload = buildPayload();
  const tokenCount = countTokens(payload.messages);
  const cost = estimateCost(tokenCount, apiConfig.model);

  // Color based on token count thresholds
  const tokenColor =
    tokenCount > 3000
      ? 'text-red-400 bg-red-400/10'
      : tokenCount > 1000
      ? 'text-yellow-400 bg-yellow-400/10'
      : 'text-emerald-400 bg-emerald-400/10';

  return (
    <div className="space-y-2">
      <label className="flex items-center justify-between text-[0.8rem] font-bold text-text-secondary uppercase tracking-wider">
        Constructed API Call
        <div className="flex items-center gap-2">
          {/* Token counter badge */}
          <span className={`flex items-center gap-1 text-[0.68rem] font-medium px-2 py-0.5 rounded-full ${tokenColor}`}>
            <span>⚡</span>
            {tokenCount.toLocaleString()} tokens · {formatCost(cost)}
          </span>
          <button 
            onClick={() => navigator.clipboard.writeText(JSON.stringify(payload, null, 2))}
            className="text-[0.68rem] font-medium text-accent-cyan bg-accent-cyan/10 px-2 py-0.5 rounded-full cursor-pointer hover:bg-accent-cyan/20 transition-all"
          >
            📋 Copy
          </button>
        </div>
      </label>
      <pre className="p-4 bg-background-input border border-border rounded-sm font-mono text-[0.75rem] text-text-secondary overflow-auto max-h-[300px] whitespace-pre-wrap break-all leading-relaxed">
        <code>{JSON.stringify(payload, null, 2)}</code>
      </pre>
    </div>
  );
}
