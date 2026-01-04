import express from "express";
import { getStudents, markAttendance, getMyAttendance, getAttendanceSummary } from "../controllers/attendance.controller.js";
import {protect} from "../middleware/authMiddleware.js";
import roleMiddleware from "../middleware/role.middleware.js";

const router = express.Router();

router.get("/students",protect,roleMiddleware("admin"),getStudents);

// Admin: attendance summary for a date
router.get("/summary", protect, roleMiddleware("admin"), getAttendanceSummary);

router.post("/",protect,roleMiddleware("admin"),markAttendance);

router.get("/me",protect,roleMiddleware("student"),getMyAttendance);
export default router;
