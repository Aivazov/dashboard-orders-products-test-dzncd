// src/app/[locale]/layout.tsx

import { Geist, Geist_Mono } from 'next/font/google';
import MainDashboard from '@/components/MainDashboard/MainDashboard';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import '../globals.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const geistSans = Geist({ variable: '--font-geist-sans', subsets: ['latin'] });
const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as any)) {
    notFound();
  }

  setRequestLocale(locale);
  const messages = await getMessages();

  return (
    <html
      lang={locale}
      data-scroll-behavior='smooth'
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body>
        <NextIntlClientProvider messages={messages} locale={locale}>
          <MainDashboard>
            <main className='flex-grow-1'>{children}</main>
          </MainDashboard>

          {/* <Script
        src='https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js'
        integrity='sha384-1Cm2+gmf4+7Gm0gKm9d0Gl1tW+eoz+ncy0RZyG37lWltgP0bmzdd0tijE5FkwpQT'
        crossOrigin='anonymous'
        // strategy="afterInteractive"
        strategy='beforeInteractive'
      /> */}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
