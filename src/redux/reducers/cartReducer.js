// ==========================================
// REDUX REDUCER: CART & FAVORITES
// TP2 React - Student Project
// ==========================================

import {
  ADD_TO_CART,
  REMOVE_FROM_CART,
  UPDATE_QUANTITY,
  CLEAR_CART,
  OPEN_CART,
  CLOSE_CART,
  TOGGLE_FAVORITE,
} from '../actions/cartActions';

// Helper function to safely read from localStorage
const loadFromStorage = (key, fallback) => {
  try {
    const saved = localStorage.getItem(key);
    return saved ? JSON.parse(saved) : fallback;
  } catch (error) {
    console.log('Error reading from localStorage:', error);
    return fallback;
  }
};

// Helper function to safely write to localStorage
const saveToStorage = (key, value) => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.log('Error saving to localStorage:', error);
  }
};

// Initial state of our cart slice
const initialState = {
  cartItems: loadFromStorage('novastore_cart', []),
  favorites: loadFromStorage('novastore_favorites', []),
  isCartOpen: false,
};

// The Reducer is a pure function that takes (state, action) and returns new state
export const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    // 1. Adding an item to the shopping cart
    case ADD_TO_CART: {
      const product = action.payload;
      const existingItem = state.cartItems.find((item) => item.id === product.id);

      let updatedCart;
      if (existingItem) {
        // If product already in cart, increment its quantity by 1
        updatedCart = state.cartItems.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        // If it's a new product, add it with initial quantity of 1
        updatedCart = [...state.cartItems, { ...product, quantity: 1 }];
      }

      saveToStorage('novastore_cart', updatedCart);
      return {
        ...state,
        cartItems: updatedCart,
        isCartOpen: true, // Automatically open cart drawer to give user feedback
      };
    }

    // 2. Removing an item from the cart
    case REMOVE_FROM_CART: {
      const productId = action.payload;
      const updatedCart = state.cartItems.filter((item) => item.id !== productId);

      saveToStorage('novastore_cart', updatedCart);
      return {
        ...state,
        cartItems: updatedCart,
      };
    }

    // 3. Updating quantity (+1 or -1)
    case UPDATE_QUANTITY: {
      const { productId, amount } = action.payload;

      const updatedCart = state.cartItems
        .map((item) => {
          if (item.id === productId) {
            const nextQuantity = item.quantity + amount;
            // If quantity goes to 0 or below, we return null to filter it out
            return nextQuantity > 0 ? { ...item, quantity: nextQuantity } : null;
          }
          return item;
        })
        .filter(Boolean); // Remove null items

      saveToStorage('novastore_cart', updatedCart);
      return {
        ...state,
        cartItems: updatedCart,
      };
    }

    // 4. Clear all items from the cart
    case CLEAR_CART: {
      saveToStorage('novastore_cart', []);
      return {
        ...state,
        cartItems: [],
      };
    }

    // 5. Open drawer
    case OPEN_CART: {
      return {
        ...state,
        isCartOpen: true,
      };
    }

    // 6. Close drawer
    case CLOSE_CART: {
      return {
        ...state,
        isCartOpen: false,
      };
    }

    // 7. Toggle item in favorites list
    case TOGGLE_FAVORITE: {
      const productId = action.payload;
      const isAlreadyFav = state.favorites.includes(productId);

      let updatedFavorites;
      if (isAlreadyFav) {
        // Remove from favorites
        updatedFavorites = state.favorites.filter((id) => id !== productId);
      } else {
        // Add to favorites
        updatedFavorites = [...state.favorites, productId];
      }

      saveToStorage('novastore_favorites', updatedFavorites);
      return {
        ...state,
        favorites: updatedFavorites,
      };
    }

    // Default case: return current state unchanged
    default:
      return state;
  }
};
