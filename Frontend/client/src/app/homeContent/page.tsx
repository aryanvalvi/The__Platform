import React, { use, useEffect, useRef, useState } from "react";
import { fetchHomeContent } from "@/ReduxStore/slices/homeContentSlice";
import { useAppDispatch, useAppSelector } from "@/ReduxStore/hook/CustomHook";
import SkeletonLoader from "@/components/skeleton/Skeleton";
import Link from "next/link";
import { Fa500Px, FaHeart } from "react-icons/fa";
import "./Sexplore.scss";
const page = () => {
  const myRef: any = useRef();
  const dispatch = useAppDispatch();
  const Data = useAppSelector((state) => state.homeContentReducer.homeContent);
  const Gandu = useAppSelector((state) => state.homeContentReducer.hasMorePost);
  console.log("data is", Data);
  console.log("gandu", Gandu);
  const [page, setPage] = useState(0);
  console.log(page);
  const [loading, setLoading] = useState(false);
  const [hasMorePos, setHasMorePost] = useState(true);

  const fetchMovie = async () => {
    if (loading || !hasMorePos) return;
    setLoading(true);
    const result = await dispatch(fetchHomeContent(page));
    setPage((prev) => prev + 5);
    if (result.payload && result.payload.hasMorePost === false) {
      setHasMorePost(false);
    }
    setLoading(false);
  };
  console.log("befire ", page);

  useEffect(() => {
    // console.log("my ref", myRef.current);
    const observer = new IntersectionObserver((entries) => {
      const entry = entries[0];
      if (entry.isIntersecting && hasMorePos && !loading) {
        fetchMovie();
      }
      console.log("entry", entry);
    });
    if (myRef.current) {
      observer.observe(myRef.current);
    }
    return () => {
      if (myRef.current) {
        observer.unobserve(myRef.current);
      }
    };
  }, [page, loading, hasMorePos]);

  return (
    <>
      {loading === true && hasMorePos ? (
        <SkeletonLoader count={page === 0 ? 5 : page}></SkeletonLoader>
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

      {hasMorePos && <div ref={myRef}></div>}
      {!hasMorePos && <p>All data fetched</p>}
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
