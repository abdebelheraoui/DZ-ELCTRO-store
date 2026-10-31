# TP2 React & Redux - NovaStore E-Commerce Application

**Course:** Practical Work 2 (TP2) - React & State Management  
**Student Project**  
**Technology Stack:** React 19, Redux, React-Redux, Vite, Vanilla CSS  

---

## 1. Project Description

**NovaStore** is a responsive e-commerce web application built using **React** and **Redux**.  
It allows users to:
- Browse a catalog of modern tech and lifestyle products.
- Filter products dynamically by category (All, Electronics, Audio, Accessories, Wearables).
- Search products in real time using the search bar (filtering by title, description, or category).
- Sort items by price (low-to-high, high-to-low), rating, or featured order.
- Add and remove items from a shopping cart with live quantity adjustment.
- Add products to a favorites wishlist.
- View real-time calculations of item count, subtotal, tax (8%), shipping, and total.
- Maintain cart items and favorites even after refreshing the page (saved to `localStorage`).

The code is organized with clear student-level logic, simple JavaScript functions, and detailed comments explaining each part of the application.

---

## 2. Demonstration of React & Redux Principles

This project was built specifically to demonstrate the core principles of React and Redux:

### 1. React Components
The user interface is broken down into small, modular, and reusable functional components located in `src/components/`:
- **`App`** (`src/App.jsx`): The top-level root component orchestrating the layout and local state.
- **`Navbar`** (`src/components/common/Navbar.jsx`): The header containing brand logo, search input, wishlist counter, cart button, and category pills.
- **`ProductFilter`** (`src/components/product/ProductFilter.jsx`): Displays the number of products found and the sort dropdown.
- **`ProductList`** (`src/components/product/ProductList.jsx`): Maps through products and renders `ProductCard` components, or displays an empty state if no products match.
- **`ProductCard`** (`src/components/product/ProductCard.jsx`): Displays an individual product with its image, badge, rating, description, price, wishlist toggle, and "Add to Cart" button.
- **`CartDrawer`** (`src/components/cart/CartDrawer.jsx`): A slide-out shopping cart sidebar showing selected items, quantities, subtotal, tax, shipping, and checkout.
- **`Footer`** (`src/components/common/Footer.jsx`): Displays trust badges and copyright information.

---

### 2. JSX (JavaScript XML)
JSX is used across all components to describe what the UI should look like. It allows writing HTML-like markup directly inside JavaScript files with embedded expressions:
- **Dynamic values inside curly braces `{}`**:
  - `{product.name}`, `{formatCurrency(product.price)}`, `{totalItems}`
- **Conditional rendering**:
  - Empty cart message: `{cartItems.length === 0 ? <CartEmpty /> : <CartList />}`
  - Temporary button state: `{isAddedRecently ? <>Added</> : <>Add</>}`
  - Free shipping indicator: `{shipping === 0 ? 'FREE' : formatCurrency(shipping)}`
- **List rendering**:
  - Mapping through items with unique `key` props:
    ```jsx
    {products.map((product) => (
      <ProductCard key={product.id} product={product} />
    ))}
    ```

---

### 3. Props
Props (short for "properties") are used to pass data and callback functions from parent components down to child components:
- **`App` → `Navbar`**: Passes `searchQuery`, `setSearchQuery`, `selectedCategory`, `setSelectedCategory`, and `categories`.
- **`App` → `ProductFilter`**: Passes `sortBy`, `setSortBy`, and `totalCount`.
- **`App` → `ProductList`**: Passes `products` (the filtered list) and `onResetFilters` (callback function to reset filters).
- **`ProductList` → `ProductCard`**: Passes individual `product` objects.

Example in `App.jsx`:
```jsx
<ProductFilter
  sortBy={sortBy}
  setSortBy={setSortBy}
  totalCount={displayedProducts.length}
/>
```

---

### 4. State (`useState`)
Local component state is managed using React's `useState` hook for values that affect rendering:
- In **`App.jsx`**:
  - `const [products] = useState(INITIAL_PRODUCTS)`: Stores the catalog data.
  - `const [searchQuery, setSearchQuery] = useState('')`: Stores the current search query text.
  - `const [selectedCategory, setSelectedCategory] = useState('All')`: Stores the active category tab.
  - `const [sortBy, setSortBy] = useState('featured')`: Stores the selected sorting rule.
- In **`ProductCard.jsx`**:
  - `const [isAddedRecently, setIsAddedRecently] = useState(false)`: Temporary feedback state showing "✓ Added" on the button for 1.5 seconds after a user clicks.

---

### 5. Events
User interactions are captured and handled using standard React synthetic event attributes:
- **`onChange`**:
  - Typing in the search bar: `<input onChange={(e) => setSearchQuery(e.target.value)} />`
  - Selecting an option in the sort dropdown: `<select onChange={(e) => setSortBy(e.target.value)} />`
- **`onClick`**:
  - Category buttons: `onClick={() => setSelectedCategory(cat)}`
  - Clear search: `onClick={() => setSearchQuery('')}`
  - Reset all filters: `onClick={handleResetFilters}`
  - Add to cart: `onClick={handleAddToCart}`
  - Favorite toggle: `onClick={handleToggleFavorite}`
  - Drawer open/close: `onClick={handleClose}`
  - Quantity increase/decrease: `onClick={() => handleIncreaseQuantity(item.id)}`
- **Event propagation**:
  - `e.stopPropagation()` in `CartDrawer.jsx` prevents clicks inside the drawer modal from triggering the backdrop close event.

