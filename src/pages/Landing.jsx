import React from 'react'
import Navbar from '../components/Navbar'

export default function Landing(){
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 text-slate-100">
      <Navbar />
      <header className="container mx-auto p-8 text-center">
        <h1 className="text-4xl font-bold">SmartBin AI</h1>
        <p className="mt-4 max-w-2xl mx-auto text-slate-300">Intelligent Waste Collection & Bin Overflow Monitoring System. Use AI to predict overflows, optimize routes, and reduce costs.</p>
        <div className="mt-6">
          <a href="/login" className="px-6 py-3 bg-indigo-500 rounded-md shadow hover:bg-indigo-600">Get Started</a>
        </div>
      </header>

      <section className="container mx-auto p-8 grid md:grid-cols-3 gap-6">
        <div className="bg-slate-800 p-6 rounded-lg"> 
          <h3 className="font-semibold">AI-powered Analysis</h3>
          <p className="text-slate-300 mt-2">Use Gemini to analyze bin data and get prioritized pickups.</p>
        </div>
        <div className="bg-slate-800 p-6 rounded-lg"> 
          <h3 className="font-semibold">Route Optimization</h3>
          <p className="text-slate-300 mt-2">Generate efficient routes for collection trucks.</p>
        </div>
        <div className="bg-slate-800 p-6 rounded-lg"> 
          <h3 className="font-semibold">Real-time Alerts</h3>
          <p className="text-slate-300 mt-2">Automatic alerts for overflowing or stale bins.</p>
        </div>
      </section>

      <footer className="p-6 text-center text-slate-400">© SmartBin AI</footer>
    </div>
  )
}
