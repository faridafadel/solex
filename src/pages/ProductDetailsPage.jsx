import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { products } from "../constants";
import { useCart } from "../hooks/useCart";
import { formatEGP } from "../utils/currency";
import { toProductSlug } from "../utils/product";
import ReviewsSection from "../components/ReviewsSection";
import ReviewForm from "../components/ReviewForm";

const ProductDetailsPage = () => {
  const navigate = useNavigate();
  const { productSlug } = useParams();
  const { addToCart, addToWishlist, wishlistItems } = useCart();
  const product = products.find((item) => toProductSlug(item.name) === productSlug);
  const [selectedSize, setSelectedSize] = useState("36");
  const [quantity, setQuantity] = useState(1);
  const isWishlisted = wishlistItems.some((item) => item.name === product?.name);

  if (!product) {
    return (
      <main className="padding-x pt-32 pb-16">
        <section className="max-container">
          <h1 className="text-4xl font-palanquin font-bold">Product not found</h1>
          <p className="mt-3 text-slate-gray font-montserrat">
            The product you are looking for does not exist.
          </p>
          <Link to="/products" className="inline-block mt-6 text-coral-blue font-semibold">
            Back to products
          </Link>
        </section>
      </main>
    );
  }

  const addConfiguredProductToCart = () => {
    addToCart(
      {
        ...product,
        name: `${product.name} (${selectedSize})`,
        priceValue: product.priceValue,
      },
      quantity
    );
  };

  return (
    <main className="padding-x pt-32 pb-16">
      <section className="max-container grid lg:grid-cols-2 gap-12 items-start">
        <div className="bg-linear-to-l from-teal-100 to-slate-300 rounded-xl p-6">
          <img src={product.imgURL} alt={product.name} className="w-full max-h-[450px] object-contain" />
        </div>

        <div>
          <h1 className="mt-2 text-4xl font-palanquin font-bold">{product.name}</h1>
          <div className="mt-5 space-y-1 text-slate-gray font-montserrat">
            <p><span className="font-semibold">Vendor:</span> {product.vendor}</p>
            <p><span className="font-semibold">Type:</span> {product.type}</p>
            <p><span className="font-semibold">Availability:</span> {product.availability}</p>
            <p><span className="font-semibold">SKU:</span> {product.sku}</p>
          </div>

          <div className="mt-5">
            <>
              <p className="text-slate-gray font-montserrat text-sm">Price</p>
              <p className="text-coral-blue text-3xl font-semibold font-montserrat">
                {formatEGP(product.priceValue)}
              </p>
            </>
          </div>

          <div className="mt-6">
            <p className="font-montserrat font-semibold">size: {selectedSize}</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {product.sizes.map((size) => (
                <button
                  key={size}
                  type="button"
                  onClick={() => setSelectedSize(size)}
                  className={`px-4 py-2 rounded border font-montserrat ${
                    selectedSize === size
                      ? "bg-black text-white border-black"
                      : "border-slate-300"
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          <p className="mt-5 font-montserrat"><span className="font-semibold">color:</span> {product.color}</p>
          <p className="mt-2 font-montserrat"><span className="font-semibold">Gender:</span> {product.gender}</p>

          <div className="mt-5">
            <p className="font-montserrat font-semibold">Quantity</p>
            <div className="mt-2 flex items-center gap-3">
              <button
                type="button"
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                className="w-8 h-8 rounded-full border border-slate-300"
              >
                -
              </button>
              <span className="font-montserrat">{quantity}</span>
              <button
                type="button"
                onClick={() => setQuantity((q) => q + 1)}
                className="w-8 h-8 rounded-full border border-slate-300"
              >
                +
              </button>
            </div>
          </div>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <button
              type="button"
              onClick={addConfiguredProductToCart}
              className="px-7 py-3 rounded-full bg-black text-white font-montserrat"
            >
              Add to Cart
            </button>
            <button
              type="button"
              onClick={() => {
                addConfiguredProductToCart();
                navigate("/checkout");
              }}
              className="px-7 py-3 rounded-full bg-coral-blue text-white font-montserrat"
            >
              Buy it now
            </button>
            <button
              type="button"
              onClick={() => addToWishlist(product)}
              className="px-7 py-3 rounded-full border border-slate-300 font-montserrat"
            >
              {isWishlisted ? "❤️ Saved" : "♡ Add to Wishlist"}
            </button>
            <Link
              to="/#contact-us"
              className="px-7 py-3 rounded-full border border-slate-gray text-slate-gray font-montserrat"
            >
              Need help? Chat with us
            </Link>
            <Link
              to="/products"
              className="px-7 py-3 rounded-full border border-slate-gray text-slate-gray font-montserrat"
            >
              Back to Products
            </Link>
          </div>
        </div>
      </section>

      <section className="max-container mt-16">
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <ReviewsSection
              productName={product.name}
              initialRating={product.rating}
              initialReviewsCount={product.reviewsCount}
            />
          </div>
          <div>
            <ReviewForm productName={product.name} />
          </div>
        </div>
      </section>
    </main>
  );
};

export default ProductDetailsPage;
