import crypto from 'crypto';

const SECRET =
  process.env.NEXTAUTH_SECRET ||
  process.env.ADMIN_PASSWORD_HASH ||
  'yafc-super-secret-admin-session-token-key-2026';
const MAX_AGE_MS = 7 * 24 * 60 * 60 * 1000; // 7 days

/**
 * Creates a cryptographically signed admin session token.
 */
export function createAdminToken(username: string): string {
  const ts = Date.now().toString();
  const rand = crypto.randomBytes(16).toString('hex');
  const payload = `${username}:${ts}:${rand}`;
  const sig = crypto.createHmac('sha256', SECRET).update(payload).digest('hex');
  return Buffer.from(`${payload}:${sig}`).toString('base64url');
}

/**
 * Verifies that an admin token is valid, untampered, and unexpired.
 */
export function verifyAdminToken(token: string | null | undefined): boolean {
  if (!token || typeof token !== 'string') return false;
  try {
    const decoded = Buffer.from(token, 'base64url').toString('utf8');
    const parts = decoded.split(':');
    if (parts.length !== 4) return false;
    const [username, tsStr, rand, sig] = parts;
    const ts = parseInt(tsStr, 10);
    if (isNaN(ts) || Date.now() - ts > MAX_AGE_MS || Date.now() < ts - 60000) {
      return false;
    }
    const payload = `${username}:${tsStr}:${rand}`;
    const expectedSig = crypto.createHmac('sha256', SECRET).update(payload).digest('hex');
    const sigBuf = Buffer.from(sig, 'utf8');
    const expectedBuf = Buffer.from(expectedSig, 'utf8');
    if (sigBuf.length !== expectedBuf.length) return false;
    if (!crypto.timingSafeEqual(sigBuf, expectedBuf)) return false;

    // Strict roundtrip verification ensures no extra trailing bytes were appended
    const reEncoded = Buffer.from(`${payload}:${expectedSig}`).toString('base64url');
    return token === reEncoded;
  } catch (e) {
    return false;
  }
}
