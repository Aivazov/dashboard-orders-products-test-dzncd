import { Order } from '@/features/orders/types';
import { calculateCurrencyTotal } from './calculateCurrencyTotal';

export const prepareChartData = (orders: Order[]) => {
  // Разворачиваем массив, чтобы старые приходы были слева, а новые справа
  return [...orders].reverse().map((order) => {
    const orderProducts = order.products || [];

    return {
      // Имя точки на оси X (например, "Поставка ноябрь")
      name:
        order.title.length > 15
          ? `${order.title.slice(0, 15)}...`
          : order.title,
      // Значения для линий/столбиков
      USD: calculateCurrencyTotal(orderProducts, 'USD'),
      UAH: calculateCurrencyTotal(orderProducts, 'UAH'),
      Количество: orderProducts.length,
    };
  });
};
