

export const resetTemplates = (user: any, token: any) => {
  return `<!DOCTYPE html>
  <html>
  <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <style type="text/css">
          body {
              margin: 0;
              padding: 0;
              font-family: Arial, sans-serif;
          }
          .email-container {
              width: 100%;
              max-width: 600px;
              margin: auto;
              border: 1px solid #ccc;
          }
          .email-header, .email-footer {
              background-color: #f4f4f4;
              padding: 20px;
              text-align: center;
          }
          .email-body {
              padding: 20px;
          }
          a {
              background-color: #0000cc;
              color: #fff;
              padding: 12px;
              margin: 0 auto;
              text-decoration: none;
          }
          a:hover {
              background-color: #3358FF;
          }
      </style>
  </head>
  <body>
      <div class="email-container">
          <div class="email-header">
              <h1>Password Reset Request</h1>
          </div>
          <div class="email-body">
              <p>Hello, Admin</p>
              <p>It seems like you are trying to reset your password. Click the link below to reset your password.</p>
              <a href="${process.env.FRONT_END_URI}/admin/reset-password/${token}">Reset Password</a>
              <p>If you are not Future focus Admin , please ignore this email.</p>
              <p>Best Regards,<br>Future focus Team</p>
          </div>
          <div class="email-footer">
              <p>&copy; 2024 Future Focus Academy. All rights reserved.</p>
          </div>
      </div>
  </body>
  </html>`;
};
export const SubscriptionEmail = () => {
  return `<!DOCTYPE html>
  <html>
  <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <style type="text/css">
          body {
              margin: 0;
              padding: 0;
              font-family: Arial, sans-serif;
          }
          .email-container {
              width: 100%;
              max-width: 600px;
              margin: auto;
              border: 1px solid #ccc;
          }
          .email-header, .email-footer {
              background-color: #f4f4f4;
              padding: 20px;
              text-align: center;
          }
          .email-body {
              padding: 20px;
          }
          a {
              background-color: #0000cc;
              color: #fff;
              padding: 12px;
              margin: 0 auto;
              text-decoration: none;
          }
          a:hover {
              background-color: #3358FF;
          }
      </style>
  </head>
  <body>
      <div class="email-container">
          <div class="email-header">
              <h1>Futurefocus</h1>
          </div>
          <div class="email-body">
              <p>Hello </p>
              <p> thank you for subscribe to our Future Focus Academy</p>
              <
              <p>Future Focus cademy,<br>Here to serve you</p>
          </div>
          <div class="email-footer">
              <p>&copy; 2024 Future Focus Academy. All rights reserved.</p>
          </div>
      </div>
  </body>
  </html>`;
};
