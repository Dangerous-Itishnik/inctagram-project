import { ResponseImages } from '@/service/posts/post.type'
import Image from 'next/image'
import { Navigation, Pagination, Scrollbar } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'

import styles from './SwiperSlider.module.scss'

type Props = {
  imagesUrl: ResponseImages[]
  star: boolean
}

export const SwiperSlider = ({ imagesUrl, start }: Props) => {
  return (
    <Swiper
      className={styles.postSlider}
      modules={[Navigation, Pagination, Scrollbar]}
      navigation
      pagination={{ clickable: true }}
      slidesPerView={1}
      spaceBetween={10}
      style={{ height: '100%', position: 'relative', width: '100%' }}
    >
      {imagesUrl?.map((image: ResponseImages, index: number) => {
        if (!image.url && image.width > 1400) {
          return null
        }

        return (
          <SwiperSlide
            className={start ? styles.img : ''}
            key={index}
            style={{ height: '100%', position: 'absolute', width: '100%' }}
          >
            <Image
              alt={`Image ${index}`}
              fill
              priority
              sizes={'70vw'}
              src={image.url}
              style={{ objectFit: 'contain' }}
            />
          </SwiperSlide>
        )
      })}
    </Swiper>
  )
}
