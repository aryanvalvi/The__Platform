"use client"
import React, {useContext, useEffect, useState} from "react"
import {Swiper, SwiperSlide} from "swiper/react"
import {Navigation, Pagination, Scrollbar, A11y, Autoplay} from "swiper/modules"
import "swiper/css"
import "swiper/css/navigation"
import "swiper/css/pagination"
import "swiper/css/scrollbar"
import "./profile.scss"
// import InsideDashboard from "./InsideDashboard";
import Popup from "@/components/Popup"
import {useDispatch} from "react-redux"
import {useAppSelector} from "@/ReduxStore/hook/CustomHook"
import {
  UserDashBoardFunction,
  UserProfileSliceFunction,
} from "@/ReduxStore/slices/UserProfile"
import {useParams} from "next/navigation"
import Dashboard from "@/components/Dashboard/Dashboard"
const Profile = () => {
  const dispatch = useDispatch()
  const {id} = useParams()
  const Data = useAppSelector(state => state.UserProfileSliceReducer)
  console.log("from frontend dashboard", Data)
  const user = Data.Admin
  const DataDesign = Data.data
  console.log("fron user", DataDesign)
  console.log(id)
  const Test = () => {}
  // const homecontext = useContext(Homecontext);
  // let userdata = homecontext.HomeState.userInfo;
  // const Data = homecontext.HomeState.data;
  // console.log(id);
  // const [DataDesign, setDataDesign] = useState([]);
  const [toggle, setToggle] = useState(true)
  // const [isAdmin, SetIsAdmin] = useState(true);
  // const [user, setUser] = useState({});
  // console.log(user);
  // console.log(DataDesign);
  // console.log(userdata);
  // console.log(Data);
  // console.log(homecontext);

  // const Finder = (ID) => {
  //   const user = Data.filter((f) => f.creator === ID)
  //     .map((item) => item.images)
  //     .flat();
  //   return user;
  // };
  // const userImages = Finder(userdata._id);
  // console.log(userImages);

  // const getUserDesign = async () => {
  //   const res = await fetch("http://localhost:5000/auth/dashboard", {
  //     method: "POST",
  //     credentials: "include",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify({ id }),
  //   });
  //   const data = await res.json();
  //   setDataDesign(data.data);
  //   SetIsAdmin(data.IdMatched);
  //   setUser(data.Admin);
  //   console.log(data);
  // };
  // useEffect(() => {
  //   getUserDesign();
  //   window.scrollTo(0, 0);
  // }, []);
  useEffect(() => {
    dispatch(UserDashBoardFunction(id))
  }, [])

  const DashboardClick = item => {
    console.log(item)
    switch (item) {
      case 1:
        return console.log("1st got clicked")
      case 2:
        return console.log("2nd got cliked")
      case 3:
        return console.log("")
    }
  }
  return (
    <>
      {/* <button onClick={Test}>click</button> */}
      {/* {toggle ? ( */}
      <div className="profileContainer">
        <div className="leftProfile">
          <img src={`${user.userImage}`} alt="" />
          <p className="leftProfileP">{user.username}</p>
          <h1>Main Title About You</h1>
          <div className="followers">
            <div className="InFollowers">
              <span>{user.followers ? user.followers.length : 0}</span>
              <p>followers</p>
            </div>
            <div className="InFollowers">
              <span>{user.following ? user.following.length : 0}</span>
              <p>following</p>
            </div>
            <div className="InFollowers">
              <span>{user.likedBY ? user.likedBY.length : 0}</span>
              <p>Likes</p>
            </div>
            <div className="InFollowers">
              <span>{user.likedBY ? user.savedDesigns.length : 0}</span>
              <p>saves</p>
            </div>
          </div>

          {Data.Admin && (
            <div className="Buttons">
              <button className="Connect">Connect</button>

              <button className="Connect F2">Follow</button>
            </div>
          )}
        </div>
        <div className="rightProfile">
          <Swiper
            autoplay={{
              delay: 2500,
              disableOnInteraction: false,
            }}
            pagination={{
              clickable: true,
            }}
            spaceBetween={50}
            slidesPerView={1}
            onSlideChange={() => console.log("slide change")}
            onSwiper={swiper => console.log(swiper)}
            modules={[Navigation, Pagination, Autoplay]}
          >
            {DataDesign.length > 0 ? (
              DataDesign.map(images => (
                <SwiperSlide onClick={() => setToggle(false)}>
                  <img src={images.images} className="ProfileImg" alt="" />
                </SwiperSlide>
              ))
            ) : (
              <SwiperSlide>
                <p>No images available</p>
              </SwiperSlide>
            )}
          </Swiper>
        </div>
      </div>
      <div className="AdminDashboard">
        <ul className="AdminUL">
          <li onClick={() => DashboardClick(1)}>Published Designs</li>
          <li onClick={() => DashboardClick(2)}>Post Work</li>
          <li onClick={() => DashboardClick(3)}>Saved Designes</li>
          <li onClick={() => DashboardClick(4)}>Edit Profile</li>
        </ul>
      </div>
      <Dashboard data={DataDesign}></Dashboard>

      {/* ) : ( */}
      {/* <></> */}
      {/* // <InsideDashboard></InsideDashboard> */}
      {/* )} */}
    </>
  )
}

export default Profile
