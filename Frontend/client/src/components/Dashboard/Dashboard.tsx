"use client"

import React, {useEffect, useRef} from "react"
import {Swiper, SwiperSlide} from "swiper/react"
import "swiper/css"
import "swiper/css/grid"
import "swiper/css/pagination"
import {Grid, Pagination, Navigation} from "swiper/modules"
import {FaArrowLeft, FaArrowRight} from "react-icons/fa"
import "./dashboard.scss"

const Dashboard = ({data}) => {
  if (!data || data.length === 0) {
    return <>No Images bro</>
  }

  console.log("data from dashboard", data)
  const sliderRef = useRef(null)

  return (
    <div className="swiperContainerr">
      <div className="swiperWrapper">
        <button className="swiper-button-prev">
          <FaArrowLeft className="check" size={30} />
        </button>
        <Swiper
          slidesPerView={3}
          grid={{rows: 2}}
          spaceBetween={10}
          pagination={{clickable: true}}
          navigation={{
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
          }}
          modules={[Grid, Pagination, Navigation]}
          className="swiperr"
          ref={sliderRef}
          breakpoints={{
            // 1024: {
            //   slidesPerView: 3,
            // },
            1242: {
              slidesPerView: 3,
              grid: {rows: 2},
            },
            864: {
              slidesPerView: 2,
              grid: {rows: 1},
            },
            0: {
              slidesPerView: 1,
              grid: {rows: 1},
            },
          }}
        >
          {data.map(images => (
            <SwiperSlide key={images._id} className="swiperSlidee">
              <img
                src={images.images}
                className="ProfileImgg"
                alt={images.title || "Design"}
              />
            </SwiperSlide>
          ))}
        </Swiper>
        <button className="swiper-button-next">
          <FaArrowRight className="check" size={30} />
        </button>
      </div>
    </div>
  )
}

export default Dashboard
