// /src/features/orders/api/orders.ts

import { GRAPHQL_SERVER_URL } from '@/api/config';
import { serverError } from '@/api/errorHandler';
import axios from 'axios';

export const fetchOrders = async () => {
  try {
    const response = await axios.post(
      GRAPHQL_SERVER_URL,
      {
        query: `
          query {
            orders {
              _id
              id
              title
              date
              description
              products {
                _id
                id
                title
                photo
                serialNumber
                type
                isNewProduct
                date
                guarantee {
                  start
                  end
                }
                price {
                  value
                  symbol
                  isDefault
                }
              }
            }
          }
        `,
      },
      {
        headers: {
          'Content-type': 'application/json',
        },
      },
    );

    if (response.data.errors) throw new Error(response.data.errors[0].message);
    // console.log('data from features/orders/api/orders.ts: ', response.data.data.orders);

    return response.data.data.orders;
  } catch (error) {
    serverError(error);

    // console.log('Error fetching orders: ', error);

    throw error;
  }
};
