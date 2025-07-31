"use client"
import {useParams} from "next/navigation"
import React, {useEffect, useState} from "react"
import "./other.scss"
import {OtherProfile} from "@/ReduxStore/slices/UserProfile"

import {useAppDispatch, useAppSelector} from "@/ReduxStore/hook/CustomHook"
import {
  CheckUserInteraction,
  sendUserInteraction2,
} from "@/ReduxStore/slices/userInteractionSlice"
import {getConversationId} from "@/ReduxStore/slices/MessageSlice"
import Popup from "@/components/Popup"
import {FaHeart} from "react-icons/fa"

import "../../homeContent/Sexplore.scss"
import Link from "next/link"
const Page = () => {
  const dispatch = useAppDispatch()
  const [openPopup, setopenPopup] = useState(false)

  const Data = useAppSelector(
    state => state.UserProfileSliceReducer.OtherProfile
  )
  console.log(Data)
  const {id} = useParams()
  console.log(id)

  const {followed} = useAppSelector(
    state => state.userInteractionReducer.interaction
  )
  console.log(followed)

  const handleFollow = () => {
    dispatch(sendUserInteraction2({actionType: "followFromOther", id}))
  }
  const contactFunction = () => {
    setopenPopup(!openPopup)
    if (id) {
      dispatch(getConversationId(id))
    }
  }
  const conversation = useAppSelector(
    state => state.MessageReducer.conversationId
  )

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
        ></Popup>
      )}
      <div className="TopOtherProfileContainer">
        <div className="topTopPart">
          <span className="client-image">
            <img
              // src="https://picsum.photos/300/200
              src={Data?.user?.userImage}
              alt={Data?.user?.userImage}
            />

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
            {followed ? (
              <button onClick={handleFollow} className="follow-btn">
                Following
              </button>
            ) : (
              <button onClick={handleFollow} className="follow-btn">
                Follow
              </button>
            )}
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
                      // alt={f.title}
                    ></video>
                  )}
                </Link>
              </div>
              {/* <p className="ImageTitle">{f.title}</p> */}
              <div className="ImgAndHeart">
                <Link href={`/other/${f.creator._id}`}>
                  <img
                    className="profile"
                    src={f.UserProfileImage}
                    alt="Profile"
                  />
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
      </div>
    </div>
  )
}

export default Page
