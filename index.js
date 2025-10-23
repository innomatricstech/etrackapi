// server.js
import express from "express";
import cors from "cors";

// Import API routes
import sendRouter from "./api/sendemail.js";      // Handles /send-order
import contactRouter from "./api/contact-us.js";  // Handles /contact-us

const app = express();

// ============================
// MIDDLEWARE
// ============================
// Enable CORS for all origins (or restrict to your frontend domain)
app.use(cors());
// Parse JSON request bodies
app.use(express.json());

// ============================
// ROUTES
// ============================
// Order email route
app.use("/send-order", sendRouter);
// Contact form route
app.use("/contact-us", contactRouter);

// Health check
app.get("/", (req, res) => {
  res.send("Server is running ✅");
});

// ============================
// START SERVER
// ============================
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
