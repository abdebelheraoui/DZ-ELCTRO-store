// ==========================================
// FOOTER COMPONENT
// TP2 React - Student Project
// ==========================================

import React from 'react';
import { ShieldCheck, Truck, RefreshCw, Sparkles } from 'lucide-react';

const CURRENT_YEAR = new Date().getFullYear();

export const Footer = () => {
  return (
    <footer className="footer-wrapper">
      {/* Trust Badges */}
      <div className="trust-badges-container">
        <div className="trust-badge-item">
          <Truck size={24} className="trust-icon" />
          <div>
            <h4>Free Express Shipping</h4>
            <p>On all domestic orders over $100</p>
          </div>
        </div>
        <div className="trust-badge-item">
          <ShieldCheck size={24} className="trust-icon" />
          <div>
            <h4>Secure Payments</h4>
            <p>Encrypted 256-bit SSL transaction safety</p>
          </div>
        </div>
        <div className="trust-badge-item">
          <RefreshCw size={24} className="trust-icon" />
          <div>
            <h4>30-Day Hassle-Free Returns</h4>
            <p>Full refund guaranteed if unsatisfied</p>
          </div>
        </div>
      </div>

      {/* Footer Copyright and Info */}
      <div className="footer-bottom">
        <div className="footer-brand">
          <div className="brand-logo-icon small">
            <Sparkles size={16} />
          </div>
          <span className="brand-name small">
            DZELECTRO<span className="brand-accent">Store</span>
          </span>
          <p className="footer-tagline">Premium tech & modern lifestyle essentials delivered with care.</p>
        </div>
        <p className="copyright-text">
          &copy; {CURRENT_YEAR} DZELECTROStore. All rights reserved.
        </p>
      </div>
    </footer>
  );
};
