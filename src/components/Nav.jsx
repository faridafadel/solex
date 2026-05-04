import { useState } from 'react';
import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { headerLogo } from '../assets/images';
import { hamburger } from '../assets/icons';
import { navLinks } from '../constants/index';
import { useCart } from '../hooks/useCart';

const SearchIcon = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <circle cx="11" cy="11" r="7" />
    <path d="M20 20l-3.2-3.2" />
  </svg>
);

const NavSearch = ({ onSubmit, className = '' }) => (
  <form onSubmit={onSubmit} className={className}>
    <label className="group relative block">
      <SearchIcon className="pointer-events-none absolute left-3 top-1/2 z-[1] h-[15px] w-[15px] -translate-y-1/2 text-slate-400 transition-colors duration-200 group-focus-within:text-coral-blue dark:text-slate-500 dark:group-focus-within:text-coral-blue/90" />
      <input
        name="search"
        type="search"
        autoComplete="off"
        placeholder="Search products"
        aria-label="Search products"
        className="h-9 w-full rounded-lg border border-slate-200/95 bg-white py-0 pl-9 pr-3 font-montserrat text-sm font-normal text-slate-800 antialiased shadow-[0_1px_2px_rgba(15,23,42,0.05)] outline-none transition-[border-color,box-shadow] duration-200 ease-out placeholder:text-slate-400 hover:border-slate-300 hover:shadow-[0_2px_4px_rgba(15,23,42,0.06)] focus:border-coral-blue focus:shadow-[0_0_0_3px_rgba(139,0,0,0.1)] dark:border-slate-600 dark:bg-[#141418] dark:text-slate-100 dark:shadow-none dark:placeholder:text-slate-500 dark:hover:border-slate-500 dark:focus:border-coral-blue dark:focus:shadow-[0_0_0_3px_rgba(139,0,0,0.22)]"
      />
    </label>
  </form>
);

const Nav = () => {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(() => localStorage.getItem("solex-dark-mode") === "true");
  const { itemCount } = useCart();

  const handleSearch = (event) => {
    event.preventDefault();
    const q = new FormData(event.currentTarget).get('search')?.toString().trim() ?? '';
    setMenuOpen(false);
    if (q) navigate(`/products?search=${encodeURIComponent(q)}`);
    else navigate('/products');
  };

  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
    document.body.classList.toggle("theme-dark", darkMode);
    localStorage.setItem("solex-dark-mode", darkMode ? "true" : "false");
  }, [darkMode]);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <>
      <header className='padding-x py-8 absolute z-50 w-full'>
        <nav className='mx-auto flex max-w-7xl items-center justify-between gap-4'>
          <div className="flex min-w-0 flex-1 items-center gap-4 lg:gap-6 lg:flex-initial">
            <Link
              to="/"
              className="shrink-0 rounded-md outline-none ring-coral-blue/40 transition-opacity hover:opacity-90 focus-visible:ring-2"
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            >
              <img src={headerLogo} alt="Solex — go to home" className="w-32 h-auto" />
            </Link>
            <NavSearch
              onSubmit={handleSearch}
              className="hidden min-w-0 max-w-[11rem] flex-1 lg:block xl:max-w-[13rem]"
            />
          </div>

          <div className="relative flex shrink-0 items-center gap-2 lg:gap-4">
            <div className='lg:hidden'>
              <img
                src={hamburger}
                alt="menu"
                className="w-6 h-6 cursor-pointer"
                onClick={toggleMenu}
              />
            </div>
            <div
              className={`lg:hidden absolute right-0 top-full z-10 mt-2 w-72 max-w-[calc(100vw-2rem)] rounded-lg border border-gray-200 bg-white p-4 shadow-lg dark:border-slate-600 dark:bg-slate-900 ${
                menuOpen ? 'block' : 'hidden'
              }`}
            >
              <NavSearch onSubmit={handleSearch} className="mb-4" />
              <ul className="space-y-4">
                {navLinks.map((item) => (
                  <li key={item.label}>
                    <Link
                      to={item.href}
                      onClick={() => setMenuOpen(false)}
                      className='text-lg text-gray-700 font-semibold hover:text-blue-600 dark:text-gray-200'
                    >
                      {item.label === "Cart" ? `🛒 Cart (${itemCount})` : item.label}
                    </Link>
                  </li>
                ))}
              </ul>
              <button
                type="button"
                onClick={() => setDarkMode((current) => !current)}
                className="mt-4 w-full rounded-full border border-slate-300 px-4 py-2 text-sm font-montserrat dark:border-slate-600"
              >
                {darkMode ? "Light Mode" : "Dark Mode"}
              </button>
            </div>
            <div className='hidden lg:block'>
              <ul className="flex items-center gap-x-6 xl:gap-x-8">
                {navLinks.map((item) => (
                  <li key={item.label}>
                    <Link
                      to={item.href}
                      className='text-lg text-gray-700 font-semibold hover:text-blue-600'
                    >
                      {item.label === "Cart" ? `🛒 Cart (${itemCount})` : item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <button
              type="button"
              onClick={() => setDarkMode((current) => !current)}
              className="hidden lg:inline-flex rounded-full border border-slate-300 px-4 py-2 text-sm font-montserrat"
            >
              {darkMode ? "Light Mode" : "Dark Mode"}
            </button>
          </div>
        </nav>
      </header>
    </>
  );
};

export default Nav;
