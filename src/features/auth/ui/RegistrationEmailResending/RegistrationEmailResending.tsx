'use client'

import { Input } from '@/common/components/Input'
import { Button } from '@/common/components/button'
import { Typography } from '@/common/components/typography'
import Image from 'next/image'
import Link from 'next/link'

import styles from './RegistrationEmailResending.module.scss'

export function RegistrationEmailResending() {
  return (
    <div className={styles.container}>
      <Typography variant={'h1'}>Email verification link expired</Typography>
      <Typography className={styles.text} variant={'body1'}>
        Looks like the verification link has expired. Not to worry, we can send the link again
      </Typography>
      <Input label={'Email'}></Input>
      <Button as={Link} href={'/signUp'} variant={'primary'}>
        Resend verification link
      </Button>
      <Image
        alt={'Picture of girl'}
        height={352}
        priority
        src={'/images/resending-email.png'}
        style={{ display: 'block', marginTop: '72px' }}
        width={473}
      />
    </div>
  )
}
