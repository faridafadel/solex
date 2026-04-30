import { customer1, shoe8 } from "../assets/images";

const AboutPage = () => {
  return (
    <main className="padding-x pt-32 pb-16">
      <section className="max-container max-w-5xl">
        <div className="mb-8 grid gap-6 lg:grid-cols-[1.2fr_1fr]">
          <div className="rounded-3xl bg-gradient-to-r from-[#2b0a0d] to-[#5a1111] p-8 text-white">
            <p className="font-montserrat text-xs uppercase tracking-[0.2em] text-white/70">
              About Solex
            </p>
            <h1 className="mt-3 text-4xl font-palanquin font-bold leading-tight">
              Built for movement. Designed for everyday athletes.
            </h1>
            <p className="mt-4 font-montserrat text-white/85 leading-7">
              We build performance footwear and apparel with premium materials,
              modern design, and comfort engineered for daily wear.
            </p>
          </div>
          <div className="rounded-3xl border border-slate-200 bg-white p-4 shadow-sm">
            <img src={shoe8} alt="Solex showcase" className="h-full w-full rounded-2xl object-cover" />
          </div>
        </div>

        <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm sm:p-10">
          <p className="mt-6 text-slate-gray font-montserrat leading-8">
            Solex creates premium footwear and performance essentials for people
            who move with purpose. Our mission is simple: combine modern design,
            comfort-first engineering, and dependable quality in every product we
            release.
          </p>

          <p className="mt-4 text-slate-gray font-montserrat leading-8">
            From city commutes to high-intensity workouts, Solex products are
            tested for real life. We work closely with designers, runners,
            trainers, and creators to shape collections that perform under
            pressure while staying true to style.
          </p>

          <h2 className="text-2xl font-palanquin font-semibold mt-10">
            What we stand for
          </h2>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            {[
              "Performance and comfort in every step.",
              "Responsible materials and long-lasting product quality.",
              "Customer-first support from order to delivery.",
              "Inclusive design for all styles and skill levels.",
            ].map((item) => (
              <div key={item} className="rounded-2xl border border-slate-200 p-4 font-montserrat text-slate-gray">
                {item}
              </div>
            ))}
          </div>

          <div className="mt-8 rounded-2xl border border-slate-200 bg-slate-50 p-5">
            <div className="flex items-center gap-4">
              <img src={customer1} alt="Solex customer" className="h-14 w-14 rounded-full object-cover" />
              <div>
                <p className="font-montserrat text-sm font-semibold text-primary">
                  Trusted by athletes and creators
                </p>
                <p className="font-montserrat text-sm text-slate-gray">
                  More than 500K customers choose Solex for style and performance.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default AboutPage;
