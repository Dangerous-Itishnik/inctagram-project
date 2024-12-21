import { SvgClose } from '@/assets/icons/components/Close'

import styles from '@/common/components/CrossButton/crossButton.module.scss'

export const CrossButton = ({ onClose }) => {
  const handelCloseAddPhoto = () => {
    onClose()
  }

  return (
    <div className={styles.crossComponent}>
      <SvgClose handelCloseAddPhoto={handelCloseAddPhoto} />
    </div>
  )
}
