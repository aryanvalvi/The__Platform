"use client"
import React, {useState} from "react"
import {FaHeart} from "react-icons/fa"
import {BiSolidEdit} from "react-icons/bi"
import MypostsPopup from "./MypostsPopup"
import {DesignPost} from "../../ReduxStore/slices/UserProfile"
import Link from "next/link"
import "./dashboardComponents.scss"

const Myposts = ({
  data,
  id,
}: {
  data: DesignPost[] | null
  id: string | string[] | undefined
}) => {
  const [popupClicked, setpopupClicked] = useState(false)
  const [post, setPost] = useState<DesignPost>()

  return (
    <div className="flex">
      {popupClicked && post && (
        <MypostsPopup data={post} id={id} setpopupClicked={setpopupClicked} />
      )}
      {data?.map(f => (
        <div
          key={f._id}
          onClick={() => {
            setpopupClicked(!popupClicked)
            setPost(f)
          }}
          className="gand"
        >
          <div className="imageContent">
            <BiSolidEdit className="edit-gand" />
            {f.images && f.images.length > 0 ? (
              <img className="mgand" src={f.images[0]} alt={f.title} />
            ) : (
              <video muted autoPlay loop className="mgand" src={f.video} />
            )}
          </div>
          <div className="ImgAndHeart">
            <Link href={`/other/${f.creator}`}>
              <img className="profile" src={f.UserProfileImage} alt="Profile" />
            </Link>
            <p className="overlayText">{f.title}</p>
            <span className="">0</span>
            <FaHeart />
          </div>
        </div>
      ))}
    </div>
  )
}

export default Myposts
