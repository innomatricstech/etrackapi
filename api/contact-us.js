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
      <div style="font-family: Arial,sans-serif; padding:20px; max-width:600px; margin:auto; border:1px solid #ccc;">
        <h2>New Contact Inquiry</h2>
        <p><strong>Name:</strong> ${inquiry.name}</p>
        <p><strong>Email:</strong> <a href="mailto:${inquiry.email}">${inquiry.email}</a></p>
        <p><strong>Phone:</strong> ${inquiry.phone || "N/A"}</p>
        <p><strong>Service:</strong> ${inquiry.service}</p>
        <h3>Message:</h3>
        <p>${inquiry.message}</p>
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