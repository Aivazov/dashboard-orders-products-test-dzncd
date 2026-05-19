// src/features/components/OrdersList/OrdersCard.tsx

import { RootState } from '@/redux';
import { formatDate } from '@/utils/formatDate';
import { Dispatch, SetStateAction } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { Order, OrderProducts } from '../../types';
import {
  setCurrencyUAH,
  setCurrencyUSD,
  setOrderToDelete,
} from '@/features/orders/model/orders-slice';
import { AiOutlineDelete } from 'react-icons/ai';
import { useTranslations } from 'next-intl';

type OrdersCardProps = {
  order: Order;
  handleSelectOrder: (order: Order) => void;
  setIsModalOpen: Dispatch<SetStateAction<boolean>>;
  orderProducts: OrderProducts[];
  totalSumUSD: number;
  totalSumUAH: number;
};

const OrdersCard = ({
  order,
  handleSelectOrder,
  setIsModalOpen,
  orderProducts,
  totalSumUSD,
  totalSumUAH,
}: OrdersCardProps) => {
  const dispatch = useDispatch();
  const selectedOrder = useSelector(
    (state: RootState) => state.orders.selectedOrder,
  );

  const tOrders = useTranslations('Orders');
  return (
    <li
      className={`list-group-item border rounded list-group-item-action cursor-pointer shadow-box nav-link--custom ${selectedOrder?.id === order.id ? 'active' : ''}`}
      onClick={() => handleSelectOrder(order)}
    >
      <div className='d-flex justify-content-between w-100'>
        <div>
          <h3 className='font-weight-bold'>{order.title}</h3>
          <p>
            {tOrders('products')}: {orderProducts.length}
          </p>
        </div>
        <div>
          <button
            type='button'
            className='btn btn-secondary'
            onClick={(e) => {
              // e.stopPropagation();

              dispatch(setOrderToDelete(order));

              dispatch(setCurrencyUSD(totalSumUSD));
              dispatch(setCurrencyUAH(totalSumUAH));

              setIsModalOpen(true);
            }}
          >
            <AiOutlineDelete />
          </button>
        </div>
      </div>
      <div>
        <p>
          {tOrders('date')}: {formatDate(order.date, false)}
        </p>
        <p>
          {tOrders('sum')}: {totalSumUSD} USD / {totalSumUAH} UAH
        </p>
      </div>
    </li>
  );
};

export default OrdersCard;
