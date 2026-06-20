import crypto from "crypto";

// Vercel serverless functions are stateless — each request can hit a fresh
// instance, so an in-memory Map (like the old Express server used) is not
// reliable here. Instead we sign the session token itself with HMAC, so any
// function instance can verify it without needing shared memory.

const SESSION_TTL_MS = 60 * 60 * 1000; // 1 hour

function getSecret() {
  const secret = process.env.SESSION_SECRET || process.env.TURNSTILE_SECRET_KEY;
  if (!secret) {
    throw new Error("SESSION_SECRET (or TURNSTILE_SECRET_KEY) is not set in environment variables.");
  }
  return secret;
}

export function createSessionToken() {
  const payload = { exp: Date.now() + SESSION_TTL_MS };
  const payloadStr = Buffer.from(JSON.stringify(payload)).toString("base64url");
  const sig = crypto.createHmac("sha256", getSecret()).update(payloadStr).digest("base64url");
  return `${payloadStr}.${sig}`;
}

export function isSessionValid(token) {
  if (!token || typeof token !== "string" || !token.includes(".")) return false;

  const [payloadStr, sig] = token.split(".");
  if (!payloadStr || !sig) return false;

  let expectedSig;
  try {
    expectedSig = crypto.createHmac("sha256", getSecret()).update(payloadStr).digest("base64url");
  } catch {
    return false;
  }

  const sigBuf = Buffer.from(sig);
  const expectedBuf = Buffer.from(expectedSig);
  if (sigBuf.length !== expectedBuf.length) return false;
  if (!crypto.timingSafeEqual(sigBuf, expectedBuf)) return false;

  try {
    const payload = JSON.parse(Buffer.from(payloadStr, "base64url").toString());
    return typeof payload.exp === "number" && Date.now() < payload.exp;
  } catch {
    return false;
  }
}
