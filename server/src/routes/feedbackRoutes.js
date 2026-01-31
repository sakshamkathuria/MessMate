import express from "express";
import Feedback from "../models/Feedback.js";
import {protect} from "../middleware/authMiddleware.js";

const router = express.Router();

// Create feedback
router.post("/", protect, async (req, res) => {
  const feedback = await Feedback.create({
    ...req.body,
    user: req.user._id,
  });
  res.status(201).json(feedback);
});

// Get recent feedback
router.get("/", async (req, res) => {
  const feedback = await Feedback.find()
    .populate("user", "name")
    .sort({ createdAt: -1 })
    .limit(10);

  res.json(feedback);
});

export default router;
