'use client'

import { ArrowBackOutline } from '@/assets/icons/components'
import { useRouter } from 'next/navigation'

import s from './backButton.module.scss'

type Props = {
  title: string
}

export const BackButton = ({ title }: Props) => {
  const router = useRouter()

  const backPage = () => {
    router.back()
  }

  return (
    <div className={s.backButtonBox}>
      <ArrowBackOutline />
      <button className={s.backButton} onClick={backPage} type={'button'}>
        {title}
      </button>
    </div>
  )
}
