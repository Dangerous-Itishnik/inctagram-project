'use client'

import { Typography } from '@/common/components/Typography'
import { Button } from '@/common/components/button'
import Image from 'next/image'
import Link from 'next/link'

import styles from './registrationConfirmation.module.scss'

export function RegistrationConfirmation() {
  return (
    <div className={styles.container}>
      <Typography variant={'h1'}>Congratulations!</Typography>
      <Typography className={styles.text}>Your email has been confirmed</Typography>
      <Button as={Link} href={'/auth/signIn'} variant={'primary'}>
        Sign In
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
