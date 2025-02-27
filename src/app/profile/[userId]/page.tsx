'use client'

import { MyProfile } from '@/features/profilePage/MyProfile'
import { AccountTypeSettings } from '@/features/profilePage/ProfileSettings/AccountManagement/AccountTypeSettings'
import { Subscription } from '@/features/profilePage/ProfileSettings/AccountManagement/Subscription'
import { ContainerSettings } from '@/features/profilePage/ProfileSettings/ContainerSettings'
import { MyPayments } from '@/features/profilePage/ProfileSettings/MyPayments/MyPayments'

export default function Profile() {
  return (
    <div>
      {/*<h1>Profile Page</h1>*/}
      {/*<MyProfile />*/}
      {/*<ContainerSettings />*/}
      {/*<AccountTypeSettings />*/}
      {/*<Subscription />*/}
      <MyPayments />
    </div>
  )
}
