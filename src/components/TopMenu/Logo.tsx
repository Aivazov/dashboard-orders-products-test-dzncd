import Image from 'next/image';
import Link from 'next/link';

const Logo = () => {
  return (
    <Link href='/' className='navbar-text text-decoration-none'>
      <div className='d-flex align-items-center gap-3'>
        <Image
          className='mr-5'
          src='/topMenuIcon.svg'
          alt='logo'
          width={40}
          height={40}
        />
        <p className='mb-0 text-uppercase logo__sign-color'>
          <b>Inventory</b>
        </p>
      </div>
    </Link>
  );
};

export default Logo;
