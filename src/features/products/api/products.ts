// /src/features/products/api/products.ts

export const fetchProducts = async () => {
  try {
    const response = await fetch('http://localhost:3001/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
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
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to fetch products');
    }

    const data = await response.json();
    // console.log('products data: ', data);
    if (data.errors) {
      console.error('GraphQL errors:', data.errors);
      throw new Error(data.errors[0]?.message || 'GraphQL Error');
    }
    return data.data.products;
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
};
