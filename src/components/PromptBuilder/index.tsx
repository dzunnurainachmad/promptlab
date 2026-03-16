"use client";

import { usePlaygroundStore } from '@/store/usePlaygroundStore';
import { TECHNIQUES } from '@/lib/constants';
import { SystemPrompt } from './SystemPrompt';
import { UserPrompt } from './UserPrompt';
import { RoleSelector } from './RoleSelector';
import { FewShotEditor } from './FewShotEditor';
import { FormatSelector } from './FormatSelector';
import { TemperatureSlider } from './TemperatureSlider';
import { PromptPreview } from './PromptPreview';
import { RefreshCcw } from 'lucide-react';
import { runPromptAction } from '@/app/actions';
import { ChatMessage, HistoryEntry } from '@/types';
import { countTokens } from '@/lib/tokenCounter';

export default function PromptBuilder() {
  const { 
    currentTechnique, 
    resetPrompt, 
    isGenerating, 
    setGenerating,
    setResponse,
    setTempResponse,
    appendStreamingResponse,
    clearStreamingResponse,
    streamingResponse,
    addHistory,
    systemPrompt,
    userPrompt,
    cotInstruction,
    formatInstruction,
    examples,
    apiConfig
  } = usePlaygroundStore();
  
  const config = TECHNIQUES[currentTechnique];

  const buildMessages = () => {
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

    return messages;
  };

  const handleRun = async () => {
    if (!apiConfig.apiKey) {
      alert("Please set your OpenAI API Key in Settings first!");
      return;
    }

    const messages = buildMessages();
    if (messages.length === 0) return;

    setGenerating(true);

    try {
      if (currentTechnique === 'temperature') {
        // Temperature mode: parallel non-streaming fetch (unchanged)
        const temps = [0.0, 0.5, 1.0];
        const promises = temps.map(async (temp) => {
          try {
            const res = await runPromptAction(messages, { ...apiConfig, temperature: temp });
            setTempResponse(temp, res);
          } catch (err: any) {
            setTempResponse(temp, `Error: ${err.message}`);
          }
        });
        await Promise.all(promises);
      } else {
        // Streaming mode
        clearStreamingResponse();

        const res = await fetch('/api/stream', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ messages, config: apiConfig }),
        });

        if (!res.ok) {
          const errorData = await res.json();
          throw new Error(errorData.error || 'Streaming failed');
        }

        const reader = res.body?.getReader();
        const decoder = new TextDecoder();
        let fullText = '';

        if (!reader) throw new Error('No readable stream');

        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          const raw = decoder.decode(value, { stream: true });
          // Each SSE message: "data: <json>\n\n"
          const lines = raw.split('\n').filter((l) => l.startsWith('data: '));

          for (const line of lines) {
            const payload = line.slice(6); // strip "data: "
            if (payload === '[DONE]') break;
            try {
              const chunk: string = JSON.parse(payload);
              fullText += chunk;
              appendStreamingResponse(chunk);
            } catch {
              // ignore malformed chunks
            }
          }
        }

        // Commit final text to the responses map
        setResponse(currentTechnique, fullText);
        clearStreamingResponse();

        // Save to history
        addHistory({
          id: Date.now().toString(),
          timestamp: Date.now(),
          technique: currentTechnique,
          model: apiConfig.model,
          tokenCount: countTokens(messages),
          systemPrompt,
          userPrompt,
          response: fullText,
        });
      }
    } catch (err: any) {
      if (currentTechnique !== 'temperature') {
        setResponse(currentTechnique, `⚠️ Error: ${err.message}`);
        clearStreamingResponse();
      }
    } finally {
      setGenerating(false);
    }
  };


  return (
    <section className="flex flex-col border-r border-border h-full bg-background-secondary/30 backdrop-blur-sm">
      <div className="flex items-center justify-between p-4 px-5 border-b border-border bg-background-secondary/80">
        <h2 className="text-[0.9rem] font-bold text-text-primary tracking-tight">
          Prompt Builder
        </h2>
        <button 
          onClick={resetPrompt}
          className="btn-ghost flex items-center gap-1.5 text-xs"
          title="Reset to default"
        >
          <RefreshCcw size={13} />
          Reset
        </button>
      </div>

      <div className="flex-1 p-5 space-y-7 overflow-y-auto">
        {config.showSections.includes('systemPromptSection') && <SystemPrompt />}
        {config.showSections.includes('roleSection') && <RoleSelector />}
        {config.showSections.includes('fewShotSection') && <FewShotEditor />}
        
        {config.showSections.includes('cotSection') && (
          <div className="space-y-2">
            <label className="flex items-center gap-2 text-[0.8rem] font-bold text-text-secondary uppercase tracking-wider">
              CoT Instruction
              <span className="text-[0.68rem] font-medium text-accent-cyan bg-accent-cyan/10 px-2 py-0.5 rounded-full lowercase tracking-normal">
                reasoning trigger
              </span>
            </label>
            <textarea
              className="input-base min-h-[60px] resize-y"
              value={usePlaygroundStore.getState().cotInstruction}
              onChange={(e) => usePlaygroundStore.setState({ cotInstruction: e.target.value })}
            />
          </div>
        )}

        {config.showSections.includes('formatSection') && <FormatSelector />}
        <UserPrompt />
        {config.showSections.includes('paramsSection') && <TemperatureSlider />}
        
        <PromptPreview />

        <button 
          onClick={handleRun}
          disabled={isGenerating}
          className="btn-primary w-full flex items-center justify-center gap-2 mt-4"
        >
          {isGenerating ? (
            <>
              <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              Generating...
            </>
          ) : (
            <>
              <span className="text-lg">▶</span>
              Run Prompt
            </>
          )}
        </button>
      </div>
    </section>
  );
}
