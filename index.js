import express from "express";
import cors from "cors";
import sendRouter from "./api/sendemail.js";      // renamed for clarity
import contactRouter from "./api/contact-us.js";  // renamed for clarity

const app = express();
app.use(cors());
app.use(express.json());

// Mount routers
app.use("/", sendRouter);
app.use("/", contactRouter);

// Health check route
app.get("/", (req, res) => {
  res.send("Server is running");
});

// Start server
const PORT = 5000;
app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
