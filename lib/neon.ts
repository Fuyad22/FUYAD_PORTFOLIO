// This file contains the Neon database connection logic for Next.js API routes.
import { Pool } from 'pg';

// Reuse pool across serverless function invocations (Vercel/Next.js best practice)
let pool: Pool | undefined = undefined;

if (!globalThis._neonPool) {
  globalThis._neonPool = new Pool({
    connectionString: process.env.NEON_DATABASE_URL,
    ssl: { rejectUnauthorized: false },
  });
}
pool = globalThis._neonPool;

export default pool;