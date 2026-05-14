// src/app/page.tsx

import Link from 'next/link';

export default function Home() {
  return (
    <main>
      <h1>Home</h1>
      <nav>
        <ul>
          <li className='d-flex align-items-center gap-2'>
            <Link href='/orders'>Orders</Link>
          </li>
          <li>
            <Link href='/products'>Products</Link>
          </li>
        </ul>
      </nav>
    </main>
  );
}
