import React from 'react'
export function Textarea({ className='', ...props }) {
  return <textarea className={`w-full rounded-md border bg-background px-3 py-2 outline-none focus:ring-2 focus:ring-emerald-500 ${className}`} {...props} />
}
