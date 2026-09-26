import nodemailer, { type Transporter } from "nodemailer";
import { site } from "@/content/site";

// Sends contact-form messages to Adam's inbox over SMTP (Gmail by default,
// with an app password). Configured through .env; see .env.example.

export type ContactMessage = {
  name: string;
  email: string;
  company: string;
  subject: string;
  message: string;
  locale: string;
};

let transporter: Transporter | null = null;

export function mailerConfigured() {
  return Boolean(process.env.SMTP_USER && process.env.SMTP_PASS);
}

function getTransporter() {
  if (!transporter) {
    const port = Number(process.env.SMTP_PORT ?? 465);
    transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST ?? "smtp.gmail.com",
      port,
      // 465 = TLS from the start; 587 = STARTTLS upgrade.
      secure: port === 465,
      auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
    });
  }
  return transporter;
}

const escapeHtml = (value: string) =>
  value.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);

export async function sendContactMessage(msg: ContactMessage) {
  const from = process.env.SMTP_USER!;
  const to = process.env.CONTACT_TO || site.email;
  const tag = msg.locale === "en" ? "Portfolio · EN" : "Portfolio";
  const subject = `[${tag}] ${msg.subject || "Nouveau message"} — ${msg.name}`;

  const details = [
    ["Nom", msg.name],
    ["E-mail", msg.email],
    ["Entreprise", msg.company || "—"],
    ["Sujet", msg.subject || "—"],
  ];

  await getTransporter().sendMail({
    from: { name: "Portfolio adambellanger.pro", address: from },
    to,
    // "Reply" in the inbox answers the visitor directly.
    replyTo: { name: msg.name, address: msg.email },
    subject,
    text: `${details.map(([k, v]) => `${k} : ${v}`).join("\n")}\n\n${msg.message}\n`,
    html: `<table cellpadding="4" style="font-family:sans-serif;font-size:14px;color:#161618">${details
      .map(([k, v]) => `<tr><td style="color:#6b6b6b">${k}</td><td>${escapeHtml(v)}</td></tr>`)
      .join("")}</table><p style="font-family:sans-serif;font-size:15px;line-height:1.5;white-space:pre-wrap;color:#161618">${escapeHtml(msg.message)}</p>`,
  });
}
