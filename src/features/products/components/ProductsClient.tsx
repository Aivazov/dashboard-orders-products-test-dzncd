// src/features/products/components/ProductsClient.tsx

'use client';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loadProducts } from '@/features/products/model/products-slice';
import { AppDispatch, RootState } from '@/redux';
import ProductsTypeSelector from './ProductsTypeSelector';
import ProductCard from './ProductCard/ProductCard';
import ProductSkeleton from './ProductSkeleton';
import ErrorMessage from '@/components/ui/ErrorMessage';
import AddProductModal from './AddProductModal/AddProductModal';
import { AiOutlinePlus } from 'react-icons/ai';

const Products = () => {
  const dispatch = useDispatch<AppDispatch>();

  const products = useSelector((state: RootState) => state.products.products);
  const selectedType = useSelector(
    (state: RootState) => state.products.selectedType,
  );
  const loading = useSelector((state: RootState) => state.products.loading);
  const error = useSelector((state: RootState) => state.products.error);

  const [isVisualLoading, setIsVisualLoading] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

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

  useEffect(() => {
    if (loading) {
      setIsVisualLoading(true);
    } else {
      const timer = setTimeout(() => {
        setIsVisualLoading(false);
      }, 600);

      return () => clearTimeout(timer);
    }
  }, [loading]);
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

  // if (loading) {
  //   return <div>Loading...</div>;
  // }

  const showSkeletons = loading || isVisualLoading;

  if (error) {
    return <ErrorMessage error={error} />;
  }

  return (
    <div
      className='container px-4 py-4 d-flex flex-column'
      style={{ height: 'calc(100vh - 100px)' }}
    >
      <div className='flex-shrink-0 mb-3'>
        <ProductsTypeSelector />

        <button
          className='btn btn-primary d-flex align-items-center gap-2 flex-shrink-0 green-color'
          onClick={() => setIsAddModalOpen(true)}
        >
          <AiOutlinePlus />
          Добавить продукт
        </button>
      </div>

      <ul
        className='list-group fade-in flex-grow-1'
        style={{ overflowY: 'auto', minHeight: 0 }}
      >
        {showSkeletons
          ? Array.from({ length: 4 }).map((_, idx) => (
              <ProductSkeleton key={`skeleton-${idx}`} />
            ))
          : filteredProducts.map((product) => (
              <li
                key={product.id}
                className='card mb-3 w-100 shadow-box flex-shrink-0'
              >
                <ProductCard product={product} />
              </li>
            ))}
      </ul>

      <AddProductModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
      />
    </div>
  );
};

export default Products;
