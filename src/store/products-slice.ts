// /src/store/slices/productsSlice.ts
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchProducts } from '@/features/products/api/products';
import { RootState } from './index';
import { Products } from './types';

const initialState: Products = {
  selectedType: 'all',
  imageExists: {},
  products: [],
  loading: false,
  error: null,
};

// export const loadProducts = createAsyncThunk(
//   'products/loadProducts',
//   async () => {
//     return await fetchProducts();
//   }
// );

export const loadProducts = createAsyncThunk(
  'products/loadProducts',
  async (_, { getState }) => {
    const state = getState() as RootState; // получаем текущие данные состояния
    if (state.products.products.length > 0) {
      return state.products.products;
      // return state.products.products;
    }
    return await fetchProducts();
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
      });
  },
});

export const { setSelectedType, setImageExists } = productsSlice.actions;

export default productsSlice.reducer;
