// src/features/products/components/OrdersClient.tsx

'use client';
import { useState, useEffect } from 'react';
import { Order } from '@/features/orders/types';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/redux';
import {
  deleteOrder,
  setCurrencyUAH,
  setCurrencyUSD,
  setOrderToDelete,
  setSelectedOrder,
} from '@/features/orders/model/orders-slice';
import OrderDetails from './OrderDetails';
import DeleteOrderModal from './DeleteOrderModal';
import OrdersList from './OrdersList/OrdersList';
import { calculateCurrencyTotal } from '../utils/calculateCurrencyTotal';
import ErrorMessage from '@/components/ui/ErrorMessage';
import AddOrderModal from './AddOrderModal';
import { AiOutlinePlus } from 'react-icons/ai';

const Orders = () => {
  const dispatch = useDispatch<AppDispatch>();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDisappearing, setIsDisappearing] = useState(false);
  const [isAddOrderModalOpen, setIsAddOrderModalOpen] = useState(false);

  const error = useSelector((state: RootState) => state.orders.error);

  const selectedOrder = useSelector(
    (state: RootState) => state.orders.selectedOrder,
  );
  const orderToDelete = useSelector(
    (state: RootState) => state.orders.orderToDelete,
  );
  const currencyUSD = useSelector(
    (state: RootState) => state.orders.currencyUSD,
  );
  const currencyUAH = useSelector(
    (state: RootState) => state.orders.currencyUAH,
  );

  // const isAuthenticated = useSelector(
  //   (state: RootState) => state.auth.isAuthenticated,
  // );
  // console.log('orders Orders', orders);
  // console.log('selectedOrder', selectedOrder);

  // useEffect(() => {
  //   if (!isAuthenticated) {
  //     router.push('/login');
  //   }
  // }, [isAuthenticated, router]);

  // if (!isAuthenticated) {
  //   return <div>Loading...</div>;
  // }

  const handleSelectOrder = (order: Order) => {
    dispatch(setSelectedOrder(order));
  };

  const handleCloseDetails = () => {
    setIsDisappearing(true);
    setTimeout(() => {
      dispatch(setSelectedOrder(null));
      setIsDisappearing(false);
    }, 300);
  };

  const handleDeleteOrder = () => {
    if (orderToDelete) {
      dispatch(deleteOrder(orderToDelete.id));
      dispatch(setSelectedOrder(null));
      dispatch(setOrderToDelete(null));
    }
  };

  // const handleDeleteOrder = () => {
  //   if (orderToDelete) {
  //     setOrders((prevOrders) => prevOrders.filter((order) => order.id !== orderToDelete.id));
  //     setSelectedOrder(null);
  //     setOrderToDelete(null);
  //     const modalElement = document.getElementById("deleteOrderModal");
  //     const modal = Modal.getInstance(modalElement);
  //     modal?.hide();
  //   }
  // };

  useEffect(() => {
    if (selectedOrder) {
      const orderProducts = selectedOrder.products || [];
      // const orderProducts = products.filter(
      //   (p) => p.order === selectedOrder.id
      // );

      const totalSumUSD = calculateCurrencyTotal(orderProducts, 'USD');
      const totalSumUAH = calculateCurrencyTotal(orderProducts, 'UAH');

      dispatch(setCurrencyUSD(totalSumUSD));
      dispatch(setCurrencyUAH(totalSumUAH));
    }
  }, [selectedOrder, dispatch]);

  if (error) {
    return <ErrorMessage error={error} />;
  }

  return (
    <div
      className='container m-0 px-4 py-4 d-flex gap-3'
      style={{ height: 'calc(100vh - 100px)' }}
    >
      {/* Toolbar */}
      <div className='flex-shrink-0 d-flex justify-content-end'>
        <button
          className='btn btn-primary d-flex align-items-center justify-content-center'
          style={{ width: 40, height: 40 }}
          // className='btn btn-primary d-flex align-items-center gap-2 w-[30px] h-[30px] d-block'
          onClick={() => setIsAddOrderModalOpen(true)}
        >
          <AiOutlinePlus />
          {/* Добавить приход */}
        </button>
      </div>

      {/* Orders List */}
      <OrdersList
        handleSelectOrder={handleSelectOrder}
        setIsModalOpen={setIsModalOpen}
      />

      {/* Order Details */}
      {selectedOrder && (
        <OrderDetails
          // products={products}
          isDisappearing={isDisappearing}
          handleCloseDetails={handleCloseDetails}
        />
      )}

      {/* Deletion Modal */}
      <DeleteOrderModal
        isOpen={isModalOpen}
        order={orderToDelete}
        currencyUSD={currencyUSD}
        currencyUAH={currencyUAH}
        onClose={() => {
          setIsModalOpen(false);
          dispatch(setOrderToDelete(null));
        }}
        onConfirm={() => {
          handleDeleteOrder();
          setIsModalOpen(false);
        }}
      />

      <AddOrderModal
        isOpen={isAddOrderModalOpen}
        onClose={() => setIsAddOrderModalOpen(false)}
      />
    </div>
  );
};

export default Orders;
