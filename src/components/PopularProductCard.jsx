import { star } from "../assets/icons"
import { Link } from "react-router-dom"
import { formatEGP } from "../utils/currency"

const PopularProductCard = ({
  imgURL,
  name,
  price,
  rating = 4.5,
  to,
  showActions = false,
  onAddToCart,
  onBuyNow,
}) => {
  const displayPrice = typeof price === "number" ? formatEGP(price) : price

  const cardDetails = (
    <>
      <div className="bg-linear-to-l from-teal-100 to-slate-300 rounded">
        <img src={imgURL} alt={name} className="w-70 h-70 object-contain" />
      </div>
      <div className="mt-8 flex flex-col justify-start gap-2.5">
        <div className="flex items-center gap-2">
          <img src={star} alt="rating" width={24} height={24} />
          <p className="font-montserrat text-xl leading-normal text-slate-gray">({rating})</p>
        </div>
        <h3 className="mt-1 text-2xl leading-normal font-semibold font-palanquin">{name}</h3>
        <p className="mt-1 font-semibold font-montserrat text-coral-blue text-2xl leading-normal">{displayPrice}</p>
      </div>
    </>
  )

  const content = (
    <div className="flex justify-center items-center flex-1 flex-col w-full max-sm:w-full">
      {to ? <Link to={to}>{cardDetails}</Link> : cardDetails}
      {showActions && (
        <div className="mt-4 flex w-full gap-3">
          <button
            type="button"
            onClick={onAddToCart}
            className="flex-1 rounded-full border border-slate-300 py-2 font-montserrat"
          >
            Add to cart
          </button>
          <button
            type="button"
            onClick={onBuyNow}
            className="flex-1 rounded-full bg-coral-blue py-2 text-white font-montserrat"
          >
            Buy now
          </button>
        </div>
      )}
    </div>
  )

  return <>
    {content}
  </>
}

export default PopularProductCard