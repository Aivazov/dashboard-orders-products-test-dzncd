import { Link, usePathname } from '@/i18n/navigation';
import { IconType } from 'react-icons';

type Props = {
  name: string;
  path: string;
  Icon: IconType;
};

const NavigationMenuItem = ({ name, path, Icon }: Props) => {
  const pathname = usePathname();
  const isActive = path === pathname;

  return (
    <li className='nav-item'>
      <Link
        href={path}
        className={`nav-link--custom d-flex align-items-center gap-3 text-decoration-none w-100 p-2 rounded cursor-pointer ${isActive ? 'active' : ''}`}
      >
        <Icon size={20} />
        {name}
      </Link>
    </li>
  );
};

export default NavigationMenuItem;
