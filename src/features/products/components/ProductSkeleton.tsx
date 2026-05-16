// src/features/products/components/ProductSkeleton.tsx

const ProductSkeleton = () => {
  return (
    <li
      className='card mb-3 w-100 shadow-box flex-shrink-0 placeholder-glow'
      aria-hidden='true'
    >
      <div className='card-body d-flex align-items-center'>
        <div
          className='placeholder rounded me-3'
          style={{ width: '80px', height: '80px', flexShrink: 0 }}
        />

        <div className='w-100'>
          <h5 className='card-title placeholder col-6 mb-2' />
          <p className='card-text placeholder col-8 mb-0' />
        </div>
      </div>
    </li>
  );
};

export default ProductSkeleton;
