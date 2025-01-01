import { SvgImageOutline } from '@/assets/icons/components/ImageOutline'

import styles from '@/features/posts/ui/createPost/slider.module.scss'

export const Plug = ({ onclick }) => {
  const handelImageOutline = () => {
    onclick()
  }

  return (
    <div className={styles.plug}>
      <SvgImageOutline handelImageOutline={handelImageOutline} />
    </div>
  )
}
