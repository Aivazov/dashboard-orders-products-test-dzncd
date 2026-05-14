// src/components/TopMenu/LocaleSwitcher.tsx
'use client';

import { useLocale } from 'next-intl';
import { useRouter, usePathname } from '@/i18n/navigation';
import { routing } from '@/i18n/routing';
import { ChangeEvent } from 'react';

const LocaleSwitcher = () => {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  function onSelectChange(event: ChangeEvent<HTMLSelectElement>) {
    const nextLocale = event.target.value;
    // router.replace перенаправит на ту же страницу, но с новой локалью
    router.replace(pathname, { locale: nextLocale });
  }
  return (
    <div className='ms-2'>
      <select
        className='form-select form-select-sm'
        defaultValue={locale}
        onChange={onSelectChange}
        style={{ width: 'auto', cursor: 'pointer' }}
      >
        {routing.locales.map((cur) => (
          <option key={cur} value={cur}>
            {cur.toUpperCase()}
          </option>
        ))}
      </select>
    </div>
  );
};

export default LocaleSwitcher;
