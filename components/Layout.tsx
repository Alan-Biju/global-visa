
import React, { useEffect, useState } from 'react';
import { NavLink, Outlet, Link } from 'react-router-dom';
import { Globe, Menu, X, Moon, Sun } from 'lucide-react';

const Layout: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const toggleTheme = () => setIsDark(!isDark);

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'Query', path: '/query' },
    { name: 'Service', path: '/service' },
  ];

  const whatsappHref = `https://wa.me/919845057744?text=${encodeURIComponent(
    'Hi FlyConnect, I would like to enquire about visa services.'
  )}`;

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-900 transition-colors duration-300">
      {/* Navigation Bar */}
      <nav className="sticky top-0 z-50 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2 group">
              <div className="bg-indigo-600 p-2 rounded-lg group-hover:bg-indigo-500 transition-colors shadow-lg shadow-indigo-500/20">
                <Globe className="h-6 w-6 text-white" />
              </div>
              <span className="font-black text-2xl text-slate-800 dark:text-white tracking-tighter">Flyconnect</span>
            </Link>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center space-x-8">
              {navItems.map((item) => (
                <NavLink
                  key={item.name}
                  to={item.path}
                  className={({ isActive }) =>
                    `text-sm font-bold tracking-tight transition-colors duration-200 uppercase ${
                      isActive
                        ? 'text-indigo-600 dark:text-indigo-400'
                        : 'text-slate-500 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400'
                    }`
                  }
                >
                  {item.name}
                </NavLink>
              ))}
              
              {/* Theme Toggle */}
              <button 
                onClick={toggleTheme}
                className="p-2 rounded-full text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                aria-label="Toggle Dark Mode"
              >
                {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
              </button>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center gap-4">
              <button 
                onClick={toggleTheme}
                className="p-2 rounded-full text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              >
                {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
              </button>
              <button
                onClick={toggleMenu}
                className="text-slate-600 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 focus:outline-none"
              >
                {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Nav */}
        {isMenuOpen && (
          <div className="md:hidden bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              {navItems.map((item) => (
                <NavLink
                  key={item.name}
                  to={item.path}
                  onClick={() => setIsMenuOpen(false)}
                  className={({ isActive }) =>
                    `block px-3 py-2 rounded-md text-base font-bold ${
                      isActive
                        ? 'bg-indigo-50 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300'
                        : 'text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-indigo-600 dark:hover:text-indigo-400'
                    }`
                  }
                >
                  {item.name}
                </NavLink>
              ))}
            </div>
          </div>
        )}
      </nav>

      {/* Main Content */}
      <main className="flex-grow">
        <Outlet />
      </main>

      <a
        href={whatsappHref}
        target="_blank"
        rel="noopener"
        className="fixed bottom-6 right-6 z-50 inline-flex items-center justify-center h-14 w-14 rounded-full bg-[#25D366] hover:bg-[#1ebe5d] text-white shadow-xl transition-all hover:-translate-y-0.5 active:translate-y-0 focus:outline-none focus:ring-4 focus:ring-[#25D366]/30"
        aria-label="WhatsApp"
      >
        <svg
          viewBox="0 0 32 32"
          className="h-7 w-7"
          fill="currentColor"
          aria-hidden="true"
        >
          <path d="M19.11 17.2c-.28-.14-1.63-.8-1.88-.9-.25-.09-.43-.14-.61.14-.18.28-.7.9-.86 1.08-.16.18-.31.21-.59.07-.28-.14-1.16-.43-2.2-1.36-.81-.72-1.36-1.61-1.52-1.89-.16-.28-.02-.43.12-.57.12-.12.28-.31.42-.47.14-.16.18-.28.28-.47.09-.18.05-.35-.02-.49-.07-.14-.61-1.47-.84-2.02-.22-.53-.44-.46-.61-.47-.16-.01-.35-.01-.53-.01-.18 0-.49.07-.74.35-.25.28-.97.95-.97 2.32s.99 2.69 1.13 2.88c.14.18 1.95 2.98 4.72 4.18.66.29 1.17.46 1.57.59.66.21 1.26.18 1.74.11.53-.08 1.63-.66 1.86-1.3.23-.64.23-1.19.16-1.3-.07-.11-.25-.18-.53-.32z" />
          <path d="M26.67 5.33A14.53 14.53 0 0 0 16.03 1C8.01 1 1.5 7.51 1.5 15.53c0 2.56.67 5.06 1.94 7.27L1.5 31l8.44-1.9a14.47 14.47 0 0 0 6.09 1.34h.01c8.02 0 14.53-6.51 14.53-14.53 0-3.88-1.51-7.53-4.9-10.58zM16.03 28.1h-.01c-2.06 0-4.08-.55-5.85-1.6l-.42-.25-5.01 1.13 1.06-4.88-.27-.5a12.55 12.55 0 0 1-1.69-6.32C3.84 8.77 9.12 3.49 16.03 3.49c3.35 0 6.5 1.31 8.87 3.68a12.44 12.44 0 0 1 3.68 8.84c0 6.91-5.28 12.09-12.55 12.09z" />
        </svg>
      </a>

      {/* Footer */}
      <footer className="bg-slate-950 text-slate-300 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-5">
              <div className="flex items-center gap-3">
                <div className="bg-indigo-600 p-2.5 rounded-xl shadow-lg shadow-indigo-500/20">
                  <Globe className="h-6 w-6 text-white" />
                </div>
                <div>
                  <p className="text-white font-black text-2xl tracking-tighter leading-none">FlyConnect</p>
                  <p className="text-xs font-bold tracking-widest uppercase text-slate-400">Bangalore</p>
                </div>
              </div>
              <p className="mt-4 text-sm text-slate-400 leading-relaxed max-w-md">
                Direct enquiry support for visa documentation and travel requirements.
              </p>
            </div>

            <div className="lg:col-span-7">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="rounded-2xl border border-slate-800 bg-slate-900/20 p-6">
                  <p className="text-xs font-black uppercase tracking-widest text-slate-400">Email</p>
                  <a
                    href="mailto:Info@FlyConnect.co.in"
                    className="mt-2 block font-black text-white hover:text-indigo-300 transition-colors break-words"
                  >
                    Info@FlyConnect.co.in
                  </a>
                </div>

                <div className="rounded-2xl border border-slate-800 bg-slate-900/20 p-6">
                  <p className="text-xs font-black uppercase tracking-widest text-slate-400">Phone</p>
                  <a
                    href="tel:+919845057744"
                    className="mt-2 block font-black text-white hover:text-emerald-300 transition-colors"
                  >
                    98450 57744
                  </a>
                </div>

                <div className="sm:col-span-2 rounded-2xl border border-slate-800 bg-slate-900/20 p-6">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                    <div>
                      <p className="text-xs font-black uppercase tracking-widest text-slate-400">Address</p>
                      <p className="mt-2 font-bold text-slate-200 leading-relaxed">
                        No 65, Cock Burn Road, Shivaji Nagar Bangalore 560051
                      </p>
                    </div>
                    <a
                      href="https://www.google.com/maps/search/?api=1&query=No%2065%2C%20Cock%20Burn%20Road%2C%20Shivaji%20Nagar%2C%20Bangalore%20560051"
                      target="_blank"
                      rel="noopener"
                      className="shrink-0 inline-flex items-center justify-center px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-black transition-colors"
                    >
                      Get Directions
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3">
            <p className="text-xs font-bold text-slate-500">
              © {new Date().getFullYear()} FlyConnect. All rights reserved.
            </p>
            <p className="text-xs font-bold text-slate-500">
              Open: Mon-Sat
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
