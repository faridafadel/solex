import React, { createContext, useState, useEffect } from "react";

export const ReviewsContext = createContext();

export const ReviewsProvider = ({ children }) => {
  const [reviews, setReviews] = useState({});

  // Load reviews from localStorage on mount
  useEffect(() => {
    const storedReviews = localStorage.getItem("productReviews");
    if (storedReviews) {
      try {
        setReviews(JSON.parse(storedReviews));
      } catch (error) {
        console.error("Error loading reviews:", error);
      }
    }
  }, []);

  // Save reviews to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("productReviews", JSON.stringify(reviews));
  }, [reviews]);

  const addReview = (productName, review) => {
    setReviews((prevReviews) => {
      const productReviews = prevReviews[productName] || [];
      return {
        ...prevReviews,
        [productName]: [
          {
            id: Date.now(),
            ...review,
            timestamp: new Date().toISOString(),
          },
          ...productReviews,
        ],
      };
    });
  };

  const getProductReviews = (productName) => {
    return reviews[productName] || [];
  };

  const getUserReviews = (userEmail) => {
    const allReviews = [];
    Object.entries(reviews).forEach(([productName, productReviews]) => {
      const userProductReviews = productReviews
        .filter((review) => review.email === userEmail)
        .map((review) => ({ ...review, productName }));
      allReviews.push(...userProductReviews);
    });
    return allReviews.sort(
      (a, b) => new Date(b.timestamp) - new Date(a.timestamp)
    );
  };

  const deleteReview = (productName, reviewId) => {
    setReviews((prevReviews) => {
      const productReviews = prevReviews[productName] || [];
      return {
        ...prevReviews,
        [productName]: productReviews.filter((review) => review.id !== reviewId),
      };
    });
  };

  const getAverageRating = (productName) => {
    const productReviews = reviews[productName] || [];
    if (productReviews.length === 0) return 0;
    const sum = productReviews.reduce((acc, review) => acc + review.rating, 0);
    return (sum / productReviews.length).toFixed(1);
  };

  return (
    <ReviewsContext.Provider
      value={{
        reviews,
        addReview,
        getProductReviews,
        getUserReviews,
        deleteReview,
        getAverageRating,
      }}
    >
      {children}
    </ReviewsContext.Provider>
  );
};
