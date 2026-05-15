import React from 'react';
import { Product } from '../../types';

type ProductPriceProps = {
  product: Product;
};

const ProductPrice = ({ product }: ProductPriceProps) => {
  return (
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
  );
};

export default ProductPrice;
