import { OrderProducts } from '../types';

type Currency = 'USD' | 'UAH';

export const calculateCurrencyTotal = (
  orderedProducts: OrderProducts[],
  currency: Currency,
) => {
  return orderedProducts.reduce(
    (sum, product) =>
      sum +
      (product.price.find((price) => price.symbol === currency)?.value || 0),
    0,
  );
};
