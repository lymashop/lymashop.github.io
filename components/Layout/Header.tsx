
import React, { useState, useContext } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { ThemeContext } from '../../contexts/ThemeContext';
import { CartContext } from '../../contexts/CartContext';
import { navLinks } from '../../data/navLinks';
import { siteContent } from '../../data/siteContent';
import ThemeToggle from '../UI/ThemeToggle';
import { ShoppingCartIcon, MenuIcon, XMarkIcon } from '../UI/Icon';

const Header: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { theme } = useContext(ThemeContext);
  const { getItemCount } = useContext(CartContext);
  const cartItemCount = getItemCount();

  const activeLinkClass = theme === 'dark' ? 'text-primary-light font-semibold border-b-2 border-primary-light' : 'text-primary-darker font-semibold border-b-2 border-primary-darker';
  const inactiveLinkClass = 'text-gray-700 dark:text-gray-300 hover:text-primary-dark dark:hover:text-primary-light transition-colors duration-200';

  return (
    <header className="sticky top-0 z-40 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md shadow-sm">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="text-3xl font-bold font-serif text-primary-dark dark:text-primary-light">
            {siteContent.appName}
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8 items-center">
            {navLinks.map((link) => (
              <NavLink
                key={link.name}
                to={link.path}
                className={({ isActive }) => `${isActive ? activeLinkClass : inactiveLinkClass} py-2`}
              >
                {link.name}
              </NavLink>
            ))}
          </nav>

          {/* Right side icons */}
          <div className="flex items-center space-x-4">
            <ThemeToggle />
            <Link to="/cart" className="relative text-gray-600 dark:text-gray-300 hover:text-primary-dark dark:hover:text-primary-light transition-colors duration-200" aria-label="Voir le panier">
              <ShoppingCartIcon className="w-7 h-7" />
              {cartItemCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-accent-pink text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                  {cartItemCount}
                </span>
              )}
            </Link>
            <div className="md:hidden">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="text-gray-600 dark:text-gray-300 hover:text-primary-dark dark:hover:text-primary-light focus:outline-none"
                aria-label={isMobileMenuOpen ? "Fermer le menu" : "Ouvrir le menu"}
              >
                {isMobileMenuOpen ? <XMarkIcon className="w-7 h-7" /> : <MenuIcon className="w-7 h-7" />}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-20 left-0 right-0 bg-white dark:bg-slate-800 shadow-lg py-4 z-30 border-t border-gray-200 dark:border-slate-700">
          <nav className="flex flex-col space-y-4 px-6">
            {navLinks.map((link) => (
              <NavLink
                key={link.name}
                to={link.path}
                onClick={() => setIsMobileMenuOpen(false)}
                className={({ isActive }) => `${isActive ? activeLinkClass : inactiveLinkClass} py-2 text-lg`}
              >
                {link.name}
              </NavLink>
            ))}
             <div className="border-t border-gray-200 dark:border-slate-700 pt-4">
                <p className="text-sm text-gray-500 dark:text-gray-400">© {new Date().getFullYear()} Lyma Shop</p>
             </div>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
