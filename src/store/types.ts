import { Order } from '@/features/orders/types';
import { Product } from '@/features/products/types';

export interface ProductsState {
  selectedType: string;
  imageExists: { [key: string]: boolean };
}

// export interface Product {
//   id: string;
//   name: string;
//   price: number;
// }

export interface Products {
  selectedType: string;
  imageExists: { [key: string]: boolean };
  products: Product[];
  loading: boolean;
  error: string | null;
}

export interface OrdersState {
  orders: Order[];
  selectedOrder: Order | null;
  orderToDelete: Order | null;
  currencyUSD: number | null;
  currencyUAH: number | null;
}
