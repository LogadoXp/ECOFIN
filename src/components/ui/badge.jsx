import React from 'react'
export function Badge({ className='', variant='default', ...props }) {
  const variants = {
    default: 'bg-emerald-600 text-white',
    secondary: 'bg-neutral-100 text-neutral-900 dark:bg-neutral-800 dark:text-neutral-50',
    outline: 'border'
  }
  return <span className={`inline-flex items-center rounded-md px-2 py-1 text-xs ${variants[variant]||variants.default} ${className}`} {...props} />
}
