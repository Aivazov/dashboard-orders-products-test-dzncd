// src/components/TopMenu/TopMenu.tsx

import ActiveSessionsCounter from './ActiveSessionsCounter';
import LocaleSwitcher from './LocaleSwitcher';
import Logo from './Logo';
// import Searchbar from './Searchbar';
// import LogoutBtn from '../LogoutBtn';
import TopMenuDate from './TopMenuDate';

const TopMenu = () => {
  return (
    <header
      className='w-100 justify-content-center align-items-center d-flex shadow-box py-0'
      style={{ height: '10vh' }}
    >
      <div
        className='d-flex align-items-center w-100 m-0 justify-content-between'
        style={{ maxWidth: '1024px' }}
      >
        <div className='w-50 d-flex align-items-center justify-content-start gap-3'>
          <Logo />
          <LocaleSwitcher />
          {/* <Searchbar /> */}
        </div>

        <div className='d-flex align-items-center gap-2'>
          <ActiveSessionsCounter />
          <TopMenuDate />
          {/* <LogoutBtn /> */}
        </div>
      </div>
    </header>
  );
};

export default TopMenu;
