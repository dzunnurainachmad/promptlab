"use client";

import { usePlaygroundStore } from '@/store/usePlaygroundStore';

export function SystemPrompt() {
  const { systemPrompt, setSystemPrompt } = usePlaygroundStore();

  return (
    <div className="space-y-2">
      <label className="flex items-center gap-2 text-[0.8rem] font-bold text-text-secondary uppercase tracking-wider">
        System Prompt
        <span className="text-[0.68rem] font-medium text-accent-cyan bg-accent-cyan/10 px-2 py-0.5 rounded-full lowercase tracking-normal">
          sets AI behavior
        </span>
      </label>
      <textarea
        value={systemPrompt}
        onChange={(e) => setSystemPrompt(e.target.value)}
        className="input-base min-h-[100px] resize-y"
        placeholder="You are a helpful assistant..."
      />
    </div>
  );
}
