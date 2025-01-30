import React, { use, useCallback, useEffect, useRef, useState } from "react";
import {
  fetchHomeContent,
  homeContentSlice,
  setPageFromStorage,
  setPageIncrease,
} from "@/ReduxStore/slices/homeContentSlice";
import { useAppDispatch, useAppSelector } from "@/ReduxStore/hook/CustomHook";
import SkeletonLoader from "@/components/skeleton/Skeleton";
import Link from "next/link";

import { Fa500Px, FaHeart } from "react-icons/fa";
import "./Sexplore.scss";
import debounce from "lodash/debounce";
const page = () => {
  const dispatch = useAppDispatch();
  const Data = useAppSelector((state) => state.homeContentReducer.homeContent);
  const totalPost = useAppSelector((state) => state.homeContentReducer.totalPost);
  const has = useAppSelector((state) => state.homeContentReducer.hasMorePost);
  const  page = useAppSelector((state)=>state.homeContentReducer.page);
  


console.log(page)



  // const [page,setPage] = useState(0);


  const LoadingRef=useRef(null);



    // Store scroll position
    // useEffect(() => {
    //   const savedPosition = localStorage.getItem("scrollPosition");
    //   if (savedPosition) {
    //     window.scrollTo(0, parseInt(savedPosition, 10));
    //   }
  
    //   return () => {
    //     localStorage.setItem("scrollPosition", `${window.scrollY}`);
    //   };
    // }, []);
    // const isFetching = useRef(false);
  const FetchData = async()=>{
    // if(isFetching.current) return;
    
    // const skip =page *6;
    setTimeout(() => {
      
      dispatch(fetchHomeContent(page))
    }, 500);

// isFetching.current = false

  }





  useEffect(()=>{
 
    if(has){
      
      FetchData()

    }
  
  },[page,dispatch,has])

  useEffect(()=>{
    if(LoadingRef.current){
      const observer = new IntersectionObserver(([entry])=>{
        if(entry.isIntersecting){
         dispatch( setPageIncrease())
          // setPage((page)=>page+1)
        }
console.log(entry)
      },{threshold:1} )
      observer.observe(LoadingRef.current)
      //remove the listener
     return()=>{ if(LoadingRef.current){
        observer.unobserve(LoadingRef.current)
      }}
    }

    
  },[Data])





























  
  
  return (
    <>
      <div className="flex">
        {Data.map((f) => (
          <div key={f._id} className="gand">
            <div className="imageContent">
              <Link href={`/detailInfo/${f._id}`}>
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
                <p className="ImageTitle">{f.title}</p>
              </Link>
            </div>
            <div className="ImgAndHeart">
              <Link href={`/profile/${f.creator._id}`}>
                <img
                  className="profile"
                  src={f.UserProfileImage}
                  alt="Profile"
                />
              </Link>
              <p className="overlayText">{f.creator.username}</p>
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
      <div ref={LoadingRef} className="loading"></div>
       {has && 
       
       <SkeletonLoader count={ 6}></SkeletonLoader>}

      {/* {hasMorePos && <div ref={myRef}></div>} */}
      {/* {!has && <p>All data fetched</p>} } */}
      {/* )} */}
      {/* {loader && (
        <div className="Loader">
          <div className="loader"></div>
        </div>
      )} */}

      <div className="exploreButton">
        {/* {Data.length > 0 && (
          // <button onClick={fetchPosts} disabled={isFetching}>
          //   Show More
          // </button>
        )} */}
      </div>
    </>
  );
};

export default page;
