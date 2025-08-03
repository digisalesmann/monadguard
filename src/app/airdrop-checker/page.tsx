'use client'

import Shell from '@/components/dashboard/Shell'
import { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
} from '@/components/ui/card'
import {
  Loader2,
  ShieldAlert,
  BarChart2,
  RefreshCcw,
} from 'lucide-react'
import { motion } from 'framer-motion'

const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8000'

type DappStats = {
  [key: string]: {
    unique_contract_calls: number
    score?: number
    tags?: string[]
    summary?: string
    error?: string
  }
}

const DAPP_LIST = [
  'accountable', 'acurast', 'ammalgam', 'apriori', 'azaar', 'bean_exchange', 'bebop', 'castora', 'chaquen', 'clober', 'covenant', 'crystal', 'curvance', 'dau_cards', 'dialect', 'dirol_protocol', 'dusted', 'fastlane', 'flap', 'folks_finance', 'fortytwo', 'fuku', 'hashflow', 'izumi', 'kintsu', 'kizzy', 'kuru', 'legends_of_elysium', 'levr_bet', 'lfj', 'lootgo', 'magic_eden', 'magma', 'mahjong123', 'meta_leap', 'monorail', 'moseiki', 'mozi', 'mu_digital', 'multipli_fi', 'narwhal', 'nextmate_ai', 'nfts2me', 'nitrofinance', 'nostra', 'o_lab', 'octoswap', 'opals', 'own_fun', 'pancakeswap', 'plato', 'play_network', 'primex_finance', 'rabble', 'rare_bet_sports', 'redbrick', 'rubic', 'rug_rumble', 'sherpa', 'showdown', 'skytrade', 'slogain', 'spine', 'sumer', 'tadle', 'talentum', 'the_vape_labs', 'timeswap', 'townsquare', 'uniswap', 'xl', 'zona',
]

