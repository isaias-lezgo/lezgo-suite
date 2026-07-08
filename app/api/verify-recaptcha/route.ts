import { NextResponse } from "next/server"

// Verifies a reCAPTCHA v3 token server-side against Google before the demo
// form is allowed to reach the webhook. Configure RECAPTCHA_SECRET_KEY in env.
export async function POST(req: Request) {
  const secret = process.env.RECAPTCHA_SECRET_KEY
  if (!secret) {
    // Fail open in local/dev when unconfigured, but make it visible in logs.
    console.warn("RECAPTCHA_SECRET_KEY not set — skipping verification")
    return NextResponse.json({ success: true, score: 1, skipped: true })
  }

  let token: string | undefined
  try {
    ;({ token } = await req.json())
  } catch {
    return NextResponse.json({ success: false, error: "bad_request" }, { status: 400 })
  }
  if (!token) {
    return NextResponse.json({ success: false, error: "missing_token" }, { status: 400 })
  }

  const params = new URLSearchParams({ secret, response: token })
  const res = await fetch("https://www.google.com/recaptcha/api/siteverify", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: params.toString(),
  })
  const data = (await res.json()) as { success: boolean; score?: number }
  const ok = data.success && (data.score ?? 0) >= 0.5
  return NextResponse.json({ success: ok, score: data.score }, { status: ok ? 200 : 400 })
}
