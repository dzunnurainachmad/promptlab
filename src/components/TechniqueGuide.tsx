"use client";

import { TECHNIQUES } from '@/lib/constants';
import { usePlaygroundStore } from '@/store/usePlaygroundStore';

export function TechniqueGuide() {
  const { currentTechnique } = usePlaygroundStore();
  const config = TECHNIQUES[currentTechnique];

  return (
    <section className="p-4 px-7 bg-gradient-to-br from-accent-purple/5 to-accent-cyan/10 border-b border-border">
      <div className="max-w-[900px] space-y-2">
        <h3 className="text-base font-bold text-text-primary capitalize">
          {config.title}
        </h3>
        <p className="text-[0.9rem] leading-relaxed text-text-secondary">
          {config.description}
        </p>
        <div className="inline-block bg-accent-purple/10 border border-accent-purple/20 rounded-sm px-3 py-1.5 mt-2 text-[0.8rem] text-accent-purple">
          {config.tip}
        </div>
      </div>
    </section>
  );
}
