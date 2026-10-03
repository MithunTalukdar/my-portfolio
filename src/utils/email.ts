import emailjs from "@emailjs/browser";

export interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export interface DeliveryResult {
  success: boolean;
  requiresActivation?: boolean;
  message: string;
  channel: "email" | "whatsapp" | "both" | "fallback";
  whatsappUrl: string;
  mailtoUrl: string;
}

export const emailConfig = {
  serviceId: import.meta.env.VITE_EMAILJS_SERVICE_ID || "",
  templateId: import.meta.env.VITE_EMAILJS_TEMPLATE_ID || "",
  publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY || "",
  toEmail: "mithuntalukdar2003@gmail.com",
  whatsappNumber: "918777673839",
};

export const isEmailConfigured = Boolean(
  emailConfig.serviceId && emailConfig.templateId && emailConfig.publicKey,
);

/**
 * Generates direct WhatsApp URL with pre-filled structured message.
 */
export function createWhatsAppUrl(data: Partial<ContactFormData>): string {
  const lines: string[] = [
    "🚀 *New Portfolio Inquiry for Mithun Talukdar*",
    "",
    `👤 *Name:* ${data.name?.trim() || "Visitor"}`,
    `📧 *Email:* ${data.email?.trim() || "Not provided"}`,
    `📌 *Subject:* ${data.subject?.trim() || "Project Discussion"}`,
    "",
    "💬 *Message:*",
    data.message?.trim() || "Hello Mithun, I would like to discuss a project with you.",
  ];

  const fullText = lines.join("\n");
  return `https://wa.me/${emailConfig.whatsappNumber}?text=${encodeURIComponent(fullText)}`;
}

/**
 * Generates direct mailto link with pre-filled subject and body.
 */
export function createMailtoUrl(data: Partial<ContactFormData>): string {
  const subject = `[Portfolio Inquiry] ${data.subject?.trim() || "Project Discussion"} - from ${data.name?.trim() || "Visitor"}`;
  const body = `Hi Mithun,\n\nName: ${data.name || ""}\nEmail: ${data.email || ""}\nSubject: ${data.subject || ""}\n\nMessage:\n${data.message || ""}\n`;
  return `mailto:${emailConfig.toEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

/**
 * Dispatches the contact inquiry to Email (via EmailJS if configured, or FormSubmit API).
 */
export async function sendContactInquiry(data: ContactFormData): Promise<DeliveryResult> {
  const whatsappUrl = createWhatsAppUrl(data);
  const mailtoUrl = createMailtoUrl(data);

  // 1. If EmailJS is properly configured, try EmailJS first
  if (isEmailConfigured) {
    try {
      await emailjs.send(
        emailConfig.serviceId,
        emailConfig.templateId,
        {
          from_name: data.name,
          reply_to: data.email,
          subject: data.subject,
          message: data.message,
          to_email: emailConfig.toEmail,
        },
        { publicKey: emailConfig.publicKey },
      );

      return {
        success: true,
        channel: "email",
        message: "Email delivered successfully via EmailJS!",
        whatsappUrl,
        mailtoUrl,
      };
    } catch (err) {
      console.warn("EmailJS sending encountered an error, falling back to FormSubmit API:", err);
    }
  }

  // 2. Dispatch via FormSubmit AJAX service directly to Mithun's email
  try {
    const response = await fetch(`https://formsubmit.co/ajax/${emailConfig.toEmail}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        name: data.name,
        email: data.email,
        _subject: `[Portfolio Inquiry] ${data.subject} - from ${data.name}`,
        message: data.message,
        _template: "table",
        _captcha: "false",
      }),
    });

    const result = await response.json().catch(() => null);

    if (result && (result.success === "true" || result.success === true)) {
      return {
        success: true,
        channel: "email",
        message: "Message successfully dispatched to your email inbox!",
        whatsappUrl,
        mailtoUrl,
      };
    }

    if (result && typeof result.message === "string" && result.message.toLowerCase().includes("activation")) {
      return {
        success: true,
        requiresActivation: true,
        channel: "email",
        message:
          "FormSubmit has sent an activation link to your email. Click 'Activate Form' once in your inbox to receive all future inquiries instantly.",
        whatsappUrl,
        mailtoUrl,
      };
    }

    throw new Error(result?.message || "Email delivery service did not confirm receipt.");
  } catch (err: unknown) {
    console.error("FormSubmit delivery failed:", err);
    return {
      success: false,
      channel: "fallback",
      message:
        "Direct email transmission could not be completed. You can send this message directly via WhatsApp or your Email client.",
      whatsappUrl,
      mailtoUrl,
    };
  }
}
