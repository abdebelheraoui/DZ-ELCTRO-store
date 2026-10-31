// ==========================================
// MAIN APP COMPONENT
// TP2 React - Student Project
// ==========================================

import React, { useState } from 'react';
import { Navbar } from './components/common/Navbar';
import { Footer } from './components/common/Footer';
import { ProductList } from './components/product/ProductList';
import { ProductFilter } from './components/product/ProductFilter';
import { CartDrawer } from './components/cart/CartDrawer';
import { CATEGORIES, INITIAL_PRODUCTS } from './data/products';

function App() {
  // ----------------------------------------------------
  // 1. STATE (useState Hook)
  // Local states to manage products, search, category, and sorting
  // ----------------------------------------------------
  const [products] = useState(INITIAL_PRODUCTS);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortBy, setSortBy] = useState('featured');

  // ----------------------------------------------------
  // 2. FILTER & SORT LOGIC (Simple student-style JS)
  // ----------------------------------------------------
  
  // Step A: Filter by category if not 'All'
  let displayedProducts = products.filter((product) => {
    if (selectedCategory === 'All') {
      return true;
    }
    return product.category.toLowerCase() === selectedCategory.toLowerCase();
  });

  // Step B: Filter by search query if user typed something
  if (searchQuery.trim() !== '') {
    const query = searchQuery.toLowerCase().trim();
    displayedProducts = displayedProducts.filter((product) => {
      return (
        product.name.toLowerCase().includes(query) ||
        product.description.toLowerCase().includes(query) ||
        product.category.toLowerCase().includes(query)
      );
    });
  }

  // Step C: Sort products according to the selected option
  if (sortBy === 'price-asc') {
    displayedProducts.sort((a, b) => a.price - b.price);
  } else if (sortBy === 'price-desc') {
    displayedProducts.sort((a, b) => b.price - a.price);
  } else if (sortBy === 'rating') {
    displayedProducts.sort((a, b) => b.rating - a.rating);
  }

  // ----------------------------------------------------
  // 3. EVENT HANDLER: Reset all filters
  // ----------------------------------------------------
  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedCategory('All');
    setSortBy('featured');
  };

  // ----------------------------------------------------
  // 4. RENDER (JSX)
  // Passing props down to child components
  // ----------------------------------------------------
  return (
    <div className="app-layout">
      {/* Navigation bar with search and category props */}
      <Navbar
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        categories={CATEGORIES}
      />

      {/* Hero Promo Section */}
      <section className="hero-banner">
        <div className="hero-card">
          <span className="hero-pill">New Season 2026 Collection</span>
          <h1 className="hero-title">Discover Premium Tech & Modern Lifestyle Essentials</h1>
          <p className="hero-description">
            Experience handpicked aesthetics, cutting-edge audio gear, and everyday premium accessories with free express shipping.
          </p>
        </div>
      </section>

      {/* Main Catalog View */}
      <main className="catalog-main">
        {/* Filter component: receives sort value, setter function, and count as props */}
        <ProductFilter
          sortBy={sortBy}
          setSortBy={setSortBy}
          totalCount={displayedProducts.length}
        />

        {/* Product list component: receives filtered products array and reset callback as props */}
        <ProductList
          products={displayedProducts}
          onResetFilters={handleResetFilters}
        />
      </main>

      {/* Shopping cart drawer modal (managed with Redux) */}
      <CartDrawer />

      {/* Footer component */}
      <Footer />
    </div>
  );
}

export default App;
