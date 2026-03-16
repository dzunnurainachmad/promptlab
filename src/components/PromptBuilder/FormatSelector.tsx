"use client";

import { usePlaygroundStore } from '@/store/usePlaygroundStore';
import { TECHNIQUES } from '@/lib/constants';
import { cn } from '@/lib/utils';

export function FormatSelector() {
  const { currentTechnique, formatInstruction, setFormatInstruction } = usePlaygroundStore();
  const config = TECHNIQUES[currentTechnique];

  if (!config.formats) return null;

  return (
    <div className="space-y-2">
      <label className="flex items-center gap-2 text-[0.8rem] font-bold text-text-secondary uppercase tracking-wider">
        Output Format
        <span className="text-[0.68rem] font-medium text-accent-cyan bg-accent-cyan/10 px-2 py-0.5 rounded-full lowercase tracking-normal">
          structure the response
        </span>
      </label>
      
      <div className="flex flex-wrap gap-2 mb-3">
        {config.formats.map((fmt) => (
          <button
            key={fmt.label}
            onClick={() => setFormatInstruction(fmt.instruction)}
            className={cn(
              "px-3.5 py-1.5 border border-border rounded-full bg-background-card text-text-secondary text-[0.78rem] cursor-pointer transition-all duration-200 hover:border-accent-purple hover:text-text-primary",
              formatInstruction === fmt.instruction && "bg-gradient-to-br from-accent-purple/20 to-accent-cyan/15 border-accent-purple text-text-primary"
            )}
          >
            {fmt.label}
          </button>
        ))}
      </div>

      <textarea
        value={formatInstruction}
        onChange={(e) => setFormatInstruction(e.target.value)}
        className="input-base min-h-[80px] resize-y"
        placeholder="Custom format instruction..."
      />
    </div>
  );
}
