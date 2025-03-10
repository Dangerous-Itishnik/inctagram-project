import { useId, useState } from 'react'
import Select from 'react-select'

import { SvgFlagRussia } from '@/assets/icons/components/FlagRussia'
import { SvgFlagUnitedKingdom } from '@/assets/icons/components/FlagUnitedKingdom'
import { usePathname, useRouter } from '@/i18n/navigation'
import { Lang, routing } from '@/i18n/routing'
import { useLocale } from 'next-intl'

import styles from '@/common/components/SelectBox/selectBox.module.scss'

const options = [
  {
    label: (
      <div className={styles.label}>
        <SvgFlagRussia className={styles.flag} />
        <span>Russian</span>
      </div>
    ),
    title: 'russian',
    value: routing.locales[1],
  },
  {
    label: (
      <div className={styles.label}>
        <SvgFlagUnitedKingdom className={styles.flag} />
        <span>English</span>
      </div>
    ),
    title: 'english',
    value: routing.locales[0],
  },
]

export const SelectLanguage = () => {
  const currentLocale = useLocale()
  const { replace } = useRouter()
  const pathname = usePathname()

  const [selectOption, setSelectOption] = useState(
    options.find(option => option.value === currentLocale)
  )

  const onSelectChange = (newValue: any) => {
    const nextLocale = newValue.value as Lang

    setSelectOption(newValue)
    replace(`${pathname}`, { locale: nextLocale })
  }

  return (
    <Select
      className={styles.select}
      instanceId={useId()}
      onChange={onSelectChange}
      options={options}
      value={selectOption}
    />
  )
}
