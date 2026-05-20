import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import http from "http";
import { Server } from "socket.io";
import dotenv from "dotenv";

// Load environment variables
dotenv.config();

import authRoutes from "./routes/authRoutes.js";
import crowdRoutes from "./routes/crowdRoutes.js";

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*", // Allows your frontend to connect securely
    methods: ["GET", "POST"],
  },
});

app.set("io", io);
app.use(cors());
app.use(express.json());

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

app.use("/api/auth", authRoutes);
app.use("/api/crowd", crowdRoutes);

io.on("connection", (socket) => {
  console.log("User Connected");
  socket.on("disconnect", () => {
    console.log("User Disconnected");
  });
});

const PORT = process.env.PORT || 5000;

server.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${PORT}`);
});