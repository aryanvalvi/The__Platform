"use client"
import {useParams} from "next/navigation"
import {useAppDispatch, useAppSelector} from "@/ReduxStore/hook/CustomHook"
import {fetchMoreDetail} from "@/ReduxStore/slices/homeContentSlice"
import React, {useEffect, useState} from "react"

import Popup from "@/components/Popup"
import {IoChatbubblesOutline} from "react-icons/io5"
import {PiContactlessPaymentFill} from "react-icons/pi"
import {IoMdShareAlt} from "react-icons/io"
import {BsBookmarksFill} from "react-icons/bs"
import {AiFillLike} from "react-icons/ai"
import Dashboard from "@/components/Dashboard/Dashboard"
import {getConversationId} from "@/ReduxStore/slices/MessageSlice"
import {
  CheckUserInteraction,
  sendUserInteraction,
} from "@/ReduxStore/slices/userInteractionSlice"
import "./info.scss"
const page = () => {
  const dispatch = useAppDispatch()
  const {id} = useParams()
  const [selectImg, setSelectedImg] = useState<string>("")
  const [openPopup, setopenPopup] = useState<boolean>(false)
  const {followed, like, save} = useAppSelector(
    state => state.userInteractionReducer.interaction || {}
  )
  const {mainDesign, moreDesigns} = useAppSelector(
    state => state.moreDetailReducer.homeContent
  )

  // const interaction = useAppSelector(
  //   state => state.userInteractionReducer.interaction || {}
  // )

  //Functions
  const contactFunction = () => {
    setopenPopup(!openPopup)
    dispatch(getConversationId(mainDesign?.creator?._id))
  }
  const fetchData = () => {
    dispatch(fetchMoreDetail(id))
  }

  const handleFollow = () => {
    dispatch(sendUserInteraction({actionType: "follow", postId: id}))
  }

  const handleLike = () => {
    dispatch(sendUserInteraction({actionType: "like", postId: id}))
  }

  const handleSave = () => {
    dispatch(sendUserInteraction({actionType: "save", postId: id}))
  }

  //useEffects

  //1
  useEffect(() => {
    setSelectedImg(mainDesign?.images)
  }, [mainDesign])

  //2
  useEffect(() => {
    dispatch(CheckUserInteraction({postid: id, actionType: "fromDetail"}))
  }, [])
  const conversation = useAppSelector(
    state => state.MessageReducer.ConversationId
  )

  //3
  useEffect(() => {
    if (id) {
      fetchData()
    }
  }, [id])

  return (
    <>
      {openPopup && (
        <Popup
          setopenPopup={setopenPopup}
          mainDesign={mainDesign}
          post={userid}
          conversationid={conversation}
        ></Popup>
      )}

      <div className="MoreInfoDad">
        <div className="MoreInfoContainer">
          <div className="TopInfo">
            <div className="TopInfo1">
              <img
                className="profile2"
                src={mainDesign?.creator?.userImage}
                alt="img"
              />
              <div className="TopInfo3">
                <p>{mainDesign?.title}</p>
                <span className="TopInfo3-span">
                  <p>by {mainDesign?.creator?.username}</p>

                  <button onClick={handleFollow}>
                    {followed ? <>Following</> : <>follow</>}
                  </button>
                </span>
              </div>
            </div>
          </div>

          <div className="bigImageContainer">
            <div className="mainImage">
              {mainDesign?.images ? (
                <div className="shadowForMedia">
                  <img className="bigImage" src={selectImg} alt="" />
                </div>
              ) : (
                <div className="shadowForMedia">
                  <video
                    autoPlay
                    loop
                    muted
                    className="bigImage"
                    src={mainDesign?.video}
                  ></video>
                </div>
              )}
              <div className="sideImages">
                {mainDesign?.sideImages.length > 1 ? (
                  mainDesign?.images ? (
                    <div
                      onClick={() => setSelectedImg(mainDesign?.images)}
                      className="shadowForMedia"
                    >
                      <img
                        className="bigImage"
                        src={mainDesign?.images}
                        alt=""
                      />
                    </div>
                  ) : (
                    <div
                      onClick={() => setSelectedImg(mainDesign?.video)}
                      className="shadowForMedia"
                    >
                      <video
                        autoPlay
                        loop
                        muted
                        className="bigImage"
                        src={mainDesign?.video}
                      ></video>
                    </div>
                  )
                ) : (
                  <></>
                )}
                {mainDesign?.sideImages.map(e => {
                  const isVideo =
                    e.endsWith(".mp4") ||
                    e.endsWith("webm") ||
                    e.endsWith("ogg")

                  if (isVideo) {
                    return (
                      <div
                        onClick={() => setSelectedImg(e)}
                        className="shadowForMedia"
                      >
                        <video className="" src={e}></video>
                      </div>
                    )
                  } else {
                    return (
                      <div
                        onClick={() => setSelectedImg(e)}
                        className="shadowForMedia"
                      >
                        <img className="bigImage" src={e} alt="" />
                      </div>
                    )
                  }
                })}
              </div>
            </div>

            <div className="leftSideDetails">
              <span onClick={handleLike}>
                <span className="LeftSideDetails-Icon">
                  <AiFillLike className={` ${like ? "like" : "like2"}`} />
                </span>
                <p>Contact</p>
              </span>
              <span onClick={contactFunction}>
                <span className="LeftSideDetails-Icon">
                  <PiContactlessPaymentFill className="LeftSideDetails-Icon-Inside" />
                </span>
                <p>Contact</p>
              </span>
              <span>
                <span className="LeftSideDetails-Icon">
                  <IoChatbubblesOutline className="LeftSideDetails-Icon-Inside" />
                </span>
                <p>Comments</p>
              </span>
              <span>
                <span className="LeftSideDetails-Icon">
                  <IoMdShareAlt className="LeftSideDetails-Icon-Inside" />
                </span>
                <p>Share</p>
              </span>
              <span onClick={handleSave}>
                <span className="LeftSideDetails-Icon">
                  <BsBookmarksFill
                    className={`${save ? "saved" : "saved2"}  `}
                  />
                </span>
                <p>Share</p>
              </span>
            </div>
          </div>

          <p className="desMore">{mainDesign?.description}</p>
        </div>
      </div>
      <div className="swipermore">
        <div className="More">
          <p>More by {mainDesign?.creator?.username}</p>
        </div>
        <Dashboard data={moreDesigns}></Dashboard>
      </div>
    </>
  )
}

export default page
