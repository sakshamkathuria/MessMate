import express from "express";
import cors from "cors";

import authRoutes from "./routes/auth.routes.js";

import attendanceRoutes from "./routes/attendance.routes.js";

import menuRoutes from "./routes/menu.routes.js";

import billingRoutes from "./routes/billing.routes.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);

app.use("/api/attendance", attendanceRoutes);

app.use("/api/menu", menuRoutes);

app.use("/api/billing", billingRoutes);

app.use("/api/admin", billingRoutes);

app.use("/api/payments", billingRoutes);

export default app;
