import React from 'react'

import { CreateIcon } from '@/icon/create/createIcon'
import { FavoritesIcon } from '@/icon/favorite/favoritesIcon'
import { HomeIcon } from '@/icon/home/homeIcon'
import { LogOutIcon } from '@/icon/logOut/logOutIcon'
import { MessengerIcon } from '@/icon/messenger/messengerIcon'
import { MyProfileIcon } from '@/icon/myProfile/myProfileIcon'
import { SearchIcon } from '@/icon/search/searchIcon'
import { StatisticsIcon } from '@/icon/statistics/statisticsIcon'

type MenuItem = {
  href: string
  icon: React.ReactNode
  id: number
  isDisabled?: boolean
  label: string
}

export const menuItems: MenuItem[] = [
  { href: '/', icon: <HomeIcon />, id: 1, label: 'Home' },
  { href: '/page/create', icon: <CreateIcon />, id: 2, label: 'Create' },
  { href: '/page/myProfile', icon: <MyProfileIcon />, id: 3, label: 'My Profile' },
  { href: '/page/messenger', icon: <MessengerIcon />, id: 4, label: 'Messenger' },
  { href: '/page/search', icon: <SearchIcon />, id: 5, label: 'Search' },
  {
    href: '/page/statistics',
    icon: <StatisticsIcon />,
    id: 6,
    label: 'Statistics',
  },
  { href: '/page/favorites', icon: <FavoritesIcon />, id: 7, label: 'Favorites' },
  { href: '/page/logOut', icon: <LogOutIcon />, id: 8, isDisabled: true, label: 'Log Out' },
]
