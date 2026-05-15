import { Product } from '../../types';
import css from '../../styles/Products.module.css';

type ProductTitleProps = {
  product: Product;
};

const ProductTitle = ({ product }: ProductTitleProps) => {
  return (
    <div
      className={`d-flex flex-column justify-content-start ${css.maxWidth90}`}
    >
      <h5 className='card-title mb-0'>{product.title}</h5>
      <p className='card-text'>
        <small className='text-body-secondary'>{product.serialNumber}</small>
      </p>
    </div>
  );
};

export default ProductTitle;
