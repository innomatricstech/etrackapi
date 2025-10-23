import express from "express";
import cors from "cors";
import contactRouter from "./api/contact-us.js"; // Note: This assumes contact-us.js is in ./api/ for local dev
import orderRouter from "./api/send-order.js"; // Note: This assumes send-order.js is in ./api/ for local dev

const app = express();

// Enable CORS
app.use(cors({
  origin: "*", // Replace "*" with frontend URL for production
  methods: ["GET","POST"]
}));

app.use(express.json());

// Mount routers
// Note: When deployed to Vercel, the routes in contact-us.js 
// and sendemail.js (which you named send-order.js below) 
// would typically be accessed directly via their file paths if in the /api folder.
// However, the current setup routes them to the root path.
app.use("/", contactRouter);
app.use("/", orderRouter);

// Health check
app.get("/", (req, res) => {
  res.send("🚀 Backend server is running");
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));