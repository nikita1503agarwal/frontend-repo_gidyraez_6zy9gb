import React from 'react'

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-slate-950/60 py-10 text-slate-400">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-4">
          <div>
            <div className="text-lg font-semibold text-white">CardFlow</div>
            <p className="mt-2 text-sm">Modern platform to buy and sell gift cards with excellent rates and fast payouts.</p>
          </div>
          <div>
            <div className="text-sm font-semibold text-white">Company</div>
            <ul className="mt-2 space-y-2 text-sm">
              <li><a href="#" className="hover:text-white">About</a></li>
              <li><a href="#" className="hover:text-white">Careers</a></li>
              <li><a href="#" className="hover:text-white">Contact</a></li>
            </ul>
          </div>
          <div>
            <div className="text-sm font-semibold text-white">Legal</div>
            <ul className="mt-2 space-y-2 text-sm">
              <li><a href="#" className="hover:text-white">Terms</a></li>
              <li><a href="#" className="hover:text-white">Privacy</a></li>
              <li><a href="#" className="hover:text-white">KYC Policy</a></li>
            </ul>
          </div>
          <div>
            <div className="text-sm font-semibold text-white">Support</div>
            <ul className="mt-2 space-y-2 text-sm">
              <li><a href="#" className="hover:text-white">Help Center</a></li>
              <li><a href="#" className="hover:text-white">FAQs</a></li>
              <li><a href="#" className="hover:text-white">Status</a></li>
            </ul>
          </div>
        </div>
        <div className="mt-8 border-t border-white/10 pt-6 text-xs">© {new Date().getFullYear()} CardFlow. All rights reserved.</div>
      </div>
    </footer>
  )
}
