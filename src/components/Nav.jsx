import { useState } from 'react';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { headerLogo } from '../assets/images';
import { hamburger } from '../assets/icons';
import { navLinks } from '../constants/index';
import { useCart } from '../hooks/useCart';

const Nav = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(() => localStorage.getItem("solex-dark-mode") === "true");
  const { itemCount } = useCart();

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
        <nav className='flex justify-between items-center max-w-7xl mx-auto'>
          <Link to="/">
            <img src={headerLogo} alt="logo" className="w-32 h-auto" />
          </Link>
          <div className='lg:hidden'>
            <img
              src={hamburger}
              alt="menu"
              className="w-6 h-6 cursor-pointer"
              onClick={toggleMenu}
            />
          </div>
          <div
            className={`lg:hidden absolute top-16 z-10 right-0 mt-2 p-4 border border-gray-300 shadow-md ${
              menuOpen ? 'bg-white block' : 'hidden'
            }`}
          >
            <ul className="space-y-4">
              {navLinks.map((item) => (
                <li key={item.label}>
                  <Link
                    to={item.href}
                    onClick={() => setMenuOpen(false)}
                    className='text-lg text-gray-700 font-semibold hover:text-blue-600'
                  >
                    {item.label === "Cart" ? `🛒 Cart (${itemCount})` : item.label}
                  </Link>
                </li>
              ))}
            </ul>
            <button
              type="button"
              onClick={() => setDarkMode((current) => !current)}
              className="mt-4 w-full rounded-full border border-slate-300 px-4 py-2 text-sm font-montserrat"
            >
              {darkMode ? "Light Mode" : "Dark Mode"}
            </button>
          </div>
          <div className='hidden lg:block'>
            <ul className="flex space-x-8">
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
        </nav>
      </header>
    </>
  );
};

export default Nav;