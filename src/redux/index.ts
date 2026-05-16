// src/store/index.ts

import { configureStore } from '@reduxjs/toolkit';
// import authReducer from './slices/authSlice';
import ordersReducer from '../features/orders/model/orders-slice';
import productsReducer from '../features/products/model/products-slice';

export const store = configureStore({
  reducer: {
    // auth: authReducer,
    orders: ordersReducer,
    products: productsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
