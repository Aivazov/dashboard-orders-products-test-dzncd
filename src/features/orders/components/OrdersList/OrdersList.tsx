// src/features/components/OrdersList/OrdersList.tsx

import { RootState } from '@/store';
import products from '@/utils/products';
import { Dispatch, SetStateAction } from 'react';
import { useSelector } from 'react-redux';
import { Order } from '../../types';
import OrdersCard from './OrdersCard';

type OrdersListProps = {
  handleSelectOrder: (order: Order) => void;
  setIsModalOpen: Dispatch<SetStateAction<boolean>>;
};

const OrdersList = ({ handleSelectOrder, setIsModalOpen }: OrdersListProps) => {
  const orders = useSelector((state: RootState) => state.orders.orders);

  return (
    <ul className='d-flex flex-column gap-3 p-3 list-group cursor-pointer w-100 fade-in'>
      {orders.map((order) => {
        const orderProducts = products.filter((p) => p.order === order.id);
        const totalSumUSD = orderProducts.reduce(
          (sum, p) =>
            sum + (p.price.find((pr) => pr.symbol === 'USD')?.value || 0),
          0,
        );
        // setCurrencyUSD(totalSumUSD)
        const totalSumUAH = orderProducts.reduce(
          (sum, p) =>
            sum + (p.price.find((pr) => pr.symbol === 'UAH')?.value || 0),
          0,
        );
        // setCurrencyUAH(totalSumUAH)

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
