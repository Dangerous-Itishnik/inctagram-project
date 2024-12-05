import { ReactNode } from 'react'

import { BackButton } from '@/common/components/BackBotton/BackButton'

import s from './agreementsContainer.module.scss'

type Props = {
  backButtonTitle: string
  children: ReactNode
  title: string
}

export const AgreementsContainer = ({ backButtonTitle, children, title }: Props) => {
  return (
    <div className={s.container}>
      <BackButton title={backButtonTitle} />
      <h1 className={s.title}>{title}</h1>
      <div className={s.text}>{children}</div>
    </div>
  )
}
