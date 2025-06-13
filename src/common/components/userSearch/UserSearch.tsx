'use client'
import { ChangeEvent, useState } from 'react'

import { Input } from '@/common/components/Input'

import styles from './userSearch.module.scss'

type UserSearchProps = {
  onSearch: (searchTerm: string) => void
}

const UserSearch = ({ onSearch }: UserSearchProps) => {
  const [searchTerm, setSearchTerm] = useState('')

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value

    setSearchTerm(value)
    onSearch(value)
  }

  return (
    <form onSubmit={e => e.preventDefault()}>
      <div className={styles.search}>
        <Input
          id={'search'}
          label={''}
          onChange={handleChange}
          placeholder={'Search by username'}
          type={'search'}
          value={searchTerm}
        />
      </div>
    </form>
  )
}

export default UserSearch
