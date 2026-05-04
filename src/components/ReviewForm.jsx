import { useState, useEffect } from "react";
import { useReviews } from "../hooks/useReviews";
import { USER_STORAGE_KEY } from "../context/cartContext";

const ReviewForm = ({ productName, onReviewAdded }) => {
  const { addReview } = useReviews();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    rating: 5,
    title: "",
    comment: "",
  });
  const [submitted, setSubmitted] = useState(false);

  // Load user data on mount
  useEffect(() => {
    const storedUser = localStorage.getItem(USER_STORAGE_KEY);
    if (storedUser) {
      try {
        const user = JSON.parse(storedUser);
        setFormData((prev) => ({
          ...prev,
          name: user.fullName || "",
          email: user.email || "",
        }));
      } catch (error) {
        console.error("Error loading user data:", error);
      }
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "rating" ? parseInt(value) : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !formData.name.trim() ||
      !formData.email.trim() ||
      !formData.title.trim() ||
      !formData.comment.trim()
    ) {
      alert("Please fill in all fields");
      return;
    }

    addReview(productName, {
      name: formData.name,
      email: formData.email,
      rating: formData.rating,
      title: formData.title,
      comment: formData.comment,
    });

    setFormData((prev) => ({
      ...prev,
      rating: 5,
      title: "",
      comment: "",
    }));
    setSubmitted(true);

    setTimeout(() => setSubmitted(false), 3000);

    if (onReviewAdded) {
      onReviewAdded();
    }
  };

  const isLoggedIn = !!formData.email;

  return (
    <div className="bg-white p-6 rounded-lg border border-slate-200 sticky top-32">
      <h3 className="text-2xl font-palanquin font-bold mb-6">Add Your Review</h3>

      {!isLoggedIn && (
        <div className="mb-4 p-3 bg-blue-100 text-blue-700 rounded-lg text-sm font-montserrat">
          💡 Sign in to your account to track your reviews on your profile.
        </div>
      )}

      {submitted && (
        <div className="mb-4 p-3 bg-green-100 text-green-700 rounded-lg font-montserrat">
          ✓ Thank you! Your review has been posted.
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold mb-2">Name *</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:border-coral-blue"
              placeholder="Your name"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold mb-2">Email *</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:border-coral-blue"
              placeholder="Your email"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold mb-2">Rating *</label>
          <div className="flex items-center gap-2">
            <select
              name="rating"
              value={formData.rating}
              onChange={handleChange}
              className="px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:border-coral-blue w-full"
            >
              <option value="1">⭐ 1 - Poor</option>
              <option value="2">⭐⭐ 2 - Fair</option>
              <option value="3">⭐⭐⭐ 3 - Good</option>
              <option value="4">⭐⭐⭐⭐ 4 - Very Good</option>
              <option value="5">⭐⭐⭐⭐⭐ 5 - Excellent</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold mb-2">
            Review Title *
          </label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:border-coral-blue"
            placeholder="e.g., Great quality and comfort"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold mb-2">Comment *</label>
          <textarea
            name="comment"
            value={formData.comment}
            onChange={handleChange}
            rows="5"
            className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:border-coral-blue resize-vertical"
            placeholder="Share your experience with this product..."
          ></textarea>
        </div>

        <button
          type="submit"
          className="w-full bg-coral-blue text-white font-semibold py-3 rounded-lg hover:bg-opacity-90 transition"
        >
          Post Review
        </button>
      </form>
    </div>
  );
};

export default ReviewForm;
