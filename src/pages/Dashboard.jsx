import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import { collection, getDocs, query, where } from 'firebase/firestore'
import { db } from '../firebase/firebase'
import { Card } from '../components/Card'
import Loading from '../components/Loading'
import { formatDate } from '../utils/format'

export default function Dashboard(){
  const [loading, setLoading] = useState(true)
  const [bins, setBins] = useState([])
  const [alerts, setAlerts] = useState([])

  useEffect(()=>{
    async function load(){
      setLoading(true)
      const snap = await getDocs(collection(db, 'bins'))
      const arr = []
      snap.forEach(d=>arr.push({id:d.id, ...d.data()}))
      setBins(arr)

      // simple alerts: waste>90 or not collected >3 days
      const a = arr.filter(b=>b.waste>90 || (Date.now() - (b.lastCollected||0)) > 3*24*3600*1000)
      setAlerts(a.map(b=>({binId:b.id, area:b.area, reason: b.waste>90 ? 'Waste>90%' : 'Not collected >3 days'})))

      setLoading(false)
    }
    load()
  },[])

  if(loading) return <Loading />

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100">
      <Navbar />
      <div className="container mx-auto p-6 grid gap-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card title="Total Bins">{bins.length}</Card>
          <Card title="Overflowing">{bins.filter(b=>b.waste>90).length}</Card>
          <Card title="Pending Collections">{bins.filter(b=>b.waste>60).length}</Card>
        </div>

        <div className="grid md:grid-cols-3 gap-4">
          <div className="md:col-span-2">
            <Card title="Latest Alerts">
              {alerts.length===0 ? <div>No alerts</div> : (
                <ul>
                  {alerts.map((a,i)=>(<li key={i} className="py-2 border-b border-slate-700">{a.binId} - {a.area} - {a.reason}</li>))}
                </ul>
              )}
            </Card>
          </div>
          <div>
            <Card title="Recent Bins">
              <ul>
                {bins.slice(0,5).map(b=>(<li key={b.id} className="py-2">{b.id} - {b.area} - {b.waste}% - Last: {formatDate(b.lastCollected)}</li>))}
              </ul>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
