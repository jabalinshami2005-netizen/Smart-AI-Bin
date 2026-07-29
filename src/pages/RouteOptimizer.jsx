import React, { useState } from 'react'
import Navbar from '../components/Navbar'

export default function RouteOptimizer(){
  const [selected, setSelected] = useState([])
  const [route, setRoute] = useState(null)

  function optimize(){
    // naive order by waste desc
    const ordered = [...selected].sort((a,b)=>b.waste - a.waste)
    setRoute({order: ordered, distance: (ordered.length*1.3).toFixed(1)+' km', time: (ordered.length*8)+' mins', tips: 'Group nearby areas, avoid peak hours'})
  }

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100">
      <Navbar />
      <div className="container mx-auto p-6">
        <h2 className="text-2xl mb-4">Route Optimizer</h2>
        <div className="bg-slate-800 p-4 rounded mb-4">Select bins (sample UI) and press Optimize.</div>
        <div className="flex gap-2">
          <button onClick={optimize} className="bg-indigo-600 px-4 py-2 rounded">Generate Route</button>
        </div>

        {route && (
          <div className="mt-4 bg-slate-800 p-4 rounded">
            <div className="font-semibold">Route Order</div>
            <ol className="list-decimal ml-6 mt-2">{route.order.map((r,i)=>(<li key={i}>{r.id} - {r.area} - {r.waste}%</li>))}</ol>
            <div className="mt-3">Estimated Distance: {route.distance}</div>
            <div>Estimated Time: {route.time}</div>
            <div>Tips: {route.tips}</div>
          </div>
        )}
      </div>
    </div>
  )
}
