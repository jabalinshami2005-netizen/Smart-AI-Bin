import React from 'react'

export default function Navbar(){
  return (
    <nav className="w-full bg-gradient-to-r from-slate-800 to-slate-900 p-4 flex justify-between items-center">
      <div className="text-xl font-semibold">SmartBin AI</div>
      <div className="space-x-4">
        <a href="/dashboard" className="text-slate-300 hover:text-white">Dashboard</a>
        <a href="/bins" className="text-slate-300 hover:text-white">Bins</a>
        <a href="/analytics" className="text-slate-300 hover:text-white">Analytics</a>
      </div>
    </nav>
  )
}
