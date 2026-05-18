import { useEffect, useState } from 'react';
import { io, Socket } from 'socket.io-client';
import Spinner from '../ui/Modal/Spinner';
import { useTranslations } from 'next-intl';
import { SOCKET_SERVER_URL } from '@/api/config';

const ActiveSessionsCounter = () => {
  const t = useTranslations('TopMenu');
  const [activeUsers, setActiveUsers] = useState<number>(0);

  useEffect(() => {
    // Connection init
    const socket: Socket = io(SOCKET_SERVER_URL);

    // listen to event from the server
    socket.on('counter-update', (count: number) => {
      setActiveUsers(count);
    });

    // disconnecting when unmount
    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <div
      className='d-flex align-items-center text-secondary font-monospace p-3'
      style={{ fontSize: '1rem' }}
    >
      {/* {activeUsers && ( */}
      <span className='fw-bold'>
        {t('sessions')}: {!activeUsers ? <Spinner /> : activeUsers}
      </span>
      {/* )} */}
    </div>
  );
};

export default ActiveSessionsCounter;
