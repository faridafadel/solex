import { useReviews } from "../hooks/useReviews";

const ReviewsSection = ({ productName, initialRating, initialReviewsCount }) => {
  const { getProductReviews, deleteReview, getAverageRating } = useReviews();
  const reviews = getProductReviews(productName);
  const averageRating = getAverageRating(productName);
  const totalReviews = reviews.length;
  const displayRating = totalReviews > 0 ? averageRating : initialRating;
  const displayCount = totalReviews > 0 ? totalReviews : initialReviewsCount;

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

  return (
    <div className="mt-12 pt-8 border-t border-slate-200">
      <div className="mb-8">
        <h2 className="text-3xl font-palanquin font-bold mb-4">Customer Reviews</h2>

        <div className="bg-slate-50 p-6 rounded-lg mb-8">
          <div className="flex items-end gap-4">
            <div>
              <p className="text-5xl font-bold text-coral-blue">{displayRating}</p>
              <p className="text-lg text-slate-gray font-montserrat">
                {renderStars(displayRating)}
              </p>
            </div>
            <div className="flex-1">
              <p className="text-xl font-semibold">
                Based on {displayCount} review{displayCount !== 1 ? "s" : ""}
              </p>
            </div>
          </div>
        </div>

        {reviews.length === 0 ? (
          <p className="text-slate-gray font-montserrat mb-8">
            No reviews yet. Be the first to share your thoughts!
          </p>
        ) : (
          <div className="space-y-4">
            {reviews.map((review) => (
              <div
                key={review.id}
                className="border border-slate-200 rounded-lg p-5 hover:shadow-md transition"
              >
                <div className="flex justify-between items-start mb-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h4 className="font-semibold text-lg">{review.title}</h4>
                      <span className="text-coral-blue">
                        {renderStars(review.rating)}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-slate-gray">
                      <span className="font-medium">{review.name}</span>
                      <span>•</span>
                      <span>{formatDate(review.timestamp)}</span>
                    </div>
                  </div>
                </div>

                <p className="text-slate-700 font-montserrat leading-relaxed mb-4">
                  {review.comment}
                </p>

                {review.email && (
                  <p className="text-xs text-slate-400 font-montserrat">
                    Email: {review.email}
                  </p>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ReviewsSection;
