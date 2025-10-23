// server.js
import express from "express";
import cors from "cors";
import sendemail from "./api/sendemail.js";
import contactMailOptions from "./api/contact-us.js";

const app = express();
app.use(cors());
app.use(express.json());

app.use("/", sendemail);
app.use("/", contactMailOptions);

app.get("/", (req, res)=> {
    res.send("Server is running");
});


const PORT = 5000;
app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));

