// ==========================================
// REDUX ACTIONS: CART & FAVORITES
// TP2 React - Student Project
// ==========================================

// Action Types (Constants to prevent spelling errors)
export const ADD_TO_CART = 'ADD_TO_CART';
export const REMOVE_FROM_CART = 'REMOVE_FROM_CART';
export const UPDATE_QUANTITY = 'UPDATE_QUANTITY';
export const CLEAR_CART = 'CLEAR_CART';
export const OPEN_CART = 'OPEN_CART';
export const CLOSE_CART = 'CLOSE_CART';
export const TOGGLE_FAVORITE = 'TOGGLE_FAVORITE';

// Action Creator: Add a product to the cart
export const addToCart = (product) => {
  return {
    type: ADD_TO_CART,
    payload: product,
  };
};

// Action Creator: Remove an item from the cart by its id
export const removeFromCart = (productId) => {
  return {
    type: REMOVE_FROM_CART,
    payload: productId,
  };
};

// Action Creator: Increase or decrease item quantity (+1 or -1)
export const updateQuantity = (productId, amount) => {
  return {
    type: UPDATE_QUANTITY,
    payload: { productId, amount },
  };
};

// Action Creator: Empty the entire cart
export const clearCart = () => {
  return {
    type: CLEAR_CART,
  };
};

// Action Creator: Open the shopping cart drawer
export const openCart = () => {
  return {
    type: OPEN_CART,
  };
};

// Action Creator: Close the shopping cart drawer
export const closeCart = () => {
  return {
    type: CLOSE_CART,
  };
};

// Action Creator: Add/remove product id from favorites wishlist
export const toggleFavorite = (productId) => {
  return {
    type: TOGGLE_FAVORITE,
    payload: productId,
  };
};
