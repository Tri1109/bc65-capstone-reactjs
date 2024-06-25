import { createSlice } from "@reduxjs/toolkit";
import {
  removeDataTextStorage,
  setDataJSONStorage,
} from "../../Util/UtilFunction";

const initialState = {
  cart: [],
};

const CartReducer = createSlice({
  name: "CartReducer",
  initialState,
  reducers: {
    setCartLocalStorage: (state, action) => {
      state.cart = action.payload;
    },
    addToCart: (state, action) => {
      // Check if the item is already in the cart
      const itemIndex = state.cart.findIndex(
        (item) => item.id === action.payload.id
      );
      if (itemIndex >= 0) {
        // If the item already exists, increase the quantity
        state.cart[itemIndex].quantity += action.payload.quantity;
        setDataJSONStorage("cart", state.cart);
      } else {
        // If the item does not exist, add it to the cart
        state.cart.push({
          ...action.payload,
          quantity: action.payload.quantity,
        });
        setDataJSONStorage("cart", state.cart);
      }
    },
    removeFromCart: (state, action) => {
      state.cart = state.cart.filter((item) => item.id !== action.payload);
      setDataJSONStorage("cart", state.cart);
    },
    incrementQuantity: (state, action) => {
      const itemIndex = state.cart.findIndex(
        (item) => item.id === action.payload
      );
      if (itemIndex >= 0) {
        state.cart[itemIndex].quantity += 1;
        setDataJSONStorage("cart", state.cart);
      }
      // setDataJSONStorage('cart', state.cart)
    },
    decrementQuantity: (state, action) => {
      const itemIndex = state.cart.findIndex(
        (item) => item.id === action.payload
      );
      if (itemIndex >= 0 && state.cart[itemIndex].quantity > 1) {
        state.cart[itemIndex].quantity -= 1;
        setDataJSONStorage("cart", state.cart);
      }
    },
    clearCart: (state) => {
      state.cart = [];
      removeDataTextStorage("cart");
    },
  },
});

export const {
  setCartLocalStorage,
  addToCart,
  removeFromCart,
  incrementQuantity,
  decrementQuantity,
  clearCart,
} = CartReducer.actions;

export default CartReducer.reducer;
