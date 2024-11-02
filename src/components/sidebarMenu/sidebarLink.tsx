import React from 'react'

import Link from 'next/link'

import s from './sidebarMenu.module.scss'

type SidebarLinkProps = {
  href: string
  icon: React.ReactNode
  isActive: boolean
  isDisabled?: boolean
  label: string
  onClick: () => void
}

export const SidebarLink = (props: SidebarLinkProps) => {
  const { href, icon, isActive, isDisabled, label, onClick } = props

  return (
    <Link
      aria-current={isActive ? 'page' : undefined}
      className={`${s.sidebarMenuItem} ${isDisabled ? s.disabled : ''} ${isActive ? s.active : ''}`}
      href={isDisabled ? '#' : href}
      onClick={onClick}
      tabIndex={isDisabled ? -1 : 0}
    >
      <div className={s.sidebarWrapperSpan}>
        <span className={s.icon}>{icon}</span>
        <span className={s.label}>{label}</span>
      </div>
    </Link>
  )
}
