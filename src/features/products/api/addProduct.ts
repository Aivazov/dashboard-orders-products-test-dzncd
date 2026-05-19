// src/features/products/api/addProduct.ts

import { GRAPHQL_SERVER_URL } from '@/api/config';
import { serverError } from '@/api/errorHandler';
import axios from 'axios';

export interface AddProductInput {
  title: string;
  type: string;
  serialNumber: string;
  isNewProduct: boolean;
  priceUSD: number;
  priceUAH: number;
  guaranteeStart: string;
  guaranteeEnd: string;
  order: number;
}

export const addProduct = async (input: AddProductInput) => {
  try {
    const response = await axios.post(
      GRAPHQL_SERVER_URL,
      {
        query: `
          mutation AddProduct($input: ProductInput!) {
            addProduct(input: $input) {
              id
              title
              type
              serialNumber
              isNewProduct
              photo
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
              order
            }
          }
        `,
        variables: {
          input: {
            title: input.title,
            type: input.type,
            serialNumber: input.serialNumber,
            isNewProduct: input.isNewProduct,
            price: [
              { value: input.priceUSD, symbol: 'USD', isDefault: false },
              { value: input.priceUAH, symbol: 'UAH', isDefault: true },
            ],
            guarantee: {
              start: input.guaranteeStart,
              end: input.guaranteeEnd,
            },
            order: input.order,
            date: new Date().toISOString(),
          },
        },
      },
      {
        headers: { 'Content-Type': 'application/json' },
      },
    );

    if (response.data.errors) throw new Error(response.data.errors[0].message);

    return response.data.data.addProduct;
  } catch (error) {
    serverError(error);
    throw error;
  }
};
