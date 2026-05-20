'use client';

import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/redux';
import { prepareChartData } from '../utils/prepareChartData';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from 'recharts';
import { useTranslations } from 'next-intl';
import { useEffect, useState } from 'react';
import { loadOrders } from '../model/orders-slice';

const OrdersChart = () => {
  const dispatch = useDispatch<AppDispatch>();

  const orders = useSelector((state: RootState) => state.orders.orders);
  const loading = useSelector((state: RootState) => state.orders.loading);
  const tOrdersChart = useTranslations('OrdersChart');

  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    dispatch(loadOrders()).finally(() => {
      setIsInitialized(true);
    });
  }, [dispatch, orders.length]);

  if (loading || (!isInitialized && orders.length === 0)) {
    return (
      <div
        className='card p-4 shadow-box bg-white rounded-3 placeholder-glow'
        style={{ width: '100%', height: 350 }}
      >
        <div className='card-title mb-3 h5'>
          <span className='placeholder col-4 rounded' />
        </div>
        {/* Имитируем сетку графика тонкими линиями скелетона */}
        <div className='d-flex flex-column justify-content-between h-100 pb-4 pt-2'>
          <span
            className='placeholder col-12 bg-secondary opacity-10'
            style={{ height: '2px' }}
          />
          <span
            className='placeholder col-12 bg-secondary opacity-10'
            style={{ height: '2px' }}
          />
          <span
            className='placeholder col-12 bg-secondary opacity-10'
            style={{ height: '2px' }}
          />
          <div className='d-flex justify-content-around mt-2'>
            <span className='placeholder col-1 rounded' />
            <span className='placeholder col-1 rounded' />
            <span className='placeholder col-1 rounded' />
            <span className='placeholder col-1 rounded' />
          </div>
        </div>
      </div>
    );
  }

  if (isInitialized && (!orders || orders.length === 0)) {
    return (
      <div
        className='card p-4 text-center text-secondary shadow-box mb-4 d-flex align-items-center justify-content-center'
        style={{ height: 350 }}
      >
        <div>
          <i className='bi bi-bar-chart text-muted fs-2 mb-2 d-block'></i>
          {tOrdersChart('noData')}
        </div>
      </div>
    );
  }

  const data = prepareChartData(orders);

  return (
    <div
      className='card p-4 shadow-box bg-white rounded-3'
      style={{ width: '100%', height: 350 }}
    >
      <h5 className='card-title fw-semibold mb-3 text-dark'>
        {tOrdersChart('title')}
      </h5>

      {/* ResponsiveContainer растягивает график под размеры родительского div */}
      <ResponsiveContainer width='100%' height='90%' minHeight={100}>
        <AreaChart
          data={data}
          margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
        >
          <defs>
            {/* Градиенты для красивой заливки */}
            <linearGradient id='colorUsd' x1='0' y1='0' x2='0' y2='1'>
              <stop offset='5%' stopColor='#0d6efd' stopOpacity={0.2} />
              <stop offset='95%' stopColor='#0d6efd' stopOpacity={0} />
            </linearGradient>
            <linearGradient id='colorUah' x1='0' y1='0' x2='0' y2='1'>
              <stop offset='5%' stopColor='#198754' stopOpacity={0.2} />
              <stop offset='95%' stopColor='#198754' stopOpacity={0} />
            </linearGradient>
          </defs>

          <CartesianGrid strokeDasharray='3 3' stroke='#f0f0f0' />
          <XAxis
            dataKey='name'
            stroke='#6c757d'
            fontSize={12}
            tickLine={false}
          />
          <YAxis stroke='#6c757d' fontSize={12} tickLine={false} />

          {/* Интерактивная подсказка при наведении */}
          <Tooltip
            contentStyle={{
              backgroundColor: '#fff',
              borderRadius: '8px',
              border: '1px solid #e0e0e0',
            }}
          />
          <Legend wrapperStyle={{ paddingTop: '10px' }} />

          <Area
            type='monotone'
            dataKey='USD'
            name={`${tOrdersChart('sum')} USD ($)`}
            stroke='#0d6efd'
            strokeWidth={2}
            fillOpacity={1}
            fill='url(#colorUsd)'
          />

          <Area
            type='monotone'
            dataKey='UAH'
            name={`${tOrdersChart('sum')} UAH (₴)`}
            stroke='#198754'
            strokeWidth={2}
            fillOpacity={1}
            fill='url(#colorUah)'
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default OrdersChart;
