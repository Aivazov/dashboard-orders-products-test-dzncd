// src/components/TopMenu/TopMenu.tsx

import LocaleSwitcher from './LocaleSwitcher';
import Logo from './Logo';
// import Searchbar from './Searchbar';
// import SessionCounter from './SessionCounter';
// import LogoutBtn from '../LogoutBtn';
import TopMenuDate from './TopMenuDate';

type Props = {};

const TopMenu = (props: Props) => {
  return (
    <header
      className='w-100 justify-content-center align-items-center d-flex shadow-box py-0'
      style={{ height: '10vh' }}
    >
      <div
        className='d-flex align-items-center w-100 m-0 justify-content-between'
        style={{ maxWidth: '1024px' }}
      >
        <div className='w-50 d-flex align-items-center justify-content-between'>
          <Logo />
          {/* <Searchbar /> */}
        </div>
        <div className='d-flex align-items-center gap-2'>
          {/* <SessionCounter /> */}
          <TopMenuDate />
          <LocaleSwitcher />
          {/* <LogoutBtn /> */}
        </div>
      </div>
    </header>
  );
};

export default TopMenu;
