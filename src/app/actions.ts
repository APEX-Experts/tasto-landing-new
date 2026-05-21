"use server";

import sgMail from "@sendgrid/mail";

export interface SendInquiryParams {
  fullName: string;
  workEmail: string;
  company: string;
  inquiryDetails: string;
}

export async function sendInquiryAction(data: SendInquiryParams) {
  const fromEmail = process.env.MAIL_FROM;
  const apiKey = process.env.SENDGRID_API_KEY;
  const toEmail = process.env.MAIL_TO;

  if (!apiKey) {
    console.error("SENDGRID_API_KEY is not configured");
    return { success: false, error: "Email configuration is missing." };
  }

  if (!fromEmail) {
    console.error("MAIL_FROM is not configured");
    return { success: false, error: "Sender email configuration is missing." };
  }

  const { fullName, workEmail, company, inquiryDetails } = data;

  // Simple input validation (backup for zod validation)
  if (!fullName || !workEmail || !company || !inquiryDetails) {
    return { success: false, error: "All fields are required." };
  }

  const msg = {
    to: toEmail, // The admin receives the inquiry
    from: fromEmail, // SendGrid requires this to be a verified sender
    replyTo: workEmail, // Admin can reply directly to the sender
    subject: `New Enterprise Inquiry from ${company}`,
    text: `
Name: ${fullName}
Email: ${workEmail}
Company: ${company}

Inquiry Details:
${inquiryDetails}
    `.trim(),
    html: `
      <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e5e7eb; border-radius: 8px;">
        <h2 style="color: #1e3a8a; border-bottom: 2px solid #e5e7eb; padding-bottom: 10px; margin-top: 0;">New Enterprise Inquiry</h2>
        <table style="width: 100%; border-collapse: collapse; margin-top: 20px;">
          <tr>
            <td style="padding: 8px 0; font-weight: bold; width: 120px; color: #4b5563;">Name:</td>
            <td style="padding: 8px 0; color: #111827;">${fullName}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; font-weight: bold; color: #4b5563;">Work Email:</td>
            <td style="padding: 8px 0; color: #111827;"><a href="mailto:${workEmail}" style="color: #2563eb; text-decoration: none;">${workEmail}</a></td>
          </tr>
          <tr>
            <td style="padding: 8px 0; font-weight: bold; color: #4b5563;">Company:</td>
            <td style="padding: 8px 0; color: #111827;">${company}</td>
          </tr>
        </table>
        <div style="margin-top: 20px; padding: 15px; background-color: #f9fafb; border-left: 4px solid #2563eb; border-radius: 4px;">
          <h3 style="margin-top: 0; margin-bottom: 8px; color: #374151; font-size: 16px;">Inquiry Details</h3>
          <p style="white-space: pre-wrap; color: #4b5563; line-height: 1.5; margin: 0;">${inquiryDetails}</p>
        </div>
      </div>
    `,
  };

  try {
    sgMail.setApiKey(apiKey);
    await sgMail.send(msg);
    return { success: true };
  } catch (error: unknown) {
    const err = error as { message?: string; response?: { body?: unknown } };
    console.error("SendGrid error detailed:", err.response?.body || err);
    return {
      success: false,
      error: err.message || "Failed to send email. Please try again later.",
    };
  }
}
