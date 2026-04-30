import { star } from "../assets/icons";

const ReviewCard = ({ imgURL, customerName, rating, feedback }) => {
  return (
    <article className='rounded-2xl border border-slate-200 bg-white p-6 shadow-sm'>
      <div className='flex items-center gap-4'>
      <img
        src={imgURL}
        alt='customer'
        className='rounded-full object-cover w-20 h-20'
      />
        <div>
          <h3 className='font-palanquin text-2xl font-bold text-primary'>
            {customerName}
          </h3>
          <div className='mt-2 flex items-center gap-2.5'>
        <img
          src={star}
          width={24}
          height={24}
          alt='rating star'
          className='object-contain m-0'
        />
            <p className='text-xl font-montserrat text-slate-gray'>({rating})</p>
          </div>
        </div>
      </div>
      <p className='mt-5 font-montserrat text-base leading-7 text-[#52525b]'>{feedback}</p>
    </article>
  );
};

export default ReviewCard;