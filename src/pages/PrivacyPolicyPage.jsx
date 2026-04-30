import { customer2 } from "../assets/images";

const PrivacyPolicyPage = () => {
  const sections = [
    {
      title: "Information we collect",
      body: "We may collect your name, email, shipping address, phone number, payment-related metadata, and usage analytics.",
    },
    {
      title: "How we use your data",
      body: "Your data is used to fulfill purchases, communicate updates, prevent fraud, and optimize platform performance.",
    },
    {
      title: "Data protection",
      body: "Solex applies encryption, secure payment processing, and internal access controls to keep your information protected.",
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
                Privacy Policy
              </h1>
              <p className="mt-6 text-slate-gray font-montserrat leading-8 max-w-3xl">
                Solex respects your privacy. We collect only the information needed to
                process orders, improve your shopping experience, and provide customer
                support.
              </p>
            </div>
            <img src={customer2} alt="Privacy support" className="h-44 w-full rounded-2xl object-cover" />
          </div>

          <div className="mt-8 grid gap-4">
            {sections.map((item) => (
              <div key={item.title} className="rounded-2xl border border-slate-200 bg-slate-50 p-6">
                <h2 className="text-2xl font-palanquin font-semibold">{item.title}</h2>
                <p className="mt-2 text-slate-gray font-montserrat leading-7">{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
};

export default PrivacyPolicyPage;
