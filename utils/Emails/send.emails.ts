import path from "node:path";
import { fileURLToPath } from "node:url";
import {
  accountLogoutEmailTemplate,
  accountNotificationTemplate,
  passwordResetEmailTemplate,
  verificationEmailTemplate,
  welcomeEmailTemplate,
  accountDeleteEmailTemplate,
  adminNotificationTemplateForAccountDelete,
} from "@/emails-templates-setup/email-templates";
import { sendEmail } from "@/config/email.sender.setup";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const clientUrl = process.env.CLIENT_URL;
const attachments = [
  {
    filename: "notes logo", // Inline file
    path: path.join(__dirname, "..", "..", "public", "icons", "logo.svg"), // Path to inline image
    cid: "unique_inline_logo_cid", // Content-ID for inline image (must be unique)
  },
];
const sendVerificationEmail = async (
  code: string,
  email: string,
  username: string,
  token: string,
  headers: {
    "X-Category": string;
  }
) => {
  try {
    const newEmail: string = verificationEmailTemplate
      .replace("[user_name]", username)
      .replace("[verification_code]", code)
      .replace(
        "[verification_link]",
        `"${clientUrl}/auth/verify-email/${token}"`
      );
    await sendEmail(
      email,
      "Verification Email",
      newEmail,
      headers,
      attachments
    );
  } catch (error: any | { message: string }) {
    console.error(`Error sending verification email: ${error.message}`);
  }
};

const sendNotificationEmail = async (
  activity: string,
  email: string,
  username: string,
  time: string,
  author: string,
  headers: {
    "X-Category": string;
  }
) => {
  try {
    const newEmail: string = accountNotificationTemplate
      .replace("[user_name]", username)
      .replace("[activity_description]", activity)
      .replace("[activity_time]", time)
      .replace("[activity_author]", author)
      .replace("[account_security_link]", `"${clientUrl}"`);
    await sendEmail(
      email,
      "Notification Email",
      newEmail,
      headers,
      attachments
    );
  } catch (error: any | { message: string }) {
    console.error(`Error sending notification email: ${error.message}`);
  }
};
const sendWelcomeEmail = async (
  email: string,
  username: string,
  headers: {
    "X-Category": string;
  }
) => {
  try {
    const newEmail: string = welcomeEmailTemplate
      .replace("[user_name]", username)
      .replace("[homepage_link]", `"${clientUrl}"`);
    //Send email content
    await sendEmail(email, "Welcome Email", newEmail, headers, attachments);
  } catch (error: any | { message: string }) {
    console.error(`Error sending welcome email: ${error.message}`);
  }
};
const sendLogoutEmail = async (
  email: string,
  username: string,
  headers: {
    "X-Category": string;
  }
) => {
  try {
    const newEmail: string = accountLogoutEmailTemplate
      .replace("[user_name]", username)
      .replace("[account_security_link]", `"${clientUrl}"`);
    //Send email content
    await sendEmail(email, "Logout Email", newEmail, headers, attachments);
  } catch (error: any | { message: string }) {
    console.error(`Error sending account logout email: ${error.message}`);
  }
};
const sendPasswordResetEmail = async (
  email: string,
  username: string,
  resetUrl: string,
  headers: {
    "X-Category": string;
  }
) => {
  try {
    const newEmail: string = passwordResetEmailTemplate
      .replace("[user_name]", username)
      .replace("[reset_link]", resetUrl)
      .replace("href=[reset_link]", `href="${resetUrl}"`);
    //Send email content
    await sendEmail(
      email,
      "Password Reset Email",
      newEmail,
      headers,
      attachments
    );
  } catch (error: any | { message: string }) {
    console.error(`Error sending password reset email: ${error.message}`);
  }
};
const sendAccountDeleteEmail = async (
  email: string,
  username: string,
  deleteUrl: string,
  headers: {
    "X-Category": string;
  }
) => {
  try {
    const newEmail: string = accountDeleteEmailTemplate
      .replace("[user_name]", username)
      .replace("[cancel_deletion_link]", `"${clientUrl}"`)
      .replace("[account_deletion_link]", `"${deleteUrl}"`)
      .replace("[account_deletion_link]", deleteUrl)
      .replace("[cancel_deletion_link]", clientUrl!);
    //Send email content
    await sendEmail(
      email,
      "Account Delete Email",
      newEmail,
      headers,
      attachments
    );
  } catch (error: any | { message: string }) {
    console.error(`Error sending account delete email: ${error.message}`);
  }
};
const sendAccountDeleteAdminNotificationEmail = async (
  email: string,
  username: string,
  activityDescription: string,
  accountDeleteReason: string,
  time: string,
  headers: {
    "X-Category": string;
  }
) => {
  try {
    const newEmail: string = adminNotificationTemplateForAccountDelete
      .replace("[user_name]", "Tembeng Flynn")
      .replace("[activity_description]", activityDescription)
      .replace("[account_delete_reason]", accountDeleteReason)
      .replace("[activity_time]", time)
      .replace("[activity_author]", `${username}, ${email}`);

    // Read admin email from env file
    const adminEmail = process.env.NODEMAILER_ADMIN_EMAIL!;
    //Send email content
    await sendEmail(
      adminEmail,
      "Account Delete Email",
      newEmail,
      headers,
      attachments
    );
  } catch (error: any | { message: string }) {
    console.error(
      `Error sending user account delete notification to admin email: ${error.message}`
    );
  }
};

export {
  sendVerificationEmail,
  sendNotificationEmail,
  sendWelcomeEmail,
  sendLogoutEmail,
  sendPasswordResetEmail,
  sendAccountDeleteEmail,
  sendAccountDeleteAdminNotificationEmail,
};
