"use client";

import { useParams } from "next/navigation";

import { useAppDispatch, useAppSelector } from "@/ReduxStore/hook/CustomHook";
import {
  checkerFunction,
  fetchMoreDetail,
  userPostInteractionFunction,
} from "@/ReduxStore/slices/homeContentSlice";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { FaBookmark } from "react-icons/fa";
import { IoIosHeart } from "react-icons/io";
import "./MoreInfo.scss";
import Popup from "@/components/Popup";

const page = () => {
  const { id } = useParams();
  // const [follow, setfollow] = useState(false);
  // const [save, setSave] = useState(false);
  // const [like, setLike] = useState(false);
  const [openPopup, setopenPopup] = useState(false);
  const [interactionChanged, setInteractionChanged] = useState(false);
  const [abc, setAbc] = useState();
const [userid,setuserId] = useState(0)
  console.log("id is", id);
  const dispatch = useAppDispatch();
  const data = useAppSelector((state) => state.moreDetailReducer.homeContent);
  const { follow, save, like } = useAppSelector(
    (state) => state.checkerReducer.check
  );
  const data3 = useAppSelector(
    (state) => state.userPostInteractionReducer.check
  );
  console.log("userpostInteraction", data3);
  console.log("checker", like);

  const fetchData = async () => {
    const result = await dispatch(fetchMoreDetail(id));
    dispatch(checkerFunction(id));
  };
  const CheckStatus = () => {};
  const HandleInter = (action) => {
    console.log(action);

    console.log("action and creator id", action, data.creator._id);

    dispatch(userPostInteractionFunction({ action, post: id }));
    setInteractionChanged((prev) => !prev);
  };
  useEffect(() => {
    if (id) {
      fetchData();
    }
  }, [id, interactionChanged]);
  useEffect(() => {
    if (data?.creator?._id) {
      setuserId(data.creator._id);
    }
  }, [data]);
  return (
    // <>
    // </>
    <>
      {data === null ? (
        <>
          <h1>Bro</h1>
        </>
      ) : (
        <div className="MoreInfoDad">
          <button onClick={CheckStatus}>click</button>
          <div className="MoreInfoContainer">
            <div className="TopInfo">
              <div className="TopInfo1">
                <img
                  className="profile2"
                  src={data.creator?.userImage}
                  alt="img"
                />
                <div className="TopInfo3">
                  <p>{data.creator?.username}</p>
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
                <button
                  onClick={() => setopenPopup(!openPopup)}
                  className="btn4"
                >
                  Get in touch
                </button>
              </div>
            </div>
            {openPopup && (
              <Popup setopenPopup={setopenPopup} data={data} post={userid}></Popup>
            )}
            <img className="bigImage" src={data.images} alt="" />
            <p className="desMore">{data.description}</p>
          </div>
          <div className="More">
            <p>More by {data.username}</p>
            <div className="swiper">
              {/* Swiper component code goes here */}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default page;
