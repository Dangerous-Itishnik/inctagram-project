import { useState } from 'react'

import { Slider } from '@/features/posts/ui/createPost/Slider'

import styles from '@/features/posts/ui/createPost/publication.module.scss'

export const Publication = ({ images }) => {
  const [openSlider, setOpenSlider] = useState<boolean>(false)

  const handeOpenlSlider = () => {
    setOpenSlider(true)
  }

  return (
    <div className={styles.publication}>
      <div className={styles.header}>
        <button onClick={handeOpenlSlider} type={'button'}>
          {'<'}
        </button>
        <h3>Publication</h3>
        <button className={styles.publish} type={'button'}>
          Publish
        </button>
      </div>
      <div className={styles.content}>
        <div className={styles.slider}>{openSlider ? <Slider images={images} /> : null}</div>
        <div className={styles.userData}></div>
      </div>
    </div>
  )
}
