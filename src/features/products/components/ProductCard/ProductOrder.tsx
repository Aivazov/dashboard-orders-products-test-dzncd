// import orders from '@/utils/orders';

'use client';
import { Product } from '../../types';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux';
import { loadOrders } from '@/features/orders/model/orders-slice';
import { useEffect, useMemo } from 'react';
import { useDispatch } from 'react-redux';

type ProductOrderProps = {
  product: Product;
};

const ProductOrder = ({ product }: ProductOrderProps) => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(loadOrders());
  }, [dispatch]);

  const orders = useSelector((state: RootState) => state.orders.orders);
  // console.log('orders', orders);

  const order = orders.find((o) =>
    o.products.some((p) => p._id === product._id),
  );
  return (
    <p className='card-text mb-0'>
      <strong>Order:</strong> {order?.title || 'Unknown'}
    </p>
  );
};

export default ProductOrder;
