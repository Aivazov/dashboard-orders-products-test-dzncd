import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import ordersData from '@/utils/orders';
import { Order } from '@/features/orders/types';
import { OrdersState } from './types';

const initialState: OrdersState = {
  orders: ordersData,
  selectedOrder: null,
  orderToDelete: null,
  currencyUSD: null,
  currencyUAH: null,
};

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
