import { formatDate } from '@/utils/formatDate';
import { Product } from '../../types';

type ProductGuaranteeDataProps = {
  product: Product;
};

const ProductGuaranteeData = ({ product }: ProductGuaranteeDataProps) => {
  return (
    <div className='d-flex flex-column justify-content-start'>
      <p className='card-text mb-0'>
        c {formatDate(product.guarantee.start, true)}
      </p>
      <p className='card-text'>по {formatDate(product.guarantee.end, true)}</p>
    </div>
  );
};

export default ProductGuaranteeData;
