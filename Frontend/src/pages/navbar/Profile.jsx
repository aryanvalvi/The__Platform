import React, { useContext, useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import {
  Navigation,
  Pagination,
  Scrollbar,
  A11y,
  Autoplay,
} from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import { Homecontext } from "../../Context/Home";
import "./profile.scss";
import Popup from "./Popup";
import { Link, useParams } from "react-router-dom";
import InsideDashboard from "./InsideDashboard";
const Profile = () => {
  const homecontext = useContext(Homecontext);
  let userdata = homecontext.HomeState.userInfo;
  const Data = homecontext.HomeState.data;
  const { id } = useParams();
  console.log(id);
  const [DataDesign, setDataDesign] = useState([]);
  const [toggle, setToggle] = useState(true);
  console.log(DataDesign);
  console.log(userdata);
  console.log(Data);
  console.log(homecontext);

  const Finder = (ID) => {
    const user = Data.filter((f) => f.creator === ID)
      .map((item) => item.images)
      .flat();
    return user;
  };
  const userImages = Finder(userdata._id);
  console.log(userImages);

  const getUserDesign = async () => {
    const res = await fetch("http://localhost:5000/auth/dashboard", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id }),
    });
    const data = await res.json();
    setDataDesign(data.data);
    console.log(data);
  };
  useEffect(() => {
    getUserDesign();
  }, []);

  return (
    <>
      {toggle ? (
        <div className="profileContainer">
          <div className="leftProfile">
            <img src={`${userdata.GanduKiImage}`} alt="" />
            <p className="leftProfileP">{userdata.username}</p>
            <h1>Main Title About You</h1>
            <div className="followers">
              <div className="InFollowers">
                <span>
                  {userdata.followers ? userdata.followers.length : 0}
                </span>
                <p>followers</p>
              </div>
              <div className="InFollowers">
                <span>
                  {userdata.following ? userdata.following.length : 0}
                </span>
                <p>following</p>
              </div>
              <div className="InFollowers">
                <span>{userdata.likedBY ? userdata.likedBY.length : 0}</span>
                <p>Likes</p>
              </div>
              <div className="InFollowers">
                <span>
                  {userdata.likedBY ? userdata.savedDesigns.length : 0}
                </span>
                <p>saves</p>
              </div>
            </div>
            <div className="Buttons">
              <button className="Connect">Connect</button>

              <button className="Connect F2">Follow</button>
            </div>
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
              onSwiper={(swiper) => console.log(swiper)}
              modules={[Navigation, Pagination, Autoplay]}
            >
              {DataDesign.length > 0 ? (
                DataDesign.map((images) => (
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

          <Popup></Popup>
        </div>
      ) : (
        <InsideDashboard></InsideDashboard>
      )}
    </>
  );
};

export default Profile;
