import { Link } from "react-router-dom";
import { useCart } from "../hooks/useCart";
import { formatEGP } from "../utils/currency";

const CartPage = () => {
  const { cartItems, subtotal, shipping, total, updateQuantity, removeFromCart } =
    useCart();

  return (
    <main className="padding-x pt-32 pb-16">
      <section className="max-container">
        <h1 className="text-4xl font-palanquin font-bold">Your Cart</h1>

        {cartItems.length === 0 ? (
          <div className="mt-8">
            <p className="text-slate-gray font-montserrat">
              Your cart is empty. Add some products to continue.
            </p>
            <Link to="/products" className="inline-block mt-5 text-coral-blue font-semibold">
              Browse products
            </Link>
          </div>
        ) : (
          <div className="mt-10 grid lg:grid-cols-[2fr_1fr] gap-8">
            <div className="space-y-4">
              {cartItems.map((item) => (
                <div
                  key={item.name}
                  className="border border-slate-200 rounded-xl p-4 flex gap-4 items-center"
                >
                  <img src={item.imgURL} alt={item.name} className="w-24 h-24 object-contain bg-slate-100 rounded" />
                  <div className="flex-1">
                    <h2 className="font-palanquin text-xl font-semibold">{item.name}</h2>
                    <p className="text-slate-gray font-montserrat">{formatEGP(item.priceValue)}</p>
                    <div className="mt-3 flex items-center gap-3">
                      <button
                        type="button"
                        onClick={() => updateQuantity(item.name, item.quantity - 1)}
                        className="w-8 h-8 rounded-full border border-slate-300"
                      >
                        -
                      </button>
                      <span className="font-montserrat">{item.quantity}</span>
                      <button
                        type="button"
                        onClick={() => updateQuantity(item.name, item.quantity + 1)}
                        className="w-8 h-8 rounded-full border border-slate-300"
                      >
                        +
                      </button>
                      <button
                        type="button"
                        onClick={() => removeFromCart(item.name)}
                        className="ml-4 text-red-600 font-montserrat text-sm"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <aside className="border border-slate-200 rounded-xl p-6 h-fit">
              <h3 className="text-2xl font-palanquin font-semibold">Order Summary</h3>
              <div className="mt-4 space-y-2 font-montserrat text-slate-gray">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>{formatEGP(subtotal)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span>{formatEGP(shipping)}</span>
                </div>
                <div className="flex justify-between border-t border-slate-200 pt-3 text-black font-semibold">
                  <span>Total</span>
                  <span>{formatEGP(total)}</span>
                </div>
              </div>

              <Link
                to="/checkout"
                className="mt-6 block text-center py-3 rounded-full bg-coral-blue text-white font-montserrat"
              >
                Proceed to Checkout
              </Link>
            </aside>
          </div>
        )}
      </section>
    </main>
  );
};

export default CartPage;
