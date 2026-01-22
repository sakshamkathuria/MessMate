import Attendance from "../models/Attendance.js";
import Payment from "../models/Payment.js";
import User from "../models/User.js";
import razorpay from "../config/razorpay.js";
import crypto from "crypto";

export const getMyBilling = async (req, res) => {
  const MEAL_PRICES = {
    breakfast: 30,
    lunch: 50,
    dinner: 50,
  };
  try {
    const { month, year } = req.query;

    if (!month || !year) {
      return res.status(400).json({
        success: false,
        message: "Month and year are required",
      });
    }

    // Format: YYYY-MM
    const monthStr = `${year}-${month.toString().padStart(2, "0")}`;

    const records = await Attendance.find({
      student: req.user._id,
      date: { $regex: `^${monthStr}` },
    }).sort({ date: 1 });

    let summary = {
      breakfast: { count: 0, amount: 0 },
      lunch: { count: 0, amount: 0 },
      dinner: { count: 0, amount: 0 },
      total: 0,
    };

    const breakdown = records.map((r) => {
      let dayTotal = 0;

      if (r.breakfast) {
        summary.breakfast.count++;
        summary.breakfast.amount += MEAL_PRICES.breakfast;
        dayTotal += MEAL_PRICES.breakfast;
      }
      if (r.lunch) {
        summary.lunch.count++;
        summary.lunch.amount += MEAL_PRICES.lunch;
        dayTotal += MEAL_PRICES.lunch;
      }
      if (r.dinner) {
        summary.dinner.count++;
        summary.dinner.amount += MEAL_PRICES.dinner;
        dayTotal += MEAL_PRICES.dinner;
      }

      summary.total += dayTotal;

      return {
        date: r.date,
        breakfast: r.breakfast ? MEAL_PRICES.breakfast : null,
        lunch: r.lunch ? MEAL_PRICES.lunch : null,
        dinner: r.dinner ? MEAL_PRICES.dinner : null,
        dayTotal,
      };
    });

    // Also compute cumulative due and payments across all months so student's outstanding balance
    const allRecords = await Attendance.find({ student: req.user._id });
    let totalDueAll = 0;
    allRecords.forEach((a) => {
      if (a.breakfast) totalDueAll += MEAL_PRICES.breakfast;
      if (a.lunch) totalDueAll += MEAL_PRICES.lunch;
      if (a.dinner) totalDueAll += MEAL_PRICES.dinner;
    });

    const payments = await Payment.find({ student: req.user._id }).sort({ paidAt: -1 });
    const totalPaidAll = payments.reduce((sum, p) => sum + p.amount, 0);
    const pendingAll = totalDueAll - totalPaidAll;

    res.json({
      success: true,
      summary,
      breakdown,
      prices: MEAL_PRICES,
      totalDueAll,
      totalPaidAll,
      pendingAll,
      payments,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to calculate billing",
    });
  }
};

export const getAdminBillingSummary = async (req, res) => {
  const MEAL_PRICES = {
    breakfast: 30,
    lunch: 50,
    dinner: 50,
  };
  try {
    const students = await User.find({ role: "student" });

    const result = [];

    for (const student of students) {
      // Attendance → due
      const attendance = await Attendance.find({
        student: student._id,
      });

      let totalDue = 0;

      attendance.forEach((a) => {
        if (a.breakfast) totalDue += MEAL_PRICES.breakfast;
        if (a.lunch) totalDue += MEAL_PRICES.lunch;
        if (a.dinner) totalDue += MEAL_PRICES.dinner;
      });

      // Payments → paid
      const payments = await Payment.find({
        student: student._id,
      }).sort({ paidAt: -1 });

      const totalPaid = payments.reduce((sum, p) => sum + p.amount, 0);

      result.push({
        studentId: student._id,
        name: student.name,
        email: student.email,
        totalDue,
        totalPaid,
        pending: totalDue - totalPaid,
        lastPaidAt: payments[0]?.paidAt || null,
      });
    }

    res.json({
      success: true,
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch billing summary",
    });
  }
};

export const recordPayment = async (req, res) => {
  try {
    const { studentId, amount } = req.body;

    if (!studentId || !amount || amount <= 0) {
      return res.status(400).json({
        success: false,
        message: "Student ID and valid amount are required",
      });
    }

    const payment = await Payment.create({
      student: studentId,
      amount,
    });

    res.status(201).json({
      success: true,
      message: "Payment recorded successfully",
      payment,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to record payment",
    });
  }
};

export const createRazorpayOrder = async (req, res) => {
  try {
    const { amount } = req.body;

    const order = await razorpay.orders.create({
      amount: amount * 100, // ₹ → paise
      currency: "INR",
      receipt: `receipt_${Date.now()}`,
    });

    res.json({
      success: true,
      order,
      key: process.env.RAZORPAY_KEY_ID,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to create Razorpay order",
    });
  }
};

export const verifyRazorpayPayment = async (req, res) => {
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      amount,
    } = req.body;

    const body = razorpay_order_id + "|" + razorpay_payment_id;

    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(body)
      .digest("hex");

    if (expectedSignature !== razorpay_signature) {
      return res.status(400).json({
        success: false,
        message: "Payment verification failed",
      });
    }

    // Save payment
    await Payment.create({
      student: req.user._id,
      amount,
    });

    res.json({
      success: true,
      message: "Payment successful",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Payment verification failed",
    });
  }
};
