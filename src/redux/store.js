// ==========================================
// REDUX STORE CONFIGURATION
// TP2 React - Student Project
// ==========================================

import { legacy_createStore as createStore } from 'redux';
import rootReducer from './reducers';

// Create the central Redux store containing the complete state tree
const store = createStore(
  rootReducer,
  // Enable Redux DevTools extension in browser if available
  typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION__
    ? window.__REDUX_DEVTOOLS_EXTENSION__()
    : undefined
);

export default store;
