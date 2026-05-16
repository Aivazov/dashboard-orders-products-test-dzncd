// src/features/components/OrdersList/OrdersList.tsx

import { AppDispatch, RootState } from '@/redux';
import products from '@/utils/products';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Order } from '../../types';
import OrdersCard from './OrdersCard';
import { useDispatch } from 'react-redux';
import { loadOrders } from '../../model/orders-slice';
import OrdersSkeleton from '../OrdersSkeleton';
import { calculateCurrencyTotal } from '../../utils/calculateCurrencyTotal';

type OrdersListProps = {
  handleSelectOrder: (order: Order) => void;
  setIsModalOpen: Dispatch<SetStateAction<boolean>>;
};

const OrdersList = ({ handleSelectOrder, setIsModalOpen }: OrdersListProps) => {
  const dispatch = useDispatch<AppDispatch>();

  const orders = useSelector((state: RootState) => state.orders.orders);
  const loading = useSelector((state: RootState) => state.orders.loading);

  const [isVisualLoading, setIsVisualLoading] = useState(false);

  useEffect(() => {
    if (orders.length === 0 && !loading) dispatch(loadOrders());
  }, [dispatch, orders.length]);

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

  const showSkeletons = loading || isVisualLoading;
  return (
    <ul
      className='list-group fade-in flex-grow-1 max-w-1/2 gap-3'
      style={{ overflowY: 'auto', minHeight: 0 }}
    >
      {showSkeletons
        ? Array.from({ length: 4 }).map((_, idx) => (
            <OrdersSkeleton key={`skeleton-${idx}`} />
          ))
        : orders.map((order) => {
            const orderProducts = products.filter((p) => p.order === order.id);

            const totalSumUSD = calculateCurrencyTotal(orderProducts, 'USD');
            const totalSumUAH = calculateCurrencyTotal(orderProducts, 'UAH');

            return (
              <OrdersCard
                key={order.id}
                order={order}
                handleSelectOrder={handleSelectOrder}
                setIsModalOpen={setIsModalOpen}
                orderProducts={orderProducts}
                totalSumUSD={totalSumUSD}
                totalSumUAH={totalSumUAH}
              />
            );
          })}
    </ul>
  );
};

export default OrdersList;
