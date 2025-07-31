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
  UserCheck,
  Users,
  RefreshCcw,
} from 'lucide-react'
import { motion } from 'framer-motion'

export default function WalletCheckerPage() {
  const [address, setAddress] = useState('')
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<null | {
    riskScore: number
    activeDapps: number
    hasRole: boolean
    communityBadges: number
  }>(null)

  const scan = async () => {
    if (!address) return
    setLoading(true)
    await new Promise((r) => setTimeout(r, 1200))
    setResult({
      riskScore: Math.floor(Math.random() * 100),
      activeDapps: Math.floor(Math.random() * 10) + 1,
      hasRole: Math.random() > 0.5,
      communityBadges: Math.floor(Math.random() * 5),
    })
    setLoading(false)
  }

  const reset = () => {
    setAddress('')
    setResult(null)
  }

  return (
    <Shell>
      <div className="max-w-3xl mx-auto px-4 py-8 space-y-8">
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold tracking-tight text-white">
            Monad Sybil Risk & Wallet Credibility Checker
          </h1>
          <p className="text-muted-foreground">
            Check your wallet’s trust score based on activity, roles, and badges.
          </p>
        </div>

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
            <Card className="border-l-4 border-red-500">
              <CardHeader className="flex justify-between">
                <div>
                  <CardTitle className="text-lg">Sybil Risk Score</CardTitle>
                  <CardDescription>Chance this wallet is a Sybil</CardDescription>
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
                  <CardDescription>Interactions on Monad chain</CardDescription>
                </div>
                <BarChart2 className="w-5 h-5 text-purple-500" />
              </CardHeader>
              <CardContent>
                <div className="text-4xl font-bold text-purple-300">
                  {result.activeDapps}
                </div>
              </CardContent>
            </Card>

            <Card className="border-l-4 border-blue-500">
              <CardHeader className="flex justify-between">
                <div>
                  <CardTitle className="text-lg">Discord Role</CardTitle>
                  <CardDescription>Eligible community status</CardDescription>
                </div>
                <Users className="w-5 h-5 text-blue-500" />
              </CardHeader>
              <CardContent>
                <div className="text-4xl font-bold text-blue-300">
                  {result.hasRole ? 'Yes' : 'No'}
                </div>
              </CardContent>
            </Card>

            <Card className="border-l-4 border-green-500">
              <CardHeader className="flex justify-between">
                <div>
                  <CardTitle className="text-lg">Community Badges</CardTitle>
                  <CardDescription>Campaign & testnet rewards</CardDescription>
                </div>
                <UserCheck className="w-5 h-5 text-green-500" />
              </CardHeader>
              <CardContent>
                <div className="text-4xl font-bold text-green-300">
                  {result.communityBadges}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </div>
    </Shell>
  )
}
