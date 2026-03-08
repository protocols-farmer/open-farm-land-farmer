/**
 * src/features/email/email.templates.ts
 * * Foundational email framework for Open Farm Land.
 * Uses a semantic Table-Div hybrid layout for maximum deliverability and
 * consistent branding across Outlook, Gmail, and Apple Mail.
 */

const APP_URL = "https://open-farm-land-farmer.vercel.app";
const LOGO_URL =
  "https://res.cloudinary.com/dhr9zmb3i/image/upload/v1772592253/open-farm-land_tlvnyn.png";

const baseLayout = (content: string, preheader: string = "") => `
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Open Farm Land Notification</title>
  </head>
  <body style="margin: 0; padding: 0; background-color: #f4f7f6; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;">
    <div style="display: none; max-height: 0px; overflow: hidden;">${preheader}</div>

    <table border="0" cellpadding="0" cellspacing="0" width="100%" style="background-color: #f4f7f6; padding: 40px 0;">
      <tr>
        <td align="center">
          <table border="0" cellpadding="0" cellspacing="0" width="600" style="background-color: #ffffff; border-radius: 12px; border: 1px solid #e2e8f0; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.05);">
            
            <tr>
              <td align="center" style="padding: 30px 40px; background-color: #09090b; border-bottom: 2px solid #10b981;">
                <header>
                  <img src="${LOGO_URL}" alt="Open Farm Land" width="44" height="44" style="display: block; margin-bottom: 12px; border-radius: 8px;">
                  <div style="color: #10b981; font-weight: 700; font-size: 20px; letter-spacing: -0.5px;">Open Farm Land</div>
                </header>
              </td>
            </tr>

            <tr>
              <td style="padding: 40px 40px 30px 40px; color: #374151; font-size: 16px; line-height: 1.6;">
                <main>
                  ${content}
                </main>
              </td>
            </tr>

            <tr>
              <td style="padding: 0 40px 40px 40px;">
                <section style="border-top: 1px solid #f3f4f6; padding-top: 20px; text-align: center;">
                  <p style="margin: 0; font-size: 12px; color: #a1a1aa; font-style: italic;">
                    <strong>#Rule 1:</strong> Tools assist, but craftsmen build. Get your hands dirty.
                  </p>
                </section>
              </td>
            </tr>

            <tr>
              <td style="padding: 40px; background-color: #09090b; text-align: center;">
                <footer style="color: #71717a;">
                  <p style="margin: 0; font-size: 12px;">&copy; ${new Date().getFullYear()} Open Farm Land. All rights reserved.</p>
                  <div style="margin-top: 20px;">
                    <a href="${APP_URL}/settings" style="color: #10b981; text-decoration: none; font-size: 11px; font-weight: 600;">Account settings</a>
                    <span style="color: #27272a; margin: 0 10px;">|</span>
                    <a href="${APP_URL}/privacy" style="color: #10b981; text-decoration: none; font-size: 11px; font-weight: 600;">Privacy</a>
                    <span style="color: #27272a; margin: 0 10px;">|</span>
                    <a href="${APP_URL}/unsubscribe" style="color: #10b981; text-decoration: none; font-size: 11px; font-weight: 600;">Unsubscribe</a>
                  </div>
                </footer>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>
`;

