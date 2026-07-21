/** Self-check: hub SSO verify round-trip. Run: npx tsx scripts/check-hub-sso.ts */
import { hubEmailForUsername, verifyHubToken } from "../lib/hub-sso";

function softSign(message: string, secret: string): string {
  const s = `${secret}|${message}`;
  let h = 2166136261;
  for (let i = 0; i < s.length; i += 1) {
    h ^= s.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return (h >>> 0).toString(16);
}

function mint(username: string, role: string, secret: string, hours: number): string {
  const payload = {
    u: username,
    role,
    exp: Date.now() + hours * 3600000,
  };
  const body = Buffer.from(JSON.stringify(payload), "utf8")
    .toString("base64")
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/g, "");
  return `${body}.${softSign(body, secret)}`;
}

const secret = "traininglobe-hub-sso-v1";
const token = mint("demo1", "learner", secret, 12);
const ok = verifyHubToken(token, secret);
if (!ok || ok.username !== "demo1") throw new Error("verify failed");
if (hubEmailForUsername("Demo1") !== "demo1@hub.lms") throw new Error("email map failed");
if (verifyHubToken("bad.token", secret)) throw new Error("bad token accepted");
console.log("ok: hub SSO verify");
