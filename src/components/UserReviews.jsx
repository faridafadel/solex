import { useReviews } from "../hooks/useReviews";
import { Link } from "react-router-dom";

const UserReviews = ({ userEmail, userName }) => {
  const { getUserReviews, deleteReview } = useReviews();
  const userReviews = getUserReviews(userEmail);

  const renderStars = (rating) => {
    return "⭐".repeat(Math.round(rating));
  };

  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInSeconds = Math.floor((now - date) / 1000);

    if (diffInSeconds < 60) return "just now";
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`;
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`;
    if (diffInSeconds < 604800) return `${Math.floor(diffInSeconds / 86400)}d ago`;

    return date.toLocaleDateString();
  };

  const handleDeleteReview = (productName, reviewId) => {
    if (window.confirm("Are you sure you want to delete this review?")) {
      deleteReview(productName, reviewId);
    }
  };

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <h2 className="font-palanquin text-2xl font-semibold">My Reviews</h2>
      
      {userReviews.length === 0 ? (
        <div className="mt-4">
          <p className="font-montserrat text-slate-gray">
            You haven't posted any reviews yet.
          </p>
          <Link
            to="/products"
            className="mt-3 inline-block text-coral-blue font-semibold font-montserrat hover:underline"
          >
            Browse products and share your experience →
          </Link>
        </div>
      ) : (
        <div className="mt-4 space-y-4">
          {userReviews.map((review) => (
            <div
              key={review.id}
              className="border border-slate-200 rounded-lg p-4 hover:shadow-md transition"
            >
              <div className="flex justify-between items-start gap-4 mb-3">
                <div className="flex-1">
                  <Link
                    to={`/products/${review.productName
                      .toLowerCase()
                      .trim()
                      .replace(/[^a-z0-9\s-]/g, "")
                      .replace(/\s+/g, "-")}`}
                    className="font-semibold text-coral-blue hover:underline"
                  >
                    {review.productName}
                  </Link>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-coral-blue">{renderStars(review.rating)}</span>
                    <span className="text-sm text-slate-gray font-montserrat">
                      {formatDate(review.timestamp)}
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => handleDeleteReview(review.productName, review.id)}
                  className="text-xs text-red-500 hover:text-red-700 font-semibold px-3 py-1 rounded hover:bg-red-50 transition"
                >
                  Delete
                </button>
              </div>

              <h4 className="font-semibold mb-2">{review.title}</h4>
              <p className="text-slate-700 font-montserrat leading-relaxed">
                {review.comment}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default UserReviews;
