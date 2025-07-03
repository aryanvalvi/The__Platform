"use client"
import React from "react"

import "./dashboard.scss"
const page = () => {
  return (
    <div className="dashboardContainer">
      <div className="dashboard-left">
        <ul>
          <li>My posts</li>
          <li>Inbox</li>
          <li>Saved</li>
        </ul>
      </div>
      <div className="dashboard-right">
        <div className="dashboard-right-top">
          <p>Hello username</p>
          <button>Upload New</button>
        </div>
      </div>
    </div>
  )
}

export default page
