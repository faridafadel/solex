import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../hooks/useCart";
import { formatEGP } from "../utils/currency";

const initialForm = {
  fullName: "",
  email: "",
  phone: "",
  address: "",
  city: "",
  paymentMethod: "cash",
};

const CheckoutPage = () => {
  const navigate = useNavigate();
  const { cartItems, subtotal, shipping, total, itemCount, clearCart } = useCart();
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validate = () => {
    const nextErrors = {};
    if (!form.fullName.trim()) nextErrors.fullName = "Full name is required.";
    if (!form.email.trim()) nextErrors.email = "Email is required.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      nextErrors.email = "Enter a valid email address.";
    }
    if (!form.phone.trim()) nextErrors.phone = "Phone number is required.";
    if (!form.address.trim()) nextErrors.address = "Address is required.";
    if (!form.city.trim()) nextErrors.city = "City is required.";
    if (!form.paymentMethod) nextErrors.paymentMethod = "Please select a payment method.";
    return nextErrors;
  };

  const submitOrder = async () => {
    await new Promise((resolve) => setTimeout(resolve, 900));
    if (!navigator.onLine) {
      throw new Error("Unable to place order while offline.");
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (isSubmitting) return;
    setErrors({});
    const nextErrors = validate();
    if (Object.keys(nextErrors).length) {
      setErrors(nextErrors);
      return;
    }

    setIsSubmitting(true);
    try {
      await submitOrder();
      clearCart();
      setForm(initialForm);
      setShowConfirmation(true);
    } catch (error) {
      setErrors((current) => ({
        ...current,
        submit: error.message || "Order submission failed. Please try again.",
      }));
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!cartItems.length) {
    return (
      <main className="padding-x pt-32 pb-16">
        <section className="max-container">
          <h1 className="text-4xl font-palanquin font-bold">Checkout</h1>
          <p className="mt-4 text-slate-gray font-montserrat">
            Your cart is empty. Add products before checkout.
          </p>
          <Link to="/products" className="inline-block mt-5 text-coral-blue font-semibold">
            Back to products
          </Link>
        </section>
      </main>
    );
  }

  return (
    <main className="padding-x pt-32 pb-16">
      <section className="max-container grid lg:grid-cols-[2fr_1fr] gap-8">
        <form onSubmit={handleSubmit} noValidate className="border border-slate-200 rounded-2xl bg-white p-6 shadow-sm space-y-4">
          <h1 className="text-3xl font-palanquin font-bold">Checkout</h1>

          {[
            { key: "fullName", label: "Full Name", type: "text" },
            { key: "email", label: "Email", type: "email" },
            { key: "phone", label: "Phone", type: "text" },
            { key: "address", label: "Address", type: "text" },
            { key: "city", label: "City", type: "text" },
          ].map((field) => (
            <div key={field.key}>
              <input
                type={field.type}
                placeholder={field.label}
                value={form[field.key]}
                onChange={(event) =>
                  setForm((current) => ({ ...current, [field.key]: event.target.value }))
                }
                className="input border border-slate-300 rounded-full p-4 w-full"
              />
              {errors[field.key] && (
                <p className="mt-1 text-sm text-red-600">{errors[field.key]}</p>
              )}
            </div>
          ))}

          <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
            <p className="font-montserrat text-sm font-semibold text-primary">
              Payment Method
            </p>
            <label className="mt-3 inline-flex items-center gap-2 rounded-full border border-slate-300 bg-white px-4 py-2 font-montserrat text-sm">
              <input
                type="radio"
                name="paymentMethod"
                checked={form.paymentMethod === "cash"}
                onChange={() =>
                  setForm((current) => ({ ...current, paymentMethod: "cash" }))
                }
              />
              Cash on Delivery
            </label>
            {errors.paymentMethod && (
              <p className="mt-2 text-sm text-red-600">{errors.paymentMethod}</p>
            )}
          </div>

          <button
            type="submit"
            className="w-full py-3 rounded-full bg-coral-blue text-white font-montserrat"
          >
            {isSubmitting ? "Placing order..." : "Place Order"}
          </button>

          {errors.submit && <p className="text-sm text-red-600">{errors.submit}</p>}
        </form>

        <aside className="border border-slate-200 rounded-2xl bg-white p-6 h-fit shadow-sm">
          <h2 className="text-2xl font-palanquin font-semibold">Order Details</h2>
          <div className="mt-4 space-y-2 text-slate-gray font-montserrat">
            <div className="flex justify-between">
              <span>Items</span>
              <span>{itemCount}</span>
            </div>
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
        </aside>
      </section>

      {showConfirmation && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4">
          <div className="w-full max-w-md rounded-2xl bg-white p-6 text-center shadow-2xl">
            <h3 className="font-palanquin text-3xl font-bold">Order Confirmed</h3>
            <p className="mt-3 font-montserrat text-slate-gray">
              Thank you! Your order has been received and is now being processed.
            </p>
            <button
              type="button"
              onClick={() => {
                setShowConfirmation(false);
                navigate("/products");
              }}
              className="mt-6 w-full rounded-full bg-coral-blue py-3 font-montserrat text-white"
            >
              Continue Shopping
            </button>
          </div>
        </div>
      )}
    </main>
  );
};

export default CheckoutPage;