export default function WalletCheckerPage() {
  const [address, setAddress] = useState('')
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<null | {
    riskScore: number
    dappStats: DappStats
    nftCount: number
    nftContracts: string[]
    checkedDapp?: string
  }>(null)
  const [mode, setMode] = useState<'general' | 'individual'>('general')
  const [selectedDapp, setSelectedDapp] = useState(DAPP_LIST[0])

  const scan = async () => {
    const isValidAddress = /^0x[a-fA-F0-9]{40}$/.test(address)
    if (!isValidAddress) {
      alert('Invalid wallet address format.')
      return
    }

    setLoading(true)
    try {
      let res, data
      if (mode === 'general') {
        res = await fetch(`${API_BASE}/api/check/${address}?blocks=5`)
        data = await res.json()
        setResult({
          riskScore: data.sybil_score ?? 0,
          dappStats: data.activity || {},
          nftCount: data.nft_count ?? 0,
          nftContracts: data.nft_contracts ?? [],
        })
      } else {
        res = await fetch(`${API_BASE}/api/check/${address}?dapp=${selectedDapp}`)
        data = await res.json()
        setResult({
          riskScore: 0,
          dappStats: { [selectedDapp]: data },
          nftCount: data.nft_count ?? 0,
          nftContracts: data.nft_contracts ?? [],
          checkedDapp: selectedDapp,
        })
      }
    } catch (err) {
      console.error('Scan error:', err)
      alert('Failed to fetch data. Please check your backend and network connection.')
    } finally {
      setLoading(false)
    }
  }

  const reset = () => {
    setAddress('')
    setResult(null)
  }

  // Count active dApps (unique_contract_calls > 0)
  const activeDappCount = result
    ? Object.values(result.dappStats).filter(stat => stat.unique_contract_calls > 0).length
    : 0

  return (
    <Shell>
      <div className="max-w-3xl mx-auto px-4 py-8 space-y-8">
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold tracking-tight text-white">
            Monad Sybil Risk & Wallet Credibility Checker
          </h1>
          <p className="text-muted-foreground">
            Check your wallet’s trust score based on Sybil detection, dApp usage, and onchain NFT stats.
          </p>
        </div>

        <div className="flex gap-2 items-center justify-center mb-4">
          <Button
            variant={mode === 'general' ? 'default' : 'outline'}
            onClick={() => setMode('general')}
          >
            Generalized Sybil Check
          </Button>
          <Button
            variant={mode === 'individual' ? 'default' : 'outline'}
            onClick={() => setMode('individual')}
          >
            Check Individual dApp
          </Button>
        </div>

        {mode === 'individual' && (
          <div className="flex gap-2 items-center justify-center mb-4">
            <label htmlFor="dapp-select" className="text-sm text-muted-foreground">Select dApp:</label>
            <select
              id="dapp-select"
              value={selectedDapp}
              onChange={e => setSelectedDapp(e.target.value)}
              className="border rounded px-2 py-1 bg-background text-foreground"
            >
              {DAPP_LIST.map(dapp => (
                <option key={dapp} value={dapp}>
                  {dapp.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
                </option>
              ))}
            </select>
          </div>
        )}

        <div className="flex gap-2 items-center justify-center">
          <Input
            className="max-w-md"
            placeholder="Paste wallet address (0x...)"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
          <Button onClick={scan} disabled={loading || !address}>
            {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Scan'}
          </Button>
          {result && (
            <Button variant="ghost" onClick={reset} title="Reset">
              <RefreshCcw className="w-4 h-4" />
            </Button>
          )}
        </div>

        {result && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="grid grid-cols-1 sm:grid-cols-2 gap-6"
          >
            {mode === 'general' && (
              <>
                <Card className="border-l-4 border-red-500">
                  <CardHeader className="flex justify-between">
                    <div>
                      <CardTitle className="text-lg">Sybil Risk Score</CardTitle>
                      <CardDescription>Likelihood this wallet is Sybil</CardDescription>
                    </div>
                    <ShieldAlert className="w-5 h-5 text-red-500" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-4xl font-bold text-red-400">
                      {result.riskScore}%
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-l-4 border-purple-500">
                  <CardHeader className="flex justify-between">
                    <div>
                      <CardTitle className="text-lg">Active dApps</CardTitle>
                      <CardDescription>Number of dApps with activity</CardDescription>
                    </div>
                    <BarChart2 className="w-5 h-5 text-purple-500" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-4xl font-bold text-purple-300">
                      {activeDappCount}
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-l-4 border-yellow-500">
                  <CardHeader className="flex justify-between">
                    <div>
                      <CardTitle className="text-lg">NFT Contracts</CardTitle>
                      <CardDescription>Unique NFT contracts interacted with</CardDescription>
                    </div>
                    <BarChart2 className="w-5 h-5 text-yellow-500" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-4xl font-bold text-yellow-400">
                      {result.nftCount}
                    </div>
                    <div className="mt-2 text-xs text-muted-foreground break-all">
                      {result.nftContracts.length > 0
                        ? result.nftContracts.join(', ')
                        : 'No NFT contracts found'}
                    </div>
                  </CardContent>
                </Card>
              </>
            )}

            {/* Individual mode: Show selected dApp activity as a card */}
            {mode === 'individual' && result?.checkedDapp && (
              <Card key={result.checkedDapp} className="border-l-4 border-purple-500">
                <CardHeader className="flex justify-between">
                  <div>
                    <CardTitle className="text-lg capitalize">
                      {result.checkedDapp.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
                    </CardTitle>
                    <CardDescription>Unique contract calls</CardDescription>
                  </div>
                  <BarChart2 className="w-5 h-5 text-purple-500" />
                </CardHeader>
                <CardContent>
                  <div className="text-4xl font-bold text-purple-300">
                    {result.dappStats?.[result.checkedDapp]?.unique_contract_calls ?? 0}
                  </div>
                  <div className="mt-2 text-sm text-muted-foreground">
                    {result.dappStats?.[result.checkedDapp]?.summary ?? ''}
                  </div>
                  {result.dappStats?.[result.checkedDapp]?.tags && (
                    <div className="mt-1 text-xs">
                      Tags: {result.dappStats[result.checkedDapp].tags?.join(', ')}
                    </div>
                  )}
                  {result.dappStats?.[result.checkedDapp]?.error && (
                    <div className="mt-1 text-xs text-red-500">
                      Error: {result.dappStats[result.checkedDapp].error}
                    </div>
                  )}
                  {/* NFT stats for individual dApp */}
                  <div className="mt-2 text-xs text-yellow-500 break-all">
                    NFT Contracts: {result.nftContracts.length > 0
                      ? result.nftContracts.join(', ')
                      : 'None'}
                  </div>
                </CardContent>
              </Card>
            )}
          </motion.div>
        )}
      </div>
    </Shell>
  )
}