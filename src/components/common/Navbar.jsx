// ==========================================
// NAVBAR COMPONENT
// TP2 React - Student Project
// ==========================================

import React from 'react';
import { ShoppingBag, Heart, Search, Sparkles } from 'lucide-react';
import { useSelector, useDispatch } from 'react-redux'; // React-Redux hooks
import { openCart } from '../../redux/actions/cartActions'; // Redux action

// Props received from parent (App.jsx):
// - searchQuery: string
// - setSearchQuery: function to update search state
// - selectedCategory: string currently selected
// - setSelectedCategory: function to change active category
// - categories: array of category names
export const Navbar = ({
  searchQuery,
  setSearchQuery,
  selectedCategory,
  setSelectedCategory,
  categories,
}) => {
  // 1. Redux useDispatch hook to trigger actions
  const dispatch = useDispatch();

  // 2. Redux useSelector hook to read state from the store
  const cartItems = useSelector((state) => state.cart.cartItems);
  const favorites = useSelector((state) => state.cart.favorites);

  // Calculate total number of items in the cart
  const totalItems = cartItems.reduce((total, item) => total + item.quantity, 0);

  // 3. Event handler to open the shopping cart
  const handleOpenCart = () => {
    dispatch(openCart());
  };

  return (
    <header className="navbar-wrapper">
      <div className="navbar-container">
        {/* Brand / Logo */}
        <div className="navbar-brand">
          <div className="brand-logo-icon">
            <Sparkles size={20} className="brand-icon-svg" />
          </div>
          <span className="brand-name">
            DZELECTRO<span className="brand-accent">Store</span>
          </span>
        </div>

        {/* Search Input (Demonstrating Form Events & State) */}
        <div className="navbar-search">
          <Search size={18} className="search-icon" />
          <input
            type="text"
            placeholder="Search products, brands, accessories..."
            value={searchQuery}
            // Event: update state when user types
            onChange={(e) => setSearchQuery(e.target.value)}
            className="search-input"
          />
          {searchQuery && (
            <button
              className="search-clear-btn"
              // Event: clear search input on click
              onClick={() => setSearchQuery('')}
              aria-label="Clear search"
            >
              ✕
            </button>
          )}
        </div>

        {/* Action icons: Wishlist count & Cart button */}
        <div className="navbar-actions">
          {/* Wishlist badge showing total favorites from Redux store */}
          <div className="wishlist-btn" title="Saved favorites">
            <Heart size={20} />
            {favorites.length > 0 && (
              <span className="action-badge">{favorites.length}</span>
            )}
          </div>

          {/* Cart toggle button: dispatches openCart action */}
          <button
            className="cart-toggle-btn"
            onClick={handleOpenCart}
            aria-label="View Cart"
          >
            <ShoppingBag size={20} />
            <span className="cart-text">Cart</span>
            {totalItems > 0 && (
              <span className="cart-badge">{totalItems}</span>
            )}
          </button>
        </div>
      </div>

      {/* Category Navigation Bar */}
      <nav className="category-bar">
        <div className="category-scroll">
          {categories.map((cat) => (
            <button
              key={cat}
              className={`category-pill ${selectedCategory === cat ? 'active' : ''}`}
              // Event: click to set selected category state
              onClick={() => setSelectedCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>
      </nav>
    </header>
  );
};
