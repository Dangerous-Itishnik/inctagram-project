import { ImageCard } from '@/common/components/ImageCard/ImageCard'
import { ImagePostResponse } from '@/common/components/Posts/model/postsType'

import styles from './ImageList.module.scss'

type Props = {
  openModal?: () => void
  posts: ImagePostResponse[]
}
export const ImageList = ({ posts }: Props) => {
  return (
    <div className={styles.list} key={'image'}>
      {posts?.map((image, index) => (
        <ImageCard
          alt={`Image ${image.uploadId}`}
          height={image.height as number}
          id={index}
          key={image.uploadId}
          openModal={() => {}}
          //postId={data[index]}
          priority
          src={image.url}
          width={image.width as number}
        />
      ))}
    </div>
  )
}
