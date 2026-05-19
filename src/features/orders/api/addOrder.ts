// src/features/orders/api/addOrder.ts

import { GRAPHQL_SERVER_URL } from '@/api/config';
import { serverError } from '@/api/errorHandler';
import axios from 'axios';

export interface AddOrderInput {
  title: string;
  description: string;
}

export const addOrder = async (input: AddOrderInput) => {
  try {
    const response = await axios.post(
      GRAPHQL_SERVER_URL,
      {
        query: `
          mutation AddOrder($input: OrderInput!) {
            addOrder(input: $input) {
              _id
              id
              title
              date
              description
              products {
                id
                title
                price {
                  value
                  symbol
                }
              }
            }
          }
        `,
        variables: {
          input: {
            title: input.title,
            description: input.description,
            date: new Date().toISOString(),
            products: [],
          },
        },
      },
      {
        headers: { 'Content-Type': 'application/json' },
      },
    );

    if (response.data.errors) throw new Error(response.data.errors[0].message);

    return response.data.data.addOrder;
  } catch (error) {
    serverError(error);
    throw error;
  }
};
