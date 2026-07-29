import React, { createContext, useEffect, useState } from 'react'
import { auth, db, googleProvider, initialized } from '../firebase/firebase'
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
    if(!initialized){
      // Firebase not configured — avoid calling onAuthStateChanged which requires a real auth instance
      setUser(null)
      setLoading(false)
      return
    }

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

  const login = (email, password) => {
    if(!initialized) return Promise.reject(new Error('Firebase not initialized. Fill .env.local with Firebase config.'))
    return signInWithEmailAndPassword(auth, email, password)
  }
  const register = (email, password) => {
    if(!initialized) return Promise.reject(new Error('Firebase not initialized.'))
    return createUserWithEmailAndPassword(auth, email, password)
  }
  const logout = () => {
    if(!initialized) return Promise.reject(new Error('Firebase not initialized.'))
    return signOut(auth)
  }
  const signInWithGoogle = () => {
    if(!initialized) return Promise.reject(new Error('Firebase not initialized.'))
    return signInWithPopup(auth, googleProvider)
  }

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout, signInWithGoogle }}>
      {children}
    </AuthContext.Provider>
  )
}
