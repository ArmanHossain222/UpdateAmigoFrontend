import { useState, useEffect } from "react";
import { 
  Menu, 
  X, 
  Search, 
  Home,
  Store,
  Sparkles,
  ShoppingCart,
  Info,
  LogOut,
  Phone,
  User
} from "lucide-react";
import logo from "../assets/amigo.jpg"

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const [token, setToken] = useState(localStorage.getItem('token'));
  

  useEffect(() => {
    // Get cart count from localStorage
    if(token) {
      setIsLoggedIn(true);
    }
    const updateCartCount = () => {
      const cart = JSON.parse(localStorage.getItem('cart') || '[]');
      setCartCount(cart.length);
    };

    // Initial cart count
    updateCartCount();

    // Listen for storage changes
    window.addEventListener('storage', updateCartCount);

    return () => {
      window.removeEventListener('storage', updateCartCount);
    };
  }, [cartCount]);

  const navLinks = [
    { name: "Home", href: "/", icon: Home },
    { name: "Products", href: "/products", icon: Store },
    { name: "New Arrivals", href: "/new-arrivals", icon: Sparkles },
    { name: "About", href: "/about", icon: Info },
    { name: "Contact", href: "/contact", icon: Phone },
  ];

  const handleLogout = () => {
    setIsLoggedIn(false);
    setIsUserMenuOpen(false);
    localStorage.removeItem('token');
    // refresh page
    window.location.reload();
  };

  return (
    <nav className="bg-white border-b border-gray-200 fixed top-0 w-full z-50 shadow-sm">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo Section */}
          <div className="flex-shrink-0">
            <a href="/" className="flex items-center">
              <div className="w-24 h-24 relative">
                <img
                  src={logo}
                  alt="Logo"
                  className="w-full h-full object-contain"
                />
              </div>
            </a>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            {navLinks.map((link) => {
              const IconComponent = link.icon;
              return (
                <a
                  key={link.name}
                  href={link.href}
                  className="flex items-center space-x-2 text-gray-700 hover:text-blue-600 transition-colors duration-200 group"
                >
                  <div className="p-1.5 rounded-lg group-hover:bg-blue-50 transition-colors duration-200">
                    <IconComponent className="w-5 h-5 group-hover:text-blue-600" />
                  </div>
                  <span className="text-sm font-medium">{link.name}</span>
                </a>
              );
            })}
          </div>

          {/* Right Section */}
          <div className="hidden md:flex items-center space-x-4">
            <button
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className="p-2 hover:bg-blue-50 rounded-lg transition-colors duration-200 hover:text-blue-600"
            >
              <Search className="w-5 h-5" />
            </button>

            <a
              href="/cart"
              className="p-2 hover:bg-blue-50 rounded-lg transition-colors duration-200 hover:text-blue-600 relative"
            >
              <ShoppingCart className="w-5 h-5" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-blue-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </a>

            <div className="h-6 w-px bg-gray-200" />

            <div className="relative">
              <button
                onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                className="p-2 hover:bg-blue-50 rounded-lg transition-colors duration-200 hover:text-blue-600"
              >
                <User className="w-5 h-5" />
              </button>

              {/* User Dropdown Menu */}
              {isUserMenuOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2 border border-gray-200">
                  {isLoggedIn ? (
                    <button
                      onClick={handleLogout}
                      className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 flex items-center space-x-2"
                    >
                      <LogOut className="w-4 h-4" />
                      <span>Logout</span>
                    </button>
                  ) : (
                    <>
                      <a
                        href="/login"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600"
                      >
                        Login
                      </a>
                      <a
                        href="/register"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600"
                      >
                        Sign Up
                      </a>
                    </>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center space-x-3">
            <button
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className="p-2 hover:bg-blue-50 rounded-lg hover:text-blue-600 transition-colors duration-200"
            >
              <Search className="w-5 h-5" />
            </button>
            <a
              href="/cart"
              className="p-2 hover:bg-blue-50 rounded-lg transition-colors duration-200 hover:text-blue-600 relative"
            >
              <ShoppingCart className="w-5 h-5" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-blue-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </a>
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 hover:bg-blue-50 rounded-lg hover:text-blue-600 transition-colors duration-200"
            >
              {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Search Bar */}
        {isSearchOpen && (
          <div className="absolute left-0 right-0 bg-white border-t border-b border-gray-200 py-3 px-4 shadow-lg">
            <div className="relative max-w-2xl mx-auto">
              <input
                type="text"
                className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-colors duration-200 text-sm"
                placeholder="Search for products..."
              />
              <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                <Search className="w-4 h-4 text-gray-400" />
              </div>
            </div>
          </div>
        )}

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden absolute left-0 right-0 top-full bg-white border-t border-gray-200 shadow-lg">
            <div className="px-4 py-4 space-y-3">
              {navLinks.map((link) => {
                const IconComponent = link.icon;
                return (
                  <a
                    key={link.name}
                    href={link.href}
                    className="flex items-center space-x-3 text-gray-700 hover:text-blue-600 transition-colors duration-200 py-2"
                  >
                    <IconComponent className="w-5 h-5" />
                    <span className="text-sm font-medium">{link.name}</span>
                  </a>
                );
              })}
              <div className="border-t border-gray-200 my-3" />
              {isLoggedIn ? (
                <button
                  onClick={handleLogout}
                  className="flex items-center space-x-2 w-full px-4 py-2 text-sm font-medium rounded-lg text-gray-700 hover:text-blue-600 hover:bg-blue-50 transition-colors duration-200"
                >
                  <LogOut className="w-5 h-5" />
                  <span>Logout</span>
                </button>
              ) : (
                <div className="space-y-3">
                  <a
                    href="/login"
                    className="block text-center px-4 py-2 rounded-lg text-gray-700 hover:text-blue-600 hover:bg-blue-50 transition-colors duration-200 text-sm font-medium"
                  >
                    Login
                  </a>
                  <a
                    href="/register"
                    className="block text-center px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors duration-200 text-sm font-medium shadow-sm"
                  >
                    Sign Up
                  </a>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;