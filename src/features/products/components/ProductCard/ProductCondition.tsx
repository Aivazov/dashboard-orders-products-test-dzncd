import { Product } from '../../types';
import css from '../../styles/Products.module.css';
import { useTranslations } from 'next-intl';

type ProductConditionProps = {
  product: Product;
};

const ProductCondition = ({ product }: ProductConditionProps) => {
  const t = useTranslations('ProductsCard');
  return (
    <p className={`card-text mb-0 ${css.maxWidth50}`}>
      {product.isNewProduct ? t('conditionNew') : t('conditionUsed')}
    </p>
  );
};

export default ProductCondition;
