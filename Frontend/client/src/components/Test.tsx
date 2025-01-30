"use client"

import React from "react"
import {Swiper, SwiperSlide} from "swiper/react"
import "swiper/css"
import "swiper/css/grid"
import "swiper/css/pagination"
import {Grid, Pagination, Navigation} from "swiper/modules"
import {FaArrowLeft, FaArrowRight} from "react-icons/fa" // Import icons
import styles from "./test.scss"

const SwiperGrid = () => {
  return (
    <div className={styles.swiperContainer}>
      <Swiper
        slidesPerView={3}
        grid={{rows: 2}}
        spaceBetween={30}
        pagination={{clickable: true}}
        navigation={{
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        }}
        modules={[Grid, Pagination, Navigation]}
        className={styles.swiper}
      >
        {Array.from({length: 9}, (_, i) => (
          <SwiperSlide key={i} className={styles.swiperSlide}>
            Slide {i + 1}
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Custom Navigation Buttons */}
      <button className="swiper-button-prev">
        <FaArrowLeft size={30} />
      </button>
      <button className="swiper-button-next">
        <FaArrowRight size={30} />
      </button>
    </div>
  )
}

export default SwiperGrid
