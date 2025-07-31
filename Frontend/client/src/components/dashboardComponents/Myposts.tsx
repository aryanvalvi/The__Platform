import React, {useState} from "react"
import {FaHeart} from "react-icons/fa"

import "./dashboardComponents.scss"
import {BiSolidEdit} from "react-icons/bi"
import MypostsPopup from "./MypostsPopup"
import {DesignPost} from "../../ReduxStore/slices/UserProfile"
import Link from "next/link"
const Myposts = ({
  data,
  id,
}: {
  data: DesignPost[] | null
  id: string | string[] | undefined
}) => {
  const [popupClicked, setpopupClicked] = useState(false)
  const [post, setPost] = useState<DesignPost>()
  console.log(post)
  console.log(popupClicked)
  console.log(data)
  return (
    <div className="flex">
      {popupClicked && post && (
        <MypostsPopup data={post} id={id} setpopupClicked={setpopupClicked} />
      )}
      {data?.map(f => (
        <div
          key={f._id}
          onClick={() => {
            setpopupClicked(!popupClicked)
            setPost(f)
          }}
          className="gand"
        >
          <div className="imageContent">
            {/* <Link href={`/detailInfo/${f._id}`}> */}
            <BiSolidEdit className="edit-gand"></BiSolidEdit>
            {f.images && f.images.length > 0 ? (
              <img className="mgand" src={f.images[0]} alt={f.title} />
            ) : (
              <video
                muted
                autoPlay
                loop
                className="mgand"
                src={f.video}
              ></video>
            )}
            {/* </Link> */}
          </div>
          {/* <p className="ImageTitle">{f.title}</p> */}
          <div className="ImgAndHeart">
            <Link href={`/other/${f.creator}`}>
              <img className="profile" src={f.UserProfileImage} alt="Profile" />
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
  )
}

export default Myposts
