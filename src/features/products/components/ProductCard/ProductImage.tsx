import Image from 'next/image';
import { RootState } from '@/redux';
import { useSelector } from 'react-redux';
import { Product } from '../../types';

type ProductImageProps = {
  product: Product;
};

const ProductImage = ({ product }: ProductImageProps) => {
  const imageExists = useSelector(
    (state: RootState) => state.products.imageExists,
  );
  return (
    <div className=''>
      <Image
        src={imageExists[product.id] ? `/${product.photo}` : '/no-img.jpg'}
        width={150}
        height={150}
        className='img-fluid rounded-start'
        alt={product.title}
      />
    </div>
  );
};

export default ProductImage;
