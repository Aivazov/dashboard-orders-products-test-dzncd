// src/features/products/components/OrderDetails.tsx
// import { Product } from '@/features/products/types';
import { RootState } from '@/redux';
import { formatDate } from '@/utils/formatDate';
import { useTranslations } from 'next-intl';
import { useSelector } from 'react-redux';

type Props = {
  // products: Product[];
  isDisappearing: boolean;
  handleCloseDetails: () => void;
};

const OrderDetails = ({
  // products,
  isDisappearing,
  handleCloseDetails,
}: Props) => {
  const selectedOrder = useSelector(
    (state: RootState) => state.orders.selectedOrder,
  );
  if (!selectedOrder) return null;
  const tMain = useTranslations('Main');

  const orderProducts = selectedOrder.products || [];
  return (
    <div
      className={`p-3 max-w-1/2 bg-light d-flex justify-content-between appear-animation ${
        isDisappearing ? 'disappear-animation' : ''
      }`}
      // style={{ width: '200%' }}
    >
      <div>
        <h2 className='text-lg font-bold'>{selectedOrder.title}</h2>
        <p>Date: {formatDate(selectedOrder.date, false)}</p>
        <h3 className='mt-4 font-semibold'>{tMain('products')}:</h3>
        <ul>
          {orderProducts.map((product) => (
            <li key={product.id}>
              {product.title} —{' '}
              {product.price.find((p) => p.symbol === 'USD')?.value} USD /{' '}
              {product.price.find((p) => p.symbol === 'UAH')?.value} UAH
            </li>
          ))}
          {/* {products
            .filter((p) => p.order === selectedOrder.id)
            .map((product) => (
              <li key={product.id}>
                {product.title} —{' '}
                {product.price.find((p) => p.symbol === 'USD')?.value} USD /
                {product.price.find((p) => p.symbol === 'UAH')?.value} UAH
              </li>
            ))} */}
        </ul>
      </div>
      <div>
        <button className='btn btn-danger mb-4' onClick={handleCloseDetails}>
          {tMain('close')}
        </button>
      </div>
    </div>
  );
};

export default OrderDetails;
