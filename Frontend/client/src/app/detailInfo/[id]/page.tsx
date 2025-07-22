"use client"

import {useParams} from "next/navigation"

import {useAppDispatch, useAppSelector} from "@/ReduxStore/hook/CustomHook"
import {
  checkerFunction,
  fetchMoreDetail,
  userPostInteractionFunction,
} from "@/ReduxStore/slices/homeContentSlice"
import {useRouter} from "next/router"
import React, {useEffect, useState} from "react"
import {FaBookmark} from "react-icons/fa"
import {IoIosHeart} from "react-icons/io"
import "./MoreInfo.scss"
import Popup from "@/components/Popup"
import {IoChatbubblesOutline} from "react-icons/io5"
import {PiContactlessPaymentFill} from "react-icons/pi"
import {IoMdShareAlt} from "react-icons/io"
import {AiOutlineLike} from "react-icons/ai"
import {IoBookmarksOutline} from "react-icons/io5"
import {BsBookmarksFill} from "react-icons/bs"
import {AiFillLike} from "react-icons/ai"
import Dashboard from "@/components/Dashboard/Dashboard"
import {getConversationId} from "@/ReduxStore/slices/MessageSlice"

const page = () => {
  const {id} = useParams()
  // const [follow, setfollow] = useState(false);
  const [savee, setSave] = useState(false)
  const [likee, setLike] = useState(false)
  console.log(savee, likee)
  const [openPopup, setopenPopup] = useState(false)
  const [interactionChanged, setInteractionChanged] = useState(false)
  const [abc, setAbc] = useState()
  const [userid, setuserId] = useState(0)
  console.log("id is", id)
  const dispatch = useAppDispatch()
  const {mainDesign, moreDesigns} = useAppSelector(
    state => state.moreDetailReducer.homeContent
  )
  const moreDesign = moreDesigns

  console.log("moredetail ", mainDesign, moreDesigns)
  const {follow, save, like} = useAppSelector(
    state => state.checkerReducer.check
  )
  const data3 = useAppSelector(state => state.userPostInteractionReducer.check)
  console.log("userpostInteraction", data3)
  console.log("checker", like)

  const fetchData = async () => {
    const result = await dispatch(fetchMoreDetail(id))
    dispatch(checkerFunction(id))
  }
  const CheckStatus = () => {}
  const HandleInter = action => {
    console.log(action)

    console.log("action and creator id", action, mainDesign.creator._id)

    dispatch(userPostInteractionFunction({action, post: id}))
    setInteractionChanged(prev => !prev)
  }

  //function for sending message
  const conversation = useAppSelector(
    state => state.MessageReducer.ConversationId
  )
  console.log("conversation id", conversation)
  const contactFunction = () => {
    setopenPopup(!openPopup)
    dispatch(getConversationId(mainDesign?.creator?._id))
  }

  useEffect(() => {
    if (id) {
      fetchData()
    }
  }, [id, interactionChanged])
  useEffect(() => {
    if (mainDesign?.creator?._id) {
      setuserId(mainDesign.creator._id)
    }
  }, [mainDesign])
  return (
    // <>
    // </>
    <>
      <>
        {openPopup && (
          <Popup
            setopenPopup={setopenPopup}
            mainDesign={mainDesign}
            post={userid}
            conversationid={conversation}
          ></Popup>
        )}

        <div className="testing">hello</div>
        <div className="MoreInfoDad">
          {/* <button onClick={CheckStatus}>click</button> */}
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

                    <button onClick={() => HandleInter("follow")}>
                      {follow ? <>Following</> : <>follow</>}
                    </button>
                  </span>
                </div>
              </div>
            </div>

            <div className="bigImageContainer">
              <div className="mainImage">
                {mainDesign?.images ? (
                  <div className="shadowForMedia">
                    <img className="bigImage" src={mainDesign?.images} alt="" />
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
                  {mainDesign?.sideImages.map(e => {
                    const isVideo =
                      e.endsWith(".mp4") ||
                      e.endsWith("webm") ||
                      e.endsWith("ogg")

                    if (isVideo) {
                      return (
                        <div className="shadowForMedia">
                          <video className="" src={e}></video>
                        </div>
                      )
                    } else {
                      return (
                        <div className="shadowForMedia">
                          <img className="bigImage" src={e} alt="" />
                        </div>
                      )
                    }
                  })}
                </div>
              </div>

              <div className="leftSideDetails">
                {/* <div className="detail-icon-flex">
                  <span className="iconContainer">
                    <AiFillLike
                      // onClick={() => HandleInter("like")}

                      className={` ${likee ? "like" : "like2"}`}
                    />
                  </span>
                  <p>like</p>
                </div> */}
                <span onClick={() => setLike(prev => !prev)}>
                  <span className="LeftSideDetails-Icon">
                    <AiFillLike className={` ${likee ? "like" : "like2"}`} />
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
                <span onClick={() => setSave(prev => !prev)}>
                  <span className="LeftSideDetails-Icon">
                    <BsBookmarksFill
                      className={`${savee ? "saved" : "saved2"}  `}
                    />
                  </span>
                  <p>Share</p>
                </span>

                {/* <div className="detail-icon-flex">
                  <span className="iconContainer">
                    <BsBookmarksFill
                      // onClick={() => HandleInter("save")}

                      className={`${savee ? "saved" : "saved2"}  `}
                    />
                  </span>
                  <p>save</p>
                </div> */}
              </div>
            </div>

            <p className="desMore">{mainDesign?.description}</p>
          </div>
        </div>
        <div className="swipermore">
          <div className="More">
            <div className="ganduloader"></div>
            <p>More by {mainDesign?.creator?.username}</p>
          </div>
          <Dashboard data={moreDesigns}></Dashboard>
        </div>
      </>
    </>
  )
}

export default page
