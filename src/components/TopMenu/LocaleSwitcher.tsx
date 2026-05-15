// src/components/TopMenu/LocaleSwitcher.tsx
'use client';

import { useLocale } from 'next-intl';
import { useRouter, usePathname } from '@/i18n/navigation';
import { routing } from '@/i18n/routing';
import { ChangeEvent } from 'react';
import { MdLanguage } from 'react-icons/md';

const LocaleSwitcher = () => {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  function onSelectChange(event: ChangeEvent<HTMLSelectElement>) {
    const nextLocale = event.target.value;
    router.replace(pathname, { locale: nextLocale });
  }
  return (
    <div
      className='d-flex align-items-center px-2 py-1 bg-white rounded-pill shadow-sm border'
      style={{ width: 'fit-content' }}
    >
      <MdLanguage size={18} className='text-secondary me-2' />

      <select
        className='border-0 bg-transparent fw-semibold text-dark cursor-pointer'
        defaultValue={locale}
        onChange={onSelectChange}
        style={{
          outline: 'none',
          boxShadow: 'none',
        }}
      >
        {routing.locales.map((loc) => (
          <option key={loc} value={loc}>
            {loc.toUpperCase()}
          </option>
        ))}
      </select>
    </div>
  );
};

export default LocaleSwitcher;
