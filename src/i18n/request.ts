// src/i18n/request.ts

import { getRequestConfig } from 'next-intl/server';
import { routing } from './routing';

export default getRequestConfig(async ({ requestLocale }) => {
  // Получаем локаль из аргумента
  let locale = await requestLocale;

  // Если пришло undefined (как у тебя сейчас), пробуем взять дефолтную
  if (!locale || !routing.locales.includes(locale as any)) {
    locale = routing.defaultLocale;
  }

  console.log('Final locale used for messages:', locale);

  return {
    locale,
    messages: (await import(`./lang/${locale}.json`)).default,
  };
});
// export default getRequestConfig(async ({ locale }) => {
//   const currentLocale =
//     locale && routing.locales.includes(locale as any)
//       ? locale
//       : routing.defaultLocale;

//   return {
//     locale: currentLocale,

//     messages: (await import(`./lang/${currentLocale}.json`)).default,
//   };
// });
