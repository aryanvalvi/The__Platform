import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { FaBookmark } from "react-icons/fa";
import { IoIosHeart } from "react-icons/io";

import "./Moreinfo.scss";
import Popup from "./Popup";

const MoreInfo = () => {
  const { id } = useParams();
  const [data, setData] = useState(null);
  console.log(data);
  const [sendData, setSendData] = useState({
    action: "",

    recieverId: 0,
  });
  const [follow, setfollow] = useState(false);
  const [save, setSave] = useState(false);
  const [like, setLike] = useState(false);
  const [openPopup, setopenPopup] = useState(false);
  console.log(like, save);

  const getData = async () => {
    const res = await fetch(`http://localhost:5000/auth/getmore`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id }),
    });
    const data = await res.json();
    setData(data);
  };

  const SendPostUserInteraction = async () => {
    const userdata = {
      action: sendData.action,

      recieverId: sendData.recieverId,
    };
    const res = await fetch("http://localhost:5000/auth/userInteraction", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userdata),
    });
    if (res) {
      const response = await res.json();
      console.log(response.data);
      CheckStatus();
      // setfollow(true);
    }
  };

  const HandleInter = (action) => {
    setSendData({
      action,

      recieverId: data.creator._id,
    });
  };

  useEffect(() => {
    getData();
    window.scrollTo(0, 0);
  }, [id]); // Add id as a dependency to refetch if id changes

  useEffect(() => {
    if (sendData.action) {
      SendPostUserInteraction();
    }
  }, [sendData]);

  const CheckStatus = async () => {
    console.log("status checked");
    const SendData = { receiver: data.creator._id };
    console.log(SendData);
    try {
      const res = await fetch("http://localhost:5000/auth/Check", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(SendData),
      });
      const resdata = await res.json();
      console.log(resdata);
      if (resdata.follow === true) {
        setfollow(true);
      } else if (resdata.follow === false) {
        setfollow(false);
      }
      if (resdata.save === true) {
        setSave(true);
      } else if (resdata.save === false) {
        setSave(false);
      }
      if (resdata.like === true) {
        setLike(true);
      } else if (resdata.like === false) {
        setLike(false);
      }
      console.log("post request send", res);
    } catch (error) {
      console.log("error while sending post req", error);
    }
  };
  useEffect(() => {
    if (data && data.creator) {
      CheckStatus();
    }
  }, [data]);

  if (!data) {
    return <div>Loading...</div>;
  }

  return (
    <div className="MoreInfoDad">
      <button onClick={CheckStatus}>click</button>
      <div className="MoreInfoContainer">
        <div className="TopInfo">
          <div className="TopInfo1">
            <img className="profile2" src={data.creator?.userImage} alt="img" />
            <div className="TopInfo3">
              <p>{data.creator.username}</p>
              <button onClick={() => HandleInter("follow")}>
                {follow ? <>Following</> : <>follow</>}
              </button>
            </div>
          </div>
          <div className="TopInfo2">
            <div className="iconContainer">
              <FaBookmark
                onClick={() => HandleInter("save")}
                className={` ${save ? "saved" : "Icon2"}  `}
              />
            </div>

            <div className="iconContainer">
              <IoIosHeart
                onClick={() => HandleInter("like")}
                className={` ${like ? "saved2" : "Icon"}`}
              />
            </div>
            <button onClick={() => setopenPopup(!openPopup)} className="btn4">
              Get in touch
            </button>
          </div>
        </div>
        {openPopup && <Popup setopenPopup={setopenPopup}></Popup>}
        <img className="bigImage" src={data.images} alt="" />
        <p className="desMore">{data.description}</p>
      </div>
      <div className="More">
        <p>More by {data.username}</p>
        <div className="swiper">{/* Swiper component code goes here */}</div>
      </div>
    </div>
  );
};

export default MoreInfo;
