interface RateLimitEntry {
  count: number;
  resetAt: number;
}

const rateLimitMap = new Map<string, RateLimitEntry>();
const WINDOW_MS = 15 * 60 * 1000; // 15 minutes
const MAX_ATTEMPTS = 5;

export function checkLoginRateLimit(ip: string): { allowed: boolean; remaining: number; resetInMinutes: number } {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);

  if (!entry || now > entry.resetAt) {
    return {
      allowed: true,
      remaining: MAX_ATTEMPTS,
      resetInMinutes: 15,
    };
  }

  if (entry.count >= MAX_ATTEMPTS) {
    const remainingMs = Math.max(0, entry.resetAt - now);
    return {
      allowed: false,
      remaining: 0,
      resetInMinutes: Math.ceil(remainingMs / (60 * 1000)),
    };
  }

  return {
    allowed: true,
    remaining: MAX_ATTEMPTS - entry.count,
    resetInMinutes: Math.ceil((entry.resetAt - now) / (60 * 1000)),
  };
}

export function recordFailedLoginAttempt(ip: string): void {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);

  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(ip, {
      count: 1,
      resetAt: now + WINDOW_MS,
    });
  } else {
    entry.count += 1;
  }
}

export function resetLoginAttempts(ip: string): void {
  rateLimitMap.delete(ip);
}
