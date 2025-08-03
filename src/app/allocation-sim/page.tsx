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

const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8000'

interface Wallet {
  address: string
  sybilScore: number
  activeDapps: number
  nftCount: number
  volumeMon: number
  predictedAirdrop: number
}

type ActivityStat = { unique_contract_calls: number }

export default function AirdropSimulatorPage() {
  const [loading, setLoading] = useState(false)
  const [results, setResults] = useState<Wallet[]>([])
  const [inputAddress, setInputAddress] = useState('')

  const simulate = async () => {
    if (!inputAddress) return
    setLoading(true)
    try {
      const res = await fetch(`${API_BASE}/api/check/${inputAddress}?blocks=10`)
      const data = await res.json()
      const activeDapps = (Object.values(data.activity) as ActivityStat[])
        .filter(stat => stat && stat.unique_contract_calls > 0).length

      const wallet: Wallet = {
        address: inputAddress,
        sybilScore: data.sybil_score ?? 0,
        activeDapps,
        nftCount: data.nft_count ?? 0,
        volumeMon: data.volume_mon ?? 0,
        predictedAirdrop: Math.round(data.predicted_airdrop ?? 0),
      }

      setResults([wallet])
    } catch {
      alert('Simulation failed. Please check the address and backend.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Shell>
      <div className="max-w-2xl mx-auto px-4 py-10 space-y-8">
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold tracking-tight text-white">
            Airdrop Allocation Simulator
          </h1>
          <p className="text-muted-foreground">
            Enter a wallet address to simulate token rewards based on real Monad testnet activity and risk.
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
                      Sybil Risk: {wallet.sybilScore}%
                    </CardDescription>
                  </div>
                  <BarChart className="w-4 h-4 text-yellow-500" />
                </CardHeader>
                <CardContent className="text-sm space-y-2">
                  <div className="text-muted-foreground">
                    Active dApps: {wallet.activeDapps}
                  </div>
                  <div className="text-muted-foreground">
                    NFT Contracts: {wallet.nftCount}
                  </div>
                  <div className="text-muted-foreground">
                    Volume (MON): {wallet.volumeMon.toFixed(2)}
                  </div>
                  <div className="text-xl font-bold text-yellow-300">
                    {wallet.predictedAirdrop.toLocaleString()} tokens
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