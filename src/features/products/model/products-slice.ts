// /src/features/products/model/products-slice.ts
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchProducts } from '@/features/products/api/products';
import { RootState } from '../../../redux/index';
import { Products } from './types';
import { addProduct, AddProductInput } from '../api/addProduct';

const initialState: Products = {
  selectedType: 'all',
  imageExists: {},
  products: [],
  loading: false,
  error: null,
};

export const loadProducts = createAsyncThunk(
  'products/loadProducts',
  async (_, { getState }) => {
    const state = getState() as RootState;
    if (state.products.products.length > 0) {
      return state.products.products;
    }
    return await fetchProducts();
  },
);

export const createProduct = createAsyncThunk(
  'products/createProduct',
  async (input: AddProductInput) => {
    return addProduct(input);
  },
);

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setSelectedType(state, action) {
      state.selectedType = action.payload;
    },
    setImageExists(state, action) {
      state.imageExists = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadProducts.pending, (state) => {
        state.loading = true;
      })
      .addCase(loadProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload || [];
      })
      .addCase(loadProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'An error occurred';
      })
      .addCase(createProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.products.unshift(action.payload);
      })
      .addCase(createProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to create product';
      });
  },
});

export const { setSelectedType, setImageExists } = productsSlice.actions;

export default productsSlice.reducer;
