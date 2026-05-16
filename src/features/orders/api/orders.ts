// /src/features/orders/api/orders.ts

import axios from 'axios';

export const fetchOrders = async () => {
  try {
    const response = await axios.post(
      'http://localhost:3001/graphql',
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

    return response.data.data.orders;
  } catch (error) {
    console.log('Error fetching orders: ', error);

    throw error;
  }
};
