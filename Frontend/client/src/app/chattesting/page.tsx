import React from "react"
import io from "socket.io-client"
const socket = io.connect("http://localhost:5001")
const page = () => {
  return <div>page</div>
}

export default page
