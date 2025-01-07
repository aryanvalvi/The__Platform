import React, { useCallback, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/ReduxStore/hook/CustomHook";
import { fetchHomeContent } from "@/ReduxStore/slices/homeContentSlice";
import { Fa500Px, FaHeart } from "react-icons/fa";
import Link from "next/link";
import SkeletonLoader from "@/components/skeleton/Skeleton";
import "./Sexplore.scss";
const HomeContent = () => {
  const dispatch = useAppDispatch();
  const Data = useAppSelector((state) => state.homeContentReducer.homeContent);
  console.log("data is", Data);

  const [skip, SetSkip] = useState(1);
  const [isFetching, setIsFetching] = useState(false);
  const [loader, setLoader] = useState(true);
  console.log(loader);

  const fetchPosts = async () => {
    if (isFetching) return;
    const scrollPostion = window.scrollY;
    setIsFetching(true);
    setLoader(true);
    try {
      await dispatch(fetchHomeContent(skip));
      SetSkip((prev) => prev + 1);
      // window.scrollTo({ top: scrollPostion, behavior: "auto" });
      // setLoader(false);
    } catch (error) {
      console.log("error fetching posts ", error);
    } finally {
      setIsFetching(false);
      setLoader(false);
    }
  };

  const handleScroll = useCallback(() => {
    console.log("height", document.body.scrollHeight);
    console.log("top", document.documentElement.scrollTop);
    console.log("window", window.innerHeight);
    const totalHeight = document.body.scrollHeight;
    const FromTop = document.documentElement.scrollTop;
    const Window = window.innerHeight;

    if (FromTop + Window + 900 >= totalHeight) {
      console.log("Behen ke lavde");
      fetchPosts();
    }
  }, [fetchPosts]);

  const debounce = useCallback((func: Function, delay: number) => {
    let timer: NodeJS.Timeout;
    return (...args: any[]) => {
      if (timer) clearTimeout(timer);
      timer = setTimeout(() => {
        func(...args);
      }, delay);
    };
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", debounce(handleScroll, 1000));
  }, [handleScroll]);

  return (
    <>
      {loader === true ? (
        <SkeletonLoader></SkeletonLoader>
      ) : (
        <div className="flex">
          {Data.map((f) => (
            <div key={f._id} className="gand">
              <div className="imageContent">
                <Link href={`/moreinfo/${f._id}`}>
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
      )}
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

export default HomeContent;
