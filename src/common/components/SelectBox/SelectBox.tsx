import { useState } from 'react'
import Select from 'react-select'

import { SvgFlagRussia } from '@/assets/icons/components/FlagRussia'
import { SvgFlagUnitedKingdom } from '@/assets/icons/components/FlagUnitedKingdom'

import styles from '@/common/components/SelectBox/selectBox.module.scss'

const options = [
  {
    label: (
      <div className={styles.label}>
        <SvgFlagRussia className={styles.flag} />
        <span>Russian</span>
      </div>
    ),
    value: 'russian',
  },
  {
    label: (
      <div className={styles.label}>
        <SvgFlagUnitedKingdom className={styles.flag} />
        <span>English</span>
      </div>
    ),
    value: 'english',
  },
]

export const SelectBox = () => {
  const [selectOption, setSelectOption] = useState('english')

  //TODO: Типизировать newOption
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleSelectChange = (newOption: any) => {
    setSelectOption(newOption.value)
  }

  const getValue = () => {
    return selectOption ? options.find(f => f.value === selectOption) : ''
  }

  return (
    <div className={styles.select}>
      <Select
        className={'custom-styles'}
        onChange={handleSelectChange}
        options={options}
        value={getValue()}
      />
    </div>
  )
}
