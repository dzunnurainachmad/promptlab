"use client";

import { Settings, Clock } from 'lucide-react';
import { usePlaygroundStore } from '@/store/usePlaygroundStore';
import { useState } from 'react';
import { SettingsModal } from './SettingsModal';
import { HistoryDrawer } from './HistoryDrawer';

export function Header() {
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);

  return (
    <>
      <header className="flex items-center justify-between px-7 py-4 bg-background-secondary border-b border-border sticky top-0 z-50 backdrop-blur-md">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2.5">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
              <path d="M12 2L2 7L12 12L22 7L12 2Z" fill="url(#logoGrad)" opacity="0.9" />
              <path d="M2 17L12 22L22 17" stroke="url(#logoGrad)" strokeWidth="2" strokeLinecap="round" />
              <path d="M2 12L12 17L22 12" stroke="url(#logoGrad)" strokeWidth="2" strokeLinecap="round" />
              <defs>
                <linearGradient id="logoGrad" x1="2" y1="2" x2="22" y2="22">
                  <stop offset="0%" stopColor="#a78bfa" />
                  <stop offset="100%" stopColor="#06b6d4" />
                </linearGradient>
              </defs>
            </svg>
            <h1 className="text-[1.3rem] font-bold bg-gradient-main bg-clip-text text-transparent tracking-tight">
              PromptLab
            </h1>
          </div>
          <span className="text-[0.75rem] text-text-muted uppercase tracking-widest font-medium">
            Prompt Engineering Playground
          </span>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsHistoryOpen(true)}
            className="flex items-center gap-2 px-4 py-2 border border-border rounded-sm bg-background-card text-text-secondary text-[0.85rem] transition-all hover:border-accent-purple hover:text-text-primary hover:shadow-glow"
          >
            <Clock size={15} />
            History
          </button>
          <button
            onClick={() => setIsSettingsOpen(true)}
            className="flex items-center gap-2 px-4 py-2 border border-border rounded-sm bg-background-card text-text-secondary text-[0.85rem] transition-all hover:border-accent-purple hover:text-text-primary hover:shadow-glow"
          >
            <Settings size={15} />
            API Settings
          </button>
        </div>
      </header>

      <SettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
      />
      <HistoryDrawer
        isOpen={isHistoryOpen}
        onClose={() => setIsHistoryOpen(false)}
      />
    </>
  );
}
