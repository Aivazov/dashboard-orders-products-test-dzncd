// src/app/[locale]/orders/page.tsx

import Products from '@/features/products/components/ProductsClient';

type Props = {};

const page = (props: Props) => {
  return (
    <>
      <Products />
    </>
  );
};

export default page;
