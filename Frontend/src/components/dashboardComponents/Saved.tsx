"use client"
import React, {useEffect, useState} from "react"
import {useAppDispatch, useAppSelector} from "@/ReduxStore/hook/CustomHook"
import {UserSavedDesigns} from "@/ReduxStore/slices/UserProfile"
import {DesignPost} from "../../ReduxStore/slices/UserProfile"
import Popupconfirm from "./Popupconfirm"
import Link from "next/link"
import {FaHeart} from "react-icons/fa"
import {MdDeleteOutline} from "react-icons/md"
import "./dashboardComponents.scss"

const Saved = () => {
  const [popupClicked, setpopupClicked] = useState(false)
  const [post, setPost] = useState("")
  const dispatch = useAppDispatch()
  const Data = useAppSelector(
    state => state.UserProfileSliceReducer.savedDesigns
  )

  const handleunsave = () => {
    dispatch(UserSavedDesigns({actionType: "edit", postId: post}))
  }

  useEffect(() => {
    dispatch(UserSavedDesigns({actionType: "fetch", postId: ""}))
  }, [dispatch])

  return (
    <div className="flex">
      {popupClicked && (
        <Popupconfirm
          setpopupClicked={setpopupClicked}
          handleunsave={handleunsave}
        />
      )}
      {Data?.map((f: DesignPost) => (
        <div key={f._id} className="gand">
          <div className="imageContent">
            <Link href={`/detailInfo/${f._id}`}>
              {f.images && f.images.length > 0 ? (
                <img className="mgand" src={f.images[0]} alt={f.title} />
              ) : (
                <video muted autoPlay loop className="mgand" src={f.video} />
              )}
            </Link>
          </div>
          <div className="ImgAndHeart">
            <Link href={`/other/${f.creator}`}>
              <img className="profile" src={f.UserProfileImage} alt="Profile" />
            </Link>
            <p className="overlayText">{f.title}</p>
            <span className="">0</span>
            <FaHeart />
          </div>
          <MdDeleteOutline
            onClick={() => {
              setpopupClicked(!popupClicked)
              setPost(f._id)
            }}
            size={40}
            className="cross"
          />
        </div>
      ))}
    </div>
  )
}

export default Saved
