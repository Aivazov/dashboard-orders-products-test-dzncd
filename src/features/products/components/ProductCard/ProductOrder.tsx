import orders from '@/utils/orders';
import React from 'react';
import { Product } from '../../types';

type ProductOrderProps = {
  product: Product;
};

const ProductOrder = ({ product }: ProductOrderProps) => {
  return (
    <p className='card-text mb-0'>
      <strong>Order:</strong>{' '}
      {orders.find((o) => o.id === product.order)?.title || 'Unknown'}
    </p>
  );
};

export default ProductOrder;
