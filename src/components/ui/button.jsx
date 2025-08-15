import React from 'react'
export function Button({ asChild, className = '', variant='default', size='md', ...props }) {
  const base = 'inline-flex items-center justify-center rounded-md text-sm font-medium transition focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none'
  const variants = {
    default: 'bg-emerald-600 text-white hover:opacity-90',
    secondary: 'bg-neutral-100 hover:bg-neutral-200 dark:bg-neutral-800 dark:hover:bg-neutral-700',
    outline: 'border bg-transparent hover:bg-neutral-50 dark:hover:bg-neutral-900'
  }
  const sizes = { md: 'h-10 px-4 py-2', icon: 'h-9 w-9 p-0' }
  const Comp = asChild ? 'span' : 'button'
  return <Comp className={`${base} ${variants[variant]||variants.default} ${sizes[size]||sizes.md} ${className}`} {...props} />
}
