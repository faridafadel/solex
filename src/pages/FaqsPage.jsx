import { shoe4 } from "../assets/images";

const FaqsPage = () => {
  const faqs = [
    {
      q: "How long does shipping take?",
      a: "Standard shipping usually takes 2-5 business days depending on your location. Express shipping is available at checkout.",
    },
    {
      q: "Can I return or exchange my order?",
      a: "Yes. Unworn items can be returned or exchanged within 30 days of delivery. Products must be in original condition and packaging.",
    },
    {
      q: "How do I track my order?",
      a: "After your order ships, we send a tracking link by email. You can also use your account order history page to check delivery status.",
    },
    {
      q: "Which payment options are accepted?",
      a: "Solex accepts major credit/debit cards, mobile money in supported regions, and secure wallet checkout options.",
    },
  ];

  return (
    <main className="padding-x pt-32 pb-16">
      <section className="max-container max-w-5xl">
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
          <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
            <div>
              <p className="text-slate-gray font-montserrat uppercase tracking-wide text-xs">Support</p>
              <h1 className="text-4xl font-palanquin font-bold mt-2">FAQs</h1>
              <p className="mt-3 text-slate-gray font-montserrat">
                Quick answers to the most common questions from Solex customers.
              </p>
            </div>
            <img src={shoe4} alt="FAQ shoes" className="h-44 w-full rounded-2xl object-cover" />
          </div>

          <div className="mt-8 grid gap-4">
            {faqs.map((item) => (
              <div key={item.q} className="rounded-2xl border border-slate-200 p-5">
                <h2 className="text-xl font-palanquin font-semibold">{item.q}</h2>
                <p className="mt-2 text-slate-gray font-montserrat leading-7">{item.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
};

export default FaqsPage;
