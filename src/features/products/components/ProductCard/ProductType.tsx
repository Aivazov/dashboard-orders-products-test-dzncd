import { useTranslations } from 'next-intl';
import { Product } from '../../types';

type ProductTypeProps = {
  product: Product;
};

const ProductType = ({ product }: ProductTypeProps) => {
  const t = useTranslations('ProductsFilter');
  return <p className='card-text mb-0'>{t(product.type)}</p>;
};

export default ProductType;
