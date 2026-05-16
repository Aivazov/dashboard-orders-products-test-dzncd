// src/features/products/components/OrdersClient.tsx

'use client';
import { useState, useEffect } from 'react';
import { Order } from '@/features/orders/types';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/store';
import {
  deleteOrder,
  setCurrencyUAH,
  setCurrencyUSD,
  setOrderToDelete,
  setSelectedOrder,
} from '@/store/orders-slice';
import products from '@/utils/products';
import OrderDetails from './OrderDetails';
import DeleteOrderModal from './DeleteOrderModal';
import OrdersList from './OrdersList/OrdersList';

// import dynamic from 'next/dynamic';

// const ModalBootstrap = dynamic(() => import('bootstrap'), { ssr: false });

const Orders = () => {
  // const [orders, setOrders] = useState<Order[]>(ordersData);
  // const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  // const [orderToDelete, setOrderToDelete] = useState<Order | null>(null);
  // const [currencyUSD, setCurrencyUSD] = useState<number | null>(null)
  // const [currencyUAH, setCurrencyUAH] = useState<number | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDisappearing, setIsDisappearing] = useState(false);

  const dispatch = useDispatch<AppDispatch>();

  const { selectedOrder, orderToDelete, currencyUSD, currencyUAH } =
    useSelector((state: RootState) => state.orders);
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
      const orderProducts = products.filter(
        (p) => p.order === selectedOrder.id
      );
      const totalSumUSD = orderProducts.reduce(
        (sum, p) =>
          sum + (p.price.find((pr) => pr.symbol === 'USD')?.value || 0),
        0
      );
      dispatch(setCurrencyUSD(totalSumUSD));

      const totalSumUAH = orderProducts.reduce(
        (sum, p) =>
          sum + (p.price.find((pr) => pr.symbol === 'UAH')?.value || 0),
        0
      );
      dispatch(setCurrencyUAH(totalSumUAH));
    }
  }, [selectedOrder, dispatch]);

  return (
    <div
      className='container m-0 px-4 py-4 d-flex gap-3'
      style={{ height: 'calc(100vh - 100px)' }}
      // style={{ overflowY: 'auto', minHeight: 0 }}
      // className='d-flex w-100'
    >
      {/* <div
        className='list-group fade-in flex-grow-1'
        style={{ overflowY: 'auto', minHeight: 0 }}
      > */}
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
      {/* </div> */}
    </div>
  );
};

export default Orders;
