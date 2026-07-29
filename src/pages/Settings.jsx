import React from 'react'
import Navbar from '../components/Navbar'

export default function Settings(){
  return (
    <div className="min-h-screen bg-slate-900 text-slate-100">
      <Navbar />
      <div className="container mx-auto p-6">
        <h2 className="text-2xl mb-4">Settings</h2>
        <div className="bg-slate-800 p-4 rounded">Theme toggle and profile settings (placeholder)</div>
      </div>
    </div>
  )
}
