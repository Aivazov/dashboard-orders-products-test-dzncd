// src/app/[locale]/layout.tsx

import { Geist, Geist_Mono } from 'next/font/google';
import MainDashboard from '@/components/MainDashboard/MainDashboard';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';

// const geistSans = Geist({ variable: '--font-geist-sans', subsets: ['latin'] });
// const geistMono = Geist_Mono({
//   variable: '--font-geist-mono',
//   subsets: ['latin'],
// });

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  // Проверка на корректность локали
  if (!routing.locales.includes(locale as any)) {
    notFound();
  }

  const messages = await getMessages();

  return (
    // <html
    //   lang={locale}
    //   className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    // >
    <NextIntlClientProvider messages={messages} locale={locale}>
      <MainDashboard>
        <main className='flex-grow-1 p-3'>{children}</main>
      </MainDashboard>
    </NextIntlClientProvider>
    // </html>
  );
}
