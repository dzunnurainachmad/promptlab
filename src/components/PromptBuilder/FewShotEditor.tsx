"use client";

import { usePlaygroundStore } from '@/store/usePlaygroundStore';

export function FewShotEditor() {
  const { examples, addExample, removeExample, updateExample } = usePlaygroundStore();

  return (
    <div className="space-y-2">
      <label className="flex items-center gap-2 text-[0.8rem] font-bold text-text-secondary uppercase tracking-wider">
        Examples
        <span className="text-[0.68rem] font-medium text-accent-cyan bg-accent-cyan/10 px-2 py-0.5 rounded-full lowercase tracking-normal">
          teach by showing
        </span>
      </label>
      
      <div className="space-y-3">
        {examples.map((ex, i) => (
          <div key={i} className="relative p-3 border border-border rounded-sm bg-background-card hover:border-accent-purple/30 transition-colors group">
            <button
              onClick={() => removeExample(i)}
              className="absolute top-2 right-2 text-text-muted hover:text-accent-red transition-colors opacity-0 group-hover:opacity-100"
              title="Remove example"
            >
              &times;
            </button>
            <div className="space-y-2">
              <div>
                <label className="text-[0.7rem] font-bold text-text-muted uppercase tracking-wider block mb-1">
                  Example {i + 1} — Input
                </label>
                <textarea
                  value={ex.input}
                  onChange={(e) => updateExample(i, 'input', e.target.value)}
                  className="w-full bg-background-input border border-border rounded-md text-text-primary font-mono text-sm px-2.5 py-2 min-h-[60px] resize-none focus:outline-none focus:border-accent-purple"
                  placeholder="Example input..."
                />
              </div>
              <div>
                <label className="text-[0.7rem] font-bold text-text-muted uppercase tracking-wider block mb-1">
                  Expected Output
                </label>
                <input
                  type="text"
                  value={ex.output}
                  onChange={(e) => updateExample(i, 'output', e.target.value)}
                  className="w-full bg-background-input border border-border rounded-md text-text-primary font-mono text-sm px-2.5 py-2 focus:outline-none focus:border-accent-purple"
                  placeholder="Example output..."
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      <button
        onClick={addExample}
        className="w-full py-2 border border-dashed border-border rounded-sm text-[0.8rem] text-accent-cyan hover:border-accent-cyan hover:bg-accent-cyan/5 transition-all text-center mt-2"
      >
        + Add Example
      </button>
    </div>
  );
}
