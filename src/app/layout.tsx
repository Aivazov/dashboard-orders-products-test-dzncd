// src/app/layout.tsx

import './globals.css';
// import { Geist, Geist_Mono } from 'next/font/google';
import 'bootstrap/dist/css/bootstrap.min.css';

// const geistSans = Geist({ variable: '--font-geist-sans', subsets: ['latin'] });
// const geistMono = Geist_Mono({
//   variable: '--font-geist-mono',
//   subsets: ['latin'],
// });

export default async function RootLayout({
  children,
  // params,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // const { locale } = await params;
  return children;
  //   (
  //   <html
  //     lang={locale}
  //     className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
  //   >
  //     <body className='min-h-full flex flex-col'>{children}</body>
  //   </html>,
  // );
}
