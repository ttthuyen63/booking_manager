import { createSlice, configureStore } from "@reduxjs/toolkit";
import orderSlice from "./orderSlice";
import productSlice from "./productSlice";
import productReducer from "./productSlice";
import userSlice from "./userSlice";

export default configureStore({
  reducer: {
    orderReducer: orderSlice,
    userReducer: userSlice,
    productReducer: productReducer,
  },
});
