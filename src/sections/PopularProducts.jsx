import { useMemo, useRef } from 'react'
import PopularProductCard from '../components/PopularProductCard'
import { products } from '../constants/index'
import { Link } from 'react-router-dom'
import { toProductSlug } from '../utils/product'

const PopularProducts = () => {
  const carouselRef = useRef(null)
  const popularProducts = useMemo(() => {
    return [...products]
      .sort((a, b) => (b.rating || 0) - (a.rating || 0))
      .slice(0, 8)
  }, [])

  const scrollCarousel = (direction) => {
    if (!carouselRef.current) return
    const amount = direction === 'next' ? 320 : -320
    carouselRef.current.scrollBy({ left: amount, behavior: 'smooth' })
  }

  return <>
    <div className="max-container max-sm:mt-12" id="products">
      <div className="flex flex-col justify-start gap-5">
        <h2 className='text-4xl font-palanquin'>Our Popular <span className="text-coral-blue">Products</span></h2>
        <p className=' lg:max-w-lg text-slate-gray mt-2 font-montserrat'>
          Explore top-quality products meticulously crafted to elevate your athletic performance and enhance your personal style.
        </p>
      </div>

      <div className='mt-10 flex items-center justify-end gap-3'>
        <button
          type='button'
          onClick={() => scrollCarousel('prev')}
          className='px-4 py-2 rounded-full border border-slate-300 font-montserrat'
          aria-label='Previous popular product'
        >
          ←
        </button>
        <button
          type='button'
          onClick={() => scrollCarousel('next')}
          className='px-4 py-2 rounded-full border border-slate-300 font-montserrat'
          aria-label='Next popular product'
        >
          →
        </button>
      </div>

      <div ref={carouselRef} className="mt-6 flex gap-6 overflow-x-auto scroll-smooth snap-x snap-mandatory pb-2">
          {popularProducts.map((product) => (
            <div key={product.name} className='min-w-[260px] sm:min-w-[290px] snap-start'>
              <PopularProductCard
                {...product}
                price={product.priceValue}
                to={`/products/${toProductSlug(product.name)}`}
              />
            </div>
          ))}
      </div>

      <div className='mt-8'>
        <Link to="/products" className='text-coral-blue font-semibold font-montserrat'>
          View full product page
        </Link>
      </div>
    </div>
  </>
}

export default PopularProducts