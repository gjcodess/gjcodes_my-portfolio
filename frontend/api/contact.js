import { Resend } from 'resend';

export default async function handler(req, res) {
  const apiKey = process.env.RESEND_API_KEY || process.env.VITE_RESEND_API_KEY;
  console.log("Loaded API Key:", apiKey ? "Found" : "MISSING");
  
  const resend = new Resend(apiKey);

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  try {
    const { data, error } = await resend.emails.send({
      from: 'Portfolio Contact <onboarding@resend.dev>',
      to: ['glennjoshuacorpus@gmail.com'],
      subject: `New Message from ${name} on your Portfolio!`,
      reply_to: email,
      html: `
        <!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>New Contact Message</title>
          <style>
            @import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600;700&display=swap');
          </style>
        </head>
        <body style="margin: 0; padding: 0; background-color: #0F0E1A; color: #FFFFFF; font-family: 'JetBrains Mono', 'SF Mono', 'Monaco', 'Courier New', monospace; -webkit-font-smoothing: antialiased;">
          <table width="100%" border="0" cellspacing="0" cellpadding="0" style="background-color: #0F0E1A; padding: 40px 20px;">
            <tr>
              <td align="center">
                <table width="600" border="0" cellspacing="0" cellpadding="0" style="background-color: #141420; border-radius: 8px; border: 1px solid #3A3A44; overflow: hidden; max-width: 600px; width: 100%;">
                  
                  <!-- Header -->
                  <tr>
                    <td style="padding: 30px; border-bottom: 1px solid #3A3A44; background-color: #141420; text-align: center;">
                      <h1 style="margin: 0; color: #00FF99; font-size: 24px; font-weight: 600; letter-spacing: 0.5px; text-transform: uppercase;">
                        // New Message
                      </h1>
                      <p style="margin: 10px 0 0 0; color: #C1C2D3; font-size: 14px;">
                        Someone reached out from your portfolio website.
                      </p>
                    </td>
                  </tr>

                  <!-- Body -->
                  <tr>
                    <td style="padding: 30px;">
                      <!-- Sender Info -->
                      <table width="100%" border="0" cellspacing="0" cellpadding="0" style="margin-bottom: 25px;">
                        <tr>
                          <td style="padding-bottom: 15px;">
                            <p style="margin: 0; font-size: 12px; color: #00FF99; text-transform: uppercase; font-weight: 600; letter-spacing: 1px;">Name</p>
                            <p style="margin: 5px 0 0 0; font-size: 16px; color: #FFFFFF; font-weight: 500;">${name}</p>
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <p style="margin: 0; font-size: 12px; color: #00FF99; text-transform: uppercase; font-weight: 600; letter-spacing: 1px;">Email</p>
                            <p style="margin: 5px 0 0 0; font-size: 16px; color: #FFFFFF; font-weight: 500;">
                              <a href="mailto:${email}" style="color: #0EA5E9; text-decoration: none;">${email}</a>
                            </p>
                          </td>
                        </tr>
                      </table>

                      <!-- Message Content -->
                      <div style="background-color: #0F0E1A; padding: 20px; border-radius: 6px; border-left: 4px solid #00FF99;">
                        <p style="margin: 0; font-size: 12px; color: #00FF99; text-transform: uppercase; font-weight: 600; letter-spacing: 1px; margin-bottom: 10px;">Message</p>
                        <p style="margin: 0; font-size: 15px; color: #E5E7EB; line-height: 1.6; white-space: pre-wrap;">${message}</p>
                      </div>
                    </td>
                  </tr>

                  <!-- Footer -->
                  <tr>
                    <td style="padding: 20px; background-color: #0F0E1A; text-align: center; border-top: 1px solid #3A3A44;">
                      <p style="margin: 0; color: #A1A1AA; font-size: 12px;">
                        This email was securely sent via Vercel Serverless Functions & Resend.
                      </p>
                    </td>
                  </tr>
                  
                </table>
              </td>
            </tr>
          </table>
        </body>
        </html>
      `
    });

    if (error) {
      return res.status(400).json({ error });
    }

    return res.status(200).json({ data });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}
