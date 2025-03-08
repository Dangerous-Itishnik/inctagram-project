import { createNavigation } from 'next-intl/navigation'
import { defineRouting } from 'next-intl/routing'
export type Lang = 'en' | 'ru'
export const routing = defineRouting({
  // Used when no locale matches
  defaultLocale: 'en',

  // A list of all locales that are supported
  locales: ['en', 'ru'],
})
