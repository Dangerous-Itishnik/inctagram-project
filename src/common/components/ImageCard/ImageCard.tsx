import Image from 'next/image'

import styles from './ImageCard.module.scss'
type Props = {
  openModal: () => void
}
export const ImageCard = ({ alt, height, openModal, postId, src, width }: Props) => {
  return (
    <>
      <div onClick={openModal}>
        <Image
          alt={alt}
          className={styles.image}
          height={height}
          key={postId}
          onLoad={() => true} // useLoader?
          priority
          src={src}
          width={width}
        />
      </div>
    </>
  )
}
