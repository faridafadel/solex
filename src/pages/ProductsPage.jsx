import { useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { products } from "../constants";
import PopularProductCard from "../components/PopularProductCard";
import { toProductSlug } from "../utils/product";
import { formatEGP } from "../utils/currency";

const ProductsPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [category, setCategory] = useState("All");
  const [size, setSize] = useState("All");
  const [gender, setGender] = useState("All");
  const [color, setColor] = useState("All");
  const [maxPrice, setMaxPrice] = useState(30000);
  const searchTerm = searchParams.get("search") || searchParams.get("product") || "";

  const categories = useMemo(
    () => ["All", ...new Set(products.map((product) => product.category))],
    []
  );
  const sizeOptions = useMemo(
    () => ["All", ...new Set(products.flatMap((product) => product.sizes || []))],
    []
  );
  const genderOptions = useMemo(
    () => ["All", ...new Set(products.map((product) => product.gender))],
    []
  );
  const colorOptions = useMemo(
    () => ["All", ...new Set(products.map((product) => product.color))],
    []
  );

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesSearch = product.name
        .toLowerCase()
        .includes(searchTerm.toLowerCase().trim());
      const matchesCategory =
        category === "All" || product.category === category;
      const matchesSize = size === "All" || (product.sizes || []).includes(size);
      const matchesGender = gender === "All" || product.gender === gender;
      const matchesColor = color === "All" || product.color === color;
      const matchesPrice = product.priceValue <= maxPrice;

      return (
        matchesSearch &&
        matchesCategory &&
        matchesSize &&
        matchesGender &&
        matchesColor &&
        matchesPrice
      );
    });
  }, [searchTerm, category, size, gender, color, maxPrice]);

  const activeFilterCount = [
    category !== "All",
    size !== "All",
    gender !== "All",
    color !== "All",
    maxPrice !== 30000,
  ].filter(Boolean).length;

  const chipClass = (isActive) =>
    `rounded-full border px-3 py-1.5 text-sm font-montserrat transition ${
      isActive
        ? "bg-coral-blue text-white border-coral-blue"
        : "bg-white text-slate-gray border-slate-300 hover:border-black hover:text-black"
    }`;

  const clearAllFilters = () => {
    setCategory("All");
    setSize("All");
    setGender("All");
    setColor("All");
    setMaxPrice(30000);
    setSearchParams({});
  };

  return (
    <main className="padding-x pt-32 pb-16">
      <section className="max-container">
        <header className="flex flex-col gap-2">
          <h1 className="text-4xl font-palanquin font-bold">
            All <span className="text-coral-blue">Products</span>
          </h1>
        </header>

        <div className="mt-8 grid lg:grid-cols-[300px_1fr] gap-8 items-start">
          <aside className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm lg:sticky lg:top-24">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-palanquin font-semibold">Filters</h2>
              <button
                type="button"
                onClick={clearAllFilters}
                className="text-sm font-montserrat text-coral-blue"
              >
                Reset
              </button>
            </div>
            <p className="mt-1 text-xs text-slate-gray font-montserrat">
              {activeFilterCount} active filters
            </p>

            <div className="mt-5">
              <label className="text-xs uppercase tracking-wide text-slate-gray font-montserrat">
                Search
              </label>
              <input
                type="text"
                value={searchTerm}
                onChange={(event) => {
                  const nextSearch = event.target.value;
                  if (nextSearch) {
                    setSearchParams({ search: nextSearch });
                    return;
                  }
                  setSearchParams({});
                }}
                placeholder="Search products"
                className="input border border-slate-300 rounded-full p-4 mt-2 bg-white"
              />
            </div>

            <div className="mt-6 rounded-xl border border-slate-200 p-4 bg-slate-50">
              <div className="flex items-center justify-between">
                <p className="text-xs uppercase tracking-wide text-slate-gray font-montserrat">
                  Price
                </p>
                <span className="text-sm font-montserrat font-semibold">
                  {formatEGP(maxPrice)}
                </span>
              </div>
              <input
                type="range"
                min={15000}
                max={30000}
                step={100}
                value={maxPrice}
                onChange={(event) => setMaxPrice(Number(event.target.value))}
                className="mt-3 w-full accent-coral-blue"
              />
            </div>

            <div className="mt-6 space-y-6">
              <div>
                <p className="text-xs uppercase tracking-wide text-slate-gray font-montserrat mb-2">
                  Category
                </p>
                <div className="flex flex-wrap gap-2">
                  {categories.map((item) => (
                    <button
                      key={item}
                      type="button"
                      onClick={() => setCategory(item)}
                      className={chipClass(category === item)}
                    >
                      {item}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <p className="text-xs uppercase tracking-wide text-slate-gray font-montserrat mb-2">
                  Size
                </p>
                <div className="flex flex-wrap gap-2">
                  {sizeOptions.map((item) => (
                    <button
                      key={item}
                      type="button"
                      onClick={() => setSize(item)}
                      className={chipClass(size === item)}
                    >
                      {item}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <p className="text-xs uppercase tracking-wide text-slate-gray font-montserrat mb-2">
                  Gender
                </p>
                <div className="flex flex-wrap gap-2">
                  {genderOptions.map((item) => (
                    <button
                      key={item}
                      type="button"
                      onClick={() => setGender(item)}
                      className={chipClass(gender === item)}
                    >
                      {item}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <p className="text-xs uppercase tracking-wide text-slate-gray font-montserrat mb-2">
                  Color
                </p>
                <div className="flex flex-wrap gap-2">
                  {colorOptions.map((item) => (
                    <button
                      key={item}
                      type="button"
                      onClick={() => setColor(item)}
                      className={chipClass(color === item)}
                    >
                      {item}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </aside>

          <div>
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 pb-4">
              <p className="font-montserrat text-slate-gray">
                Showing <span className="text-black font-semibold">{filteredProducts.length}</span> products
              </p>
              <div className="flex flex-wrap gap-2">
                {activeFilterCount > 0 && (
                  <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-montserrat text-slate-gray">
                    {activeFilterCount} filters applied
                  </span>
                )}
              </div>
            </div>

            <div className="mt-8 grid xl:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-6">
              {filteredProducts.map((product) => (
                <PopularProductCard
                  key={product.name}
                  {...product}
                  price={product.priceValue}
                  to={`/products/${toProductSlug(product.name)}`}
                />
              ))}
            </div>

            {filteredProducts.length === 0 && (
              <div className="mt-8 rounded-xl border border-slate-200 bg-slate-50 p-6">
                <p className="text-slate-gray font-montserrat">
                  No products match your current filters.
                </p>
                <button
                  type="button"
                  onClick={clearAllFilters}
                  className="mt-3 text-coral-blue font-montserrat font-semibold"
                >
                  Clear filters and show all
                </button>
              </div>
            )}
          </div>
        </div>
      </section>
    </main>
  );
};

export default ProductsPage;
