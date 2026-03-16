"use client";

import { usePlaygroundStore } from '@/store/usePlaygroundStore';

export function UserPrompt() {
  const { userPrompt, setUserPrompt } = usePlaygroundStore();

  return (
    <div className="space-y-2">
      <label className="flex items-center gap-2 text-[0.8rem] font-bold text-text-secondary uppercase tracking-wider">
        User Prompt
        <span className="text-[0.68rem] font-medium text-accent-cyan bg-accent-cyan/10 px-2 py-0.5 rounded-full lowercase tracking-normal">
          your question
        </span>
      </label>
      <textarea
        value={userPrompt}
        onChange={(e) => setUserPrompt(e.target.value)}
        className="input-base min-h-[100px] resize-y"
        placeholder="Ask something..."
      />
    </div>
  );
}
