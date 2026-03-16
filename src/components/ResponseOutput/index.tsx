"use client";

import { usePlaygroundStore } from '@/store/usePlaygroundStore';
import { TECHNIQUES } from '@/lib/constants';
import ReactMarkdown from 'react-markdown';
import { Copy, Sparkles } from 'lucide-react';

export function ResponseOutput() {
  const { currentTechnique, responses, isGenerating, tempResponses, streamingResponse } = usePlaygroundStore();

  const response = responses[currentTechnique];
  const isTemperatureMode = currentTechnique === 'temperature';

  // What to show in the main (non-temperature) pane:
  // - If streaming → show in-progress text
  // - If done      → show committed response
  const displayText = isGenerating && streamingResponse ? streamingResponse : response;

  return (
    <section className="flex flex-col h-full bg-background-primary">
      <div className="flex items-center justify-between p-4 px-5 border-b border-border bg-background-secondary/80">
        <h2 className="text-[0.9rem] font-bold text-text-primary tracking-tight">
          AI Response
        </h2>
        {response && !isTemperatureMode && !isGenerating && (
          <button 
            onClick={() => navigator.clipboard.writeText(response)}
            className="btn-ghost flex items-center gap-1.5 text-xs"
          >
            <Copy size={13} />
            Copy
          </button>
        )}
      </div>

      <div className="flex-1 p-5 overflow-y-auto">
        {isTemperatureMode ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-3 h-full">
            {[0.0, 0.5, 1.0].map((temp) => (
              <div key={temp} className="flex flex-col border border-border rounded-md bg-background-card overflow-hidden transition-all hover:border-accent-purple/30">
                <div className="p-2.5 px-3.5 border-b border-border text-[0.8rem] font-bold flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span>{temp === 0 ? '🧊' : temp === 0.5 ? '⚖️' : '🔥'}</span>
                    Temp {temp.toFixed(1)}
                  </div>
                  <span className="text-[0.65rem] font-medium text-accent-cyan bg-accent-cyan/10 px-2 py-0.5 rounded-full">
                    {temp === 0 ? 'Precise' : temp === 0.5 ? 'Balanced' : 'Creative'}
                  </span>
                </div>
                <div className="p-4 flex-1 text-[0.82rem] leading-relaxed overflow-y-auto prose prose-invert prose-sm max-w-none">
                  {tempResponses[temp] ? (
                    <ReactMarkdown>{tempResponses[temp]}</ReactMarkdown>
                  ) : isGenerating ? (
                    <div className="space-y-2">
                      <div className="skeleton shimmer h-4 w-[90%]" />
                      <div className="skeleton shimmer h-4 w-[85%]" />
                      <div className="skeleton shimmer h-4 w-[70%]" />
                    </div>
                  ) : (
                    <div className="h-full flex items-center justify-center text-text-muted text-xs italic">
                      Waiting...
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : displayText ? (
          // Streaming or committed response
          <div className="prose prose-invert prose-sm max-w-none animate-in fade-in slide-in-from-bottom-2 duration-300">
            <ReactMarkdown>{displayText}</ReactMarkdown>
            {isGenerating && (
              <span className="inline-block w-[2px] h-[1.1em] bg-accent-cyan ml-0.5 align-middle animate-pulse" />
            )}
          </div>
        ) : isGenerating ? (
          // Skeleton: generating but no tokens yet
          <div className="space-y-3">
            <div className="skeleton shimmer h-5 w-[95%]" />
            <div className="skeleton shimmer h-5 w-[90%]" />
            <div className="skeleton shimmer h-5 w-[80%]" />
            <div className="skeleton shimmer h-5 w-[85%]" />
          </div>
        ) : (
          <div className="h-full flex flex-col items-center justify-center text-center space-y-4 text-text-muted">
            <div className="text-5xl animate-float">✨</div>
            <p className="text-[0.9rem] max-w-[300px] leading-relaxed">
              Select a technique, build your prompt, and hit <strong>Run</strong> to see the magic.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}

