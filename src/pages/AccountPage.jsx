import { Link } from "react-router-dom";
import { formatEGP } from "../utils/currency";

const AccountPage = () => {
  const savedUser = localStorage.getItem("solex-user");
  const user = savedUser
    ? JSON.parse(savedUser)
    : { fullName: "Guest User", email: "guest@solex.com" };

  const orders = [
    { id: "SLX-10021", date: "2026-04-12", total: 12999, status: "Delivered" },
    { id: "SLX-10098", date: "2026-04-18", total: 8999, status: "Shipped" },
    { id: "SLX-10130", date: "2026-04-27", total: 15499, status: "Processing" },
  ];

  return (
    <main className="padding-x pt-32 pb-16">
      <section className="max-container grid gap-6 lg:grid-cols-[280px_1fr]">
        <aside className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <p className="font-montserrat text-sm text-slate-gray">Account</p>
          <h1 className="mt-1 font-palanquin text-3xl font-bold">{user.fullName}</h1>
          <p className="mt-1 font-montserrat text-sm text-slate-gray">{user.email}</p>
          <div className="mt-6 space-y-2 text-sm font-montserrat">
            <p className="rounded-lg bg-slate-100 px-3 py-2">Your Orders</p>
          </div>
        </aside>

        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <h2 className="font-palanquin text-2xl font-semibold">Past Orders</h2>
            <Link to="/products" className="text-sm font-montserrat font-semibold text-coral-blue">
              Continue shopping
            </Link>
          </div>

          <div className="mt-5 overflow-x-auto">
            <table className="w-full min-w-[560px] border-separate border-spacing-y-3">
              <thead>
                <tr className="text-left text-xs uppercase tracking-wide text-slate-gray">
                  <th className="font-montserrat">Order</th>
                  <th className="font-montserrat">Date</th>
                  <th className="font-montserrat">Total</th>
                  <th className="font-montserrat">Status</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr key={order.id} className="rounded-xl bg-slate-50">
                    <td className="rounded-l-xl px-4 py-3 font-montserrat font-semibold">{order.id}</td>
                    <td className="px-4 py-3 font-montserrat text-slate-gray">{order.date}</td>
                    <td className="px-4 py-3 font-montserrat text-slate-gray">{formatEGP(order.total)}</td>
                    <td className="rounded-r-xl px-4 py-3">
                      <span className="rounded-full bg-coral-blue/10 px-3 py-1 text-xs font-montserrat text-coral-blue">
                        {order.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </main>
  );
};

export default AccountPage;
