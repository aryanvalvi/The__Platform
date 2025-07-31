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
import SwiperDesign from "@/components/Dashboard/SwiperDesign"
import {getConversationId} from "@/ReduxStore/slices/MessageSlice"
import {
  CheckUserInteraction,
  sendUserInteraction,
} from "@/ReduxStore/slices/userInteractionSlice"
import "./info.scss"
import LoginPopup from "@/components/login/LoginPopup"
import {setOpen} from "@/ReduxStore/slices/Authentication"

const Page = () => {
  const dispatch = useAppDispatch()
  const {id} = useParams()
  const [selectImg, setSelectedImg] = useState<string>("")
  const [openPopup, setopenPopup] = useState<boolean>(false)
  // const [showLoginPopup, setShowLoginPopup] = useState<boolean>(false)
  const {followed, like, save} = useAppSelector(
    state => state.userInteractionReducer.interaction || {}
  )
  const {mainDesign, moreDesigns} = useAppSelector(
    state => state.moreDetailReducer
  )
  console.log(mainDesign, moreDesigns)
  const {user, loading} = useAppSelector(state => state.AuthenticationReducer)

  // const interaction = useAppSelector(
  //   state => state.userInteractionReducer.interaction || {}
  // )

  //Functions
  const contactFunction = () => {
    if (!user && !loading) {
      return
    }
    dispatch(setOpen(false))
    if (mainDesign?.creator?._id) {
      dispatch(getConversationId(mainDesign?.creator?._id))
      setopenPopup(true)
    }
  }

  const handleFollow = () => {
    if (!user && !loading) {
      dispatch(setOpen(false))
      return
    }

    dispatch(sendUserInteraction({actionType: "follow", postId: id}))
  }

  const handleLike = () => {
    if (!user && !loading) {
      dispatch(setOpen(false))
      return
    }
    dispatch(sendUserInteraction({actionType: "like", postId: id}))
  }

  const handleSave = () => {
    if (!user && !loading) {
      dispatch(setOpen(false))
      return
    }
    dispatch(sendUserInteraction({actionType: "save", postId: id}))
  }

  //useEffects

  //1
  useEffect(() => {
    if (mainDesign?.images) {
      if (Array.isArray(mainDesign.images) && mainDesign.images.length > 0) {
        setSelectedImg(mainDesign.images[0])
      } else if (typeof mainDesign.images === "string") {
        setSelectedImg(mainDesign.images)
      } else {
        setSelectedImg("")
      }
    } else {
      setSelectedImg("")
    }
  }, [mainDesign])

  //2
  useEffect(() => {
    dispatch(CheckUserInteraction({postid: id, actionType: "fromDetail"}))
  }, [dispatch, id])
  const conversation = useAppSelector(
    state => state.MessageReducer.conversationId
  )

  //3
  useEffect(() => {
    if (id) {
      dispatch(fetchMoreDetail(id))
    }
  }, [id, dispatch])

  return (
    <>
      <LoginPopup></LoginPopup>
      {openPopup && (
        <Popup
          openPopup={openPopup}
          setopenPopup={setopenPopup}
          mainDesign={mainDesign}
          post={user}
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
                {mainDesign?.sideImages && mainDesign?.sideImages.length > 1 ? (
                  mainDesign?.images ? (
                    <div
                      onClick={() => {
                        if (
                          Array.isArray(mainDesign.images) &&
                          mainDesign.images.length > 0
                        ) {
                          setSelectedImg(mainDesign.images[0])
                        } else if (typeof mainDesign.images === "string") {
                          setSelectedImg(mainDesign.images)
                        } else {
                          setSelectedImg("")
                        }
                      }}
                      className="shadowForMedia"
                    >
                      <img className="bigImage" src={selectImg} alt="" />
                    </div>
                  ) : (
                    <div
                      onClick={() => {
                        if (
                          Array.isArray(mainDesign.video) &&
                          mainDesign.video.length > 0
                        ) {
                          setSelectedImg(mainDesign.video[0])
                        } else if (typeof mainDesign.video === "string") {
                          setSelectedImg(mainDesign.video)
                        } else {
                          setSelectedImg("")
                        }
                      }}
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
                        key={"video"}
                        className="shadowForMedia"
                      >
                        <video className="" src={e}></video>
                      </div>
                    )
                  } else {
                    return (
                      <div
                        key={"image"}
                        onClick={() => setSelectedImg(e)}
                        className="shadowForMedia"
                      >
                        <img
                          height={100}
                          width={100}
                          className="bigImage"
                          src={e}
                          alt=""
                        />
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
        <SwiperDesign data={moreDesigns}></SwiperDesign>
      </div>
    </>
  )
}

export default Page
