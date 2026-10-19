const DEFAULT_INBOX = 'eventservices.aura@gmail.com';
const DEFAULT_FROM = 'Aura Events <info@auraeventservices.in>';

export function getServerEnv() {
  return {
    resendApiKey: process.env.RESEND_API_KEY,
    resendFrom: process.env.RESEND_FROM || DEFAULT_FROM,
    contactInbox: process.env.CONTACT_INBOX || DEFAULT_INBOX,
    allowedOrigins: (process.env.ALLOWED_ORIGINS ||
      'https://www.auraeventservices.in,https://auraeventservices.in,https://aura-events-ashy.vercel.app,http://127.0.0.1:5173,http://localhost:5173')
      .split(',')
      .map((o) => o.trim())
      .filter(Boolean),
  };
}

export function isMailConfigured(): boolean {
  return Boolean(process.env.RESEND_API_KEY);
}
