const ReviewCard = ({ review }) => {
  return (
    <div className="bg-white rounded-xl p-5 shadow-sm">
      <div className="flex justify-between items-center mb-2">
        <div className="font-semibold">{review.user.name}</div>
        <span className="text-sm text-gray-400">
          {new Date(review.createdAt).toDateString()}
        </span>
      </div>

      <div className="flex items-center gap-2 mb-2">
        <div className="text-orange-500">
          {"★".repeat(review.rating)}
          {"☆".repeat(5 - review.rating)}
        </div>
        <span className="bg-gray-100 px-3 py-1 rounded-full text-xs">
          {review.mealType}
        </span>
      </div>

      <p className="text-gray-600">{review.comment}</p>
    </div>
  );
};

export default ReviewCard;
