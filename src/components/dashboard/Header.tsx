'use client'

import { Menu } from 'lucide-react'

export default function Header({ onMenuClick }: { onMenuClick?: () => void }) {
  return (
    <header className="md:hidden sticky top-0 z-30 flex items-center justify-between bg-[#1a0730] text-white px-4 py-3 shadow">
      <button onClick={onMenuClick}>
        <Menu size={22} />
      </button>
      <span className="font-bold text-lg">MonadGuard</span>
    </header>
  )
}
