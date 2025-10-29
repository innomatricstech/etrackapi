import express from "express";
import nodemailer from "nodemailer";

const router = express.Router();

// Zoho transporter
const transporter = nodemailer.createTransport({
  host: "smtp.zoho.in",
  port: 465,
  secure: true,
  auth: {
    // 🚨 Reminder: Highly recommend changing these to process.env.ZOHO_USER/PASS
    user: "roofsketch@etracktitle.com",
    pass: "r5FvJnaDutfV", 
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
      <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: auto; border: 1px solid #e0e0e0; border-radius: 12px; overflow: hidden; background-color: #ffffff; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);">

        <div style="background-color: #003366; color: white; padding: 30px 20px; text-align: center; border-bottom: 5px solid #28a745;">
          <h1 style="margin: 0; font-size: 28px; font-weight: 700; letter-spacing: 0.5px;">
            <span style="font-size: 1.2em; vertical-align: middle;">🧾</span> Order Confirmation
          </h1>
        </div>

        <div style="padding: 25px 30px;">

          <h2 style="margin: 0; font-weight: 800; color: #003366; font-size: 1.8em; line-height: 1.2;">
            ORDER # ${order.order_number}
          </h2>

          <p style="margin-top: 20px; color: #333; font-size: 1em;">
            Dear <strong>${order.first_name} ${order.last_name}</strong>,
          </p>

          <p style="color: #333; line-height: 1.6;">
            Thank you for your order! We have received your request and will begin processing your roof reports immediately. 
            <strong style="color: #28a745;">This order has been submitted for invoicing.</strong> 
            A detailed summary of your request is below.
          </p>

          <h3 style="margin-top: 30px; border-bottom: 2px solid #28a745; padding-bottom: 8px; color: #003366; font-size: 1.3em; font-weight: 700;">
            Customer Contact Details
          </h3>
          <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="margin-top: 10px; font-size: 1em; color: #333;">
            <tr><td style="padding: 5px 0; width: 30%;"><strong>Name:</strong></td><td style="padding: 5px 0;">${order.first_name} ${order.last_name}</td></tr>
            <tr><td style="padding: 5px 0; width: 30%;"><strong>Email:</strong></td><td style="padding: 5px 0;"><a href="mailto:${order.customer_email}" style="color: #007bff; text-decoration: none;">${order.customer_email}</a></td></tr>
            <tr><td style="padding: 5px 0; width: 30%;"><strong>Phone:</strong></td><td style="padding: 5px 0;">${order.customer_phone}</td></tr>
          </table>

          <h3 style="margin-top: 30px; border-bottom: 2px solid #28a745; padding-bottom: 8px; color: #003366; font-size: 1.3em; font-weight: 700;">
            Order & Property Details
          </h3>
          <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="margin-top: 10px; font-size: 1em; color: #333;">
            <tr><td style="padding: 5px 0; width: 35%;"><strong>Product Ordered:</strong></td><td style="padding: 5px 0; font-weight: 600;">${order.product_name} (Qty: ${order.product_quantity})</td></tr>
            <tr><td style="padding: 5px 0; width: 35%;"><strong>Reports Selected:</strong></td><td style="padding: 5px 0;">${order.product_reports_selected}</td></tr>
            <tr><td style="padding: 5px 0; width: 35%;"><strong>Property Address:</strong></td><td style="padding: 5px 0;">${order.shipping_address}</td></tr>
            <tr><td style="padding: 5px 0; width: 35%;"><strong>Primary Pitch:</strong></td><td style="padding: 5px 0;">${order.primary_pitch || 'N/A'}</td></tr>
            <tr><td style="padding: 5px 0; width: 35%;"><strong>Secondary Pitch:</strong></td><td style="padding: 5px 0;">${order.secondary_pitch || 'N/A'}</td></tr>
            <tr><td style="padding: 5px 0; width: 35%;"><strong>Facets:</strong></td><td style="padding: 5px 0;">${order.number_of_facets || 'N/A'}</td></tr>
            <tr><td style="padding: 5px 0; width: 35%;"><strong>Geocoordinates:</strong></td><td style="padding: 5px 0;">Lat: ${order.latitude || 'N/A'}, Lon: ${order.longitude || 'N/A'}</td></tr>
            <tr><td style="padding: 5px 0; width: 35%;"><strong>Expedited:</strong></td><td style="padding: 5px 0;">${order.is_expedited || 'No'}</td></tr>
          </table>


          <h3 style="margin-top: 30px; border-bottom: 2px solid #eee; padding-bottom: 8px; color: #003366; font-size: 1.3em; font-weight: 700;">
            Additional Notes
          </h3>
          <p style="margin: 10px 0; padding: 10px; background-color: #f8f8f8; border-left: 3px solid #007bff; font-style: italic; color: #555;">
            ${order.notes  || 'No additional notes provided.'}
          </p>
          <div style="margin-top: 30px; background-color: #f7f9fc; padding: 20px; border-radius: 8px; border: 1px solid #e0e0e0; text-align: right;">
            <p style="margin-bottom: 5px; font-size: 1.1em; color: #555;">TOTAL AMOUNT DUE (for Invoice)</p>
            <h2 style="color: #dc3545; font-size: 2.2em; margin: 0; font-weight: 800;">
              $${order.total_paid}
            </h2>
          </div>

          <p style="margin-top: 30px; text-align: center; font-size: 0.95em; color: #555; border-top: 1px solid #eee; padding-top: 20px;">
            You will receive a separate notification when your reports are complete and ready for download.
          </p>

        </div>

        <div style="background-color: #f0f0f0; color: #777; padding: 15px; text-align: center; font-size: 0.85em; border-top: 1px solid #ddd; border-bottom-left-radius: 12px; border-bottom-right-radius: 12px;">
          <p style="margin: 0;">This is an automated confirmation. Please do not reply to this email.</p>
          <p style="margin: 5px 0 0 0;">eTrack &copy; 2025</p>
        </div>
      </div>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: "Order email sent successfully!" });
  } catch (err) {
    console.error("❌ Failed to send order email:", err);
    res.status(500).json({ error: "Failed to send order email" });
  }
});

export default router;
