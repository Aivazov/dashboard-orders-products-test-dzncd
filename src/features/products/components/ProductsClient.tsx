// src/features/products/components/ProductsClient.tsx

'use client';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loadProducts } from '@/store/products-slice';
import { AppDispatch, RootState } from '@/store';
import ProductsTypeSelector from './ProductsTypeSelector';
import ProductCard from './ProductCard/ProductCard';

const Products = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { selectedType, products, loading, error } = useSelector(
    (state: RootState) => state.products,
  );

  const filteredProducts =
    selectedType === 'all'
      ? products
      : products.filter((p) => p.type === selectedType);

  useEffect(() => {
    if (products.length === 0 && !loading) {
      dispatch(loadProducts());
    }
    // dispatch(loadProducts());
    // dispatch(loadProducts(jwtToken));
  }, [dispatch, products.length, loading]);

  // Image existence checker
  // const checkImagesExistence = async () => {
  //   const imageChecks = products.map(async (product) => {
  //     if (product.photo) {
  //       const imagePath = product.photo.startsWith('/')
  //         ? product.photo.slice(1)
  //         : product.photo;

  //       try {
  //         const res = await fetch(`http://localhost:3000/${imagePath}`);

  //         if (res.ok) {
  //           return { id: product.id, exists: true };
  //         } else {
  //           return { id: product.id, exists: false };
  //         }
  //       } catch (error) {
  //         console.error('Error checking image:', error);
  //         return { id: product.id, exists: false };
  //       }
  //     } else {
  //       return { id: product.id, exists: false }; // если изображения нет
  //     }
  //   });

  //   const results = await Promise.all(imageChecks);
  //   const imageStatus = results.reduce<{ [key: number]: boolean }>(
  //     (acc, { id, exists }) => {
  //       acc[id] = exists;
  //       return acc;
  //     },
  //     {},
  //   );

  //   dispatch(setImageExists(imageStatus));
  // };

  // call checkImagesExistence, when data loaded
  // useEffect(() => {
  //   if (products.length > 0) {
  //     checkImagesExistence();
  //   }
  // }, [products]);
  // }, [products, dispatch]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className='container mt-4'>
      <ProductsTypeSelector />

      <ul className='list-group fade-in'>
        {filteredProducts.map((product) => (
          <li key={product.id} className='card mb-3 w-100 shadow-box'>
            <ProductCard product={product} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Products;
