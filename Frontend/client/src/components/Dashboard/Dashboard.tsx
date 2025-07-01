import React, {useEffect, useRef} from "react"
import {createRoot} from "react-dom/client"
import {Swiper, SwiperSlide} from "swiper/react"
import {Grid, Pagination, Navigation} from "swiper/modules"
import {FaArrowLeft, FaArrowRight} from "react-icons/fa"
import "swiper/css"
import "swiper/css/grid"
import "swiper/css/pagination"
import "./dashboard.scss"

const Dashboard = ({data}) => {
  "use client"
  if (!data || data.length === 0) {
    return <div className="no-images">No Images bro</div>
  }

  console.log("data from dashboard", data)
  const sliderRef = useRef(null)

  // Determine rows based on data length
  const getRows = dataLength => (dataLength >= 6 ? 2 : 1)

  return (
    <div className="swiperContainerr">
      <div className="swiperWrapper">
        <button className="swiper-button-prev">
          <FaArrowLeft className="check" />
        </button>
        <Swiper
          slidesPerView={3}
          grid={{rows: getRows(data.length), fill: "row"}}
          spaceBetween={16}
          pagination={{clickable: true}}
          navigation={{
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
          }}
          modules={[Grid, Pagination, Navigation]}
          className="swiperr"
          ref={sliderRef}
          breakpoints={{
            0: {
              slidesPerView: 1,
              grid: {rows: 1},
              spaceBetween: 8,
            },
            640: {
              slidesPerView: 2,
              grid: {rows: 1},
              spaceBetween: 12,
            },
            1024: {
              slidesPerView: 3,
              grid: {rows: getRows(data.length)},
              spaceBetween: 16,
            },
            1280: {
              slidesPerView: 3,
              grid: {rows: getRows(data.length)},
              spaceBetween: 20,
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
          <FaArrowRight className="check" />
        </button>
      </div>
    </div>
  )
}
export default Dashboard
