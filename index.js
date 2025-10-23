import express from "express";
import cors from "cors";
// NOTE: Assuming your router files are in the 'api' folder.
import contactRouter from "./api/contact-us.js";
import orderRouter from "./api/sendemail.js"; // Corrected to use your file name 'sendemail.js'

const app = express();

// Enable CORS
app.use(cors({
  origin: "*", 
  methods: ["GET","POST"]
}));

app.use(express.json());

// Mount routers
app.use("/", contactRouter);
app.use("/", orderRouter);

// Health check
app.get("/", (req, res) => {
  res.send("🚀 Backend server is running");
});

// 🚨 CRITICAL FIX: The code below that started the local server is REMOVED.

// Start server
// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));

// EXPORT the Express app instance for Vercel's serverless handler
export default app;