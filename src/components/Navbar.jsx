import React, { useState } from 'react'
import { Menu, X, Gift, Wallet, DollarSign } from 'lucide-react'
import { Link, NavLink } from 'react-router-dom'

export default function Navbar() {
  const [open, setOpen] = useState(false)

  const NavItem = ({ to, children }) => (
    <NavLink
      to={to}
      onClick={() => setOpen(false)}
      className={({ isActive }) =>
        `rounded-full px-4 py-2 text-sm font-medium transition ${
          isActive ? 'bg-white/20 text-white' : 'text-white/80 hover:bg-white/10 hover:text-white'
        }`}
    >
      {children}
    </NavLink>
  )

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div className="mx-auto max-w-7xl px-6 py-4">
        <div className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/10 px-4 py-3 backdrop-blur-lg">
          <Link to="/" className="flex items-center gap-2 text-white">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/10">
              <Gift size={18} />
            </div>
            <span className="text-lg font-semibold tracking-tight">CardFlow</span>
          </Link>

          <nav className="hidden items-center gap-2 md:flex">
            <NavItem to="/">Home</NavItem>
            <NavItem to="/trade">Trade</NavItem>
            <NavItem to="/rates">Rates</NavItem>
            <NavItem to="/test">Test</NavItem>
          </nav>

          <div className="hidden md:block">
            <Link to="/trade" className="rounded-full bg-indigo-500 px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-indigo-500/30 transition hover:bg-indigo-400">
              Start Trading
            </Link>
          </div>

          <button onClick={() => setOpen(!open)} className="rounded-xl border border-white/10 bg-white/10 p-2 text-white md:hidden">
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>

        {open && (
          <div className="mt-2 overflow-hidden rounded-2xl border border-white/10 bg-white/10 p-3 backdrop-blur md:hidden">
            <div className="flex flex-col gap-1">
              <NavItem to="/">Home</NavItem>
              <NavItem to="/trade">Trade</NavItem>
              <NavItem to="/rates">Rates</NavItem>
              <NavItem to="/test">Test</NavItem>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}
