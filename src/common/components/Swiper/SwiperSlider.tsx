import Image from 'next/image'
import { Navigation, Pagination, Scrollbar } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'

import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import 'swiper/css/scrollbar'

import styles from "./SwiperSlider.module.scss"
import { ImagesAllUrl, ResponseImages } from "@/types/post.types";

type Props = {
  imagesUrl: ResponseImages[]
  star: boolean
}

export const SwiperSlider = ({ imagesUrl, start}: Props) => {
  return (
    <Swiper
      modules={[Navigation, Pagination, Scrollbar]}
      navigation
      pagination={{ clickable: true }}
      spaceBetween={10}
      slidesPerView={1}
      className={styles.postSlider}
      style={{ height: '100%', width: '100%' }}
    >
      {imagesUrl?.map((image:any, index: number) => {
        return (
          <SwiperSlide
            className={start ? styles.img : ''}
            style={{ position: 'relative' }}
            key={index}
          >
            <Image
              style={{ objectFit: 'contain' }}
              sizes="70vw"
              src={image.url}
              alt={`Image ${index}`}
              priority
              fill
            />
          </SwiperSlide>
        )
      })}
    </Swiper>
  )
}