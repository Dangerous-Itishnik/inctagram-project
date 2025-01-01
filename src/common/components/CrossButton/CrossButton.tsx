import { SvgClose } from '@/assets/icons/components/Close'

import styles from '@/common/components/CrossButton/crossButton.module.scss'

export const CrossButton = ({ onClose }) => {
  const handelCloseAddPhoto = () => {
    if (typeof onClose === 'function') {
      onClose()
    }
  }

  return (
    <div className={styles.crossComponent}>
      <SvgClose handelCloseAddPhoto={handelCloseAddPhoto} />
    </div>
  )
}
