import mongoose from "mongoose";

const attendanceSchema = new mongoose.Schema(
  {
    student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    date: {
      type: String, // YYYY-MM-DD
      required: true,
    },
    breakfast: {
      type: Boolean,
      default: false,
    },
    lunch: {
      type: Boolean,
      default: false,
    },
    dinner: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

// Prevent duplicate attendance per student per day
attendanceSchema.index({ student: 1, date: 1 }, { unique: true });

export default mongoose.model("Attendance", attendanceSchema);
