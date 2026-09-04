const nodemailer = require('nodemailer');

// Server-side only. Set these in backend/.env: EMAIL_HOST, EMAIL_PORT, EMAIL_USER,
// EMAIL_PASS. Returns null (not configured) rather than throwing, so callers can decide
// how to degrade — mirrors the Stuller/Whop "not configured" pattern used elsewhere.
function getTransporter() {
  const { EMAIL_HOST, EMAIL_PORT, EMAIL_USER, EMAIL_PASS } = process.env;
  if (!EMAIL_HOST || !EMAIL_USER || !EMAIL_PASS) return null;
  return nodemailer.createTransport({
    host: EMAIL_HOST,
    port: Number(EMAIL_PORT) || 587,
    secure: Number(EMAIL_PORT) === 465,
    auth: { user: EMAIL_USER, pass: EMAIL_PASS },
  });
}

async function sendEmail({ to, subject, html }) {
  const transporter = getTransporter();
  if (!transporter) return { sent: false, reason: 'Email is not configured (EMAIL_HOST/EMAIL_USER/EMAIL_PASS).' };
  await transporter.sendMail({ from: process.env.EMAIL_USER, to, subject, html });
  return { sent: true };
}

module.exports = { sendEmail };
