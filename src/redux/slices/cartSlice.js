import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  cartProducts: [],
  totalAmount: 0,
  totalMRP: 0,
  totalProducts: 0
};

// Retrieve the cart state from localStorage, if available
const storedCartState = localStorage.getItem('cartState');
const parsedStoredCartState = storedCartState ? JSON.parse(storedCartState) : null;
const initialCartState = parsedStoredCartState || initialState;

const cartSlice = createSlice({
  name: 'cart',
  initialState: initialCartState,
  reducers: {
    addToCart(state, action) {
      const productToAdd = action.payload;
      const existingProduct = state.cartProducts.find(
        product => product._id === productToAdd._id
      );

      if (!existingProduct) {
        state.cartProducts.push(productToAdd);
        state.totalProducts++;
      }
      state.totalAmount = calculateTotalAmount(state.cartProducts);
      state.totalMRP = calculateTotalMRP(state.cartProducts);

      // Update the cart state in localStorage
      localStorage.setItem('cartState', JSON.stringify(state));
    },
    removeFromCart(state, action) {
      const productId = action.payload;

      state.cartProducts = state.cartProducts.filter(product => product._id !== productId);
      state.totalProducts = Math.max(0, state.totalProducts - 1);
      state.totalAmount = calculateTotalAmount(state.cartProducts);
      state.totalMRP = calculateTotalMRP(state.cartProducts);
      // Update the cart state in localStorage
      localStorage.setItem('cartState', JSON.stringify(state));
    },

    updateQuantity(state, action) {
      const { productId, quantity } = action.payload;
      const productToUpdateIndex = state.cartProducts.findIndex(
        product => product._id === productId
      );

      if (productToUpdateIndex !== -1) {
        state.cartProducts[productToUpdateIndex] = {
          ...state.cartProducts[productToUpdateIndex],
          quantity: quantity
        };
        state.totalAmount = calculateTotalAmount(state.cartProducts);
        state.totalMRP = calculateTotalMRP(state.cartProducts);
        // Update the cart state in localStorage
        localStorage.setItem('cartState', JSON.stringify(state));
      }
    },
  },
});

// Helper function to calculate the total amount based on the products in the cart
const calculateTotalAmount = (cartProducts) => {
  return cartProducts.reduce((total, product) => {
    return total + product.price * product.quantity;
  }, 0);
};
const calculateTotalMRP = (cartProducts) => {
  return cartProducts.reduce((total, product) => {
    return total + product.MRP * product.quantity;
  }, 0);
};

export const { addToCart, removeFromCart, updateQuantity } = cartSlice.actions;
export default cartSlice.reducer;
