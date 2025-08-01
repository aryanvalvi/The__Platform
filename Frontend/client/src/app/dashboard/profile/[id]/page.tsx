"use client"
import React, {useEffect, useState} from "react"
import {FiFileText, FiInbox, FiBookmark} from "react-icons/fi"
import "./dashboard.scss"
import Myposts from "@/components/dashboardComponents/Myposts"
import {
  DashboardState,
  UserDashBoardFunction,
} from "@/ReduxStore/slices/UserProfile"
import {useParams} from "next/navigation"
import {useAppDispatch, useAppSelector} from "@/ReduxStore/hook/CustomHook"
import Chat from "@/components/dashboardComponents/Chat"
import Saved from "@/components/dashboardComponents/Saved"
import ProtectedRoutes from "@/components/protectedRoutes/ProtectedRoutes"
import Link from "next/link"

const Page = () => {
  const [activeTab, setActiveTab] = useState("My posts")
  const {data, user, totalDesign} = useAppSelector(
    (state: {UserProfileSliceReducer: DashboardState}) =>
      state.UserProfileSliceReducer
  )
  const {id} = useParams()
  const dispatch = useAppDispatch()

  useEffect(() => {
    if (typeof id === "string") {
      dispatch(UserDashBoardFunction(id))
    }
  }, [id, dispatch])

  return (
    <ProtectedRoutes>
      <div className="dashboardContainer">
        <div className="dashboard-left">
          <div className="dashboard-left-profile-container">
            <span className="client-image">
              <img
                width={100}
                height={100}
                src={user?.userImage}
                alt={user?.userImage}
              />
              <p>{user?.username}</p>
            </span>
            <ul>
              <li>
                <span>{user?.followers.length}</span>
                <p>Followers</p>
              </li>
              <li>
                <span>{totalDesign}</span>
                <p>posts</p>
              </li>
              <li>
                <span>{user?.likedDesigns.length}</span>
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
              <Link className="Link" href={"/publish"}>
                <button>Upload New</button>
              </Link>
            </div>
            <div className="right-down">
              <p className="right-down-p">My posts</p>
              {activeTab === "My posts" && <Myposts data={data} id={id} />}
              {activeTab === "inbox" && <Chat />}
              {activeTab === "saved" && <Saved />}
            </div>
          </div>
        </div>
      </div>
    </ProtectedRoutes>
  )
}

export default Page
