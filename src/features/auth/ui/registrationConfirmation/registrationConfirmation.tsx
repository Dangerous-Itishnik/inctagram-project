'use client'

import { Typography } from '@/common/components/Typography'
import { Button } from '@/common/components/button'
import { Link } from '@/i18n/navigation'
import Image from 'next/image'
import { useTranslations } from 'next-intl'

import styles from './registrationConfirmation.module.scss'

export function RegistrationConfirmation() {
  const t = useTranslations('auth')

  return (
    <div className={styles.container}>
      <Typography variant={'h1'}>{t('congratulations')}</Typography>
      <Typography className={styles.text}>{t('confirmedEmail')}</Typography>
      <Button variant={'primary'}>
        <Link href={'/auth/signIn'}>{t('signIn')}</Link>
      </Button>
      <Image
        alt={'Picture of girl'}
        height={300}
        priority
        src={'/images/confirmation.png'}
        style={{ display: 'block', marginTop: '72px' }}
        width={432}
      />
    </div>
  )
}
