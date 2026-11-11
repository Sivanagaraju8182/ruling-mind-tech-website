/**
 * rateLimit.ts  -  Stops one visitor from spamming our contact form.
 *
 * It remembers how many requests each visitor (IP address) made recently.
 * NOTE: this memory lives inside one server process. For a big production
 * setup with many servers, replace it with Redis / Upstash.
 */
const hits = new Map<string, number[]>();

export function isRateLimited(key: string, limit = 5, windowMs = 10 * 60 * 1000): boolean {
  const now = Date.now();
  const recent = (hits.get(key) ?? []).filter((time) => now - time < windowMs);

  if (recent.length >= limit) {
    hits.set(key, recent);
    return true;
  }

  recent.push(now);
  hits.set(key, recent);

  // Housekeeping: stop the Map from growing forever.
  if (hits.size > 5000) {
    for (const [k, times] of hits) {
      if (times.every((time) => now - time >= windowMs)) hits.delete(k);
    }
  }
  return false;
}
