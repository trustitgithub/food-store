import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, X, User, Headphones, Home, LogOut } from "lucide-react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [showAccountMenu, setShowAccountMenu] = useState(false);
  const navigate = useNavigate();

  const userContact = JSON.parse(localStorage.getItem("userContact") || "{}");

  const handleLogout = () => {
    localStorage.removeItem("userContact");
    localStorage.removeItem("order");
    navigate("/");
  };

  return (
    <nav className="bg-white/95 backdrop-blur border-b border-border shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 font-bold text-xl text-primary hover:text-primary/90 transition-colors">
            <span className="text-2xl">🍽️</span>
            <span className="hidden sm:inline">FoodHub</span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-6">
            <Link
              to="/"
              className="flex items-center gap-2 text-foreground hover:text-primary transition-colors font-medium"
            >
              <Home className="w-4 h-4" />
              Home
            </Link>

            {/* Account Section */}
            <div className="relative">
              <button
                onClick={() => setShowAccountMenu(!showAccountMenu)}
                className="flex items-center gap-2 text-foreground hover:text-primary transition-colors font-medium px-3 py-2 rounded-lg hover:bg-muted"
              >
                <User className="w-4 h-4" />
                Account
              </button>

              {/* Account Dropdown */}
              {showAccountMenu && (
                <div className="absolute right-0 mt-2 w-56 bg-card rounded-lg shadow-xl border border-border overflow-hidden animate-scale-in">
                  <div className="p-4 border-b border-border bg-muted/30">
                    <p className="text-sm text-muted-foreground">Logged in as</p>
                    <p className="font-semibold text-foreground truncate">
                      {userContact.email || "Guest"}
                    </p>
                  </div>

                  <div className="p-2 space-y-1">
                    <Link
                      to="/orders"
                      onClick={() => setShowAccountMenu(false)}
                      className="flex items-center gap-3 px-4 py-3 text-foreground hover:bg-muted rounded-lg transition-colors font-medium"
                    >
                      <span className="text-lg">📋</span>
                      My Orders
                    </Link>

                    <button
                      onClick={() => {
                        setShowAccountMenu(false);
                        handleLogout();
                      }}
                      className="w-full flex items-center gap-3 px-4 py-3 text-red-600 hover:bg-red-50 rounded-lg transition-colors font-medium"
                    >
                      <LogOut className="w-4 h-4" />
                      Logout
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Service Section */}
            <div className="relative group">
              <button className="flex items-center gap-2 text-foreground hover:text-primary transition-colors font-medium px-3 py-2 rounded-lg hover:bg-muted">
                <Headphones className="w-4 h-4" />
                Service
              </button>

              {/* Service Dropdown */}
              <div className="absolute right-0 mt-2 w-56 bg-card rounded-lg shadow-xl border border-border overflow-hidden opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all animate-scale-in">
                <div className="p-2 space-y-1">
                  <a
                    href="#contact"
                    className="flex items-center gap-3 px-4 py-3 text-foreground hover:bg-muted rounded-lg transition-colors font-medium"
                  >
                    <span className="text-lg">📞</span>
                    Contact Us
                  </a>

                  <a
                    href="#help"
                    className="flex items-center gap-3 px-4 py-3 text-foreground hover:bg-muted rounded-lg transition-colors font-medium"
                  >
                    <span className="text-lg">❓</span>
                    Help & FAQs
                  </a>

                  <a
                    href="#delivery"
                    className="flex items-center gap-3 px-4 py-3 text-foreground hover:bg-muted rounded-lg transition-colors font-medium"
                  >
                    <span className="text-lg">🚚</span>
                    Delivery Info
                  </a>

                  <a
                    href="#refund"
                    className="flex items-center gap-3 px-4 py-3 text-foreground hover:bg-muted rounded-lg transition-colors font-medium"
                  >
                    <span className="text-lg">💳</span>
                    Refund Policy
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 hover:bg-muted rounded-lg transition-colors"
          >
            {isOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden pb-4 space-y-2 border-t border-border animate-scale-in">
            <Link
              to="/"
              onClick={() => setIsOpen(false)}
              className="block px-4 py-3 text-foreground hover:bg-muted rounded-lg transition-colors font-medium"
            >
              🏠 Home
            </Link>

            <Link
              to="/orders"
              onClick={() => setIsOpen(false)}
              className="block px-4 py-3 text-foreground hover:bg-muted rounded-lg transition-colors font-medium"
            >
              📋 My Orders
            </Link>

            <a
              href="#contact"
              onClick={() => setIsOpen(false)}
              className="block px-4 py-3 text-foreground hover:bg-muted rounded-lg transition-colors font-medium"
            >
              📞 Contact Us
            </a>

            <a
              href="#help"
              onClick={() => setIsOpen(false)}
              className="block px-4 py-3 text-foreground hover:bg-muted rounded-lg transition-colors font-medium"
            >
              ❓ Help & FAQs
            </a>

            <button
              onClick={() => {
                setIsOpen(false);
                handleLogout();
              }}
              className="w-full text-left px-4 py-3 text-red-600 hover:bg-red-50 rounded-lg transition-colors font-medium"
            >
              🚪 Logout
            </button>
          </div>
        )}
      </div>
    </nav>
  );
}
