// src/features/products/components/ProductsClient.tsx

'use client';
import { useEffect } from 'react';
import Image from 'next/image';
import { formatDate } from '@/utils/formatDate';
import { useDispatch, useSelector } from 'react-redux';
import {
  setSelectedType,
  setImageExists,
  loadProducts,
} from '@/store/products-slice';
import { AppDispatch, RootState } from '@/store';
import css from '../styles/Products.module.css';
import orders from '@/utils/orders';

const Products = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { selectedType, imageExists, products, loading, error } = useSelector(
    (state: RootState) => state.products,
  );

  // console.log('products from Products.tsx: ', products);

  // Filtering Data
  const productTypes = [
    'Все',
    ...Array.from(new Set(products.map((p) => p.type))),
  ];

  const filteredProducts =
    selectedType === 'Все'
      ? products
      : products.filter((p) => p.type === selectedType);

  useEffect(() => {
    if (products.length === 0 && !loading) {
      dispatch(loadProducts());
    }
    // dispatch(loadProducts());
    // dispatch(loadProducts(jwtToken));
  }, [dispatch, products.length, loading]);
  // }, []);
  // }, [dispatch]);

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
      <div className='mb-3 fade-in'>
        <label className='form-label'>Тип товара:</label>
        <select
          className='form-select cursor__pointer'
          aria-label='Default select example'
          value={selectedType}
          onChange={(e) => dispatch(setSelectedType(e.target.value))}
        >
          {productTypes.map((type) => (
            <option
              key={type}
              value={type}
              className='cursor__pointer nav-link--custom'
            >
              {type}
            </option>
          ))}
        </select>
      </div>

      <ul className='list-group fade-in'>
        {filteredProducts.map((product) => (
          <li key={product.id} className='card mb-3 w-100 shadow-box'>
            <div className='d-flex align-content-center justify-content-between'>
              <div className=''>
                <Image
                  src={
                    imageExists[product.id]
                      ? `/${product.photo}`
                      : '/no-img.jpg'
                  }
                  width={150}
                  height={150}
                  className='img-fluid rounded-start'
                  alt={product.title}
                />
              </div>
              <div className='d-flex align-items-center gap-3 justify-content-between w-100 px-4 text-left'>
                <div
                  className={`d-flex flex-column justify-content-start ${css.maxWidth90}`}
                >
                  <h5 className='card-title mb-0'>{product.title}</h5>
                  <p className='card-text'>
                    <small className='text-body-secondary'>
                      {product.serialNumber}
                    </small>
                  </p>
                </div>
                <div className='d-flex flex-column justify-content-start'>
                  <p className='card-text mb-0'>
                    c {formatDate(product.guarantee.start, true)}
                  </p>
                  <p className='card-text'>
                    по {formatDate(product.guarantee.end, true)}
                  </p>
                </div>
                <p className={`card-text mb-0 ${css.maxWidth50}`}>
                  {product.isNewProduct ? 'новый' : 'Б / У'}
                </p>
                <p className='card-text mb-0'>{product.type}</p>

                <div className='d-flex flex-column align-items-center'>
                  {product.price.map((p) => (
                    <div key={p.symbol} className='text-center'>
                      {p.symbol === 'USD' ? (
                        <p className='mb-0'>
                          <small className='text-body-secondary'>
                            {p.value} {p.symbol}
                          </small>
                        </p>
                      ) : (
                        <p className='mb-0'>
                          {p.value} {p.symbol}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
                <p className='card-text mb-0'>
                  <strong>Order:</strong>{' '}
                  {orders.find((o) => o.id === product.order)?.title ||
                    'Unknown'}
                </p>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Products;
