'use client'

import { useEffect } from 'react'

import { storage } from '@/common/utils/storage'
import { AuthUserHomePage } from '@/features/authUserHomePage'
import { PublicPage } from '@/features/publicPage/PublicPage'
import { usePathname } from '@/i18n/navigation'
import { routing } from '@/i18n/routing'
import { useGoogleLoginMutation, useMeQuery } from '@/service/auth'
import { Spinner } from '@radix-ui/themes'
import { useRouter, useSearchParams } from 'next/navigation'
import { useLocale, useTranslations } from 'next-intl'

import '@/styles/index.scss'

export default function Home() {
  const router = useRouter()
  const params = useSearchParams()
  const code = params.get('code')
  const [googleLogin] = useGoogleLoginMutation()
  const { data, isError, isLoading } = useMeQuery()
  const currentLocale = useLocale()

  useEffect(() => {
    const handleGoogleLogin = async (code: string) => {
      try {
        const res = await googleLogin({ code }).unwrap()

        storage.setToken(res.accessToken)
        router.replace('/createAccount')
      } catch (error) {
        console.error('Google Login Error:', error)
        router.replace('/auth/signIn')
      }
    }

    if (code) {
      handleGoogleLogin(code)
    }
  }, [code, googleLogin, router])
  const t = useTranslations('HomePage')

  const pathname = usePathname() // Получаем текущий путь

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newLocale = event.target.value

    if (newLocale === currentLocale) {
      return
    }

    // Удаляем текущую локаль из пути, если она есть
    const newPath = pathname.replace(new RegExp(`^/${currentLocale}`), '') || '/'

    // Формируем корректный URL с новой локалью
    router.push(`/${newLocale}${newPath}`)
  }
  const locale = useLocale()

  return (
    <>
      <select defaultValue={locale} onChange={handleChange}>
        {routing.locales.map(cur => (
          <option key={cur} value={cur}>
            {cur}
          </option>
        ))}
      </select>
      <h1>{t('title')}</h1>
      {isLoading && !data && <Spinner />}
      {isError && <PublicPage />}
      {data && !isError && <AuthUserHomePage meData={data} />}
    </>
  )
}
