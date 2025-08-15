import React from 'react';

export function Badge({ children, className = '', variant }) {
  const base = 'inline-flex items-center gap-2 px-2 py-1 text-xs rounded-full border';
  return <span className={`${base} ${className}`.trim()}>{children}</span>;
}
