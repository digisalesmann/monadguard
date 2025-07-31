// src/app/api/overview/route.ts

import { NextResponse } from 'next/server'

export async function GET() {
  const mockData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
    values: [23, 45, 12, 67, 34],
  }

  return NextResponse.json(mockData)
}
