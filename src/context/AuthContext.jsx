import React, { createContext, useEffect, useState } from 'react'
import { auth, db, googleProvider } from '../firebase/firebase'
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  signInWithPopup
} from 'firebase/auth'
import { seedIfNeeded } from '../utils/seed'

export const AuthContext = createContext()

export function AuthProvider({ children }){
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(()=>{
    const unsub = onAuthStateChanged(auth, async (u)=>{
      setUser(u)
      setLoading(false)
      if(u){
        // run seed once when a user logs in and db is empty
        try{ await seedIfNeeded() }catch(e){ console.error('Seed failed', e) }
      }
    })
    return ()=>unsub()
  },[])

  const login = (email, password) => signInWithEmailAndPassword(auth, email, password)
  const register = (email, password) => createUserWithEmailAndPassword(auth, email, password)
  const logout = () => signOut(auth)
  const signInWithGoogle = () => signInWithPopup(auth, googleProvider)

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout, signInWithGoogle }}>
      {children}
    </AuthContext.Provider>
  )
}
