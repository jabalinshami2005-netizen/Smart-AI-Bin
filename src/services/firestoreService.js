import { collection, getDocs, query, limit } from 'firebase/firestore'
import { db } from '../firebase/firebase'

export async function collectionsCount(collName){
  const q = query(collection(db, collName), limit(1))
  const snap = await getDocs(q)
  return snap.size
}
