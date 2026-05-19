// src/features/orders/components/AddOrderModal.tsx

'use client';

import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/redux';
import { createOrder } from '../model/orders-slice';
import Modal from '@/components/ui/Modal/Modal';
import { useTranslations } from 'next-intl';
import { OrderFormValues, orderSchema } from '../schemas/addOrderSchema';

type AddOrderModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

const AddOrderModal = ({ isOpen, onClose }: AddOrderModalProps) => {
  const dispatch = useDispatch<AppDispatch>();
  const t = useTranslations('Main');
  const isSubmitting = useSelector((state: RootState) => state.orders.loading);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<OrderFormValues>({
    resolver: zodResolver(orderSchema),
  });

  useEffect(() => {
    if (!isOpen) reset();
  }, [isOpen, reset]);

  const onSubmit = async (data: OrderFormValues) => {
    await dispatch(createOrder(data));
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title='Добавить приход'
      footer={
        <>
          <button
            type='button'
            className='btn btn-secondary border-0'
            onClick={onClose}
            disabled={isSubmitting}
          >
            {t('cancel')}
          </button>
          <button
            type='button'
            className='btn btn-primary green-color'
            onClick={handleSubmit(onSubmit)}
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <span className='spinner-border spinner-border-sm me-2 ' />
            ) : null}
            Добавить
          </button>
        </>
      }
    >
      <div className='d-flex flex-column gap-3'>
        {/* Название */}
        <div>
          <label className='form-label fw-semibold'>Название прихода</label>
          <input
            {...register('title')}
            className={`form-control ${errors.title ? 'is-invalid' : ''}`}
            placeholder='Например: Поставка ноябрь 2025'
          />
          {errors.title && (
            <div className='invalid-feedback'>{errors.title.message}</div>
          )}
        </div>

        {/* Описание */}
        <div>
          <label className='form-label fw-semibold'>Описание</label>
          <textarea
            {...register('description')}
            className={`form-control ${errors.description ? 'is-invalid' : ''}`}
            rows={3}
            placeholder='Краткое описание прихода...'
          />
          {errors.description && (
            <div className='invalid-feedback'>{errors.description.message}</div>
          )}
        </div>
      </div>
    </Modal>
  );
};

export default AddOrderModal;
