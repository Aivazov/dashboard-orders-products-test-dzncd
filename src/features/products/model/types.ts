import { Product } from '../types';

export interface ProductsState {
  selectedType: string;
  imageExists: { [key: string]: boolean };
}

export interface Products {
  selectedType: string;
  imageExists: { [key: string]: boolean };
  products: Product[];
  loading: boolean;
  error: string | null;
}
