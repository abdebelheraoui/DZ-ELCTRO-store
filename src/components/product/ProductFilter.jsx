// ==========================================
// PRODUCT FILTER COMPONENT
// TP2 React - Student Project
// ==========================================

import React from 'react';
import { SlidersHorizontal } from 'lucide-react';

// Props:
// - sortBy: current sorting criteria ('featured', 'price-asc', etc.)
// - setSortBy: function to update sorting state in parent App.jsx
// - totalCount: number of filtered products currently found
export const ProductFilter = ({ sortBy, setSortBy, totalCount }) => {
  return (
    <div className="filter-controls-bar">
      {/* Product count display */}
      <div className="filter-count">
        <span className="count-number">{totalCount}</span>
        <span className="count-label">
          {totalCount === 1 ? 'Product found' : 'Products found'}
        </span>
      </div>

      {/* Sorting Select Dropdown (Event: onChange) */}
      <div className="filter-sort-wrapper">
        <label htmlFor="sort-select" className="sort-label">
          <SlidersHorizontal size={14} /> Sort By:
        </label>
        <select
          id="sort-select"
          className="sort-select"
          value={sortBy}
          // Event: calls setSortBy whenever user changes option
          onChange={(e) => setSortBy(e.target.value)}
        >
          <option value="featured">Featured</option>
          <option value="price-asc">Price: Low to High</option>
          <option value="price-desc">Price: High to Low</option>
          <option value="rating">Highest Rated</option>
        </select>
      </div>
    </div>
  );
};
