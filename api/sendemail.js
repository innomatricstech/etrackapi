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
    pass: "r5FvJnaDutfV", // Zoho App Password
  },
});

router.post("/send-order", async (req, res) => {
  const order = req.body;

  if (!order?.customer_email) {
    return res.status(400).json({ error: "Missing customer email" });
  }

  const mailOptions = {
    from: `"ETrack Orders" <roofsketch@etracktitle.com>`,
    to: order.customer_email,
    cc: "roofsketch@etracktitle.com",
    subject: `✅ Order Confirmation - ${order.order_number}`,
    html: `
      <div style="font-family: Arial,sans-serif; padding:20px; max-width:600px; margin:auto; border:1px solid #ccc;">
        <h2>Order Confirmation - #${order.order_number}</h2>
        <p>Dear ${order.first_name} ${order.last_name},</p>
        <p>Product: ${order.product_name} (Qty: ${order.product_quantity})</p>
        <p>Total Paid: $${order.total_paid}</p>
        <p>Billing Address: ${order.shipping_address}</p>
        <p>Notes: ${order.notes || "No additional notes"}</p>
      </div>
    `,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log("✅ Order email sent:", info.messageId);
    res.status(200).json({ message: "Order email sent successfully!" });
  } catch (err) {
    console.error("❌ Failed to send order email:", err);
    res.status(500).json({ error: "Failed to send order email" });
  }
});

export default router;
