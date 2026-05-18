// src/features/components/OrdersList/OrdersList.tsx

import { AppDispatch, RootState } from '@/redux';
// import products from '@/utils/products';
import { Dispatch, SetStateAction, useEffect, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import { Order } from '../../types';
import OrdersCard from './OrdersCard';
import { useDispatch } from 'react-redux';
import { loadOrders } from '../../model/orders-slice';
import { loadProducts } from '@/features/products/model/products-slice';
import OrdersSkeleton from '../OrdersSkeleton';
import { calculateCurrencyTotal } from '../../utils/calculateCurrencyTotal';

type OrdersListProps = {
  handleSelectOrder: (order: Order) => void;
  setIsModalOpen: Dispatch<SetStateAction<boolean>>;
};

const OrdersList = ({ handleSelectOrder, setIsModalOpen }: OrdersListProps) => {
  const dispatch = useDispatch<AppDispatch>();

  const orders = useSelector((state: RootState) => state.orders.orders);
  const products = useSelector((state: RootState) => state.products.products);
  const ordersLoading = useSelector((state: RootState) => state.orders.loading);
  const productsLoading = useSelector(
    (state: RootState) => state.products.loading
  );

  const [isVisualLoading, setIsVisualLoading] = useState(false);

  useEffect(() => {
    if (orders.length === 0 && !ordersLoading) dispatch(loadOrders());
    // if (products.length === 0 && !productsLoading) dispatch(loadProducts());
  }, [dispatch, orders.length, ordersLoading]);

  // const anyLoading = ordersLoading || productsLoading;

  useEffect(() => {
    if (ordersLoading) {
      setIsVisualLoading(true);
    } else {
      const timer = setTimeout(() => {
        setIsVisualLoading(false);
      }, 600);
      return () => clearTimeout(timer);
    }
  }, [ordersLoading]);
  // useEffect(() => {
  //   if (anyLoading) {
  //     setIsVisualLoading(true);
  //   } else {
  //     const timer = setTimeout(() => {
  //       setIsVisualLoading(false);
  //     }, 600);
  //     return () => clearTimeout(timer);
  //   }
  // }, [anyLoading]);

  const productsByOrderId = useMemo(() => {
    const map: Record<number | string, typeof products> = {};
    products.forEach((product) => {
      // Поддерживаем оба варианта связи (новое число product.order или если бэк пришлет строку)
      const orderId = product.order;
      if (!map[orderId]) {
        map[orderId] = [];
      }
      map[orderId].push(product);
    });

    // console.log('Сгруппированная карта (map):', map);
    return map;
  }, [products]);

  const showSkeletons = ordersLoading || isVisualLoading;
  // const showSkeletons = anyLoading || isVisualLoading;
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
            // console.log('orders.map -> order: ', order);

            // const orderProducts = products.filter((p) => p.order === order.id);
            // const orderProducts = productsByOrderId[order.id] || [];
            const orderProducts = order.products || [];

            const totalSumUSD = calculateCurrencyTotal(orderProducts, 'USD');
            const totalSumUAH = calculateCurrencyTotal(orderProducts, 'UAH');
            // console.log('totalSumUSD', totalSumUSD);

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
