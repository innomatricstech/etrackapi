import express from "express";
import cors from "cors";
import contactRouter from "./api/contact-us.js";
import orderRouter from "./api/send-order.js";

const app = express();

// Enable CORS
app.use(cors({
  origin: "*", // Replace "*" with frontend URL for production
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

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
