import React from 'react'
export function Switch({ id, checked, onChange }) {
  return (
    <input id={id} type="checkbox" className="h-5 w-10 appearance-none rounded-full bg-neutral-300 checked:bg-emerald-600 relative transition 
      before:content-[''] before:absolute before:top-0.5 before:left-0.5 before:h-4 before:w-4 before:bg-white before:rounded-full before:transition
      checked:before:translate-x-5" checked={checked} onChange={onChange} />
  )
}
