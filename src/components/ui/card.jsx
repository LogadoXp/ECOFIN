import React from 'react';

export function Card({ children, className = '' }) {
  return <div className={`bg-white border rounded-xl shadow-sm ${className}`.trim()}>{children}</div>;
}
export function CardHeader({ children, className = '' }) {
  return <div className={`p-4 border-b ${className}`.trim()}>{children}</div>;
}
export function CardContent({ children, className = '' }) {
  return <div className={`p-4 ${className}`.trim()}>{children}</div>;
}
export function CardTitle({ children, className = '' }) {
  return <h3 className={`font-semibold ${className}`.trim()}>{children}</h3>;
}
export function CardDescription({ children, className = '' }) {
  return <p className={`text-sm text-neutral-600 ${className}`.trim()}>{children}</p>;
}
