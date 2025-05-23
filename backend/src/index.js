import express from "express";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.route.js";
import messageRoutes from "./routes/message.route.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import { connectDB } from "./lib/db.js";
import { app, server } from "./lib/socket.js";

dotenv.config();

const PORT = process.env.PORT || 5001; 

// Increase body size limit
app.use(express.json({ limit: "10mb" }));  // Increase limit for JSON payloads
app.use(express.urlencoded({ limit: "10mb", extended: true })); // Increase limit for form data

app.use(cookieParser());
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true,
}));

app.use("/api/auth", authRoutes); 
app.use("/api/messages", messageRoutes); 

server.listen(PORT, () => {
  console.log("Server is running on port :" + PORT);
  connectDB();
});
