// ==========================================
// CART DRAWER COMPONENT
// TP2 React - Student Project
// ==========================================

import React from 'react';
import { X, Trash2, Plus, Minus, ArrowRight, ShoppingBag } from 'lucide-react';
import { useSelector, useDispatch } from 'react-redux'; // React-Redux hooks
import {
  closeCart,
  removeFromCart,
  updateQuantity,
  clearCart,
} from '../../redux/actions/cartActions'; // Redux action creators
import { formatCurrency } from '../../utils/formatters';

export const CartDrawer = () => {
  // 1. Redux Dispatch hook
  const dispatch = useDispatch();

  // 2. Read cart state from Redux store using useSelector
  const cartItems = useSelector((state) => state.cart.cartItems);
  const isCartOpen = useSelector((state) => state.cart.isCartOpen);

  // If the drawer is closed, don't render anything
  if (!isCartOpen) {
    return null;
  }

  // 3. Simple price calculations (Student logic)
  const totalItems = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const tax = subtotal * 0.08; // 8% sales tax
  const shipping = subtotal > 100 || subtotal === 0 ? 0 : 9.99; // Free shipping over $100
  const grandTotal = subtotal + tax + shipping;

  // 4. Event Handlers
  const handleClose = () => {
    dispatch(closeCart());
  };

  const handleRemove = (id) => {
    dispatch(removeFromCart(id));
  };

  const handleDecreaseQuantity = (id) => {
    dispatch(updateQuantity(id, -1));
  };

  const handleIncreaseQuantity = (id) => {
    dispatch(updateQuantity(id, 1));
  };

  const handleClearCart = () => {
    dispatch(clearCart());
  };

  const handleCheckout = () => {
    alert('Proceeding to checkout with ' + totalItems + ' items!');
  };

  return (
    <div className="cart-backdrop" onClick={handleClose}>
      <aside
        className="cart-drawer"
        onClick={(e) => e.stopPropagation()} // Prevent closing drawer when clicking inside
        aria-modal="true"
        role="dialog"
      >
        {/* Header */}
        <div className="cart-header">
          <div className="cart-header-title">
            <ShoppingBag size={20} />
            <h2>Your Cart</h2>
            <span className="cart-count-pill">{totalItems}</span>
          </div>
          <button
            className="cart-close-btn"
            onClick={handleClose}
            aria-label="Close cart"
          >
            <X size={20} />
          </button>
        </div>

        {/* Body: Check if cart is empty */}
        {cartItems.length === 0 ? (
          <div className="cart-empty">
            <div className="cart-empty-icon-wrap">
              <ShoppingBag size={42} />
            </div>
            <h3>Your cart is empty</h3>
            <p>Looks like you haven't added anything to your cart yet.</p>
            <button
              className="continue-shopping-btn"
              onClick={handleClose}
            >
              Start Shopping
            </button>
          </div>
        ) : (
          <>
            {/* List of Cart Items */}
            <div className="cart-items-list">
              {cartItems.map((item) => (
                <div key={item.id} className="cart-item">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="cart-item-image"
                  />
                  <div className="cart-item-details">
                    <div className="cart-item-top">
                      <h4 className="cart-item-title">{item.name}</h4>
                      {/* Button to remove item */}
                      <button
                        className="item-remove-btn"
                        onClick={() => handleRemove(item.id)}
                        title="Remove item"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>

                    <p className="cart-item-price">
                      {formatCurrency(item.price)}
                    </p>

                    <div className="cart-item-bottom">
                      {/* Quantity Controls */}
                      <div className="quantity-controls">
                        <button
                          className="qty-btn"
                          onClick={() => handleDecreaseQuantity(item.id)}
                          aria-label="Decrease quantity"
                        >
                          <Minus size={14} />
                        </button>
                        <span className="qty-value">{item.quantity}</span>
                        <button
                          className="qty-btn"
                          onClick={() => handleIncreaseQuantity(item.id)}
                          aria-label="Increase quantity"
                        >
                          <Plus size={14} />
                        </button>
                      </div>

                      {/* Line subtotal */}
                      <span className="cart-item-subtotal">
                        {formatCurrency(item.price * item.quantity)}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Cart Footer Summary */}
            <div className="cart-footer">
              <div className="cart-summary-rows">
                <div className="summary-row">
                  <span>Subtotal</span>
                  <span>{formatCurrency(subtotal)}</span>
                </div>
                <div className="summary-row">
                  <span>Shipping</span>
                  <span>{shipping === 0 ? 'FREE' : formatCurrency(shipping)}</span>
                </div>
                <div className="summary-row">
                  <span>Estimated Tax (8%)</span>
                  <span>{formatCurrency(tax)}</span>
                </div>
                <div className="summary-row total-row">
                  <span>Total</span>
                  <span className="total-amount">{formatCurrency(grandTotal)}</span>
                </div>
              </div>

              {shipping > 0 && (
                <p className="free-shipping-hint">
                  Add <strong>{formatCurrency(100 - subtotal)}</strong> more for FREE shipping!
                </p>
              )}

              {/* Checkout Button */}
              <button
                className="checkout-btn"
                onClick={handleCheckout}
              >
                <span>Checkout Now</span>
                <ArrowRight size={18} />
              </button>

              {/* Clear Cart Button */}
              <button className="clear-cart-btn" onClick={handleClearCart}>
                Clear Cart
              </button>
            </div>
          </>
        )}
      </aside>
    </div>
  );
};
