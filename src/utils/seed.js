export const sampleBins = [
  { id: 'BIN-001', area: 'Downtown', lat: 40.7128, lng: -74.006, waste: 25, capacity: 100, lastCollected: Date.now()-86400000 },
  { id: 'BIN-002', area: 'Market Street', lat: 40.7138, lng: -74.005, waste: 85, capacity: 100, lastCollected: Date.now()-4*24*3600*1000 },
  { id: 'BIN-003', area: 'River Park', lat: 40.7148, lng: -74.004, waste: 55, capacity: 100, lastCollected: Date.now()-2*24*3600*1000 },
]

import { collection, getDocs, addDoc } from 'firebase/firestore'
import { db } from '../firebase/firebase'

export async function seedIfNeeded(){
  const binsCol = collection(db, 'bins')
  const snap = await getDocs(binsCol)
  if(snap.size === 0){
    for(const b of sampleBins){
      await addDoc(binsCol, b)
    }
    console.log('Seeded bins collection')
  }
}
