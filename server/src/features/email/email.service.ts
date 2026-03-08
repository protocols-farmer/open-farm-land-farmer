// src/features/email/email.service.ts
import { mg } from "@/config/mailgun.js";
import { config } from "@/config/index.js";
import { logger } from "@/config/logger.js";
import { emailTemplates } from "./email.templates.js";
import { createHttpError } from "@/utils/error.factory.js";
import {
  VerificationEmailData,
  PasswordResetEmailData,
  MarketingOpportunityData,
  SystemUpdateData,
} from "./email.types.js";

class EmailService {
  /**
   * The "Master Send" helper.
   * Dispatches email via Mailgun and handles provider-level errors.
   */
  private async sendEmail(to: string, subject: string, html: string) {
    try {
      const result = await mg.messages.create(config.mailgun.domain, {
        from: `Open Farm Land <${config.mailgun.fromEmail}>`,
        to: [to],
        subject,
        html,
      });

      // 🚜 Dev Log: Emojis kept for visibility
      logger.info({ msgId: result.id, to }, "📧 Email sent successfully.");
      return result;
    } catch (error: any) {
      const status = error.status || 500;
      const providerMessage = error.message || "Unknown Mailgun Error";

      // 🚜 Dev Log: High visibility for errors
      logger.error(
        { err: error, to, status, providerMessage },
        "❌ Mailgun provider error",
      );

      if (status === 402 || status === 429) {
        throw createHttpError(
          503,
          "Our email service is currently at capacity. Please try again later.",
        );
      }

      throw createHttpError(
        status,
        `Email delivery failed: ${providerMessage}`,
      );
    }
  }

  /**
   * Sends a welcome email upon successful account registration.
   */
  async sendWelcomeEmail(to: string, name: string) {
    const html = emailTemplates.welcome(name);
    // User-facing subject: No emojis
    return this.sendEmail(to, "Welcome to Open Farm Land", html);
  }

  async sendVerificationEmail(to: string, data: VerificationEmailData) {
    const html = emailTemplates.verification(data.name, data.url);
    // User-facing subject: No emojis
    return this.sendEmail(to, "Please verify your account", html);
  }

  async sendPasswordResetEmail(to: string, data: PasswordResetEmailData) {
    const html = emailTemplates.passwordReset(data.name, data.url);
    // User-facing subject: No emojis
    return this.sendEmail(to, "Instruction to reset your password", html);
  }

  // Update this method inside the EmailService class
  async sendOpportunityAlert(to: string, data: MarketingOpportunityData) {
    const html = emailTemplates.opportunity(
      data.title,
      data.companyName,
      data.location,
      data.type,
      data.salaryRange || null,
      data.tags,
      data.url,
    );
    return this.sendEmail(to, `New matching opportunity: ${data.title}`, html);
  }

  async sendSystemUpdate(to: string, data: SystemUpdateData) {
    const html = emailTemplates.systemUpdate(
      data.title,
      data.version || null,
      data.contentPreview,
      data.url,
    );
    // User-facing subject: No emojis
    return this.sendEmail(to, `Platform update: ${data.title}`, html);
  }
}

export const emailService = new EmailService();
