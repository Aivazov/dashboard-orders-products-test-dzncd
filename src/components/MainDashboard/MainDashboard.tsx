// src/components/MainDashboard/MainDashboard.tsx
'use client';
import React from 'react';
import Sidebar from '../Sidebar/Sidebar';
import TopMenu from '../TopMenu/TopMenu';
import { Provider } from 'react-redux';
import { store } from '@/store';

type MainDashboardProps = {
  children: React.ReactNode;
};

const MainDashboard = ({ children }: MainDashboardProps) => {
  return (
    <Provider store={store}>
      <TopMenu />

      <div className='d-flex'>
        <Sidebar />
        {children}
      </div>
    </Provider>
  );
};

export default MainDashboard;
