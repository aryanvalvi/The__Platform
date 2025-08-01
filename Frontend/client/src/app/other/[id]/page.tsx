"use client"
import React, {useEffect, useState} from "react"
import {useParams} from "next/navigation"
import {useAppDispatch, useAppSelector} from "@/ReduxStore/hook/CustomHook"
import {OtherProfile} from "@/ReduxStore/slices/UserProfile"
import {
  CheckUserInteraction,
  sendUserInteraction2,
} from "@/ReduxStore/slices/userInteractionSlice"
import {getConversationId} from "@/ReduxStore/slices/MessageSlice"
import Popup from "@/components/Popup"
import Link from "next/link"
import {FaHeart} from "react-icons/fa"
import "./other.scss"
import "../../homeContent/Sexplore.scss"

const Page = () => {
  const dispatch = useAppDispatch()
  const [openPopup, setopenPopup] = useState(false)
  const Data = useAppSelector(
    state => state.UserProfileSliceReducer.OtherProfile
  )
  const {id} = useParams()
  const {followed} = useAppSelector(
    state => state.userInteractionReducer.interaction
  )
  const conversation = useAppSelector(
    state => state.MessageReducer.conversationId
  )

  const handleFollow = () => {
    dispatch(sendUserInteraction2({actionType: "followFromOther", id}))
  }

  const contactFunction = () => {
    setopenPopup(!openPopup)
    if (id) {
      dispatch(getConversationId(id))
    }
  }

  useEffect(() => {
    window.scrollTo(0, 0)
    dispatch(OtherProfile(id))
    dispatch(CheckUserInteraction({postid: id, actionType: "fromOther"}))
  }, [dispatch, id])

  return (
    <div className="OtherProfileContainer">
      {openPopup && (
        <Popup
          openPopup
          setopenPopup={setopenPopup}
          mainDesign={null}
          post={null}
          conversationid={conversation}
        />
      )}
      <div className="TopOtherProfileContainer">
        <div className="topTopPart">
          <span className="client-image">
            <img src={Data?.user?.userImage} alt={Data?.user?.userImage} />
            <p>Aryan</p>
          </span>
          <ul>
            <li>
              <span>{Data?.user?.followers?.length}</span>
              <p>Followers</p>
            </li>
            <li>
              <span>{Data.totalDesign}</span>
              <p>posts</p>
            </li>
            <li>
              <span>{Data?.user?.likedBY?.length}</span>
              <p>Likes</p>
            </li>
          </ul>
          <div className="topBotPart">
            <button onClick={handleFollow} className="follow-btn">
              {followed ? "Following" : "Follow"}
            </button>
            <button onClick={contactFunction} className="contact-btn">
              Contact
            </button>
          </div>
        </div>
      </div>
      <div className="MiddlePartContainer">
        <div className="moreby">
          <p>More by {Data?.user?.username}</p>
        </div>
        <div className="flex">
          {Data?.design?.map((f: any) => (
            <div key={f._id} className="gand">
              <div className="imageContent">
                <Link href={`/detailInfo/${f._id}`}>
                  {f.images && f.images.length > 0 ? (
                    <img className="mgand" src={f.images} alt={f.title} />
                  ) : (
                    <video
                      muted
                      autoPlay
                      loop
                      className="mgand"
                      src={f.video}
                    />
                  )}
                </Link>
              </div>
              <div className="ImgAndHeart">
                <Link href={`/other/${f.creator._id}`}>
                  <img
                    className="profile"
                    src={f.UserProfileImage}
                    alt="Profile"
                  />
                </Link>
                <p className="overlayText">{f.title}</p>
                <span className="">0</span>
                <FaHeart />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Page
