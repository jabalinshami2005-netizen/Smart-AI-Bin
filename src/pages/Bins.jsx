import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import { collection, getDocs, addDoc, deleteDoc, doc } from 'firebase/firestore'
import { db } from '../firebase/firebase'
import Loading from '../components/Loading'
import { formatDate } from '../utils/format'

export default function Bins(){
  const [loading, setLoading] = useState(true)
  const [bins, setBins] = useState([])
  const [formVisible, setFormVisible] = useState(false)
  const [form, setForm] = useState({id:'', area:'', lat:'', lng:'', waste:0, capacity:100})

  useEffect(()=>{ load() },[])
  async function load(){
    setLoading(true)
    const snap = await getDocs(collection(db, 'bins'))
    const arr = []
    snap.forEach(d=>arr.push({docId:d.id, ...d.data()}))
    setBins(arr)
    setLoading(false)
  }

  async function add(){
    await addDoc(collection(db, 'bins'), { ...form, lastCollected: Date.now() })
    setForm({id:'', area:'', lat:'', lng:'', waste:0, capacity:100})
    setFormVisible(false)
    load()
  }

  async function remove(docId){
    await deleteDoc(doc(db, 'bins', docId))
    load()
  }

  if(loading) return <Loading />

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100">
      <Navbar />
      <div className="container mx-auto p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl">Bins</h2>
          <button onClick={()=>setFormVisible(!formVisible)} className="bg-indigo-600 px-4 py-2 rounded">{formVisible ? 'Close' : 'Add Bin'}</button>
        </div>
        {formVisible && (
          <div className="bg-slate-800 p-4 rounded mb-4">
            <input className="w-full p-2 my-2 bg-slate-700" placeholder="Bin ID" value={form.id} onChange={e=>setForm({...form,id:e.target.value})} />
            <input className="w-full p-2 my-2 bg-slate-700" placeholder="Area" value={form.area} onChange={e=>setForm({...form,area:e.target.value})} />
            <div className="grid grid-cols-2 gap-2">
              <input className="p-2 my-2 bg-slate-700" placeholder="Lat" value={form.lat} onChange={e=>setForm({...form,lat:parseFloat(e.target.value)})} />
              <input className="p-2 my-2 bg-slate-700" placeholder="Lng" value={form.lng} onChange={e=>setForm({...form,lng:parseFloat(e.target.value)})} />
            </div>
            <input type="number" className="w-full p-2 my-2 bg-slate-700" placeholder="Waste %" value={form.waste} onChange={e=>setForm({...form,waste:parseInt(e.target.value)})} />
            <div className="flex gap-2">
              <button onClick={add} className="bg-green-600 px-4 py-2 rounded">Create</button>
            </div>
          </div>
        )}

        <div className="grid md:grid-cols-2 gap-4">
          {bins.map(b=> (
            <div key={b.docId} className="bg-slate-800 p-4 rounded">
              <div className="flex justify-between items-center">
                <div>
                  <div className="font-semibold">{b.id}</div>
                  <div className="text-slate-400">{b.area}</div>
                </div>
                <div className="text-right">
                  <div className="text-2xl">{b.waste}%</div>
                  <div className="text-slate-400">Last: {formatDate(b.lastCollected)}</div>
                </div>
              </div>
              <div className="mt-3 flex gap-2">
                <button className="bg-indigo-600 px-3 py-1 rounded">Analyze</button>
                <button onClick={()=>remove(b.docId)} className="bg-red-600 px-3 py-1 rounded">Delete</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
