"use client";

import { usePlaygroundStore } from '@/store/usePlaygroundStore';
import { X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useState, useEffect } from 'react';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SettingsModal({ isOpen, onClose }: SettingsModalProps) {
  const { apiConfig, setApiConfig } = usePlaygroundStore();
  const [apiKey, setApiKey] = useState(apiConfig.apiKey);
  const [model, setModel] = useState(apiConfig.model);

  useEffect(() => {
    if (isOpen) {
      setApiKey(apiConfig.apiKey);
      setModel(apiConfig.model);
    }
  }, [isOpen, apiConfig]);

  const handleSave = () => {
    setApiConfig({ apiKey, model });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="w-full max-w-[440px] bg-background-card border border-border rounded-lg shadow-lg overflow-hidden animate-in zoom-in-95 slide-in-from-bottom-4 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between p-5 border-b border-border bg-background-secondary/50">
          <h3 className="text-base font-bold text-text-primary">⚙️ API Settings</h3>
          <button onClick={onClose} className="text-text-secondary hover:text-text-primary transition-colors">
            <X size={20} />
          </button>
        </div>
        
        <div className="p-6 space-y-6">
          <div className="space-y-2">
            <label className="text-[0.8rem] font-bold text-text-secondary uppercase tracking-wider block">
              API Key
            </label>
            <input
              type="password"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              className="input-base"
              placeholder="sk-proj-..."
            />
            <p className="text-[0.75rem] text-text-muted">
              Your OpenAI API key. Stored locally in your browser only.
            </p>
          </div>

          <div className="space-y-2">
            <label className="text-[0.8rem] font-bold text-text-secondary uppercase tracking-wider block">
              Model
            </label>
            <select
              value={model}
              onChange={(e) => setModel(e.target.value)}
              className="w-full bg-background-input border border-border rounded-sm text-text-primary font-sans text-[0.85rem] px-3.5 py-2.5 focus:outline-none focus:border-accent-purple transition-all appearance-none cursor-pointer"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' fill='%239898b0' viewBox='0 0 16 16'%3E%3Cpath d='M8 11L3 6h10l-5 5z'/%3E%3C/svg%3E")`,
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'right 12px center',
                paddingRight: '36px'
              }}
            >
              <option value="gpt-4o-mini">GPT-4o Mini (fast & cheap)</option>
              <option value="gpt-4o">GPT-4o (powerful)</option>
              <option value="gpt-4">GPT-4 (legacy)</option>
              <option value="o1-mini">o1 Mini (reasoning)</option>
            </select>
          </div>

          <button onClick={handleSave} className="btn-primary w-full">
            Save Settings
          </button>
        </div>
      </div>
    </div>
  );
}
