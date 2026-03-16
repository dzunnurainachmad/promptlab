"use client";

import { usePlaygroundStore } from '@/store/usePlaygroundStore';
import { HistoryEntry } from '@/types';
import { TECHNIQUES } from '@/lib/constants';
import { Clock, Trash2, RotateCcw, Trash } from 'lucide-react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

function timeAgo(timestamp: number): string {
  const diff = Date.now() - timestamp;
  const minutes = Math.floor(diff / 60000);
  const hours = Math.floor(diff / 3600000);
  const days = Math.floor(diff / 86400000);
  if (minutes < 1) return 'just now';
  if (minutes < 60) return `${minutes}m ago`;
  if (hours < 24) return `${hours}h ago`;
  return `${days}d ago`;
}

function techniqueLabel(id: string): string {
  return TECHNIQUES[id as keyof typeof TECHNIQUES]?.title ?? id;
}

export function HistoryDrawer({ isOpen, onClose }: Props) {
  const { history, clearHistory, restoreEntry, removeHistory } = usePlaygroundStore();

  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm"
          onClick={onClose}
        />
      )}

      {/* Drawer */}
      <aside
        className={`fixed top-0 left-0 z-50 h-full w-[360px] max-w-[90vw] flex flex-col
          bg-background-secondary border-r border-border shadow-2xl
          transition-transform duration-300 ease-in-out
          ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-border bg-background-secondary/90">
          <div className="flex items-center gap-2">
            <Clock size={15} className="text-accent-purple" />
            <h2 className="text-[0.9rem] font-bold text-text-primary">Prompt History</h2>
            {history.length > 0 && (
              <span className="text-[0.65rem] font-medium text-accent-cyan bg-accent-cyan/10 px-2 py-0.5 rounded-full">
                {history.length}
              </span>
            )}
          </div>
          <div className="flex items-center gap-2">
            {history.length > 0 && (
              <button
                onClick={clearHistory}
                className="flex items-center gap-1 text-[0.72rem] text-red-400/70 hover:text-red-400 transition-colors px-2 py-1 rounded hover:bg-red-400/10"
                title="Clear all history"
              >
                <Trash size={12} />
                Clear all
              </button>
            )}
            <button
              onClick={onClose}
              className="text-text-muted hover:text-text-primary transition-colors w-7 h-7 flex items-center justify-center rounded hover:bg-white/5"
            >
              ✕
            </button>
          </div>
        </div>

        {/* List */}
        <div className="flex-1 overflow-y-auto p-3 space-y-2">
          {history.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center text-text-muted space-y-3 py-16">
              <Clock size={36} className="opacity-20" />
              <p className="text-[0.85rem] max-w-[220px] leading-relaxed">
                Belum ada history. Run sebuah prompt dulu!
              </p>
            </div>
          ) : (
            history.map((entry: HistoryEntry) => (
              <div
                key={entry.id}
                className="group p-3.5 rounded-md border border-border bg-background-card hover:border-accent-purple/30 transition-all"
              >
                {/* Meta row */}
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-1.5 flex-wrap">
                    <span className="text-[0.65rem] font-semibold text-accent-purple bg-accent-purple/10 px-2 py-0.5 rounded-full">
                      {techniqueLabel(entry.technique)}
                    </span>
                    <span className="text-[0.65rem] text-text-muted">
                      {entry.model}
                    </span>
                    <span className="text-[0.65rem] text-emerald-400/70">
                      ⚡ {entry.tokenCount.toLocaleString()}t
                    </span>
                  </div>
                  <span className="text-[0.62rem] text-text-muted shrink-0 ml-2">
                    {timeAgo(entry.timestamp)}
                  </span>
                </div>

                {/* Prompt snippet */}
                <p className="text-[0.78rem] text-text-secondary leading-relaxed line-clamp-2 mb-3">
                  {entry.userPrompt || entry.systemPrompt || '(no prompt)'}
                </p>

                {/* Response snippet */}
                <p className="text-[0.73rem] text-text-muted leading-relaxed line-clamp-1 italic mb-3 border-l-2 border-accent-purple/30 pl-2">
                  {entry.response.slice(0, 100)}…
                </p>

                {/* Actions */}
                <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button
                    onClick={() => { restoreEntry(entry); onClose(); }}
                    className="flex items-center gap-1 text-[0.72rem] text-accent-cyan bg-accent-cyan/10 hover:bg-accent-cyan/20 px-2.5 py-1 rounded transition-all"
                  >
                    <RotateCcw size={11} />
                    Load
                  </button>
                  <button
                    onClick={() => removeHistory(entry.id)}
                    className="flex items-center gap-1 text-[0.72rem] text-red-400/60 hover:text-red-400 hover:bg-red-400/10 px-2.5 py-1 rounded transition-all"
                  >
                    <Trash2 size={11} />
                    Delete
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </aside>
    </>
  );
}
