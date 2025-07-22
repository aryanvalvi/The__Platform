"use client"
import React, {useEffect, useState} from "react"
import {FiFileText} from "react-icons/fi"
import {FiInbox} from "react-icons/fi"
// or
import {BsInbox} from "react-icons/bs"
import {FiBookmark} from "react-icons/fi"
// or
import {BsBookmark} from "react-icons/bs"

import "./dashboard.scss"
import Myposts from "@/components/dashboardComponents/Myposts"
import {UserDashBoardFunction} from "@/ReduxStore/slices/UserProfile"
import {useDispatch} from "react-redux"
import {useParams} from "next/navigation"
import {useAppSelector} from "@/ReduxStore/hook/CustomHook"
import Chat from "@/components/dashboardComponents/Chat"
import Saved from "@/components/dashboardComponents/Saved"

const page = () => {
  const [activeTab, setActiveTab] = useState("My posts")
  const Data = useAppSelector(state => state.UserProfileSliceReducer)
  console.log("from frontend dashboard", Data)
  const {id} = useParams()
  console.log(id)
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(UserDashBoardFunction(id))
  }, [])
  return (
    <div className="dashboardContainer">
      <div className="dashboard-left">
        <div className="dashboard-left-profile-container">
          <span className="client-image">
            <img src="/client_images/bg1 (1).jpg" alt="" />

            <p>Aryan Valvi</p>
          </span>
          <ul>
            <li>
              <span>100</span>
              <p>Followers</p>
            </li>
            <li>
              <span>10</span>
              <p>posts</p>
            </li>
            <li>
              <span>1000</span>
              <p>Likes</p>
            </li>
          </ul>
        </div>
        <ul className="dashboard-center">
          <li
            className={activeTab === "My posts" ? "active" : ""}
            onClick={() => setActiveTab("My posts")}
          >
            <FiFileText className="dashboard-center-icons" />
            <p>My posts</p>
          </li>
          <li
            className={activeTab === "inbox" ? "active" : ""}
            onClick={() => setActiveTab("inbox")}
          >
            <FiInbox className="dashboard-center-icons" />
            <p>Inbox</p>
          </li>
          <li
            className={activeTab === "saved" ? "active" : ""}
            onClick={() => setActiveTab("saved")}
          >
            <FiBookmark className="dashboard-center-icons" />
            <p>Saved</p>
          </li>
        </ul>
      </div>
      <div className="dashboard-right">
        <div className="dashboard-right-top">
          <div className="right-top">
            <p>Hello Aryan</p>
            <button>Upload New</button>
          </div>
          <div className="right-down">
            <p className="right-down-p">My posts</p>
            {activeTab === "My posts" && (
              <Myposts data={Data?.data} id={id}></Myposts>
            )}
            {activeTab === "inbox" && <Chat></Chat>}
            {activeTab === "saved" && <Saved></Saved>}
          </div>
        </div>
      </div>
    </div>
  )
}

export default page
