import React from 'react';

export function Dialog({ children }) { return <div>{children}</div>; }
export function DialogTrigger({ children }) { return children; }
export function DialogContent({ children, className = '' }) { return <div className={className}>{children}</div>; }
export function DialogHeader({ children }) { return <div className="mb-2">{children}</div>; }
export function DialogTitle({ children }) { return <h4 className="font-semibold">{children}</h4>; }
