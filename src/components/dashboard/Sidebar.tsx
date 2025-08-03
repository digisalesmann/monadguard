'use client'

import { usePathname } from 'next/navigation'
import Link from 'next/link'
import {
  Home,
  Wallet,
  SlidersHorizontal,
  Signal,
  X,
} from 'lucide-react'
import { FaTelegram, FaDiscord, FaXTwitter } from 'react-icons/fa6'
import { cn } from '@/lib/utils'

export default function Sidebar({ onClose }: { onClose?: () => void }) {
  const pathname = usePathname()

  const navLinks = [
    { href: '/', label: 'Home', icon: Home },
    { href: '/airdrop-checker', label: 'Wallet Checker', icon: Wallet },
    { href: '/allocation-sim', label: 'Allocation Simulator', icon: SlidersHorizontal },
    { href: '/activity-feed', label: 'Activity Feed', icon: Signal },
  ]

  const socialLinks = [
    { href: 'https://x.com/digisalesmann', icon: FaXTwitter },
    { href: 'https://t.me/digisalesmann', icon: FaTelegram },
    { href: 'https://discordapp.com/users/884179081481027585', icon: FaDiscord },
  ]

  return (
    <aside className="flex flex-col h-full justify-between p-4">
      {/* Top Section */}
      <div>
        {/* Mobile close */}
        <div className="flex items-center justify-between mb-6 md:hidden">
          <h1 className="text-xl font-bold">MonadGuard</h1>
          <button onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        {/* Logo Desktop */}
        <div className="hidden md:block text-2xl font-bold mb-8">MonadGuard</div>

        <nav className="space-y-4">
          {navLinks.map(({ href, label, icon: Icon }) => (
            <Link
              key={href}
              href={href}
              onClick={onClose}
              className={cn(
                'flex items-center gap-3 p-2 rounded-md transition-all text-sm',
                pathname === href ? 'bg-white text-[#4B1D8C] font-semibold' : 'hover:bg-white/10'
              )}
            >
              <Icon className="w-5 h-5" /> {label}
            </Link>
          ))}
        </nav>
      </div>

      {/* Socials */}
      <div className="flex gap-4 mt-10 text-white opacity-80">
        {socialLinks.map(({ href, icon: Icon }) => (
          <a
            key={href}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-purple-300"
          >
            <Icon className="w-5 h-5" />
          </a>
        ))}
      </div>
    </aside>
  )
}
