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


export default app;