import type { VercelRequest, VercelResponse } from '@vercel/node';
import { applyCors } from './lib/cors.js';
import { getServerEnv, isMailConfigured } from './lib/env.js';

export default function handler(req: VercelRequest, res: VercelResponse) {
  const { allowedOrigins } = getServerEnv();
  if (applyCors(req, res, allowedOrigins)) return;

  if (req.method !== 'GET') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  res.status(200).json({
    ok: true,
    mailConfigured: isMailConfigured(),
  });
}
