// src/features/products/components/ProductCard/ProductCard.tsx

'use client';
import { Product } from '../../types';
import ProductImage from './ProductImage';
import ProductTitle from './ProductTitle';
import ProductGuaranteeData from './ProductGuaranteeData';
import ProductPrice from './ProductPrice';
import ProductOrder from './ProductOrder';
import ProductCondition from './ProductCondition';
import ProductType from './ProductType';

type ProductCardProps = {
  product: Product;
};

const ProductCard = ({ product }: ProductCardProps) => {
  return (
    <div className='d-flex align-content-center justify-content-between'>
      <ProductImage product={product} />

      <div className='d-flex align-items-center gap-3 justify-content-between w-100 px-4 text-left'>
        <ProductTitle product={product} />
        <ProductGuaranteeData product={product} />
        <ProductCondition product={product} />
        <ProductType product={product} />
        <ProductPrice product={product} />
        <ProductOrder product={product} />
      </div>
    </div>
  );
};

export default ProductCard;