---

### 6. Redux Store
The global application state is stored in a single centralized **Redux Store**:
- Located in: `src/redux/store.js`
- Created using `legacy_createStore(rootReducer)` from the `redux` library.
- Holds the complete state tree for the application:
  - `state.cart.cartItems`: Array of items currently in the cart with their quantities.
  - `state.cart.favorites`: Array of product IDs marked as favorites.
  - `state.cart.isCartOpen`: Boolean flag showing or hiding the cart drawer.
- Also supports the **Redux DevTools** browser extension for debugging state changes.

```javascript
// src/redux/store.js
import { legacy_createStore as createStore } from 'redux';
import rootReducer from './reducers';

const store = createStore(rootReducer);
export default store;
```

---

### 7. Actions
Actions are plain JavaScript objects that describe an intention to change the state.
- Located in: `src/redux/actions/cartActions.js`
- **Action Types (Constants)**:
  - `ADD_TO_CART`, `REMOVE_FROM_CART`, `UPDATE_QUANTITY`, `CLEAR_CART`, `OPEN_CART`, `CLOSE_CART`, `TOGGLE_FAVORITE`
- **Action Creators (Functions that return action objects)**:
  - `addToCart(product)`: returns `{ type: ADD_TO_CART, payload: product }`
  - `removeFromCart(productId)`: returns `{ type: REMOVE_FROM_CART, payload: productId }`
  - `updateQuantity(productId, amount)`: returns `{ type: UPDATE_QUANTITY, payload: { productId, amount } }`
  - `openCart()`: returns `{ type: OPEN_CART }`
  - `closeCart()`: returns `{ type: CLOSE_CART }`
  - `toggleFavorite(productId)`: returns `{ type: TOGGLE_FAVORITE, payload: productId }`
  - `clearCart()`: returns `{ type: CLEAR_CART }`

---

### 8. Reducers
Reducers are pure functions that specify how the application's state changes in response to an action sent to the store.
- **Cart Reducer** (`src/redux/reducers/cartReducer.js`):
  - Takes `(state = initialState, action)`
  - Uses a standard `switch (action.type)` statement.
  - Returns a **new copy** of the state using the spread operator (`...state`) without mutating the original state directly.
  - Handles adding items (incrementing quantity if already present, or appending if new), removing items, updating quantity, opening/closing the drawer, and toggling favorites.
  - Synchronizes changes to browser `localStorage`.
- **Root Reducer** (`src/redux/reducers/index.js`):
  - Uses `combineReducers` from `redux` to combine all slice reducers into a single state tree:
    ```javascript
    const rootReducer = combineReducers({
      cart: cartReducer,
    });
    ```

---

### 9. React-Redux
The `react-redux` library connects the Redux store with our React components:
1. **`<Provider>`** (`src/main.jsx`):
   - Wraps the root `<App />` component and passes down `store` so any component can access global state:
     ```jsx
     <Provider store={store}>
       <App />
     </Provider>
     ```
2. **`useSelector()`**:
   - Used inside components to select and extract data from the Redux store:
     ```javascript
     // In Navbar.jsx and CartDrawer.jsx
     const cartItems = useSelector((state) => state.cart.cartItems);
     const favorites = useSelector((state) => state.cart.favorites);
     const isCartOpen = useSelector((state) => state.cart.isCartOpen);
     ```
3. **`useDispatch()`**:
   - Used inside components to dispatch actions to the Redux store:
     ```javascript
     const dispatch = useDispatch();

     // Dispatching actions on user events:
     dispatch(addToCart(product));
     dispatch(openCart());
     dispatch(closeCart());
     dispatch(removeFromCart(item.id));
     dispatch(toggleFavorite(product.id));
     ```

---

## 3. Project Structure

```text
tp2 react/
├── index.html                   # HTML entry point
├── package.json                 # Dependencies (react, redux, react-redux, lucide-react)
├── README.md                    # Project documentation & principles guide
├── vite.config.js               # Vite configuration
└── src/
    ├── main.jsx                 # Entry point with React-Redux <Provider store={store}>
    ├── App.jsx                  # Main component with local state (search, category, sort)
    ├── App.css                  # Component styling
    ├── index.css                # Global styles and design system
    ├── data/
    │   └── products.js          # Sample catalog products & categories
    ├── utils/
    │   └── formatters.js        # Currency formatter utility
    ├── redux/
    │   ├── store.js             # Redux Store creation
    │   ├── actions/
    │   │   └── cartActions.js   # Action types and action creators
    │   └── reducers/
    │       ├── cartReducer.js   # Cart and favorites reducer logic
    │       └── index.js         # Root reducer (combineReducers)
    └── components/
        ├── common/
        │   ├── Navbar.jsx       # Header, search, categories, cart/fav counter
        │   └── Footer.jsx       # Trust badges & footer info
        ├── product/
        │   ├── ProductList.jsx   # List rendering & empty state
        │   ├── ProductCard.jsx   # Card item, add to cart & wishlist actions
        │   └── ProductFilter.jsx # Products counter & sort dropdown
        └── cart/
            └── CartDrawer.jsx   # Slide-out cart modal with calculations & checkout
```

---

## 4. How to Run the Project

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Start the development server:**
   ```bash
   npm run dev
   ```
   Open your browser at the displayed local URL (typically `http://localhost:5173`).

3. **Build for production:**
   ```bash
   npm run build
   ```

4. **Run code linting:**
   ```bash
   npm run lint
   ```
