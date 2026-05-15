import { AppDispatch, RootState } from '@/store';
import { setSelectedType } from '@/store/products-slice';
import { useTranslations } from 'next-intl';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';

const ProductsTypeSelector = () => {
  const dispatch = useDispatch<AppDispatch>();
  const t = useTranslations('ProductsFilter');

  const products = useSelector((state: RootState) => state.products.products);
  const selectedType = useSelector(
    (state: RootState) => state.products.selectedType,
  );

  // Filtering Data By
  const productTypes = [
    'all',
    // t('all'),
    ...Array.from(new Set(products.map((p) => p.type))),
  ];
  console.log(products.map((p) => p.type));
  return (
    <div className='mb-3 fade-in'>
      <label className='form-label'>{t('productType')}:</label>
      <select
        className='form-select cursor__pointer'
        aria-label='Default select example'
        value={selectedType}
        onChange={(e) => dispatch(setSelectedType(e.target.value))}
      >
        {productTypes.map((type) => (
          <option
            key={type}
            value={type}
            className='cursor__pointer nav-link--custom'
          >
            {/* {t(`${type}`)} */}
            {t(type)}
            {/* {type} */}
          </option>
        ))}
      </select>
    </div>
  );
};

export default ProductsTypeSelector;
