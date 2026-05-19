// src/features/products/components/AddProductModal.tsx

'use client';

import { useEffect } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/redux';
import { createProduct } from '../../model/products-slice';
import { loadOrders } from '@/features/orders/model/orders-slice';
import Modal from '@/components/ui/Modal/Modal';
import { useTranslations } from 'next-intl';
import {
  ProductFormValues,
  getProductSchema,
} from '../../schemas/addProductSchema';

type AddProductModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

const AddProductModal = ({ isOpen, onClose }: AddProductModalProps) => {
  const dispatch = useDispatch<AppDispatch>();

  const tMain = useTranslations('Main');
  const tModal = useTranslations('ProductAddModal');
  const tFilter = useTranslations('ProductsFilter');
  const tProductAddSchema = useTranslations('ProductAddSchema');

  const schema = getProductSchema(tProductAddSchema);

  const orders = useSelector((state: RootState) => state.orders.orders);
  const isSubmitting = useSelector(
    (state: RootState) => state.products.loading,
  );

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ProductFormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      isNewProduct: true,
    },
  });

  useEffect(() => {
    if (isOpen && orders.length === 0) {
      dispatch(loadOrders());
    }
  }, [isOpen, orders.length, dispatch]);

  useEffect(() => {
    if (!isOpen) reset();
  }, [isOpen, reset]);

  const onSubmit: SubmitHandler<ProductFormValues> = async (
    data: ProductFormValues,
  ) => {
    await dispatch(createProduct(data));
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={tModal('title')}
      footer={
        <>
          <button
            type='button'
            className='btn btn-secondary'
            onClick={onClose}
            disabled={isSubmitting}
          >
            {tMain('cancel')}
          </button>
          <button
            type='submit'
            className='btn btn-primary green-color'
            onClick={handleSubmit(onSubmit)}
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <span className='spinner-border spinner-border-sm me-2' />
            ) : null}
            {tMain('add')}
          </button>
        </>
      }
    >
      <div className='d-flex flex-column gap-3'>
        {/* Product Title*/}
        <div>
          <label className='form-label fw-semibold'>
            {tModal('fields.title')}
          </label>
          <input
            {...register('title')}
            className={`form-control ${errors.title ? 'is-invalid' : ''}`}
            placeholder={`${tModal('fields.titlePlaceholder')}: Monitor Dell 27`}
            // placeholder='Например: Monitor Dell 27"'
          />
          {errors.title && (
            <div className='invalid-feedback'>{errors.title.message}</div>
          )}
        </div>

        {/* Type / Condition */}
        <div className='d-flex gap-3'>
          <div className='flex-grow-1'>
            <label className='form-label fw-semibold'>
              {tModal('fields.type')}
            </label>
            <select
              {...register('type')}
              className={`form-select ${errors.type ? 'is-invalid' : ''}`}
            >
              <option value=''>{tModal('fields.typePlaceholder')}</option>
              <option value='monitors'>{tFilter('monitors')}</option>
              <option value='tablets'>{tFilter('tablets')}</option>
              <option value='laptops'>{tFilter('laptops')}</option>
            </select>
            {errors.type && (
              <div className='invalid-feedback'>{errors.type.message}</div>
            )}
          </div>

          <div className='flex-grow-1'>
            <label className='form-label fw-semibold'>
              {tModal('fields.condition')}
            </label>
            <select
              {...register('isNewProduct', { setValueAs: (v) => v === 'true' })}
              className='form-select'
            >
              <option value='true'>{tModal('fields.conditionNew')}</option>
              <option value='false'>{tModal('fields.conditionUsed')}</option>
            </select>
          </div>
        </div>

        {/* Serial Number */}
        <div>
          <label className='form-label fw-semibold'>
            {tModal('fields.serialNumber')}
          </label>
          <input
            {...register('serialNumber')}
            className={`form-control ${errors.serialNumber ? 'is-invalid' : ''}`}
            placeholder={tModal('fields.serialNumberPlaceholder')}
          />
          {errors.serialNumber && (
            <div className='invalid-feedback'>
              {errors.serialNumber.message}
            </div>
          )}
        </div>

        {/* Цена USD + UAH */}
        <div className='d-flex gap-3'>
          <div className='flex-grow-1'>
            <label className='form-label fw-semibold'>
              {tModal('fields.priceUSD')}
            </label>
            <input
              {...register('priceUSD', {
                valueAsNumber: true,
              })}
              type='number'
              step='0.01'
              min='0'
              className={`form-control ${errors.priceUSD ? 'is-invalid' : ''}`}
              placeholder='0.00'
            />
            {errors.priceUSD && (
              <div className='invalid-feedback'>{errors.priceUSD.message}</div>
            )}
          </div>

          <div className='flex-grow-1'>
            <label className='form-label fw-semibold'>
              {tModal('fields.priceUAH')}
            </label>
            <input
              {...register('priceUAH', {
                valueAsNumber: true,
              })}
              type='number'
              step='0.01'
              min='0'
              className={`form-control ${errors.priceUAH ? 'is-invalid' : ''}`}
              placeholder='0.00'
            />
            {errors.priceUAH && (
              <div className='invalid-feedback'>{errors.priceUAH.message}</div>
            )}
          </div>
        </div>

        {/* Guarantee */}
        <div>
          <label className='form-label fw-semibold'>
            {tModal('fields.guarantee')}
          </label>
          <div className='d-flex gap-3'>
            <div className='flex-grow-1'>
              <input
                {...register('guaranteeStart')}
                type='date'
                className={`form-control ${errors.guaranteeStart ? 'is-invalid' : ''}`}
              />
              {errors.guaranteeStart && (
                <div className='invalid-feedback'>
                  {errors.guaranteeStart.message}
                </div>
              )}
            </div>
            <div className='d-flex align-items-center text-secondary'>—</div>
            <div className='flex-grow-1'>
              <input
                {...register('guaranteeEnd')}
                type='date'
                className={`form-control ${errors.guaranteeEnd ? 'is-invalid' : ''}`}
              />
              {errors.guaranteeEnd && (
                <div className='invalid-feedback'>
                  {errors.guaranteeEnd.message}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Order */}
        <div>
          <label className='form-label fw-semibold'>
            {tModal('fields.order')}
          </label>
          <select
            {...register('order', {
              valueAsNumber: true,
            })}
            className={`form-select ${errors.order ? 'is-invalid' : ''}`}
          >
            <option value=''>{tModal('fields.orderPlaceholder')}</option>
            {orders.map((o) => (
              <option key={o.id} value={o.id}>
                {o.title}
              </option>
            ))}
          </select>
          {errors.order && (
            <div className='invalid-feedback'>{errors.order.message}</div>
          )}
        </div>
      </div>
    </Modal>
  );
};

export default AddProductModal;
