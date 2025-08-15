import React from 'react';

export function Button({ children, variant, size, className = '', asChild = false, ...props }) {
  const base = 'inline-flex items-center gap-2 rounded-md text-sm transition';
  const variants = variant === 'secondary'
    ? 'bg-white border border-neutral-200 text-neutral-800'
    : variant === 'ghost'
    ? 'bg-transparent text-neutral-800'
    : 'bg-emerald-600 text-white';
  const sizes = size === 'icon' ? 'p-2 w-10 h-10' : 'px-4 py-2';
  const cls = `${base} ${variants} ${sizes} ${className}`.trim();

  if (asChild && React.isValidElement(children)) {
    return React.cloneElement(children, { className: (children.props.className || '') + ' ' + cls, ...props });
  }

  return (
    <button className={cls} {...props}>
      {children}
    </button>
  );
}
