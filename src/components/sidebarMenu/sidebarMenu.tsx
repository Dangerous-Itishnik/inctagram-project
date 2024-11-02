'use client'
import React, { useState } from 'react'

import { menuItems } from '@/components/sidebarMenu/menuItems'
import { SidebarLink } from '@/components/sidebarMenu/sidebarLink'

import s from './sidebarMenu.module.scss'

export const SidebarMenu = () => {
  const [activeItemId, setActiveItemId] = useState<null | number>(null)

  const handleClick = (itemId: number) => {
    setActiveItemId(itemId)
  }

  return (
    <div className={s.sidebar}>
      <div className={s.sidebarWrapper}>
        {menuItems.map(item => (
          <SidebarLink
            href={item.href}
            icon={React.cloneElement(item.icon as React.ReactElement, {
              isActive: activeItemId === item.id,
            })}
            isActive={activeItemId === item.id}
            isDisabled={item.isDisabled}
            key={item.id}
            label={item.label}
            onClick={() => !item.isDisabled && handleClick(item.id)}
          />
        ))}
      </div>
    </div>
  )
}
