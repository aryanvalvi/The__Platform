"use client"
import React, {useEffect, useRef} from "react"
// import React from "react"
import {Swiper, SwiperSlide} from "swiper/react"
import "swiper/css"
import "swiper/css/grid"
import "swiper/css/pagination"
import {Grid, Pagination, Navigation} from "swiper/modules"
import {FaArrowLeft, FaArrowRight} from "react-icons/fa" // Import icons
import "./dashboard.scss"
const Dashboard = ({data}) => {
  const sliderRef = useRef(null)

  return (
    <>
      <div className="swiperContainerr">
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
        >
          <button className="swiper-button-prev">
            <FaArrowLeft size={30} />
          </button>

          {data.map(images => (
            <SwiperSlide className="swiperSlidee">
              <img src={images.images} className="ProfileImgg" alt="" />
            </SwiperSlide>
          ))}
          <button className="swiper-button-next">
            <FaArrowRight size={30} />
          </button>
        </Swiper>
      </div>
    </>
  )
}

export default Dashboard
