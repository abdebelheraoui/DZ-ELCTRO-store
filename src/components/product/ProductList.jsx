// ==========================================
// PRODUCT LIST COMPONENT
// TP2 React - Student Project
// ==========================================

import React from 'react';
import { ProductCard } from './ProductCard';
import { PackageX } from 'lucide-react';

// Props:
// - products: array of product objects to render
// - onResetFilters: callback function to reset all active filters
export const ProductList = ({ products, onResetFilters }) => {
  // 1. Conditional Rendering: If no products match the search or category
  if (products.length === 0) {
    return (
      <div className="empty-catalog-state">
        <PackageX size={48} className="empty-icon" />
        <h3>No matching products found</h3>
        <p>Try adjusting your search criteria or filter categories.</p>
        {onResetFilters && (
          <button className="reset-filters-btn" onClick={onResetFilters}>
            Clear All Filters
          </button>
        )}
      </div>
    );
  }

  // 2. Render Product Cards using Array.prototype.map()
  return (
    <div className="product-grid">
      {products.map((product) => (
        // Passing individual product as prop to ProductCard
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};
