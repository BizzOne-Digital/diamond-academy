import React from 'react';

// Two overlapping <input type="range"> elements — the classic dual-handle slider trick.
// `min`/`max` are numeric indices; `labels[i]` (optional) renders a tick label under index i.
export default function DualRangeSlider({ min, max, step = 1, valueMin, valueMax, onChange, labels }) {
  const range = max - min || 1;
  const minPct = ((valueMin - min) / range) * 100;
  const maxPct = ((valueMax - min) / range) * 100;

  return (
    <div>
      <div className="dual-range">
        <div className="dual-range-track" />
        <div className="dual-range-fill" style={{ left: `${minPct}%`, width: `${maxPct - minPct}%` }} />
        <input
          type="range" min={min} max={max} step={step} value={valueMin}
          onChange={e => onChange([Math.min(Number(e.target.value), valueMax), valueMax])}
        />
        <input
          type="range" min={min} max={max} step={step} value={valueMax}
          onChange={e => onChange([valueMin, Math.max(Number(e.target.value), valueMin)])}
        />
      </div>
      {labels && (
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '6px' }}>
          {labels.map((l, i) => (
            <span key={i} style={{ fontSize: '12px', color: '#374151', flex: i === 0 || i === labels.length - 1 ? '0 0 auto' : 1, textAlign: i === 0 ? 'left' : i === labels.length - 1 ? 'right' : 'center' }}>{l}</span>
          ))}
        </div>
      )}
    </div>
  );
}
