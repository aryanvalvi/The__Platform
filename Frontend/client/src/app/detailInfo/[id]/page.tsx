"use client";
import { useAppDispatch, useAppSelector } from "@/ReduxStore/hook/CustomHook";
import {
  checkerFunction,
  fetchMoreDetail,
} from "@/ReduxStore/slices/homeContentSlice";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

const page = ({ params }: { params: { id: string } }) => {
  const router = useRouter();
  const { id } = params;
  console.log(id);
  const dispatch = useAppDispatch();
  const data = useAppSelector((state) => state.moreDetailReducer.homeContent);
  const data2 = useAppSelector((state) => state.checkerReducer.check);
  console.log(data2);
  console.log(data._id);
  const fetchData = async () => {
    const result = await dispatch(fetchMoreDetail(`6720b3fceb807122aab3280c`));
    dispatch(checkerFunction(id));
  };
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <></>
    // <div className="MoreInfoDad">
    //   <button onClick={CheckStatus}>click</button>
    //   <div className="MoreInfoContainer">
    //     <div className="TopInfo">
    //       <div className="TopInfo1">
    //         <img className="profile2" src={data.creator?.userImage} alt="img" />
    //         <div className="TopInfo3">
    //           <p>{data.creator.username}</p>
    //           <button onClick={() => HandleInter("follow")}>
    //             {follow ? <>Following</> : <>follow</>}
    //           </button>
    //         </div>
    //       </div>
    //       <div className="TopInfo2">
    //         <div className="iconContainer">
    //           <FaBookmark
    //             onClick={() => HandleInter("save")}
    //             className={` ${save ? "saved" : "Icon2"}  `}
    //           />
    //         </div>

    //         <div className="iconContainer">
    //           <IoIosHeart
    //             onClick={() => HandleInter("like")}
    //             className={` ${like ? "saved2" : "Icon"}`}
    //           />
    //         </div>
    //         <button onClick={() => setopenPopup(!openPopup)} className="btn4">
    //           Get in touch
    //         </button>
    //       </div>
    //     </div>
    //     {openPopup && <Popup setopenPopup={setopenPopup} data={data}></Popup>}
    //     <img className="bigImage" src={data.images} alt="" />
    //     <p className="desMore">{data.description}</p>
    //   </div>
    //   <div className="More">
    //     <p>More by {data.username}</p>
    //     <div className="swiper">{/* Swiper component code goes here */}</div>
    //   </div>
    // </div>
  );
};

export default page;
