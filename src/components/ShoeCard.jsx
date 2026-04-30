
const ShoeCard = ({ imgURL, changeBigShoeImage, bigShoeImg }) => {
  const isActive = bigShoeImg === imgURL.bigShoe;

  return (
    <button
      type="button"
      onClick={() => changeBigShoeImage(imgURL.bigShoe)}
      className={`border-2 rounded-xl cursor-pointer max-sm:flex-1 ${
        isActive ? "border-black/40" : "border-transparent"
      }`}
    >
      <div className='relative flex h-28 w-28 items-center justify-center rounded-xl bg-gradient-to-b from-blue-200 to-teal-50 p-2'>
        <img src={imgURL.thumbnail} alt="shoe" width={127} height={103} className="object-contain" />
      </div>
    </button>
  );
}

export default ShoeCard