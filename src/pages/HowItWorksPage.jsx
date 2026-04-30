import { shoe6 } from "../assets/images";

const HowItWorksPage = () => {
  const steps = [
    {
      title: "1. Discover",
      text: "Browse products by category, compare styles, and filter by performance needs, fit, and price.",
    },
    {
      title: "2. Choose",
      text: "Open any product page to view details, ratings, and feature highlights before making your selection.",
    },
    {
      title: "3. Checkout",
      text: "Add your item, enter shipping details, and complete payment through our secure checkout flow.",
    },
    {
      title: "4. Receive",
      text: "Track delivery in real time and get support from the Solex team whenever you need assistance.",
    },
  ];

  return (
    <main className="padding-x pt-32 pb-16">
      <section className="max-container max-w-5xl">
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
          <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
            <div>
              <p className="text-slate-gray font-montserrat uppercase tracking-wide text-xs">Shopping Guide</p>
              <h1 className="text-4xl font-palanquin font-bold mt-2">How It Works</h1>
              <p className="mt-3 text-slate-gray font-montserrat">
                A clear checkout journey built for speed, trust, and convenience.
              </p>
            </div>
            <img src={shoe6} alt="How it works" className="h-44 w-full rounded-2xl object-cover" />
          </div>

          <div className="mt-8 grid gap-4">
            {steps.map((step) => (
              <div key={step.title} className="rounded-2xl border border-slate-200 bg-slate-50 p-6">
                <h2 className="text-2xl font-palanquin font-semibold">{step.title}</h2>
                <p className="mt-2 text-slate-gray font-montserrat leading-7">{step.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
};

export default HowItWorksPage;
