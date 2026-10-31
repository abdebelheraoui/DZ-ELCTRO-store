// ==========================================
// ROOT REDUCER (Combining Reducers)
// TP2 React - Student Project
// ==========================================

import { combineReducers } from 'redux';
import { cartReducer } from './cartReducer';

// Combine all slice reducers into a single root reducer
const rootReducer = combineReducers({
  cart: cartReducer, // Cart and wishlist state accessible via state.cart
});

export default rootReducer;
