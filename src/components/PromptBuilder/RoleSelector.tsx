"use client";

import { usePlaygroundStore } from '@/store/usePlaygroundStore';
import { TECHNIQUES } from '@/lib/constants';
import { cn } from '@/lib/utils';

export function RoleSelector() {
  const { currentTechnique, setSystemPrompt, systemPrompt } = usePlaygroundStore();
  const config = TECHNIQUES[currentTechnique];

  if (!config.roles) return null;

  return (
    <div className="space-y-2">
      <label className="flex items-center gap-2 text-[0.8rem] font-bold text-text-secondary uppercase tracking-wider">
        Role / Persona
        <span className="text-[0.68rem] font-medium text-accent-cyan bg-accent-cyan/10 px-2 py-0.5 rounded-full lowercase tracking-normal">
          expert identity
        </span>
      </label>
      <div className="flex flex-wrap gap-2">
        {config.roles.map((role) => (
          <button
            key={role.label}
            onClick={() => setSystemPrompt(role.prompt)}
            className={cn(
              "px-3.5 py-1.5 border border-border rounded-full bg-background-card text-text-secondary text-[0.78rem] cursor-pointer transition-all duration-200 hover:border-accent-purple hover:text-text-primary",
              systemPrompt === role.prompt && "bg-gradient-to-br from-accent-purple/20 to-accent-cyan/15 border-accent-purple text-text-primary"
            )}
          >
            {role.label}
          </button>
        ))}
      </div>
    </div>
  );
}
