import React, { createContext, useContext, useState } from 'react'

const Ctx = createContext(null)
export function Dialog({ children }) {
  const [open, setOpen] = useState(false)
  return <Ctx.Provider value={{open, setOpen}}>{children}{open && <div className="fixed inset-0 z-50 flex items-center justify-center"><div className="absolute inset-0 bg-black/50" onClick={()=>setOpen(false)}></div><div className="relative z-10 w-full max-w-md rounded-xl border bg-white p-4 dark:bg-neutral-900">{children}</div></div>}</Ctx.Provider>
}
export function DialogTrigger({ asChild, children, ...props }) {
  const { setOpen } = useContext(Ctx)
  const Comp = asChild ? 'span' : 'button'
  return <Comp onClick={()=>setOpen(true)} {...props}>{children}</Comp>
}
export function DialogContent({ className='', children }) {
  return <div className={className}>{children}</div>
}
export function DialogHeader({ className='', children }) {
  return <div className={`mb-2 ${className}`}>{children}</div>
}
export function DialogTitle({ className='', children }) {
  return <h4 className={`text-lg font-semibold ${className}`}>{children}</h4>
}
