/**
 * Soft cohort SSO tokens from traininglobe-hub (same algorithm as hub/sso.js).
 * ponytail: not DRM — secret may live in env with a shared default; upgrade to server-issued OTTs.
 */

export interface HubSsoPayload {
  username: string;
  role: string;
  exp: number;
}

function b64urlDecode(str: string): string {
  let b64 = str.replace(/-/g, "+").replace(/_/g, "/");
  while (b64.length % 4) b64 += "=";
  return Buffer.from(b64, "base64").toString("utf8");
}

function softSign(message: string, secret: string): string {
  const s = `${secret}|${message}`;
  let h = 2166136261;
  for (let i = 0; i < s.length; i += 1) {
    h ^= s.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return (h >>> 0).toString(16);
}

export function hubSsoSecret(): string {
  return process.env.HUB_SSO_SECRET || "traininglobe-hub-sso-v1";
}

export function verifyHubToken(token: string, secret = hubSsoSecret()): HubSsoPayload | null {
  const parts = String(token || "").split(".");
  if (parts.length !== 2) return null;
  if (softSign(parts[0], secret) !== parts[1]) return null;
  try {
    const payload = JSON.parse(b64urlDecode(parts[0])) as {
      u?: string;
      role?: string;
      exp?: number;
    };
    if (!payload?.u || !payload?.exp) return null;
    if (Number(payload.exp) <= Date.now()) return null;
    return {
      username: String(payload.u),
      role: String(payload.role || "learner"),
      exp: Number(payload.exp),
    };
  } catch {
    return null;
  }
}

export function hubEmailForUsername(username: string): string {
  const safe = String(username || "")
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9._-]/g, "_")
    .slice(0, 64);
  return `${safe || "learner"}@hub.lms`;
}
