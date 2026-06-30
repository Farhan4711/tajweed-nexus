// Placeholder for Resend integration
// In a real app, you would import the Resend SDK here
// import { Resend } from 'resend';
import type React from "react";

// const resend = new Resend(process.env.RESEND_API_KEY);

interface EmailParams {
  to: string;
  subject: string;
  react?: React.ReactElement; // React Email template
  html?: string;
  text?: string;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function sendEmail({ to, subject, react, html, text }: EmailParams) {
  try {
    // [PLACEHOLDER] for Resend
    // await resend.emails.send({
    //   from: 'Q.LMS <noreply@qlms.com>',
    //   to,
    //   subject,
    //   react,
    //   html,
    //   text
    // });
    
    console.log(`[MOCK EMAIL SENT] To: ${to}, Subject: ${subject}`);
    return { success: true, messageId: `mock_id_${Date.now()}` };
  } catch {
    console.error("Failed to send email.");
    return { success: false };
  }
}
