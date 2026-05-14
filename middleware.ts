//middleware.ts
import createMiddleware from 'next-intl/middleware';
import { routing } from './src/i18n/routing';

export default createMiddleware(routing);

export const config = {
  // matcher to pass by system files to search locales in the paths
  matcher: ['/((?!api|trpc|_next|_vercel|.*\\..*).*)'],
};
