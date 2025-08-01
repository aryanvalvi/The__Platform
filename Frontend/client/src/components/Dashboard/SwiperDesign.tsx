"use client"
import React, {useRef} from "react"
import {Swiper, SwiperSlide} from "swiper/react"
import {Grid, Pagination, Navigation} from "swiper/modules"
import {FaArrowLeft, FaArrowRight} from "react-icons/fa"
import "swiper/css"
import "swiper/css/grid"
import "swiper/css/pagination"
import "./dashboard.scss"

export interface Design {
  _id: string
  title: string
  description: string
  UserProfileImage: string
  creator: {
    _id: string
    googleID: string
    username: string
    userImage: string
    following: string[]
  }
  comments: any[]
  createdAt: string
  downloads: number
  externalLinks: string[]
  images: string[] | string | any
  likes: string[]
  saves: string[]
  sideImages: string[]
  tags: string[]
  tools: string[]
  video: string
  views: number
  visibility: string
  __v: number
}

const SwiperDesign = ({data}: {data: Design[] | null}) => {
  const sliderRef = useRef(null)
  const getRows = (dataLength: number) => (dataLength >= 6 ? 2 : 1)
  const showArrows = data && data.length > 6

  if (!data || data.length === 0) {
    return <div className="no-images">No Images bro</div>
  }

  return (
    <div className="swiperContainerr">
      <div className="swiperWrapper">
        {showArrows && (
          <button className="swiper-button-prev">
            <FaArrowLeft className="check" />
          </button>
        )}
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
            0: {slidesPerView: 1, grid: {rows: 1}, spaceBetween: 8},
            640: {slidesPerView: 2, grid: {rows: 1}, spaceBetween: 12},
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
        {showArrows && (
          <button className="swiper-button-next">
            <FaArrowRight className="check" />
          </button>
        )}
      </div>
    </div>
  )
}

export default SwiperDesign
