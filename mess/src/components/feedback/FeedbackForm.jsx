import { useState } from "react";
import api from "../../api/axios";
import toast from "react-hot-toast";

const meals = ["Breakfast", "Lunch", "Dinner"];

const FeedbackForm = () => {
  const [mealType, setMealType] = useState("Lunch");
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const submitFeedback = async () => {
    if (!rating || !comment.trim()) {
      toast.error("Please provide rating and comment");
      return;
    }

    try {
      await api.post("/feedback", {
        mealType,
        rating,
        comment,
      });

      toast.success("Feedback submitted 🎉");
      setRating(0);
      setComment("");
    } catch {
      toast.error("Failed to submit feedback");
    }
  };

  return (
    <div className="bg-white rounded-2xl p-8 shadow-sm">
      <h2 className="text-xl font-bold mb-1">🍽️ Rate Today’s Meal</h2>
      <p className="text-gray-500 mb-6">Share your experience</p>

      {/* Meal Select */}
      <div className="flex gap-3 mb-6">
        {meals.map((meal) => (
          <button
            key={meal}
            onClick={() => setMealType(meal)}
            className={`px-5 py-3 rounded-xl border font-medium ${
              mealType === meal
                ? "border-orange-500 bg-orange-50 text-orange-600"
                : "border-gray-200"
            }`}
          >
            {meal}
          </button>
        ))}
      </div>

      {/* Rating */}
      <div className="flex gap-2 mb-6">
        {[1, 2, 3, 4, 5].map((i) => (
          <span
            key={i}
            onClick={() => setRating(i)}
            className={`text-3xl cursor-pointer ${
              i <= rating ? "text-orange-500" : "text-gray-300"
            }`}
          >
            ★
          </span>
        ))}
      </div>

      {/* Comment */}
      <textarea
        rows={4}
        maxLength={500}
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        placeholder="Tell us about your meal experience..."
        className="w-full p-4 rounded-xl border border-gray-200 mb-4"
      />

      <button
        onClick={submitFeedback}
        className="w-full bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-xl font-semibold"
      >
        🚀 Submit Feedback
      </button>
    </div>
  );
};

export default FeedbackForm;
