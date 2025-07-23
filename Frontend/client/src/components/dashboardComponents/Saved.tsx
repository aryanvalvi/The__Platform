"use client"
import React, {useEffect, useState} from "react"
import MypostsPopup from "./MypostsPopup"
import {BiSolidEdit} from "react-icons/bi"

import {FaHeart} from "react-icons/fa"
import "./dashboardComponents.scss"
import {UserSavedDesigns} from "@/ReduxStore/slices/UserProfile"
import {useDispatch} from "react-redux"
import {useAppSelector} from "@/ReduxStore/hook/CustomHook"
import {MdDeleteOutline} from "react-icons/md"
import Popupconfirm from "./Popupconfirm"
import Link from "next/link"

const Saved = ({data, id}) => {
  const [popupClicked, setpopupClicked] = useState(false)

  const [post, setPost] = useState()
  console.log(post)
  console.log(data)
  const dispatch = useDispatch()

  const Data = useAppSelector(
    state => state.UserProfileSliceReducer.savedDesigns
  )
  const handleunsave = () => {
    dispatch(
      UserSavedDesigns({
        actionType: "edit",
        postId: post,
      })
    )
  }
  useEffect(() => {
    dispatch(
      UserSavedDesigns({
        actionType: "fetch",
      })
    )
  }, [])
  return (
    // <>
    //   <button onClick={handleunsave}>unsave</button>
    // </>
    <div className="flex">
      {popupClicked && (
        <Popupconfirm
          setpopupClicked={setpopupClicked}
          handleunsave={handleunsave}
        />
      )}
      {Data?.map(f => (
        <div key={f._id} className="gand">
          <div className="imageContent">
            <Link href={`/detailInfo/${f._id}`}>
              <MdDeleteOutline
                onClick={() => {
                  setpopupClicked(!popupClicked)
                  setPost(f._id)
                }}
                className="edit-gand"
              ></MdDeleteOutline>
              {f.images && f.images.length > 0 ? (
                <img className="mgand" src={f.images} alt={f.title} />
              ) : (
                <video
                  muted
                  autoPlay
                  loop
                  className="mgand"
                  src={f.video}
                  alt={f.title}
                ></video>
              )}
            </Link>
          </div>
          {/* <p className="ImageTitle">{f.title}</p> */}
          <div className="ImgAndHeart">
            <Link href={`/profile/${f.creator._id}`}>
              <img className="profile" src={f.UserProfileImage} alt="Profile" />
            </Link>
            {/* <p className="overlayText">{f.creator.username}</p> */}
            <p className="overlayText">{f.title}</p>
            <span className="">0</span>

            <FaHeart
            // onClick={() => ItemClicked(f.id)}
            // className="like"
            // style={{
            //   fontSize: "20px",
            //   color: cart.includes(f._id) ? "red" : "gray",
            // }}
            />
          </div>
        </div>
      ))}
    </div>
  )
}

export default Saved
