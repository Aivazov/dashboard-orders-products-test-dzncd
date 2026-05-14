// src/features/products/components/OrdersClient.tsx

'use client';
import { useState, useEffect } from 'react';
import { Order } from '@/features/orders/types';
// import { Modal } from 'bootstrap';
import { AiOutlineDelete } from 'react-icons/ai';
import { formatDate } from '@/utils/formatDate';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import { RootState } from '@/store';
import {
  deleteOrder,
  setCurrencyUAH,
  setCurrencyUSD,
  setOrderToDelete,
  setSelectedOrder,
} from '@/store/orders-slice';
import products from '@/utils/products';

// import dynamic from 'next/dynamic';

// const ModalBootstrap = dynamic(() => import('bootstrap'), { ssr: false });

const Orders = () => {
  // const [orders, setOrders] = useState<Order[]>(ordersData);
  // const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  // const [orderToDelete, setOrderToDelete] = useState<Order | null>(null);
  // const [currencyUSD, setCurrencyUSD] = useState<number | null>(null)
  // const [currencyUAH, setCurrencyUAH] = useState<number | null>(null)
  const [isDisappearing, setIsDisappearing] = useState(false);

  const dispatch = useDispatch();
  const router = useRouter();

  const { orders, selectedOrder, orderToDelete, currencyUSD, currencyUAH } =
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
    dispatch(setSelectedOrder(null));
    setIsDisappearing(true);
    setTimeout(() => {
      setSelectedOrder(null);
      setIsDisappearing(false);
    }, 500);
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
        (p) => p.order === selectedOrder.id,
      );
      const totalSumUSD = orderProducts.reduce(
        (sum, p) =>
          sum + (p.price.find((pr) => pr.symbol === 'USD')?.value || 0),
        0,
      );
      dispatch(setCurrencyUSD(totalSumUSD));

      const totalSumUAH = orderProducts.reduce(
        (sum, p) =>
          sum + (p.price.find((pr) => pr.symbol === 'UAH')?.value || 0),
        0,
      );
      dispatch(setCurrencyUAH(totalSumUAH));
    }
  }, [selectedOrder, dispatch]);

  return (
    <div className='d-flex w-100'>
      {/* Orders List */}
      <ul className='d-flex flex-column gap-3 p-3 list-group cursor-pointer w-100 fade-in'>
        {/* <ul className="d-flex flex-column gap-3 p-3 list-group cursor-pointer w-25 fade-in"> */}
        {/* <ul className="w-1/3 p-4 d-flex flex-column gap-3 p-3"> */}
        {/* <ul className="list-group w-33 p-3"> */}
        {/* <h2 className="text-lg font-bold">Orders</h2> */}
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
            <li
              key={order.id}
              className={`list-group-item border rounded list-group-item-action cursor__pointer shadow-box nav-link--custom ${selectedOrder?.id === order.id ? 'active' : ''}`}
              // className="list-group-item border rounded list-group-item-action cursor__pointer shadow-box"
              // className="p-2 border rounded cursor-pointer hover:bg-gray-100"

              onClick={() => handleSelectOrder(order)}
            >
              <div className='d-flex justify-content-between w-100'>
                <div>
                  <h3 className='font-weight-bold'>{order.title}</h3>
                  <p>Products: {orderProducts.length}</p>
                </div>
                <div>
                  <button
                    type='button'
                    className='btn btn-secondary'
                    // onClick={() => handleOpenDeleteModal(order)}
                  >
                    <AiOutlineDelete />
                  </button>
                </div>
              </div>
              <div>
                <p>Дата: {formatDate(order.date, false)}</p>
                <p>
                  Сумма: {totalSumUSD} USD / {totalSumUAH} UAH
                </p>
              </div>
            </li>
          );
        })}
      </ul>

      {/* Order Details */}
      {selectedOrder && (
        <div
          className={`p-3 bg-light d-flex justify-content-between appear-animation ${isDisappearing ? 'disappear-animation' : ''}`}
          style={{ width: '200%' }}
        >
          {/* <div className="w-2/3 p-4 bg-gray-50"> */}
          {/* <div> */}

          {/* <button className="mb-4 text-red-500" onClick={handleCloseDetails}>Close</button> */}
          {/* </div> */}
          <div>
            <h2 className='text-lg font-bold'>{selectedOrder.title}</h2>
            <p>Date: {formatDate(selectedOrder.date, false)}</p>
            <h3 className='mt-4 font-semibold'>Products:</h3>
            <ul>
              {products
                .filter((p) => p.order === selectedOrder.id)
                .map((product) => (
                  <li key={product.id}>
                    {product.title} —{' '}
                    {product.price.find((p) => p.symbol === 'USD')?.value} USD /
                    {product.price.find((p) => p.symbol === 'UAH')?.value} UAH
                  </li>
                ))}
            </ul>
          </div>
          <div>
            <button
              className='btn btn-danger mb-4'
              onClick={handleCloseDetails}
            >
              Закрыть
            </button>
          </div>
        </div>
      )}

      {/* Deletion Modal */}
      <div
        className='modal fade'
        id='deleteOrderModal'
        tabIndex={-1}
        aria-labelledby='deleteOrderModalLabel'
        aria-hidden='true'
      >
        <div className='modal-dialog'>
          <div className='modal-content'>
            <div className='modal-header'>
              <h5 className='modal-title' id='deleteOrderModalLabel'>
                Вы уверены, что хотите удалить этот Order?
              </h5>
              <button
                type='button'
                className='btn-close'
                data-bs-dismiss='modal'
                aria-label='Close'
              ></button>
            </div>
            <div className='modal-body'>
              <p>
                <strong>{orderToDelete?.title}</strong>
              </p>
              <p>
                Сумма: {currencyUSD} USD / {currencyUAH} UAH
              </p>
            </div>
            <div className='modal-footer'>
              <button
                type='button'
                className='btn btn-secondary'
                data-bs-dismiss='modal'
              >
                Отменить
              </button>
              <button
                type='button'
                className='btn btn-danger'
                data-bs-dismiss='modal'
                onClick={handleDeleteOrder}
              >
                Удалить
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Orders;
