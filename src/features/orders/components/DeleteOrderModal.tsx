import Modal from '@/components/ui/Modal/Modal';
import { Order } from '@/features/orders/types';
import { useTranslations } from 'next-intl';

type DeleteOrderModal = {
  isOpen: boolean;
  order: Order | null;
  currencyUSD: number | null;
  currencyUAH: number | null;
  onClose: () => void;
  onConfirm: () => void;
};

const DeleteOrderModal = ({
  isOpen,
  order,
  currencyUSD,
  currencyUAH,
  onClose,
  onConfirm,
}: DeleteOrderModal) => {
  const tMain = useTranslations('Main');
  const tOrders = useTranslations('Orders');
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={tOrders('modalDeleteTitle')}
      footer={
        <>
          <button className='btn btn-secondary' onClick={onClose}>
            {tMain('cancel')}
          </button>

          <button className='btn btn-danger' onClick={onConfirm}>
            {tMain('delete')}
          </button>
        </>
      }
    >
      <p>{tOrders('modalDeleteQuestion')}:</p>

      <strong>{order?.title}</strong>

      <p className='mt-3'>
        {tOrders('sum')}: {currencyUSD} USD / {currencyUAH} UAH
      </p>
    </Modal>
  );
};

export default DeleteOrderModal;
