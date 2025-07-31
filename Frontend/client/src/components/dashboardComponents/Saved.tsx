"use client"
import React, {useEffect, useState} from "react"
import {FaHeart} from "react-icons/fa"
import "./dashboardComponents.scss"
import {UserSavedDesigns} from "@/ReduxStore/slices/UserProfile"

import {useAppDispatch, useAppSelector} from "@/ReduxStore/hook/CustomHook"
import {MdDeleteOutline} from "react-icons/md"
import Popupconfirm from "./Popupconfirm"
import Link from "next/link"
import {DesignPost} from "../../ReduxStore/slices/UserProfile"

const Saved = () => {
  const [popupClicked, setpopupClicked] = useState(false)

  const [post, setPost] = useState("")
  console.log(post)

  const dispatch = useAppDispatch()

  const Data = useAppSelector(
    state => state.UserProfileSliceReducer.savedDesigns
  )
  console.log(Data)
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
        postId: "",
      })
    )
  }, [dispatch])
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
      {Data?.map((f: DesignPost) => (
        <div key={f._id} className="gand">
          <div className="imageContent">
            <Link href={`/detailInfo/${f._id}`}>
              {/* <RxCross2 className="edit-gand"></RxCross2> */}
              {f.images && f.images.length > 0 ? (
                <img className="mgand" src={f.images[0]} alt={f.title} />
              ) : (
                <video
                  muted
                  autoPlay
                  loop
                  className="mgand"
                  src={f.video}
                ></video>
              )}
            </Link>
          </div>
          {/* <p className="ImageTitle">{f.title}</p> */}
          <div className="ImgAndHeart">
            <Link href={`/other/${f.creator}`}>
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
          <MdDeleteOutline
            onClick={() => {
              setpopupClicked(!popupClicked)
              setPost(f?._id)
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
