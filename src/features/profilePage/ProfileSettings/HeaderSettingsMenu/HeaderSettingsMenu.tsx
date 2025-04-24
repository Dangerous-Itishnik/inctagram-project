import React, { useRef, useState } from 'react'

import { Button } from '@/common/components/button'
import { useMeQuery } from '@/service/auth'
import { useParams, usePathname, useRouter } from 'next/navigation'

import styles from '@/features/profilePage/ProfileSettings/HeaderSettingsMenu/headerSettingsMenu.module.scss'

export type TabType = 'accountManagement' | 'devices' | 'generalInformation' | 'myPayment'

type Props = {
  activeTab: TabType
  onTabChange: (tab: TabType) => void
}

export const HeaderSettingsMenu = React.forwardRef(
  ({ activeTab: propActiveTab, onTabChange }: Props, ref) => {
    const buttonRefs = useRef<(HTMLButtonElement | null)[]>([])
    const [activeButton, setActiveButton] = useState<null | number>(0)
    const params = useParams()
    const pathname = usePathname()
    const router = useRouter()
    const id = Number(params.userId)
    const [internalActiveTab, setInternalActiveTab] = useState<TabType>(
      propActiveTab || (pathname?.split('/').pop() as TabType) || 'generalInformation'
    )
    const activeTab = propActiveTab !== undefined ? propActiveTab : internalActiveTab
    const { data } = useMeQuery()

    const handleButtonClick = (action: () => void, index: number) => {
      const button = buttonRefs.current[index]

      if (button) {
        button.scrollIntoView({ behavior: 'smooth', block: 'center' })
      }
      setActiveButton(index)
      action()
    }

    const handleValueChange = (value: string) => {
      const tab = value as TabType

      if (onTabChange) {
        onTabChange(tab)
      } else {
        setInternalActiveTab(tab)
        router.push(`/profile/${id}/settings/${tab}`)
      }
    }

    return (
      <div className={styles.settingsHeader}>
        <Button
          className={activeButton === 0 ? styles.active : ''}
          onClick={() => handleButtonClick(openGeneralInformation, 0)}
          ref={el => (buttonRefs.current[0] = el)}
        >
          General information
        </Button>

        <Button
          className={activeButton === 1 ? styles.active : ''}
          // onClick={() => handleButtonClick(openDevices, 1)}
          onClick={() => handleValueChange('devices')}
          ref={el => (buttonRefs.current[1] = el)}
        >
          Devices
        </Button>

        <Button
          className={activeButton === 2 ? styles.active : ''}
          // onClick={() => handleButtonClick(handleValueChange('accountManagement'), 2)}
          onClick={() => handleValueChange('accountManagement')}
          ref={el => (buttonRefs.current[2] = el)}
          // value={activeTab}
        >
          Account Management
        </Button>

        <Button
          className={activeButton === 3 ? styles.active : ''}
          // onClick={() => handleButtonClick(openMyPayments, 3)}
          onClick={() => handleValueChange('myPayment')}
          ref={el => (buttonRefs.current[3] = el)}
        >
          My payments
        </Button>
      </div>
      // <div className={styles.settingsHeader}>
      //   <Link href={`/profile/${data?.userId}/settings/generalInformation`}>
      //     <Button
      //       className={activeButton === 0 ? styles.active : ''}
      //       onClick={() => onTabChange(openGeneralInformation, 0)}
      //       ref={el => (buttonRefs.current[0] = el)}
      //     >
      //       General information
      //     </Button>
      //   </Link>
      //
      //   <Link href={`/profile/${data?.userId}/settings/devices`}>
      //     <Button
      //       className={activeButton === 1 ? styles.active : ''}
      //       onClick={() => handleButtonClick(openDevices, 1)}
      //       ref={el => (buttonRefs.current[1] = el)}
      //     >
      //       Devices
      //     </Button>
      //   </Link>
      //
      //   <Link href={`/profile/${data?.userId}/settings/accountManagement`}>
      //     <Button
      //       className={activeButton === 2 ? styles.active : ''}
      //       onClick={() => handleButtonClick(openAccountManagement, 2)}
      //       ref={el => (buttonRefs.current[2] = el)}
      //     >
      //       Account Management
      //     </Button>
      //   </Link>
      //
      //   <Link href={`/profile/${data?.userId}/settings/myPayments`}>
      //     <Button
      //       className={activeButton === 3 ? styles.active : ''}
      //       onClick={() => handleButtonClick(openMyPayments, 3)}
      //       ref={el => (buttonRefs.current[3] = el)}
      //     >
      //       My payments
      //     </Button>
      //   </Link>
      // </div>
    )
  }
)
