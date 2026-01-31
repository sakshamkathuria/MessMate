import express from "express";
import cors from "cors";

import authRoutes from "./routes/auth.routes.js";

import attendanceRoutes from "./routes/attendance.routes.js";

import menuRoutes from "./routes/menu.routes.js";

import billingRoutes from "./routes/billing.routes.js";

import feedbackRoutes from "./routes/feedbackRoutes.js";

const app = express();

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://mess-mate-liard.vercel.app"
    ],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

app.use(express.json());

app.use("/api/auth", authRoutes);

app.use("/api/attendance", attendanceRoutes);

app.use("/api/menu", menuRoutes);

app.use("/api/billing", billingRoutes);

app.use("/api/admin", billingRoutes);

app.use("/api/payments", billingRoutes);

app.get("/api/health", (req, res) => {
  res.status(200).json({ status: "ok", message: "Server is running" });
});

app.use("/api/feedback", feedbackRoutes);

export default app;
