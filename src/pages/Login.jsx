import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'

export default function Login(){
  const { login, register, signInWithGoogle } = useAuth()
  const [isRegister, setIsRegister] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const submit = async (e)=>{
    e.preventDefault()
    setError('')
    try{
      if(isRegister) await register(email, password)
      else await login(email, password)
      navigate('/dashboard')
    }catch(e){ setError(e.message) }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-900">
      <div className="w-full max-w-md bg-slate-800 rounded p-6">
        <h2 className="text-2xl font-semibold mb-4">{isRegister ? 'Register' : 'Sign In'}</h2>
        {error && <div className="bg-red-600 text-white p-2 rounded mb-2">{error}</div>}
        <form onSubmit={submit} className="space-y-3">
          <input className="w-full p-2 rounded bg-slate-700" placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} />
          <input type="password" className="w-full p-2 rounded bg-slate-700" placeholder="Password" value={password} onChange={e=>setPassword(e.target.value)} />
          <button className="w-full py-2 bg-indigo-600 rounded">{isRegister ? 'Register' : 'Sign In'}</button>
        </form>
        <div className="mt-3 text-center">
          <button onClick={()=>setIsRegister(!isRegister)} className="text-slate-300">{isRegister ? 'Have an account? Sign in' : "Don't have account? Register"}</button>
        </div>
        <div className="mt-4">
          <button onClick={async()=>{try{await signInWithGoogle(); navigate('/dashboard')}catch(e){setError(e.message)}}} className="w-full py-2 bg-slate-600 rounded">Sign in with Google</button>
        </div>
      </div>
    </div>
  )
}
