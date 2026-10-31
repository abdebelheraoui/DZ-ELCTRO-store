// ==========================================
// UTILITY FUNCTIONS: FORMATTERS
// TP2 React - Student Project
// ==========================================

// Format a number as currency (USD default)
export const formatCurrency = (amount, currency = 'USD') => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
  }).format(amount);
};

// Truncate long strings with ellipsis if needed
export const truncateText = (text, maxLength = 80) => {
  if (!text) return '';
  if (text.length > maxLength) {
    return text.substring(0, maxLength) + '...';
  }
  return text;
};
