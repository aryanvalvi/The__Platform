import React, {useState} from "react"
import {FaHeart} from "react-icons/fa"
import {Link} from "react-scroll"
import "./dashboardComponents.scss"
import {BiSolidEdit} from "react-icons/bi"
import MypostsPopup from "./MypostsPopup"

const Myposts = ({data}) => {
  const [popupClicked, setpopupClicked] = useState(false)
  const [post, setPost] = useState()
  console.log(popupClicked)
  console.log(data)
  return (
    <div className="flex">
      {popupClicked && (
        <MypostsPopup data={post} setpopupClicked={setpopupClicked} />
      )}
      {data.map(f => (
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
              <img className="mgand" src={f.images} alt={f.title} />
            ) : (
              <video
                muted
                autoPlay
                loop
                className="mgand"
                src={f.video}
                alt={f.title}
              ></video>
            )}
            {/* </Link> */}
          </div>
          {/* <p className="ImageTitle">{f.title}</p> */}
          <div className="ImgAndHeart">
            <Link href={`/profile/${f.creator._id}`}>
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
