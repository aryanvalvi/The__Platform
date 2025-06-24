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
  const data = useAppSelector(state => state.moreDetailReducer.homeContent)
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

    console.log("action and creator id", action, data.creator._id)

    dispatch(userPostInteractionFunction({action, post: id}))
    setInteractionChanged(prev => !prev)
  }
  useEffect(() => {
    if (id) {
      fetchData()
    }
  }, [id, interactionChanged])
  useEffect(() => {
    if (data?.creator?._id) {
      setuserId(data.creator._id)
    }
  }, [data])
  return (
    // <>
    // </>
    <>
      {data === null ? (
        <>
          <h1>Bro</h1>
        </>
      ) : (
        <div className="MoreInfoDad">
          <div className="leftSideDetails">
            <span onClick={() => setopenPopup(!openPopup)}>
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
          </div>
          {/* <button onClick={CheckStatus}>click</button> */}
          <div className="MoreInfoContainer">
            <div className="TopInfo">
              <div className="TopInfo1">
                <img
                  className="profile2"
                  src={data.creator?.userImage}
                  alt="img"
                />
                <div className="TopInfo3">
                  <p>{data.title}</p>
                  <p>by {data.creator?.username}</p>
                  <button onClick={() => HandleInter("follow")}>
                    {follow ? <>Following</> : <>follow</>}
                  </button>
                </div>
              </div>
              <div className="TopInfo2">
                <div className="detail-icon-flex">
                  <span
                    className="iconContainer"
                    onClick={() => setSave(prev => !prev)}
                  >
                    <BsBookmarksFill
                      // onClick={() => HandleInter("save")}

                      className={`${savee ? "saved" : "saved2"}  `}
                    />
                  </span>
                  <p>save</p>
                </div>

                <div className="detail-icon-flex">
                  <span
                    className="iconContainer"
                    onClick={() => setLike(prev => !prev)}
                  >
                    <AiFillLike
                      // onClick={() => HandleInter("like")}

                      className={` ${likee ? "like" : "like2"}`}
                    />
                  </span>
                  <p>like</p>
                </div>
                {/* <button
  
                  className="btn4"
                >
                  Get in touch
                </button> */}
              </div>
            </div>
            {openPopup && (
              <Popup
                setopenPopup={setopenPopup}
                data={data}
                post={userid}
              ></Popup>
            )}
            <img className="bigImage" src={data.images} alt="" />
            <p className="desMore">{data.description}</p>
          </div>
          <div className="More">
            <p>More by {data.username}</p>
            <div className="swiper">
              {/* Swiper component code goes here */}
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default page
