"use client";

import { usePlaygroundStore } from '@/store/usePlaygroundStore';

export function TemperatureSlider() {
  const { apiConfig, setApiConfig } = usePlaygroundStore();

  return (
    <div className="space-y-4 pt-2">
      <div className="flex items-center justify-between">
        <label className="text-[0.8rem] font-bold text-text-secondary uppercase tracking-wider">
          Temperature
        </label>
        <span className="text-[0.9rem] font-mono font-bold text-accent-purple">
          {apiConfig.temperature.toFixed(1)}
        </span>
      </div>
      
      <div className="space-y-1">
        <input
          type="range"
          min="0"
          max="2"
          step="0.1"
          value={apiConfig.temperature}
          onChange={(e) => setApiConfig({ temperature: parseFloat(e.target.value) })}
          className="w-full h-1.5 bg-border rounded-full appearance-none cursor-pointer accent-accent-purple"
        />
        <div className="flex justify-between text-[0.7rem] text-text-muted font-medium">
          <span>Precise</span>
          <span>Creative</span>
        </div>
      </div>
    </div>
  );
}
