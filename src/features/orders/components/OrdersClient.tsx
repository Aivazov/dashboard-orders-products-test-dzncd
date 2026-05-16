// src/features/products/components/OrdersClient.tsx

'use client';
import { useState, useEffect } from 'react';
import { Order, OrderProducts } from '@/features/orders/types';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/redux';
import {
  deleteOrder,
  setCurrencyUAH,
  setCurrencyUSD,
  setOrderToDelete,
  setSelectedOrder,
} from '@/features/orders/model/orders-slice';
import products from '@/utils/products';
import OrderDetails from './OrderDetails';
import DeleteOrderModal from './DeleteOrderModal';
import OrdersList from './OrdersList/OrdersList';
import { calculateCurrencyTotal } from '../utils/calculateCurrencyTotal';

const Orders = () => {
  const dispatch = useDispatch<AppDispatch>();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDisappearing, setIsDisappearing] = useState(false);

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
  //     setOrders(orders.filter((order) => order.id !== orderToDelete.id));
  //     setSelectedOrder(null);
  //     setOrderToDelete(null);
  //   }
  // };

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

  // const handleOpenDeleteModal = (order: Order) => {
  //   dispatch(setOrderToDelete(order));
  //   const modalElement = document.getElementById("deleteOrderModal");
  //   const modal = new window.bootstrap.Modal(modalElement);
  //   // const modal = new Modal(modalElement);
  //   modal.show();
  // };

  // const handleOpenDeleteModal = (order: Order) => {
  //   dispatch(setOrderToDelete(order));
  //   const modalElement = document.getElementById('deleteOrderModal');
  //   if (modalElement) {
  //     // const modal = new (ModalBootstrap as any).Modal(modalElement);
  //     const modal = new Modal(modalElement);
  //     // const modal = new window.bootstrap.Modal(modalElement);
  //     modal.show();
  //   } else {
  //     console.error('Modal element not found');
  //   }
  // };

  // useEffect(() => {
  //   if (typeof window !== 'undefined' && window.bootstrap) {
  //     const modalElement = document.getElementById('deleteOrderModal');
  //     if (modalElement) {
  //       // const modal = new (ModalBootstrap as any).Modal(modalElement);
  //       const modal = new Modal(modalElement);
  //       // const modal = new window.bootstrap.Modal(modalElement);
  //       modal.show();
  //     }
  //   }
  // }, []);

  useEffect(() => {
    if (selectedOrder) {
      // const orderProducts = order.products || [];
      const orderProducts = products.filter(
        (p) => p.order === selectedOrder.id,
      );
      const totalSumUSD = calculateCurrencyTotal(orderProducts, 'USD');
      const totalSumUAH = calculateCurrencyTotal(orderProducts, 'UAH');

      dispatch(setCurrencyUSD(totalSumUSD));
      dispatch(setCurrencyUSD(totalSumUAH));
    }
  }, [selectedOrder, dispatch]);

  return (
    <div
      className='container m-0 px-4 py-4 d-flex gap-3'
      style={{ height: 'calc(100vh - 100px)' }}
    >
      {/* Orders List */}
      <OrdersList
        handleSelectOrder={handleSelectOrder}
        setIsModalOpen={setIsModalOpen}
      />

      {/* Order Details */}
      {selectedOrder && (
        <OrderDetails
          products={products}
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
    </div>
  );
};

export default Orders;
