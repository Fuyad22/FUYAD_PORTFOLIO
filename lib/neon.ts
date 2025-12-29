// This file contains the Neon database connection logic for Next.js API routes.
import { Pool } from 'pg';

// Reuse pool across serverless function invocations (Vercel/Next.js best practice)
declare global {
  // eslint-disable-next-line no-var
  var _neonPool: Pool | undefined;
}

const pool =
  global._neonPool ||
  (global._neonPool = new Pool({
    connectionString: process.env.NEON_DATABASE_URL,
    ssl: { rejectUnauthorized: false },
  }));

export default pool;