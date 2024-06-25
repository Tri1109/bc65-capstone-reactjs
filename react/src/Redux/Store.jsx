import { configureStore } from "@reduxjs/toolkit";

import ProductReducer from "./Reducers/ProductReducer";
import UsersReducer from "./Reducers/UsersReducer";
import CartReducer from "./Reducers/CartReducer";
import OderReducer from "./Reducers/OderReducer";
import ProfileReducer from "./Reducers/ProfileReducer";

export const store = configureStore({
  reducer: {
    ProductReducer, UsersReducer, CartReducer, OderReducer, ProfileReducer
  }

});
