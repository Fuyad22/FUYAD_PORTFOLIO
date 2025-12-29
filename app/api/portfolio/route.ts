import { NextRequest, NextResponse } from 'next/server'
import pool from '../../../lib/neon'

// const dataPath = path.join(process.cwd(), 'data', 'portfolio.json')

  const { rows } = await pool.query('SELECT data FROM portfolio LIMIT 1')
  if (rows.length === 0) {
    return new Response(JSON.stringify({ error: 'No data found' }), { status: 404 })
  }
  return new Response(JSON.stringify(rows[0].data), { headers: { 'Content-Type': 'application/json' } })
}

export async function POST(request: NextRequest) {
  const body = await request.json()
  await pool.query('UPDATE portfolio SET data = $1', [body])
  return new Response(JSON.stringify({ success: true }))
}
export async function GET() {
  const { rows } = await pool.query('SELECT data FROM portfolio LIMIT 1');
  if (rows.length === 0) {
    return new Response(JSON.stringify({ error: 'No data found' }), { status: 404 });
  }
  // Add cache headers for 60 seconds (adjust as needed)
  return new Response(JSON.stringify(rows[0].data), {
    headers: {
      'Content-Type': 'application/json',
      'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=120',
    },
  });
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  await pool.query('UPDATE portfolio SET data = $1', [body]);
  // Invalidate cache by not setting cache headers on POST
  return new Response(JSON.stringify({ success: true }));
}