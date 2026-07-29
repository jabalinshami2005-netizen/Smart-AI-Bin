import React from 'react'
import Navbar from '../components/Navbar'

export default function Analytics(){
  return (
    <div className="min-h-screen bg-slate-900 text-slate-100">
      <Navbar />
      <div className="container mx-auto p-6">
        <h2 className="text-2xl mb-4">Analytics</h2>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="bg-slate-800 p-4 rounded">Collections Per Day (chart placeholder)</div>
          <div className="bg-slate-800 p-4 rounded">Overflow Trend (chart placeholder)</div>
          <div className="bg-slate-800 p-4 rounded">Average Collection Time</div>
          <div className="bg-slate-800 p-4 rounded">Top Problem Areas</div>
        </div>
      </div>
    </div>
  )
}
