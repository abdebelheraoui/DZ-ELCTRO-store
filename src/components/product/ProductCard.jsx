// ==========================================
// PRODUCT CARD COMPONENT
// TP2 React - Student Project
// ==========================================

import React, { useState } from 'react';
import { Star, ShoppingCart, Heart, Check } from 'lucide-react';
import { useSelector, useDispatch } from 'react-redux'; // React-Redux hooks
import { addToCart, toggleFavorite } from '../../redux/actions/cartActions'; // Redux actions
import { formatCurrency } from '../../utils/formatters';

// Props:
// - product: object containing product details { id, name, price, originalPrice, image, ... }
export const ProductCard = ({ product }) => {
  // 1. Redux Dispatch hook
  const dispatch = useDispatch();

  // 2. Read favorites from Redux store using useSelector
  const favorites = useSelector((state) => state.cart.favorites);

  // 3. Local Component State (useState)
  // Used for showing a temporary "Added" feedback message on the button
  const [isAddedRecently, setIsAddedRecently] = useState(false);

  // Check if current product is favorited
  const isFavorited = favorites.includes(product.id);

  // Calculate discount percentage if original price exists
  const discountPercent = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : null;

  // 4. Event Handler: Adding to cart
  const handleAddToCart = () => {
    // Dispatch Redux action
    dispatch(addToCart(product));

    // Show temporary "Added" feedback for 1.5 seconds
    setIsAddedRecently(true);
    setTimeout(() => {
      setIsAddedRecently(false);
    }, 1500);
  };

  // 5. Event Handler: Toggling wishlist favorite
  const handleToggleFavorite = () => {
    dispatch(toggleFavorite(product.id));
  };

  return (
    <article className="product-card">
      {/* Product Image and Badges */}
      <div className="product-media-container">
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          className="product-image"
        />

        {product.tag && <span className="product-badge">{product.tag}</span>}
        {discountPercent && (
          <span className="product-discount-badge">-{discountPercent}%</span>
        )}

        {/* Favorite Button (Event: onClick) */}
        <button
          className={`favorite-btn ${isFavorited ? 'active' : ''}`}
          onClick={handleToggleFavorite}
          aria-label={isFavorited ? 'Remove from favorites' : 'Add to favorites'}
        >
          <Heart size={18} fill={isFavorited ? 'currentColor' : 'none'} />
        </button>
      </div>

      {/* Product Information */}
      <div className="product-info">
        <span className="product-category">{product.category}</span>
        <h3 className="product-title" title={product.name}>
          {product.name}
        </h3>

        {/* Rating and Reviews */}
        <div className="product-rating">
          <Star size={14} className="star-icon" fill="currentColor" />
          <span className="rating-score">{product.rating}</span>
          <span className="rating-count">({product.reviewsCount})</span>
        </div>

        <p className="product-description">{product.description}</p>

        {/* Price and Add to Cart Action */}
        <div className="product-footer">
          <div className="price-container">
            <span className="current-price">{formatCurrency(product.price)}</span>
            {product.originalPrice && (
              <span className="original-price">{formatCurrency(product.originalPrice)}</span>
            )}
          </div>

          {/* Add To Cart Button (Event: onClick) */}
          <button
            className={`add-to-cart-btn ${isAddedRecently ? 'added' : ''}`}
            onClick={handleAddToCart}
            disabled={!product.inStock}
          >
            {isAddedRecently ? (
              <>
                <Check size={16} /> Added
              </>
            ) : (
              <>
                <ShoppingCart size={16} /> Add
              </>
            )}
          </button>
        </div>
      </div>
    </article>
  );
};
