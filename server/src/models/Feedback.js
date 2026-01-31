import mongoose from "mongoose";

const feedbackSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    mealType: {
      type: String,
      enum: ["Breakfast", "Lunch", "Dinner"],
      required: true,
    },
    rating: {
      type: Number,
      min: 1,
      max: 5,
      required: true,
    },
    comment: {
      type: String,
      required: true,
      maxLength: 500,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Feedback", feedbackSchema);
