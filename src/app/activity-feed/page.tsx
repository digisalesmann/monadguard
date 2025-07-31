'use client'

import { useEffect, useState } from 'react'
import Shell from '@/components/dashboard/Shell'
import { Bar } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from 'chart.js'
import { toast } from 'sonner'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { ShieldAlert, Ban, TimerReset, Activity } from 'lucide-react'

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend)

type ChartData = {
  labels: string[]
  values: number[]
}

type Stats = {
  totalWallets: number
  sybilWallets: number
  avgRiskScore: number
  lastSynced: string
}

type FeedItem = {
  wallet: string
  risk: 'low' | 'medium' | 'high'
  timestamp: string
}

export default function Home() {
  const [data, setData] = useState<ChartData | null>(null)
  const [stats, setStats] = useState<Stats | null>(null)

  useEffect(() => {
    // Fetch chart data
    fetch('/api/overview')
      .then(res => res.json())
      .then(setData)
      .catch(console.error)

    // Fetch dashboard stats
    fetch('/api/stats')
      .then(res => res.json())
      .then(setStats)
      .catch(console.error)

    // Simulate recent activity feed popup
    const timeout = setTimeout(() => {
      toast.success('0x1234...abcd flagged as High Risk Sybil wallet', {
        description: 'Just now',
        action: {
          label: 'View',
          onClick: () => console.log('Clicked'),
        },
      })
    }, 4000)

    return () => clearTimeout(timeout)
  }, [])

  const feed: FeedItem[] = [
  {
    wallet: '0x8a3...c9e2',
    risk: 'high',
    timestamp: '1 min ago',
  },
  {
    wallet: '0x0bd...91f3',
    risk: 'medium',
    timestamp: '5 min ago',
  },
]

  const chartData = {
    labels: data?.labels ?? [],
    datasets: [
      {
        label: 'Activity',
        data: data?.values ?? [],
        backgroundColor: '#7c3aed',
        borderRadius: 6,
      },
    ],
  }

  return (
    <Shell>
      <div className="text-2xl font-bold">Welcome to MonadGuard Dashboard</div>
      <p className="text-muted-foreground mt-2 mb-6">
        Here’s a quick insight based on recent activity.
      </p>

      {/* Stat Cards */}
      {stats && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Wallets Analyzed</CardTitle>
              <ShieldAlert className="h-4 w-4 text-purple-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalWallets}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Sybil Wallets</CardTitle>
              <Ban className="h-4 w-4 text-red-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.sybilWallets}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Avg. Risk Score</CardTitle>
              <Activity className="h-4 w-4 text-yellow-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.avgRiskScore}/100</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Last Synced</CardTitle>
              <TimerReset className="h-4 w-4 text-blue-500" />
            </CardHeader>
            <CardContent>
              <div className="text-sm text-muted-foreground">{stats.lastSynced}</div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Chart */}
      {data ? (
        <div className="w-full max-w-2xl">
          <Bar data={chartData} />
        </div>
      ) : (
        <p className="text-sm text-muted-foreground">Loading data...</p>
      )}

      {feed.length > 0 && (
  <div className="mt-10 max-w-xl w-full">
    <h2 className="text-lg font-semibold mb-3">Recent Sybil Detections</h2>
    <ul className="space-y-3">
      {feed.map((item, idx) => (
        <li
          key={idx}
          className="p-4 bg-background rounded-md border flex justify-between items-center"
        >
          <div>
            <div className="font-medium text-sm">{item.wallet}</div>
            <div className="text-muted-foreground text-xs">
              {item.timestamp}
            </div>
          </div>
          <span
            className={`text-xs px-2 py-1 rounded-md ${
              item.risk === 'high'
                ? 'text-red-500 bg-red-500/10'
                : item.risk === 'medium'
                ? 'text-yellow-500 bg-yellow-500/10'
                : 'text-green-500 bg-green-500/10'
            }`}
          >
            {item.risk.charAt(0).toUpperCase() + item.risk.slice(1)}
          </span>
        </li>
      ))}
    </ul>
  </div>
)}
    </Shell>
  )
}
