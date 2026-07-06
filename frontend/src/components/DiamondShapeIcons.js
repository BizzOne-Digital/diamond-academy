import React from 'react';

// Simple stylized top-view outlines for each diamond shape — not gemologically exact,
// just enough for filter buttons to be visually distinguishable at a glance.
const PATHS = {
  Round: <circle cx="12" cy="12" r="8" />,
  Princess: <rect x="5" y="5" width="14" height="14" />,
  Cushion: <rect x="5" y="5" width="14" height="14" rx="5" />,
  Oval: <ellipse cx="12" cy="12" rx="6" ry="8.5" />,
  Pear: <path d="M12 4c3 4 6 7.5 6 11a6 6 0 1 1-12 0c0-3.5 3-7 6-11z" />,
  Emerald: <rect x="5" y="6" width="14" height="12" rx="2" />,
  Marquise: <ellipse cx="12" cy="12" rx="4" ry="9" />,
  Heart: <path d="M12 20S3 13.5 3 8a4.5 4.5 0 0 1 9-1 4.5 4.5 0 0 1 9 1c0 5.5-9 12-9 12z" />,
  Asscher: <rect x="5.5" y="5.5" width="13" height="13" transform="rotate(0 12 12)" />,
  Radiant: <rect x="5" y="5" width="14" height="14" rx="1" />,
};

export default function DiamondShapeIcon({ shape, size = 28, color = '#1B2B4B' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.3">
      {PATHS[shape] || PATHS.Round}
    </svg>
  );
}
