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
import ProtectedRoutes from "@/components/protectedRoutes/ProtectedRoutes"

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
    <ProtectedRoutes>
      <div className="dashboardContainer">
        <div className="dashboard-left">
          <div className="dashboard-left-profile-container">
            <span className="client-image">
              <img src={Data.user.userImage} alt={Data.user.userImage} />

              <p>{Data.user.username}</p>
            </span>
            <ul>
              <li>
                <span>{Data.user.followers.length}</span>
                <p>Followers</p>
              </li>
              <li>
                <span>{Data.totalDesign}</span>
                <p>posts</p>
              </li>
              <li>
                <span>{Data.user.likedDesigns.length}</span>
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
              {activeTab === "saved" && (
                <Saved data={Data?.user.savedDesigns} id={id}></Saved>
              )}
            </div>
          </div>
        </div>
      </div>
    </ProtectedRoutes>
  )
}

export default page
