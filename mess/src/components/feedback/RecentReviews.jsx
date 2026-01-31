import { useEffect, useState } from "react";
import api from "../../api/axios";
import ReviewCard from "./ReviewCard";

const RecentReviews = () => {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    api.get("/feedback")
      .then((res) => setReviews(res.data))
      .catch(() => {});
  }, []);

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">
        Recent Reviews <span className="text-gray-500">({reviews.length})</span>
      </h2>

      <div className="space-y-4 max-h-[520px] overflow-y-auto pr-2">
        {reviews.map((review) => (
          <ReviewCard key={review._id} review={review} />
        ))}
      </div>
    </div>
  );
};

export default RecentReviews;
