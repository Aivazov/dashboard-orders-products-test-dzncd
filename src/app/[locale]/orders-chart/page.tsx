// src/app/[locale]/orders-chart/page.tsx
import OrdersChart from '@/features/orders/components/OrdersChart';

type Props = {};

const page = (props: Props) => {
  return (
    <div className='p-4'>
      <OrdersChart />
    </div>
  );
};

export default page;
