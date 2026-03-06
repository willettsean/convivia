import fs from 'fs'

export async function sendEmail({ to, subject, body }: { to: string; subject: string; body: string }) {
  const entry = `[${new Date().toISOString()}] TO: ${to}\nSUBJECT: ${subject}\n${body}\n${'─'.repeat(60)}\n`
  console.log('[EMAIL]', entry)
  try {
    fs.appendFileSync('email-log.txt', entry)
  } catch {
    // ignore write errors in serverless
  }
}
