'use client'

import Shell from '@/components/dashboard/Shell'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { BarChart3, ShieldCheck, Activity } from 'lucide-react'

export default function Home() {
  return (
    <Shell>
      <div className="max-w-6xl mx-auto px-4 py-12 space-y-16">
        <section className="text-center space-y-4">
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-white">
            Welcome to MonadGuard
          </h1>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Combat Sybil attacks, simulate fair airdrops, and explore on-chain activity — all in one place for the Monad ecosystem.
          </p>
          <div className="flex justify-center gap-4 mt-6 flex-wrap">
            <Link href="/wallet-checker">
              <Button className="px-6 py-3 text-base">Start Wallet Scan</Button>
            </Link>
            <Link href="/allocation-simulator">
              <Button variant="secondary" className="px-6 py-3 text-base">
                Simulate Allocation
              </Button>
            </Link>
          </div>
        </section>

        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-gradient-to-tr from-purple-700 to-purple-900 p-6 rounded-2xl text-white shadow-lg">
            <div className="flex items-center gap-3 mb-4">
              <ShieldCheck className="w-6 h-6" />
              <h3 className="font-semibold text-lg">Wallet Sybil Scanner</h3>
            </div>
            <p className="text-sm text-white/80">
              Detect multi-wallet abuse and Sybil patterns with deep heuristics.
            </p>
          </div>

          <div className="bg-gradient-to-tr from-indigo-600 to-purple-700 p-6 rounded-2xl text-white shadow-lg">
            <div className="flex items-center gap-3 mb-4">
              <BarChart3 className="w-6 h-6" />
              <h3 className="font-semibold text-lg">Airdrop Allocation Simulator</h3>
            </div>
            <p className="text-sm text-white/80">
              Estimate $MON rewards based on real-time address activity and participation.
            </p>
          </div>

          <div className="bg-gradient-to-tr from-pink-600 to-purple-600 p-6 rounded-2xl text-white shadow-lg">
            <div className="flex items-center gap-3 mb-4">
              <Activity className="w-6 h-6" />
              <h3 className="font-semibold text-lg">Live Activity Feed</h3>
            </div>
            <p className="text-sm text-white/80">
              Explore active wallets, flagged addresses, and allocation insights in real time.
            </p>
          </div>
        </section>

        <section className="bg-gradient-to-br from-[#150528] to-[#1a0730] p-10 rounded-2xl shadow-xl text-white space-y-4">
          <h2 className="text-2xl font-bold">Why MonadGuard?</h2>
          <ul className="list-disc pl-6 space-y-1 text-white/90 text-sm">
            <li>Transparent simulation and scoring metrics</li>
            <li>Powered by on-chain activity across Monad ecosystem dApps</li>
            <li>Real-time Sybil detection using advanced wallet graph analysis</li>
            <li>Community-first tooling for fair airdrops</li>
          </ul>
        </section>

        <div className="text-center pt-10 border-t border-border">
          <p className="text-xs text-muted-foreground">
            Built with 💜 by @0xdsm.Nad. Feedback? Dm on socials.
          </p>
        </div>
      </div>
    </Shell>
  )
}
