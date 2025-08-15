import React from 'react'
export function Card({ className='', ...props }) {
  return <div className={`rounded-xl border bg-white/80 dark:bg-neutral-900/60 ${className}`} {...props} />
}
export function CardHeader({ className='', ...props }) {
  return <div className={`p-4 border-b/0 ${className}`} {...props} />
}
export function CardTitle({ className='', ...props }) {
  return <h3 className={`text-lg font-semibold ${className}`} {...props} />
}
export function CardDescription({ className='', ...props }) {
  return <p className={`text-sm opacity-80 ${className}`} {...props} />
}
export function CardContent({ className='', ...props }) {
  return <div className={`p-4 ${className}`} {...props} />
}
