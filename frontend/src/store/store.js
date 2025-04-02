import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice.js";
import productReducer from "./productSlice.js";
import cartReducer from "./cartProductSlice.js";
import addressReducer from "./addressSlice.js";

export const store = configureStore({
  reducer: {
    user: userReducer,
    product: productReducer,
    cartItem: cartReducer,
    address: addressReducer,
  },
});
