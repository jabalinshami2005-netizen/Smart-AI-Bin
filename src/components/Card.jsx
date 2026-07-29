import React from 'react'

export function Card({title, children}){
  return (
    <div className="bg-slate-800 rounded-lg shadow-md p-4">
      <div className="font-semibold text-slate-200 mb-2">{title}</div>
      <div>{children}</div>
    </div>
  )
}
