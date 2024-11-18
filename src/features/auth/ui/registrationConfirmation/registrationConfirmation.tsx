'use client'

import image from '@/assets/images/confirmation.png'
import { Button } from '@/common/components/button'
import { Typography } from '@/common/components/typography'
import Image from 'next/image'
import Link from 'next/link'

import styles from './registrationConfirmation.module.scss'

export function RegistrationConfirmation() {
  return (
    <div className={styles.container}>
      <Typography variant={'h1'}>Congratulations!</Typography>
      <Typography className={styles.text} variant={'body1'}>
        Your email has been confirmed
      </Typography>
      <Button as={Link} href={'/signIn'} variant={'primary'}>
        Sign In
      </Button>
      <Image
        alt={'Picture of girl'}
        priority
        src={image}
        style={{ display: 'block', marginTop: '72px' }}
      />
    </div>
  )
}
