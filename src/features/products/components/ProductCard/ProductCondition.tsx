import { Product } from '../../types';
import { useTranslations } from 'next-intl';
import css from '../../styles/Products.module.css';

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
