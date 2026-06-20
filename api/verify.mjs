import { createSessionToken } from "./_session.mjs";

const TURNSTILE_SECRET_KEY = process.env.TURNSTILE_SECRET_KEY;

async function verifyTurnstileToken(token, remoteip) {
  const body = new URLSearchParams({ secret: TURNSTILE_SECRET_KEY, response: token });
  if (remoteip) body.append("remoteip", remoteip);

  const res = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body,
  });
  return res.json();
}

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Method not allowed." });
  }

  const { turnstileToken } = req.body || {};

  // Dev-only fallback: skip Turnstile entirely if no secret is configured.
  if (!TURNSTILE_SECRET_KEY) {
    const sessionToken = createSessionToken();
    return res.status(200).json({ ok: true, sessionToken, dev: true });
  }

  if (!turnstileToken) {
    return res.status(400).json({ error: "Missing verification token." });
  }

  try {
    const remoteip = req.headers["x-forwarded-for"]?.split(",")[0]?.trim();
    const result = await verifyTurnstileToken(turnstileToken, remoteip);

    if (!result.success) {
      return res.status(403).json({
        error: "Verification failed. Please refresh and try again.",
        codes: result["error-codes"],
      });
    }

    const sessionToken = createSessionToken();
    return res.status(200).json({ ok: true, sessionToken });
  } catch {
    return res.status(500).json({ error: "Verification service unavailable." });
  }
}
