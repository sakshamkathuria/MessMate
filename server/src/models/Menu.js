import mongoose from "mongoose";

const menuSchema = new mongoose.Schema(
  {
    day: {
      type: String,
      required: true,
      enum: [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
      ],
    },
    breakfast: {
      type: [String],
      default: [],
    },
    lunch: {
      type: [String],
      default: [],
    },
    dinner: {
      type: [String],
      default: [],
    },
  },
  { timestamps: true }
);

// One menu per day
menuSchema.index({ day: 1 }, { unique: true });

export default mongoose.model("Menu", menuSchema);
