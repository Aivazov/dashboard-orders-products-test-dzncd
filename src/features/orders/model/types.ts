import { Order } from '../types';

export interface OrdersState {
  orders: Order[];
  selectedOrder: Order | null;
  orderToDelete: Order | null;
  currencyUSD: number | null;
  currencyUAH: number | null;
  loading: boolean;
  error: string | null;
}
