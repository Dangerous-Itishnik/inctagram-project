'use client'

import { ChangeEvent, useState } from 'react'

import { Input } from '@/common/components/Input'
import { Typography } from '@/common/components/Typography/'
import { Button } from '@/common/components/button'
import { useRegEmailResendMutation } from '@/service/auth/auth.service'
import { AuthBaseResponse } from '@/service/auth/auth.types'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

import styles from './RegistrationEmailResending.module.scss'

export function RegistrationEmailResending() {
  const [email, setEmail] = useState('')
  const [regEmailResend, { error, isError, isLoading }] = useRegEmailResendMutation()
  const router = useRouter()
  const err = error as AuthBaseResponse

  const emailChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value)
  }

  const resendVerificationHandler = async () => {
    try {
      await regEmailResend({ email }).unwrap()
      router.push('/auth/signUp')
    } catch (err) {
      console.error('Failed to resend verification link:', err)
    }
  }

  return (
    <div className={styles.container}>
      <Typography variant={'h1'}>Email verification link expired</Typography>
      <Typography className={styles.text}>
        Looks like the verification link has expired. Not to worry, we can send the link again
      </Typography>
      <Input
        label={'Email'}
        onChange={emailChangeHandler}
        placeholder={'your.email@mail.com'}
        value={email}
      />
      {isError && <Typography variant={'error'}>{err.data.messages[0].message}</Typography>}
      <Button disabled={isLoading} onClick={resendVerificationHandler} variant={'primary'}>
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
