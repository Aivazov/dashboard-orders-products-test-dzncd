//middleware.ts
import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';
// import { routing } from './i18n/routing';

// export default createMiddleware(routing);

// export const config = {
//   // matcher to pass by system files to search locales in the paths
//   matcher: ['/((?!api|trpc|_next|_vercel|.*\\..*).*)'],
// };
export default createMiddleware({
  ...routing,
  // 'always' гарантирует, что даже на главной будет /en или /ru
  // 'as-needed' уберет префикс для дефолтной локали (может путать)
  localePrefix: 'always',
});

export const config = {
  // Важно: убедись, что корень '/' попадает под этот паттерн
  matcher: [
    // Стандартный матчер для next-intl
    '/',
    '/(ru|en)/:path*',
    '/((?!api|_next|_vercel|.*\\..*).*)',
  ],
};
