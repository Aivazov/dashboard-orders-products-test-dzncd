'use client';
import { formatTime } from '@/utils/formatDate';
import React from 'react';
import { FaRegClock } from 'react-icons/fa6';

type Props = {};

const TopMenuDate = (props: Props) => {
  const [currentTime, setCurrentTime] = React.useState(new Date());

  React.useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const formatWeekday = (date: Date) => {
    const weekday = new Intl.DateTimeFormat('ru-RU', {
      weekday: 'long',
    }).format(date);
    return weekday.charAt(0).toUpperCase() + weekday.slice(1);
  };

  const formatDate = (date: Date) => {
    const options: Intl.DateTimeFormatOptions = {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    };

    return new Intl.DateTimeFormat('ru-RU', options).format(date);
  };

  return (
    <div className='d-flex justify-content-end border p-2 rounded-3 '>
      {/* <div className='w-50 d-flex justify-content-end'> only w-50 */}
      <div className='d-flex flex-column align-items-start text-start'>
        <p className='mb-0'>{formatWeekday(currentTime)}</p>
        <div className='d-flex gap-2'>
          <span className=''>{formatDate(currentTime)}</span>
          <span className='d-flex align-items-center'>
            <span className='me-1'>
              <FaRegClock className='logo__sign-color' />
            </span>{' '}
            {formatTime(currentTime)}
          </span>
        </div>
      </div>
    </div>
  );
};

export default TopMenuDate;
