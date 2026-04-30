import { useState } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../hooks/useCart";
import { formatEGP } from "../utils/currency";

const ProfilePage = () => {
  const storedUser = localStorage.getItem("solex-user");
  const parsedUser = storedUser
    ? JSON.parse(storedUser)
    : { fullName: "Solex Member", email: "member@solex.com", phone: "" };

  const [profile, setProfile] = useState(parsedUser);
  const [saved, setSaved] = useState(false);
  const { wishlistItems } = useCart();

  const fakeOrders = [
    { id: "SLX-10422", date: "2026-04-20", total: 12200, status: "Delivered" },
    { id: "SLX-10491", date: "2026-04-28", total: 8400, status: "Shipped" },
  ];

  const saveProfile = () => {
    localStorage.setItem("solex-user", JSON.stringify(profile));
    setSaved(true);
    setTimeout(() => setSaved(false), 1500);
  };

  return (
    <main className="padding-x pt-32 pb-16">
      <section className="max-container grid gap-6 lg:grid-cols-[320px_1fr]">
        <aside className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h1 className="font-palanquin text-3xl font-bold">Profile</h1>
          <p className="mt-1 font-montserrat text-sm text-slate-gray">
            Manage your details and saved items.
          </p>

          <div className="mt-6 space-y-3">
            <input
              value={profile.fullName || ""}
              onChange={(event) =>
                setProfile((current) => ({ ...current, fullName: event.target.value }))
              }
              placeholder="Full name"
              className="w-full rounded-full border border-slate-300 px-4 py-3 font-montserrat"
            />
            <input
              value={profile.email || ""}
              onChange={(event) =>
                setProfile((current) => ({ ...current, email: event.target.value }))
              }
              placeholder="Email"
              className="w-full rounded-full border border-slate-300 px-4 py-3 font-montserrat"
            />
            <input
              value={profile.phone || ""}
              onChange={(event) =>
                setProfile((current) => ({ ...current, phone: event.target.value }))
              }
              placeholder="Phone"
              className="w-full rounded-full border border-slate-300 px-4 py-3 font-montserrat"
            />
            <button
              type="button"
              onClick={saveProfile}
              className="w-full rounded-full bg-coral-blue py-3 font-montserrat text-white"
            >
              Save Profile
            </button>
            {saved && <p className="text-center text-sm text-green-600">Profile saved</p>}
          </div>
        </aside>

        <div className="space-y-6">
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="font-palanquin text-2xl font-semibold">My Orders</h2>
            <div className="mt-4 space-y-3">
              {fakeOrders.map((order) => (
                <div key={order.id} className="rounded-xl bg-slate-50 p-4">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <p className="font-montserrat font-semibold">{order.id}</p>
                    <span className="rounded-full bg-coral-blue/10 px-3 py-1 text-xs font-montserrat text-coral-blue">
                      {order.status}
                    </span>
                  </div>
                  <p className="mt-1 font-montserrat text-sm text-slate-gray">
                    {order.date} - {formatEGP(order.total)}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <h2 className="font-palanquin text-2xl font-semibold">Saved Items</h2>
              <Link to="/products" className="text-sm font-montserrat font-semibold text-coral-blue">
                Browse products
              </Link>
            </div>
            {wishlistItems.length === 0 ? (
              <p className="mt-4 font-montserrat text-slate-gray">
                No saved items yet. Tap the wishlist button on a product page.
              </p>
            ) : (
              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                {wishlistItems.map((item) => (
                  <div key={item.name} className="rounded-xl bg-slate-50 p-4">
                    <p className="font-montserrat font-semibold">{item.name}</p>
                    <p className="mt-1 text-sm font-montserrat text-slate-gray">
                      {formatEGP(item.priceValue)}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>
    </main>
  );
};

export default ProfilePage;
