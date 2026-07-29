import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import Landing from './pages/Landing'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import Bins from './pages/Bins'
import Analytics from './pages/Analytics'
import RouteOptimizer from './pages/RouteOptimizer'
import Settings from './pages/Settings'
import { useAuth } from './hooks/useAuth'

function PrivateRoute({ children }){
  const { user, loading } = useAuth()
  if(loading) return <div className="p-4">Loading...</div>
  return user ? children : <Navigate to="/login" />
}

export default function Router(){
  return (
    <Routes>
      <Route path='/' element={<Landing />} />
      <Route path='/login' element={<Login />} />
      <Route path='/dashboard' element={<PrivateRoute><Dashboard /></PrivateRoute>} />
      <Route path='/bins' element={<PrivateRoute><Bins /></PrivateRoute>} />
      <Route path='/analytics' element={<PrivateRoute><Analytics /></PrivateRoute>} />
      <Route path='/routes' element={<PrivateRoute><RouteOptimizer /></PrivateRoute>} />
      <Route path='/settings' element={<PrivateRoute><Settings /></PrivateRoute>} />
    </Routes>
  )
}
