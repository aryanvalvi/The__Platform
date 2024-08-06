import React, { useContext } from "react";
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
const Profile = () => {
  const homecontext = useContext(Homecontext);
  let userdata = homecontext.HomeState.userInfo;
  const Data = homecontext.HomeState.data;

  console.log(homecontext.HomeState);
  return (
    <div className="MainProfileContainer">
      <div className="profileContainer">
        <div className="leftProfile">
          <img src={`${userdata.GanduKiImage}`} alt="" />
          <p className="leftProfileP">{userdata.username}</p>
          <h1>Main Title About You</h1>
          <div className="followers">
            <div className="InFollowers">
              <span>0</span>
              <p>followers</p>
            </div>
            <div className="InFollowers">
              <span>0</span>
              <p>following</p>
            </div>
            <div className="InFollowers">
              <span>0</span>
              <p>Likes</p>
            </div>
            <div className="InFollowers">
              <span>0</span>
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
            {Data.slice(0, 5).map((e) => {
              return (
                <>
                  <SwiperSlide>
                    <img
                      // className="mgand"

                      src={`http://localhost:5000${e.pandya}`}
                      alt=""
                    />
                  </SwiperSlide>
                </>
              );
            })}
          </Swiper>
        </div>
      </div>

      <Popup></Popup>
    </div>
  );
};

export default Profile;
