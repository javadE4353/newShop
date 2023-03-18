import { configureStore } from "@reduxjs/toolkit";
import productReducer from "../features/product/productSlice";
import { productsFatch } from "../features/product/productSlice";
import { productsApi } from "../features/producApi/productApi";
import cartReducer from "../features/cart/cartslice";
import searchReducer from "../features/searchbar/searchbar";
import CategoryRoute from "../features/category/categorySlice";

export const store = configureStore({
  reducer: {
    products: productReducer,
    [productsApi.reducerPath]: productsApi.reducer,
    category: CategoryRoute,
    cart: cartReducer,
    search: searchReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(productsApi.middleware),
});

export type RootStore = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
