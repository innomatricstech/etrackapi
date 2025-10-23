import express from "express";
import nodemailer from "nodemailer";

const router = express.Router();

// Zoho transporter
const transporter = nodemailer.createTransport({
  host: "smtp.zoho.in",
  port: 465,
  secure: true,
  auth: {
    user: "roofsketch@etracktitle.com",
    pass: "r5FvJnaDutfV", // Zoho App Password (CHANGE TO ENV VARS)
  },
});

router.post("/contact-us", async (req, res) => {
  const inquiry = req.body;

  if (!inquiry?.email) {
    return res.status(400).json({ error: "Missing inquiry email" });
  }

  const mailOptions = {
    from: `"Website Inquiry" <roofsketch@etracktitle.com>`,
    to: "roofsketch@etracktitle.com",
    replyTo: inquiry.email,
    subject: `🌐 New Website Inquiry: ${inquiry.service} from ${inquiry.name}`,
    html: `
      <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; padding: 20px; border: 1px solid #e0e0e0; max-width: 600px; margin: auto; box-shadow: 0 4px 12px rgba(0,0,0,0.1); border-radius: 8px; background-color: #ffffff;">
        
        <h2 style="color: #003366; border-bottom: 3px solid #28a745; padding-bottom: 10px; font-weight: 700;">
          📥 New Contact Inquiry Received
        </h2>
        
        <h3 style="color: #003366; font-size: 1.1em; margin-top: 25px; margin-bottom: 10px; font-weight: 600;">Inquiry Details</h3>
        <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="margin-top: 5px; font-size: 1em; color: #333;">
            <tr><td style="padding: 5px 0; width: 30%;"><strong>Name:</strong></td><td style="padding: 5px 0;">${inquiry.name}</td></tr>
            <tr><td style="padding: 5px 0; width: 30%;"><strong>Email:</strong></td><td style="padding: 5px 0;"><a href="mailto:${inquiry.email}" style="color: #007bff; text-decoration: none;">${inquiry.email}</a></td></tr>
            <tr><td style="padding: 5px 0; width: 30%;"><strong>Phone:</strong></td><td style="padding: 5px 0;">${inquiry.phone || 'N/A'}</td></tr>
            <tr><td style="padding: 5px 0; width: 30%;"><strong>Service Requested:</strong></td><td style="padding: 5px 0; font-weight: 600; color: #dc3545;">${inquiry.service}</td></tr>
        </table>
        
        <h3 style="color: #003366; border-bottom: 1px solid #eee; padding-bottom: 5px; margin-top: 30px; font-weight: 600;">Customer Message</h3>
        <p style="white-space: pre-wrap; background-color: #f7f7f7; padding: 15px; border-left: 3px solid #007bff; border-radius: 4px; color: #555; line-height: 1.6; margin-top: 10px;">${inquiry.message}</p>

        <p style="margin-top: 30px; text-align: center; font-size: 0.85em; color: #777; border-top: 1px solid #eee; padding-top: 15px;">
            This inquiry was submitted via the website contact form.
        </p>
      </div>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: "Inquiry email sent successfully!" });
  } catch (err) {
    console.error("❌ Failed to send contact inquiry:", err);
    res.status(500).json({ error: "Failed to send inquiry" });
  }
});

export default router;
