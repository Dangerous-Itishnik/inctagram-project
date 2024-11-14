import type { Metadata } from 'next'

import React, { ReactNode } from 'react'

import { Auth } from '@/app/Auth'
import { Theme } from '@radix-ui/themes'
import Link from 'next/link'

import '@/styles/index.scss'

import styles from './layout.module.scss'

import { Providers } from './providers'

export const metadata: Metadata = {
  description: 'Generated by create next app',
  title: 'Create Next App',
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang={'en'}>
      <body>
        <Theme className={styles.bodyContainer} style={{ backgroundColor: 'transparent' }}>
          <header className={styles.header}>
            <Link href={'/signUp'}>signUp</Link>
            <br />
            <Link href={'/signIn'}>signIn</Link>
            <br />
            <Link href={'/profile'}>profile</Link>
          </header>
          <main className={styles.main}>
            <Providers>
              <Auth>{children}</Auth>
            </Providers>
          </main>
        </Theme>
      </body>
    </html>
  )
}
