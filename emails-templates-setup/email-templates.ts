const verificationEmailTemplate = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Notes Email Verification</title>
  <style>
    /* Light Mode Styles */
    body {
      background-color: #f4f7fc;
      font-family: Arial, sans-serif;
      color: #333;
    }
    .main-table {
      background-color: #ffffff;
      border: 1px solid #e1e4e8;
      border-radius: 8px;
      box-shadow: 0 4px 6px rgba(0,0,0,0.1);
    }
    .main-td {
      padding: 30px;
      text-align: center;
    }
    .header {
      background: linear-gradient(90deg, #e6f2ff 0%, #dceeff 100%);
      padding: 20px;
    }
    .header h2 {
      margin: 10px 0 0;
      font-size: 24px;
      color: #0073e6;
      font-weight: bold;
    }
    a {
      color: #0073e6;
      text-decoration: none;
    }
    .footer {
      background-color: #f9fafc;
      padding: 20px;
      text-align: center;
      font-size: 12px;
      color: #666666;
    }
    .footer a {
      color: #0073e6;
      text-decoration: none;
    }
    .footer p {
      font-size: 10px;
      color: #999999;
    }

    /* Dark Mode Styles */
    @media (prefers-color-scheme: dark) {
      body {
        background-color: #333;
        color: #f4f7fc;
      }
      .main-table {
        background-color: #1a1a1a;
        border: 1px solid #444;
      }
      .main-td {
        background-color: #1a1a1a;
      }
      .header {
        background: linear-gradient(90deg, #444 0%, #333 100%);
      }
      .header h2 {
        color: #63a4ff;
      }
      a {
        color: #63a4ff;
      }
      .footer {
        background-color: #222;
        color: #999999;
      }
      .footer a {
        color: #63a4ff;
      }
    }

    @media only screen and (max-width: 620px) {
      table[class="main-table"] {
        width: 100% !important;
      }
      td[class="main-td"] {
        padding: 20px !important;
      }
      h1 {
        font-size: 20px !important;
      }
      p, a {
        font-size: 16px !important;
      }
    }
  </style>
</head>
<body>
  <!-- Hidden Preheader Text -->
  <div style="display:none;max-height:0;overflow:hidden;color:#f4f7fc;font-size:1px;line-height:1px;">
    Your verification code is valid for 24 hours. Confirm now to unlock all Notes features!
  </div>
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background-color:#f4f7fc;padding:20px;">
    <tr>
      <td align="center">
        <table role="presentation" width="600" class="main-table" cellspacing="0" cellpadding="0">
          <!-- Header -->
          <tr>
            <td align="center" class="header">
              <img src="cid:unique_inline_logo_cid" alt="Notes Logo" width="120" style="display:block;margin:0 auto;">
              <h2>Notes</h2>
            </td>
          </tr>
          <!-- Main Content -->
          <tr>
            <td class="main-td">
              <h1 style="margin:0 0 10px;font-size:22px;color:#0073e6;font-weight:600;">Verify Your Email</h1>
              <p style="font-size:16px;line-height:1.5;margin:0 0 20px;">
                Hi [user_name],<br>
                Thank you for signing up with Notes. Please verify your email to activate your account and enjoy full access to all features.
              </p>
              <!-- Verification Code -->
              <div style="margin:0 auto 15px;padding:15px;font-size:24px;font-weight:bold;color:#0073e6;background-color:#f1f8fe;border:1px solid #d6e9ff;border-radius:8px;max-width:280px;">
                [verification_code]
              </div>
              <p style="font-size:14px;color:#666666;margin:0 0 20px;">This code will expire in 24 hours.</p>
              <p style="font-size:14px;color:#666666;margin:0 0 25px;">Verifying now unlocks all Notes features instantly.</p>
              <!-- CTA Button -->
              <a href="[verification_link]" style="display:inline-block;padding:12px 24px;font-size:16px;font-weight:500;color:#ffffff;background-color:#0073e6;border-radius:5px;">Verify Email</a>
              <p style="font-size:14px;line-height:1.4;color:#666666;margin:20px 0 0;">
                If you didn’t request this, you can safely ignore this email or <a href="mailto:flyinnsafuh@gmail.com">contact support</a>.
              </p>
            </td>
          </tr>
          <!-- Footer -->
          <tr>
            <td class="footer">
              <p style="margin:0 0 5px;">Notes Inc., Tic Hub-Polytechnique, Tech City, Country</p>
              <p style="margin:0 0 10px;">
                <a href="[unsubscribe_link]">Unsubscribe</a> | <a href="mailto:flyinnsafuh@gmail.com">Support</a>
              </p>
              <p>© 2025 Notes Inc. All rights reserved.</p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>



`;

const welcomeEmailTemplate = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Notes Welcome Email</title>
  <style>
    /* Default light mode styles */
    body {
      background-color: #f4f7fc;
      color: #333;
    }
    .main-table {
      background-color: #ffffff;
      border: 1px solid #e1e4e8;
    }
    .main-td {
      padding: 30px;
      text-align: center;
    }
    .button {
      background-color: #0073e6;
      color: #ffffff;
    }

    /* Dark mode adjustments */
    @media (prefers-color-scheme: dark) {
      body {
        background-color: #333;
        color: #f4f7fc;
      }
      .main-table {
        background-color: #444;
        border: 1px solid #555;
      }
      .main-td {
        padding: 30px;
        text-align: center;
      }
      .button {
        background-color: #0073e6;
        color: #ffffff;
      }
      .button:hover {
        background-color: #005bb5;
      }
      .footer {
        background-color: #222;
        color: #bbb;
      }
      .footer a {
        color: #0073e6;
      }
    }

    /* Mobile responsive styles */
    @media only screen and (max-width: 620px) {
      table[class="main-table"] {
        width: 100% !important;
      }
      td[class="main-td"] {
        padding: 20px !important;
      }
      h1 {
        font-size: 20px !important;
      }
      p, a {
        font-size: 16px !important;
      }
    }
  </style>
</head>
<body>
  <!-- Hidden Preheader Text -->
  <div style="display:none;max-height:0;overflow:hidden;color:#f4f7fc;font-size:1px;line-height:1px;">
    Welcome to Notes! Let’s get started—explore your dashboard and create your first note today.
  </div>
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="padding:20px;">
    <tr>
      <td align="center">
        <table role="presentation" width="600" class="main-table" cellspacing="0" cellpadding="0">
          <!-- Header -->
          <tr>
            <td align="center" style="background:linear-gradient(90deg,#e6f2ff 0%,#dceeff 100%);padding:20px;">
              <img src="cid:unique_inline_logo_cid" alt="Notes Logo" width="120" style="display:block;margin:0 auto;">
              <h2 style="margin:10px 0 0;font-size:24px;color:#0073e6;font-weight:bold;">Notes</h2>
            </td>
          </tr>
          <!-- Main Content -->
          <tr>
            <td class="main-td">
              <h1 style="margin:0 0 10px;font-size:22px;color:#0073e6;font-weight:600;">Welcome to Notes!</h1>
              <p style="font-size:16px;line-height:1.5;margin:0 0 20px;">
                Hi [user_name],<br>
                We’re thrilled you’ve joined the Notes community. Ready to organize, capture, and share your ideas? Let’s get you started.
              </p>
              <!-- Callout -->
              <div style="margin:0 auto 20px;padding:15px;font-size:18px;font-weight:bold;color:#0073e6;background-color:#f1f8fe;border:1px solid #d6e9ff;border-radius:8px;max-width:320px;">
                Tip: Click “Start Exploring” to view your dashboard.
              </div>
              <!-- CTA Button -->
              <a href="[homepage_link]" class="button" style="display:inline-block;padding:12px 24px;font-size:16px;font-weight:500;border-radius:5px;text-decoration:none;">Start Exploring</a>
              <p style="font-size:14px;color:#666666;margin:20px 0 0;">
                Have questions? Feel free to <a href="mailto:flyinnsafuh@gmail.com" style="color:#0073e6;text-decoration:none;">contact our support team</a> anytime.
              </p>
            </td>
          </tr>
          <!-- Footer -->
          <tr>
            <td class="footer" style="background-color:#f9fafc;padding:20px;text-align:center;font-size:12px;color:#666666;">
              <p style="margin:0 0 5px;">Notes Inc., Tic Hub-Polytechnique, Tech City, Country</p>
              <p style="margin:0 0 10px;">
                <a href="[unsubscribe_link]" style="color:#0073e6;text-decoration:none;">Unsubscribe</a> | <a href="mailto:flyinnsafuh@gmail.com" style="color:#0073e6;text-decoration:none;">Support</a>
              </p>
              <p style="margin:0;font-size:10px;color:#999999;">© 2025 Notes Inc. All rights reserved.</p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>


`;

const passwordResetEmailTemplate = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Password Reset Request</title>
  <style>
    /* Light Mode Styles */
    body {
      background-color: #f4f7fc;
      color: #333;
    }
    .main-table {
      background-color: #ffffff;
      border: 1px solid #e1e4e8;
    }
    .main-td {
      background-color: #ffffff;
    }
    .header {
      background: linear-gradient(90deg, #e6f2ff 0%, #dceeff 100%);
    }
    a {
      color: #0073e6;
    }
    .footer {
      background-color: #f9fafc;
      color: #666666;
    }
    /* Dark Mode Styles */
    @media (prefers-color-scheme: dark) {
      body {
        background-color: #333;
        color: #f4f7fc;
      }
      .main-table {
        background-color: #1a1a1a;
        border: 1px solid #444;
      }
      .main-td {
        background-color: #1a1a1a;
      }
      .header {
        background: linear-gradient(90deg, #444 0%, #333 100%);
      }
      a {
        color: #63a4ff;
      }
      .footer {
        background-color: #222;
        color: #999999;
      }
    }
    @media only screen and (max-width: 620px) {
      table[class="main-table"] {
        width: 100% !important;
      }
      td[class="main-td"] {
        padding: 20px !important;
      }
      h1 {
        font-size: 20px !important;
      }
      p, a {
        font-size: 16px !important;
      }
    }
  </style>
</head>
<body style="margin:0;padding:0;font-family:Arial,sans-serif;">
  <!-- Hidden Preheader Text -->
  <div style="display:none;max-height:0;overflow:hidden;color:#f4f7fc;font-size:1px;line-height:1px;">
    Your password reset link is valid for 24 hours. If not requested by you, ignore this email.
  </div>
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="padding:20px;">
    <tr>
      <td align="center">
        <table role="presentation" width="600" class="main-table" cellspacing="0" cellpadding="0" style="border-radius:8px;box-shadow:0 4px 6px rgba(0,0,0,0.1);overflow:hidden;">
          <!-- Header -->
          <tr>
            <td align="center" class="header" style="padding:20px;">
              <img src="cid:unique_inline_logo_cid" alt="Notes Logo" width="120" style="display:block;margin:0 auto;">
              <h2 style="margin:10px 0 0;font-size:24px;color:#0073e6;font-weight:bold;">Notes</h2>
            </td>
          </tr>
          <!-- Main Content -->
          <tr>
            <td class="main-td" style="padding:30px;text-align:center;">
              <h1 style="margin:0 0 10px;font-size:22px;color:#0073e6;font-weight:600;">Password Reset Request</h1>
              <p style="font-size:16px;line-height:1.5;margin:0 0 20px;">
                Hi [user_name],<br>
                We received a request to reset your password. Click the button below to securely update your credentials.
              </p>
              <!-- Button -->
              <a href="[reset_link]" style="display:inline-block;padding:12px 24px;font-size:16px;font-weight:500;color:#ffffff;background-color:#0073e6;border-radius:5px;text-decoration:none;">Reset Password</a>
              <p style="font-size:14px;color:#666666;margin:20px 0 10px;">
                This link will expire in 24 hours for your security.
              </p>
              <p style="font-size:14px;color:#666666;margin:0;">
                If the button doesn’t work, copy and paste the following URL into your browser:<br>
                <a href="[reset_link]" style="color:#0073e6;text-decoration:none;word-break:break-all;">[reset_link]</a>
              </p>
              <p style="font-size:14px;line-height:1.4;color:#666666;margin:20px 0 0;">
                If you did not request a password reset, you can safely ignore this email or <a href="mailto:flyinnsafuh@gmail.com" style="color:#0073e6;text-decoration:none;">contact support</a>.
              </p>
            </td>
          </tr>
          <!-- Footer -->
          <tr>
            <td class="footer" style="padding:20px;text-align:center;font-size:12px;">
              <p style="margin:0 0 5px;">Notes Inc., Tic Hub-Polytechnique, Yaounde, Cameroon</p>
              <p style="margin:0 0 10px;">
                <a href="[unsubscribe_link]" style="color:#0073e6;text-decoration:none;">Unsubscribe</a> | <a href="mailto:flyinnsafuh@gmail.com" style="color:#0073e6;text-decoration:none;">Support</a>
              </p>
              <p style="margin:0;font-size:10px;color:#999999;">© 2025 Notes Inc. All rights reserved.</p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>


`;

const accountDeleteEmailTemplate = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Account Deletion Request</title>
  <style>
    /* Light Mode Styles */
    body {
      margin: 0;
      padding: 0;
      background-color: #f4f7fc;
      font-family: Arial, sans-serif;
      color: #333;
    }
    table {
      background-color: #f4f7fc;
    }
    .main-table {
      background: #ffffff;
      border: 1px solid #e1e4e8;
      border-radius: 8px;
      box-shadow: 0 4px 6px rgba(0,0,0,0.1);
      overflow: hidden;
    }
    h1 {
      margin: 0 0 10px;
      font-size: 22px;
      color: #d9534f;
      font-weight: 600;
    }
    p {
      font-size: 16px;
      line-height: 1.5;
    }
    a {
      text-decoration: none;
    }
    .cta-button {
      padding: 12px 24px;
      font-size: 16px;
      font-weight: 500;
      border-radius: 5px;
    }
    .cta-cancel {
      background-color: #0073e6;
      color: #ffffff;
    }
    .cta-confirm {
      background-color: #d9534f;
      color: #ffffff;
    }

    /* Dark Mode Styles */
    @media (prefers-color-scheme: dark) {
      body {
        background-color: #181818;
        color: #f4f7fc;
      }
      table {
        background-color: #181818;
      }
      .main-table {
        background-color: #2c2c2c;
        border-color: #444;
      }
      h1 {
        color: #d9534f;
      }
      p {
        color: #ddd;
      }
      .cta-button {
        color: #ffffff;
      }
      .cta-cancel {
        background-color: #0073e6;
      }
      .cta-confirm {
        background-color: #d9534f;
      }
    }

    /* Media Queries for responsiveness */
    @media only screen and (max-width: 620px) {
      table[class="main-table"] {
        width: 100% !important;
      }
      td[class="main-td"] {
        padding: 20px !important;
      }
      h1 {
        font-size: 20px !important;
      }
      p, a {
        font-size: 16px !important;
      }
      table[class="details-table"] td {
        display: block;
        width: 100% !important;
        box-sizing: border-box;
      }
    }
  </style>
</head>
<body>
  <!-- Hidden Preheader Text -->
  <div style="display:none;max-height:0;overflow:hidden;color:#f4f7fc;font-size:1px;line-height:1px;">
    Confirm or cancel your Notes account deletion. This link expires in 24 hours.
  </div>
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background-color:#f4f7fc;padding:20px;">
    <tr>
      <td align="center">
        <table role="presentation" width="600" class="main-table" cellspacing="0" cellpadding="0">
          <!-- Header -->
          <tr>
            <td align="center" style="background:linear-gradient(90deg,#e6f2ff 0%,#dceeff 100%);padding:20px;">
              <img src="cid:unique_inline_logo_cid" alt="Notes Logo" width="120" style="display:block;margin:0 auto;">
              <h2 style="margin:10px 0 0;font-size:24px;color:#0073e6;font-weight:bold;">Notes</h2>
            </td>
          </tr>
          <!-- Main Content -->
          <tr>
            <td class="main-td" style="padding:30px;text-align:center;">
              <h1>Account Deletion Request</h1>
              <p>Hi [user_name],<br>
                We received a request to delete your Notes account. If this wasn’t you or you’ve changed your mind, cancel below.
              </p>
              <p style="color:#555;">
                Note: Once deleted, your data is permanently removed and cannot be recovered.
              </p>
              <!-- CTA Buttons -->
              <table role="presentation" cellspacing="0" cellpadding="0" style="margin:0 auto 20px;">
                <tr>
                  <td align="center" style="border-radius:5px;">
                    <a href="[cancel_deletion_link]" class="cta-button cta-cancel">Cancel Deletion</a>
                  </td>
                  <td width="10">&nbsp;</td>
                  <td align="center" style="border-radius:5px;">
                    <a href="[account_deletion_link]" class="cta-button cta-confirm">Confirm Deletion</a>
                  </td>
                </tr>
              </table>
              <p style="font-size:14px;color:#666666;">
                If the buttons aren’t working, copy and paste these links into your browser:<br>
                Cancel: <a href="[cancel_deletion_link]" style="color:#0073e6;text-decoration:none;word-break:break-all;">[cancel_deletion_link]</a><br>
                Confirm: <a href="[account_deletion_link]" style="color:#d9534f;text-decoration:none;word-break:break-all;">[account_deletion_link]</a>
              </p>
              <p style="font-size:14px;color:#666666;line-height:1.4;margin:20px 0 0;">
                No action needed if you want to proceed; your account will be deleted in 4 minutes.
              </p>
            </td>
          </tr>
          <!-- Footer -->
          <tr>
            <td style="background-color:#f9fafc;padding:20px;text-align:center;font-size:12px;color:#666666;">
              <p style="margin:0 0 5px;">Notes Inc., Tic Hub-Polytechnique, Yaounde, Cameroon</p>
              <p style="margin:0 0 10px;">
                <a href="[unsubscribe_link]" style="color:#0073e6;text-decoration:none;">Unsubscribe</a> | <a href="mailto:flyinnsafuh@gmail.com" style="color:#0073e6;text-decoration:none;">Support</a>
              </p>
              <p style="margin:0;font-size:10px;color:#999999;">© 2025 Notes Inc. All rights reserved.</p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>

`;

const accountLogoutEmailTemplate = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Account Logout Notification</title>
  <style>
    /* Light and Dark Mode */
    @media (prefers-color-scheme: dark) {
      body {
        background-color: #333;
        color: #f4f7fc;
      }
      .main-table {
        background-color: #444;
        border: 1px solid #555;
      }
      h1, h2 {
        color: #0073e6;
      }
      p, a {
        color: #ddd;
      }
      a {
        text-decoration: none;
      }
      .footer {
        background-color: #222;
        color: #777;
      }
    }

    @media only screen and (max-width: 620px) {
      table[class="main-table"] {
        width: 100% !important;
      }
      td[class="main-td"] {
        padding: 20px !important;
      }
      h1 {
        font-size: 20px !important;
      }
      p, a {
        font-size: 16px !important;
      }
      table[class="details-table"] td {
        display: block;
        width: 100% !important;
        box-sizing: border-box;
      }
    }
  </style>
</head>
<body style="margin:0;padding:0;background-color:#f4f7fc;font-family:Arial,sans-serif;color:#333;">
  <!-- Hidden Preheader Text -->
  <div style="display:none;max-height:0;overflow:hidden;color:#f4f7fc;font-size:1px;line-height:1px;">
    You’ve been logged out from all devices. Secure your account if this wasn’t you.
  </div>
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background-color:#f4f7fc;padding:20px;">
    <tr>
      <td align="center">
        <table role="presentation" width="600" class="main-table" cellspacing="0" cellpadding="0" style="background:#ffffff;border:1px solid #e1e4e8;border-radius:8px;box-shadow:0 4px 6px rgba(0,0,0,0.1);overflow:hidden;">
          <!-- Header -->
          <tr>
            <td align="center" style="background:linear-gradient(90deg,#e6f2ff 0%,#dceeff 100%);padding:20px;">
              <img src="cid:unique_inline_logo_cid" alt="Notes Logo" width="120" style="display:block;margin:0 auto;">
              <h2 style="margin:10px 0 0;font-size:24px;color:#0073e6;font-weight:bold;font-family:Arial,sans-serif;">Notes</h2>
            </td>
          </tr>
          <!-- Main Content -->
          <tr>
            <td class="main-td" style="padding:30px;text-align:center;">
              <h1 style="margin:0 0 10px;font-size:22px;color:#0073e6;font-weight:600;font-family:Arial,sans-serif;">Logout Successful</h1>
              <p style="font-size:16px;line-height:1.5;margin:0 0 20px;font-family:Arial,sans-serif;">
                Hi [user_name],<br>
                You’ve been securely logged out from all devices. If this was you, you’re all set.
              </p>
              <p style="font-size:16px;line-height:1.5;margin:0 0 20px;font-family:Arial,sans-serif;">
                If you did not initiate this logout, please secure your account immediately.
              </p>
              <!-- CTA Button -->
              <a href="[account_security_link]" style="display:inline-block;padding:12px 24px;font-size:16px;font-weight:500;color:#ffffff;background-color:#0073e6;border-radius:5px;text-decoration:none;font-family:Arial,sans-serif;">Secure Your Account</a>
              <p style="font-size:14px;color:#666666;margin:20px 0 0;font-family:Arial,sans-serif;">
                If the button above doesn’t work, copy and paste this link into your browser:<br>
                <a href="[account_security_link]" style="color:#0073e6;text-decoration:none;word-break:break-all;">[account_security_link]</a>
              </p>
            </td>
          </tr>
          <!-- Footer -->
          <tr>
            <td class="footer" style="background-color:#f9fafc;padding:20px;text-align:center;font-size:12px;color:#666666;font-family:Arial,sans-serif;">
              <p style="margin:0 0 5px;">Notes Inc., Tic Hub-Polytechnique, Yaounde, Cameroon</p>
              <p style="margin:0 0 10px;">
                <a href="[unsubscribe_link]" style="color:#0073e6;text-decoration:none;">Unsubscribe</a> | <a href="mailto:flyinnsafuh@gmail.com" style="color:#0073e6;text-decoration:none;">Support</a>
              </p>
              <p style="margin:0;font-size:10px;color:#999999;">© 2025 Notes Inc. All rights reserved.</p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>


`;

const accountNotificationTemplate = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Account Activity Notification</title>
  <style>
    @media only screen and (max-width: 620px) {
      table[class="main-table"] {
        width: 100% !important;
      }
      td[class="main-td"] {
        padding: 20px !important;
      }
      h1 {
        font-size: 20px !important;
      }
      p, a {
        font-size: 16px !important;
      }
      table[class="details-table"] td {
        display: block;
        width: 100% !important;
        box-sizing: border-box;
      }
    }
    /* Light theme */
    body.light {
      background-color: #f4f7fc;
      color: #333;
    }
    .light table {
      background-color: #ffffff;
    }
    .light h1, .light h2 {
      color: #0073e6;
    }
    .light a {
      color: #0073e6;
    }
    .light td {
      color: #333;
    }

    /* Dark theme */
    body.dark {
      background-color: #121212;
      color: #f4f7fc;
    }
    .dark table {
      background-color: #1e1e1e;
      border-color: #333;
    }
    .dark h1, .dark h2 {
      color: #64b5f6;
    }
    .dark a {
      color: #64b5f6;
    }
    .dark td {
      color: #f4f7fc;
    }
    .dark .main-table {
      box-shadow: 0 4px 6px rgba(255, 255, 255, 0.1);
    }
  </style>
</head>
<body class="light" style="margin:0;padding:0;font-family:Arial,sans-serif;">
  <!-- Hidden Preheader Text -->
  <div style="display:none;max-height:0;overflow:hidden;color:#f4f7fc;font-size:1px;line-height:1px;">
    Recent activity detected—review now to ensure your account’s security.
  </div>
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="padding:20px;">
    <tr>
      <td align="center">
        <table role="presentation" width="600" class="main-table" cellspacing="0" cellpadding="0" style="border:1px solid #e1e4e8;border-radius:8px;overflow:hidden;">
          <!-- Header -->
          <tr>
            <td align="center" style="background:linear-gradient(90deg,#e6f2ff 0%,#dceeff 100%);padding:20px;">
              <img src="cid:unique_inline_logo_cid" alt="Notes Logo" width="120" style="display:block;margin:0 auto;">
              <h2 style="margin:10px 0 0;font-size:24px;font-weight:bold;">Notes</h2>
            </td>
          </tr>
          <!-- Main Content -->
          <tr>
            <td class="main-td" style="padding:30px;text-align:center;">
              <h1 style="margin:0 0 10px;font-size:22px;font-weight:600;">Account Activity Notification</h1>
              <p style="font-size:16px;line-height:1.5;margin:0 0 20px;">
                Hi [user_name],<br>
                We detected the following action in your account. If this was you, no further steps are needed; otherwise, please secure your account.
              </p>
              <!-- Activity Details -->
              <table role="presentation" class="details-table" cellspacing="0" cellpadding="5" style="margin:0 auto 20px;text-align:left;">
                <tr><td><strong>Activity:</strong></td><td>[activity_description]</td></tr>
                <tr><td><strong>Time:</strong></td><td>[activity_time]</td></tr>
                <tr><td><strong>Source:</strong></td><td>[activity_author]</td></tr>
              </table>
              <!-- CTA Button -->
              <a href="[account_security_link]" style="display:inline-block;padding:12px 24px;font-size:16px;font-weight:500;color:#ffffff;background-color:#0073e6;border-radius:5px;text-decoration:none;">Review Activity</a>
              <p style="font-size:14px;color:#666666;margin:20px 0 0;">
                If the button doesn’t work, copy and paste this link into your browser:<br>
                <a href="[account_security_link]" style="color:#0073e6;text-decoration:none;word-break:break-all;">[account_security_link]</a>
              </p>
            </td>
          </tr>
          <!-- Footer -->
          <tr>
            <td style="background-color:#f9fafc;padding:20px;text-align:center;font-size:12px;color:#666666;">
              <p style="margin:0 0 5px;">Notes Inc., Tic Hub-Polytechnique, Yaounde, Cameroon</p>
              <p style="margin:0 0 10px;"><a href="[unsubscribe_link]" style="color:#0073e6;text-decoration:none;">Unsubscribe</a> | <a href="mailto:flyinnsafuh@gmail.com" style="color:#0073e6;text-decoration:none;">Support</a></p>
              <p style="margin:0;font-size:10px;color:#999999;">© 2025 Notes Inc. All rights reserved.</p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>

  <script>
    // Automatically switch themes based on the user's system preference
    const prefersDarkMode = window.matchMedia("(prefers-color-scheme: dark)").matches;
    document.body.classList.toggle('dark', prefersDarkMode);
  </script>
</body>
</html>

`;
const adminNotificationTemplateForAccountDelete = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Account Activity Notification</title>
  <style>
    @media only screen and (max-width: 620px) {
      table[class="main-wrapper"] {
        width: 100% !important;
      }
      td[class="content-padding"] {
        padding: 20px !important;
      }
      h1 {
        font-size: 20px !important;
      }
      h2 {
        font-size: 22px !important;
      }
      p, td {
        font-size: 14px !important;
      }
    }

    /* Default Light Theme */
    body {
      background-color: #f4f7fc;
      color: #333;
    }

    .main-wrapper {
      background-color: #ffffff;
      border: 1px solid #e1e4e8;
    }

    .header {
      background: linear-gradient(90deg, #e6f2ff 0%, #dceeff 100%);
    }

    .footer {
      background-color: #f9fafc;
      color: #666666;
    }

    a {
      color: #0073e6;
    }

    /* Dark Theme */
    @media (prefers-color-scheme: dark) {
      body {
        background-color: #1f1f1f;
        color: #f4f7fc;
      }

      .main-wrapper {
        background-color: #333;
        border: 1px solid #555;
      }

      .header {
        background: linear-gradient(90deg, #1a3c6e 0%, #34495e 100%);
      }

      .footer {
        background-color: #2c2c2c;
        color: #bbbbbb;
      }

      a {
        color: #58a6ff;
      }
    }
  </style>
</head>
<body style="margin:0;padding:0;font-family:Arial,sans-serif;">
  <!-- Hidden Preheader Text -->
  <div style="display:none;max-height:0;overflow:hidden;color:#f4f7fc;font-size:1px;line-height:1px;">
    Recent activity detected—review details below to keep your Notes account secure.
  </div>
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="padding:20px;">
    <tr>
      <td align="center">
        <table role="presentation" width="600" cellspacing="0" cellpadding="0" class="main-wrapper">
          <!-- Header -->
          <tr>
            <td align="center" class="header" style="padding:20px;">
              <img src="cid:unique_inline_logo_cid" alt="Notes Logo" width="120" style="display:block;margin:0 auto;">
              <h2 style="margin:10px 0 0;font-size:24px;color:#0073e6;font-weight:bold;">Notes</h2>
            </td>
          </tr>
          <!-- Main Content -->
          <tr>
            <td class="content-padding" style="padding:30px;text-align:center;">
              <h1 style="margin:0 0 10px;font-size:22px;color:#0073e6;font-weight:600;">Account Activity Notification</h1>
              <p style="font-size:16px;line-height:1.5;margin:0 0 20px;">
                Hi [user_name],<br>
                We detected a recent account deletion—see details below. If this wasn’t you, please review immediately.
              </p>
              <!-- Activity Details -->
              <table role="presentation" cellspacing="0" cellpadding="5" style="margin:0 auto 20px;text-align:left;">
                <tr><td><strong>Activity:</strong></td><td>[activity_description]</td></tr>
                <tr><td><strong>Reason:</strong></td><td>[account_delete_reason]</td></tr>
                <tr><td><strong>Time:</strong></td><td>[activity_time]</td></tr>
                <tr><td><strong>Initiated By:</strong></td><td>[activity_author]</td></tr>
              </table>
            </td>
          </tr>
          <!-- Footer -->
          <tr>
            <td class="footer" style="padding:20px;text-align:center;font-size:12px;">
              <p style="margin:0 0 5px;">Notes Inc., Tic Hub-Polytechnique, Yaounde, Cameroon</p>
              <p style="margin:0 0 10px;">
                <a href="[unsubscribe_link]" style="text-decoration:none;">Unsubscribe</a> | <a href="mailto:flyinnsafuh@gmail.com" style="text-decoration:none;">Support</a>
              </p>
              <p style="margin:0;font-size:10px;color:#999999;">© 2025 Notes Inc. All rights reserved.</p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>



`;

export {
  verificationEmailTemplate,
  welcomeEmailTemplate,
  accountDeleteEmailTemplate,
  accountLogoutEmailTemplate,
  passwordResetEmailTemplate,
  accountNotificationTemplate,
  adminNotificationTemplateForAccountDelete,
};
