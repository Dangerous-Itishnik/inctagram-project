import type { Metadata } from 'next'

import { ReactNode } from 'react'

export const metadata: Metadata = {
  description: 'Generated by create next app',
  title: 'Create Next App',
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang={'en'}>
      <body>{children}</body>
    </html>
  )
}