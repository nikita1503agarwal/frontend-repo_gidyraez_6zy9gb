import React from 'react'
import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-slate-950 px-6 text-center text-white">
      <h1 className="text-7xl font-extrabold">404</h1>
      <p className="mt-2 text-slate-400">The page you are looking for does not exist.</p>
      <Link to="/" className="mt-6 rounded-full bg-indigo-600 px-6 py-3 font-semibold text-white hover:bg-indigo-500">Go Home</Link>
    </div>
  )
}
