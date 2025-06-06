import type { Metadata } from 'next'

import { ReactNode } from 'react'
import { ToastContainer } from 'react-toastify'

import { Providers } from '@/app/[locale]/providers'
import { AppSideBar } from '@/common/components/AppSidebar'
import { Header } from '@/common/components/Header/Header'
import { Lang, routing } from '@/i18n/routing'
import { Theme } from '@radix-ui/themes'
import { notFound } from 'next/navigation'
import { NextIntlClientProvider } from 'next-intl'
import { getMessages } from 'next-intl/server'
import NextTopLoader from 'nextjs-toploader'

import '@/styles/index.scss'

import styles from './layout.module.scss'

export const metadata: Metadata = {
  description: 'Generated by create next app',
  title: 'INC-Project',
}

export default async function RootLayout({
  children,
  params,
}: {
  children: ReactNode
  params: Promise<{ locale: string }>
}) {
  // Ensure that the incoming `locale` is valid
  const { locale } = await params

  if (!routing.locales.includes(locale as Lang)) {
    notFound()
  }

  // Providing all messages to the client
  // side is the easiest way to get started
  const messages = await getMessages()

  return (
    <html lang={locale}>
      <body>
        <NextTopLoader color={'#397df6'} showSpinner={false} />
        <Providers>
          <Theme className={styles.bodyContainer} style={{ backgroundColor: 'transparent' }}>
            <NextIntlClientProvider messages={messages}>
              <Header />
              <div className={styles.mainBody}>
                <AppSideBar />
                <main className={styles.main}>{children}</main>
                <ToastContainer
                  autoClose={5000}
                  closeOnClick
                  draggable
                  hideProgressBar={false}
                  newestOnTop={false}
                  pauseOnFocusLoss
                  pauseOnHover
                  position={'top-center'}
                  rtl={false}
                  theme={'colored'}
                />
              </div>
            </NextIntlClientProvider>
          </Theme>
        </Providers>
      </body>
    </html>
  )
}
