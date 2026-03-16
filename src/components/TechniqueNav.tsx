"use client";

import { TECHNIQUES } from '@/lib/constants';
import { usePlaygroundStore } from '@/store/usePlaygroundStore';
import { cn } from '@/lib/utils';
import { TechniqueId } from '@/types';

const ICONS: Record<TechniqueId, string> = {
  'zero-shot': '🎯',
  'few-shot': '📋',
  'chain-of-thought': '🔗',
  'role-prompting': '🎭',
  'output-format': '📐',
  'temperature': '🌡️',
};

const LABELS: Record<TechniqueId, string> = {
  'zero-shot': 'Zero-Shot',
  'few-shot': 'Few-Shot',
  'chain-of-thought': 'Chain-of-Thought',
  'role-prompting': 'Role Prompting',
  'output-format': 'Output Format',
  'temperature': 'Temperature',
};

export function TechniqueNav() {
  const { currentTechnique, setTechnique } = usePlaygroundStore();

  return (
    <nav className="flex gap-2 p-4 px-7 overflow-x-auto bg-background-secondary border-b border-border scrollbar-hide">
      {(Object.keys(TECHNIQUES) as TechniqueId[]).map((id) => (
        <button
          key={id}
          onClick={() => setTechnique(id)}
          className={cn(
            "flex items-center gap-2 px-4.5 py-2.5 border border-border rounded-md bg-background-card text-text-secondary cursor-pointer font-medium whitespace-nowrap transition-all duration-200 hover:border-accent-purple hover:text-text-primary hover:-translate-y-px",
            currentTechnique === id && "bg-gradient-to-br from-accent-purple/15 to-accent-cyan/10 border-accent-purple text-text-primary shadow-glow"
          )}
        >
          <span className="text-lg">{ICONS[id]}</span>
          <span className="text-[0.85rem]">{LABELS[id]}</span>
        </button>
      ))}
    </nav>
  );
}
