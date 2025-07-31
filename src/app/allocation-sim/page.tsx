'use client'

import Shell from '@/components/dashboard/Shell'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
} from '@/components/ui/card'
import { BarChart, Loader2 } from 'lucide-react'
import { motion } from 'framer-motion'

interface Wallet {
  address: string
  riskScore: number
  activeDapps: number
  communityBadges: number
  penalty?: number
  base?: number
  adjustedScore?: number
  projectedTokens?: number
}

export default function AirdropSimulatorPage() {
  const [loading, setLoading] = useState(false)
  const [results, setResults] = useState<Wallet[]>([])
  const [inputAddress, setInputAddress] = useState('')

  const simulate = () => {
    if (!inputAddress) return
    setLoading(true)

    setTimeout(() => {
      // Simulated activity based on a hypothetical Monad dataset
      const activeDapps = Math.floor(Math.random() * 10) + 1 // e.g., Swaps, Mints, Votes, etc.
      const communityBadges = Math.floor(Math.random() * 5) + 1 // e.g., Testnet OG, NFT Holder, etc.
      const base = activeDapps * 10 + communityBadges * 5
      const riskScore = Math.floor(Math.random() * 100)
      const penalty = riskScore > 70 ? 0.4 : 1
      const adjustedScore = base * penalty
      const projectedTokens = Number(
        ((adjustedScore / 100) * 1_000_000).toFixed(0)
      )

      const wallet: Wallet = {
        address: inputAddress,
        riskScore,
        activeDapps,
        communityBadges,
        base,
        penalty,
        adjustedScore,
        projectedTokens,
      }

      setResults([wallet])
      setLoading(false)
    }, 1000)
  }

  return (
    <Shell>
      <div className="max-w-2xl mx-auto px-4 py-10 space-y-8">
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold tracking-tight text-white">
            Airdrop Allocation Simulator
          </h1>
          <p className="text-muted-foreground">
            Enter a wallet address to simulate token rewards based on activity and risk across Monad.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center w-full">
          <input
            type="text"
            value={inputAddress}
            onChange={(e) => setInputAddress(e.target.value)}
            placeholder="Enter wallet address"
            className="w-full sm:max-w-md px-4 py-2 rounded-md bg-background border border-border text-white"
          />
          <Button onClick={simulate} disabled={loading || !inputAddress} className="w-full sm:w-auto">
            {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Simulate'}
          </Button>
        </div>

        {results.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="grid grid-cols-1 gap-6"
          >
            {results.map((wallet, idx) => (
              <Card key={idx} className="border-l-4 border-yellow-500">
                <CardHeader className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-base font-medium text-white break-all">
                      {wallet.address}
                    </CardTitle>
                    <CardDescription className="text-xs text-muted-foreground">
                      Risk: {wallet.riskScore}% | Penalty: ×{wallet.penalty}
                    </CardDescription>
                  </div>
                  <BarChart className="w-4 h-4 text-yellow-500" />
                </CardHeader>
                <CardContent className="text-sm space-y-2">
                  <div className="text-muted-foreground">
                    Active dApps: {wallet.activeDapps}
                  </div>
                  <div className="text-muted-foreground">
                    Community Badges: {wallet.communityBadges}
                  </div>
                  <div className="text-muted-foreground">Base Score: {wallet.base}</div>
                  <div className="text-muted-foreground">
                    Adjusted: {wallet.adjustedScore?.toFixed(1)}
                  </div>
                  <div className="text-xl font-bold text-yellow-300">
                    {wallet.projectedTokens?.toLocaleString()} tokens
                  </div>
                </CardContent>
              </Card>
            ))}
          </motion.div>
        )}
      </div>
    </Shell>
  )
}
