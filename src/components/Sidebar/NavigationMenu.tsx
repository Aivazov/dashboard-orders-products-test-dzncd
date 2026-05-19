// src/components/Sidebar/Sidebar.tsx

'use client';
import { FaListUl } from 'react-icons/fa6';
import { HiOutlineShoppingBag } from 'react-icons/hi';
import SidebarMenuItem from './SidebarMenuItem';
import { useTranslations } from 'next-intl';

const NavigationMenu = () => {
  const t = useTranslations('Sidebar');
  return (
    <nav
      className='shadow p-3 flex flex-col justify-between'
      // className='shadow p-3 d-flex flex-column fixed justify-content-between'
      style={{ maxWidth: '350px', height: '90vh' }}
    >
      <ul className='nav flex-column gap-3'>
        <SidebarMenuItem
          name={t('menuItemOrders')}
          path='/orders'
          Icon={FaListUl}
        />
        <SidebarMenuItem
          name={t('menuItemProducts')}
          path='/products'
          Icon={HiOutlineShoppingBag}
        />
      </ul>
    </nav>
  );
};

export default NavigationMenu;
