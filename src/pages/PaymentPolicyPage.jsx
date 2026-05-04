import { paymentpolicy } from "../assets/images";

const PaymentPolicyPage = () => {
  const items = [
    {
      title: "Accepted payment methods",
      body: "Currently, Solex exclusively accepts cash payments. While we focus on traditional payment methods for now, we are continuously evaluating digital options to enhance your shopping experience in the future.",
    },
    {
      title: "Payment security",
      body: "All transactions are encrypted and processed through secure gateways. Solex does not store full card details on its servers.",
    },
    {
      title: "Billing and charges",
      body: "Charges are applied at checkout. Prices may include taxes depending on your region. Delivery fees are shown before payment confirmation.",
    },
    {
      title: "Refunds",
      body: "Eligible refunds are issued to the original payment method after item inspection. Processing times may vary by provider.",
    },
  ];

  return (
    <main className="padding-x pt-32 pb-16">
      <section className="max-container max-w-5xl">
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
          <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
            <div>
              <p className="text-slate-gray font-montserrat uppercase tracking-wide text-xs">Legal</p>
              <h1 className="text-4xl font-palanquin font-bold mt-2">
                Payment Policy
              </h1>
              <p className="mt-3 text-slate-gray font-montserrat">
                Transparent pricing and secure transactions across all Solex orders.
              </p>
            </div>
            <img src={paymentpolicy} alt="Payment policy" className="h-44 w-full rounded-2xl object-cover" />
          </div>

          <div className="mt-8 grid gap-4">
            {items.map((item) => (
              <article key={item.title} className="rounded-2xl border border-slate-200 bg-slate-50 p-6">
                <h2 className="text-2xl font-palanquin font-semibold">{item.title}</h2>
                <p className="mt-2 text-slate-gray font-montserrat leading-7">{item.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
};

export default PaymentPolicyPage;
