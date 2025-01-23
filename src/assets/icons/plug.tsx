'use client'

import { SvgImageOutline } from '@/assets/icons/components/ImageOutline'

import styles from '@/features/posts/ui/createPost/slider.module.scss'

export const Plug = ({ onClick }) => {
  const handelImageOutline = () => {
    // TODO Что это?
    if (typeof onClick === 'function') {
      onClick()
    } else {
      console.error('onClick is not a function')
    }
  }

  return (
    <div className={styles.plug}>
      <SvgImageOutline handelImageOutline={handelImageOutline} />
    </div>
  )
}
