
import ReviewCard from "../components/ReviewCard";
import { reviews } from "../constants";

const CustomerReviews = () => {
  return (
    <section className='max-container'>
      <h3 className='font-palanquin text-center text-4xl font-bold text-white'>
        What Our
        <span className='text-[#ffd4d4]'> Customers </span>
        Say?
      </h3>
      <p className='m-auto mt-4 max-w-2xl text-center font-montserrat text-lg leading-8 text-white/85'>
        Hear genuine stories from our satisfied customers about their
        exceptional experiences with us.
      </p>

      <div className='mt-14 grid grid-cols-1 gap-8 md:grid-cols-2'>
        {reviews.map((review, index) => (
          <ReviewCard
            key={index}
            imgURL={review.imgURL}
            customerName={review.customerName}
            rating={review.rating}
            feedback={review.feedback}
          />
        ))}
      </div>
    </section>
  );
};

export default CustomerReviews;