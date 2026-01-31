import FeedbackForm from "../components/feedback/FeedbackForm";
import RecentReviews from "../components/feedback/RecentReviews";

const Feedback = () => {
  return (
    <div className="bg-[#fdfaf5] min-h-screen px-6 py-16">
      <div className="text-center mb-12">
        <span className="bg-orange-100 text-orange-500 px-4 py-1 rounded-full text-sm font-medium">
          💬 Your Voice Matters
        </span>
        <h1 className="text-4xl font-bold mt-4">
          Feedback & <span className="text-orange-500">Reviews</span>
        </h1>
        <p className="text-gray-600 mt-2 max-w-xl mx-auto">
          Help us improve by sharing your meal experience.
        </p>
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10">
        <FeedbackForm />
        <RecentReviews />
      </div>
    </div>
  );
};

export default Feedback;
