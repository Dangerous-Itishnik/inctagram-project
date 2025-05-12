import { ItemsImages } from '@/service/posts/post.type'
import Image from 'next/image'
import { Navigation, Pagination, Scrollbar } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'

// eslint-disable-next-line import/extensions
import 'swiper/css'
// eslint-disable-next-line import/extensions
import 'swiper/css/navigation'
// eslint-disable-next-line import/extensions
import 'swiper/css/pagination'
// eslint-disable-next-line import/extensions
import 'swiper/css/scrollbar'

import styles from './SwiperSlider.module.scss'

type Props = {
  imagesUrl: ItemsImages[]
  start: boolean
}
//TODO Это я не знаю что. НАдо исправить

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
      {imagesUrl?.map((image: ItemsImages, index: number) => {
        if (!image.url && image.width > 1400) {
          return null
        }

        return (
          <SwiperSlide
            className={start ? styles.img : ''}
            key={index}
            style={{ position: 'relative' }}
          >
            <Image
              alt={`Image ${index}`}
              fill
              priority
              sizes={'80vw'}
              src={image.url}
              style={{ height: '100%', objectFit: 'cover', width: '100%' }}
            />
          </SwiperSlide>
        )
      })}
    </Swiper>
  )
}
