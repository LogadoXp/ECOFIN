import React from 'react';

export function Tabs({ children }) { return <div>{children}</div>; }
export function TabsList({ children }) { return <div className="flex gap-2">{children}</div>; }
export function TabsTrigger({ children, onClick, className = '' }) { return <button onClick={onClick} className={`px-3 py-1 rounded ${className}`}>{children}</button>; }
export function TabsContent({ children }) { return <div>{children}</div>; }
