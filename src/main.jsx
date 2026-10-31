// ==========================================
// APPLICATION ENTRY POINT
// TP2 React - Student Project
// ==========================================

import React, { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux'; // React-Redux Provider to connect Redux with React
import store from './redux/store'; // Central Redux Store
import './index.css';
import App from './App.jsx';

// Render the root component wrapped inside Redux Provider
createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* React-Redux: The Provider makes the store available to all child components */}
    <Provider store={store}>
      <App />
    </Provider>
  </StrictMode>
);
