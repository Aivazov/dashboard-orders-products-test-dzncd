// /src/features/orders/model/orders-slice.ts

import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Order } from '@/features/orders/types';
import { OrdersState } from './types';
import { fetchOrders } from '../api/orders';
import { RootState } from '@/redux';
import { addOrder, AddOrderInput } from '../api/addOrder';

const initialState: OrdersState = {
  orders: [],
  loading: false,
  error: null,
  selectedOrder: null,
  orderToDelete: null,
  currencyUSD: null,
  currencyUAH: null,
};

export const loadOrders = createAsyncThunk(
  'orders/loadOrders',
  async (_, { getState }) => {
    const state = getState() as RootState;

    //avoid request duplicates
    if (state.orders.orders.length > 0) return state.orders.orders;

    return fetchOrders();
  },
);

export const createOrder = createAsyncThunk(
  'orders/createOrder',
  async (input: AddOrderInput) => {
    return addOrder(input);
  },
);

const ordersSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    setOrders(state, action: PayloadAction<Order[]>) {
      state.orders = action.payload;
    },
    setSelectedOrder(state, action: PayloadAction<Order | null>) {
      state.selectedOrder = action.payload;
    },
    setOrderToDelete(state, action: PayloadAction<Order | null>) {
      state.orderToDelete = action.payload;
    },
    setCurrencyUSD(state, action: PayloadAction<number | null>) {
      state.currencyUSD = action.payload;
    },
    setCurrencyUAH(state, action: PayloadAction<number | null>) {
      state.currencyUAH = action.payload;
    },
    deleteOrder(state, action: PayloadAction<number>) {
      state.orders = state.orders.filter(
        (order) => order.id !== action.payload,
      );
      if (state.selectedOrder?.id === action.payload) {
        state.selectedOrder = null;
      }
      if (state.orderToDelete?.id === action.payload) {
        state.orderToDelete = null;
      }
    },
  },
  extraReducers(builder) {
    builder
      .addCase(loadOrders.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loadOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = action.payload;
      })
      .addCase(loadOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to load orders';
      })
      .addCase(createOrder.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.orders.unshift(action.payload);
      })
      .addCase(createOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to create order';
      });
  },
});

export const {
  setOrders,
  setSelectedOrder,
  setOrderToDelete,
  setCurrencyUSD,
  setCurrencyUAH,
  deleteOrder,
} = ordersSlice.actions;

export default ordersSlice.reducer;
