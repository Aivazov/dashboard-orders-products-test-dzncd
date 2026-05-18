// /src/features/products/api/products.ts

import { GRAPHQL_SERVER_URL } from '@/api/config';
import axios from 'axios';

export const fetchProducts = async () => {
  try {
    const response = await axios.post(GRAPHQL_SERVER_URL, {
      query: `
        query {
          products {
            id
            title
            price {
              value
              symbol
            }
            type
            guarantee {
              start
              end
            }
            isNewProduct
            photo
            serialNumber
          }
        }
      `,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.data.errors) throw new Error(response.data.errors[0].message);
    return response.data.data.products;
    // const response = await fetch(GRAPHQL_SERVER_URL, {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify({
    //     query: `
    //       query {
    //         products {
    //           id
    //           title
    //           price {
    //             value
    //             symbol
    //           }
    //           type
    //           guarantee {
    //             start
    //             end
    //           }
    //           isNewProduct
    //           photo
    //           serialNumber
    //         }
    //       }
    //     `,
    //   }),
    // });

    // if (!response.ok) throw new Error('Failed to fetch products');

    // const data = await response.json();
    // if (data.errors) throw new Error(data.errors[0]?.message || 'GraphQL Error');

    // return data.data.products;
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
};
