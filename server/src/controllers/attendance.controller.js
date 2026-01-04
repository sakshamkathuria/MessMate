import User from "../models/User.js";
import Attendance from "../models/Attendance.js";

export const getStudents = async (req, res) => {
  try {
    const students = await User.find({ role: "student" })
      .select("_id name email");

    res.json({
      success: true,
      students,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch students",
    });
  }
};

export const markAttendance = async (req, res) => {
  try {
    const { date, records } = req.body;

    if (!date || !records) {
      return res.status(400).json({
        success: false,
        message: "Date and records are required",
      });
    }

    for (const record of records) {
      const { studentId, breakfast, lunch, dinner } = record;

      await Attendance.findOneAndUpdate(
        { student: studentId, date },
        {
          student: studentId,
          date,
          breakfast,
          lunch,
          dinner,
        },
        { upsert: true, new: true }
      );
    }

    res.json({
      success: true,
      message: "Attendance saved successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to save attendance",
    });
  }
};

export const getMyAttendance = async (req, res) => {
  try {
    const attendance = await Attendance.find({
      student: req.user._id,
    }).sort({ date: -1 });

    res.json({
      success: true,
      attendance,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch attendance",
    });
  }
};

// Admin: attendance summary for a date (YYYY-MM-DD)
export const getAttendanceSummary = async (req, res) => {
  try {
    const { date } = req.query;
    const day = date || new Date().toISOString().slice(0, 10); // YYYY-MM-DD

    const records = await Attendance.find({ date: day });

    const breakfast = records.filter((r) => r.breakfast).length;
    const lunch = records.filter((r) => r.lunch).length;
    const dinner = records.filter((r) => r.dinner).length;
    const totalPresent = records.filter((r) => r.breakfast || r.lunch || r.dinner).length;

    res.json({
      success: true,
      summary: { date: day, totalPresent, breakfast, lunch, dinner },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to fetch attendance summary" });
  }
};