export const emailTemplates = {
  welcome: (name: string) =>
    baseLayout(
      `
      <h1 style="margin: 0 0 20px 0; color: #111827; font-size: 24px; font-weight: 800; line-height: 1.2;">Welcome to the farm, ${name}.</h1>
      <p style="margin-bottom: 24px;">Your account has been successfully initialized. You are currently exploring as a wanderer. To unlock full access to deployment tools and community features, please follow these steps:</p>
      
      <section style="background-color: #f9fafb; border-radius: 8px; border: 1px solid #f3f4f6; padding: 25px; margin-bottom: 30px;">
        <div style="margin-bottom: 15px; border-left: 3px solid #10b981; padding-left: 15px;">
          <strong style="color: #111827; display: block;">Verify your email</strong>
          <span style="font-size: 14px; color: #6b7280;">Use the verification banner in your dashboard to secure your account.</span>
        </div>
        <div style="margin-bottom: 15px; border-left: 3px solid #10b981; padding-left: 15px;">
          <strong style="color: #111827; display: block;">Claim your profile</strong>
          <span style="font-size: 14px; color: #6b7280;">Add your title, bio, and location to establish your identity on the platform.</span>
        </div>
        <div style="margin-bottom: 0; border-left: 3px solid #10b981; padding-left: 15px;">
          <strong style="color: #111827; display: block;">Configure notifications</strong>
          <span style="font-size: 14px; color: #6b7280;">Adjust your settings to receive relevant technical updates.</span>
        </div>
      </section>

      <p style="font-size: 15px; color: #4b5563;">We look forward to seeing what you build.</p>
    `,
      "Welcome to Open Farm Land. Let's get your profile set up.",
    ),

  verification: (name: string, url: string) =>
    baseLayout(
      `
      <h1 style="margin: 0 0 16px 0; color: #111827; font-size: 22px; font-weight: 700;">Secure your gate</h1>
      <p style="margin-bottom: 24px;">Hello ${name}, please confirm your email address to enable publishing permissions and full account access.</p>
      
      <div style="text-align: center; margin: 30px 0;">
        <a href="${url}" style="display: inline-block; background-color: #10b981; color: #ffffff; padding: 14px 28px; border-radius: 6px; text-decoration: none; font-weight: 700; font-size: 15px;">Verify email address</a>
      </div>
      
      <p style="font-size: 13px; color: #9ca3af; margin-top: 30px; border-top: 1px solid #f3f4f6; padding-top: 20px;">If you did not initiate this request, please secure your account immediately or ignore this email.</p>
    `,
      "Security verification for your Open Farm Land account.",
    ),

  passwordReset: (name: string, url: string) =>
    baseLayout(
      `
      <h1 style="margin: 0 0 16px 0; color: #111827; font-size: 22px; font-weight: 700;">Password reset request</h1>
      <p style="margin-bottom: 24px;">Hi ${name}, we received a request to reset your password. This link is valid for 60 minutes.</p>
      
      <div style="text-align: center; margin: 30px 0;">
        <a href="${url}" style="display: inline-block; background-color: #ef4444; color: #ffffff; padding: 14px 28px; border-radius: 6px; text-decoration: none; font-weight: 700; font-size: 15px;">Reset password</a>
      </div>
      
      <p style="font-size: 13px; color: #9ca3af;">If you did not request this, no further action is required.</p>
    `,
      "Instruction to reset your account password.",
    ),

  // Update the opportunity template inside the emailTemplates object
  opportunity: (
    title: string,
    company: string,
    location: string,
    type: string,
    salary: string | null,
    tags: string[],
    url: string,
  ) =>
    baseLayout(
      `
    <div style="display: inline-block; background-color: #ecfdf5; color: #10b981; padding: 4px 12px; border-radius: 20px; font-size: 11px; font-weight: 700; margin-bottom: 16px; letter-spacing: 0.05em;">Opportunity update</div>
    <h1 style="margin: 0 0 12px 0; color: #111827; font-size: 24px; font-weight: 800; line-height: 1.2;">${title} is available.</h1>
    <p style="margin-bottom: 24px;">A new opportunity at <strong>${company}</strong> has been posted on Open Farm Land for you to apply for. Here are the  <strong>key</strong> details for this opportunity:</p>
    
    <table border="0" cellpadding="0" cellspacing="0" width="100%" style="background-color: #f9fafb; border-radius: 8px; border: 1px solid #f3f4f6; margin-bottom: 24px;">
      <tr>
        <td style="padding: 20px; color: #374151;">
          <div style="margin-bottom: 10px; font-size: 14px;"><strong>Location:</strong> ${location}</div>
          <div style="margin-bottom: 10px; font-size: 14px;"><strong>Type:</strong> ${type.replace("_", " ").toLowerCase()}</div>
          ${salary ? `<div style="margin-bottom: 10px; font-size: 14px;"><strong>Compensation:</strong> ${salary}</div>` : ""}
          <div style="font-size: 14px;"><strong>Tags:</strong> ${tags.join(", ")}</div>
        </td>
      </tr>
    </table>

    <div style="text-align: center; margin-bottom: 24px;">
      <p style="margin: 0; font-size: 14px; color: #6b7280; font-style: italic;">
        Click below to view the full description, responsibilities, and requirements.
      </p>
    </div>

    <div style="text-align: center; margin: 0 0 30px 0;">
      <a href="${url}" style="display: inline-block; background-color: #10b981; color: #ffffff; padding: 14px 28px; border-radius: 6px; text-decoration: none; font-weight: 700; font-size: 15px;">Review the position</a>
    </div>
  `,
      `New matching opportunity: ${title} at ${company}.`,
    ),
  systemUpdate: (
    title: string,
    version: string | null,
    content: string,
    url: string,
  ) =>
    baseLayout(
      `
    <div style="display: inline-block; background-color: #ecfdf5; color: #10b981; padding: 4px 12px; border-radius: 20px; font-size: 11px; font-weight: 700; margin-bottom: 16px; letter-spacing: 0.05em;">Technical log ${version ? `v${version}` : ""}</div>
    <h1 style="margin: 0 0 16px 0; color: #111827; font-size: 24px; font-weight: 800; line-height: 1.2;">${title} is live.</h1>
    
    <p style="margin-bottom: 24px; color: #4b5563;">A new technical update has been harvested for the platform. This log outlines the core infrastructure refinements and feature deployments.</p>

    <section style="background-color: #f9fafb; border-radius: 8px; border: 1px solid #f3f4f6; padding: 25px; margin-bottom: 24px;">
      <h2 style="font-size: 13px; font-weight: 700; color: #10b981; margin: 0 0 15px 0; letter-spacing: 0.05em;">Update overview</h2>
      <div style="color: #374151; font-size: 15px; line-height: 1.7;">
        <p style="margin: 0;">${content}</p>
      </div>
    </section>

    <div style="text-align: center; margin-bottom: 24px;">
      <p style="margin: 0; font-size: 14px; color: #6b7280; font-style: italic;">
        Review the full technical changelog and implementation details below.
      </p>
    </div>

    <div style="text-align: center;">
      <a href="${url}" style="display: inline-block; background-color: #09090b; color: #ffffff; padding: 14px 28px; border-radius: 6px; text-decoration: none; font-weight: 700; font-size: 15px;">Check the changelog</a>
    </div>
  `,
      `Platform update: ${title}.`,
    ),
};
