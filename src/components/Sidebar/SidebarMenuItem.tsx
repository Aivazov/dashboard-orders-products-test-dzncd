import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { IconType } from 'react-icons';

type Props = {
  name: string;
  path: string;
  pathnameProp: string;
  Icon: IconType;
};

const NavigationMenuItem = ({ name, path, pathnameProp, Icon }: Props) => {
  const pathname = usePathname();
  return (
    <li className='nav-item'>
      <Link
        className={`nav-link--custom d-flex align-items-center gap-3 text-decoration-none w-100 p-2 rounded cursor-pointer ${pathname === pathnameProp ? 'active' : ''}`}
        href={path}
      >
        <Icon size={20} />
        {name}
      </Link>
    </li>
  );
};

export default NavigationMenuItem;
