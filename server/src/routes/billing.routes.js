import express from "express";
import { getMyBilling, recordPayment, getAdminBillingSummary,createRazorpayOrder,verifyRazorpayPayment} from "../controllers/billing.controller.js";
import { protect } from "../middleware/authMiddleware.js";
import roleMiddleware from "../middleware/role.middleware.js";

const router = express.Router();

// Student: get their billing for a given month
router.get("/me", protect, roleMiddleware("student"), getMyBilling);

// Admin: record a payment for a student
router.post("/record",protect,roleMiddleware("admin"),recordPayment);

// Admin: get billing summary for all students
router.get("/billing-summary", protect, roleMiddleware("admin"), getAdminBillingSummary);

router.post("/create-order",protect,roleMiddleware("student"),createRazorpayOrder);

router.post("/verify",protect,roleMiddleware("student"),verifyRazorpayPayment);

export default router;
