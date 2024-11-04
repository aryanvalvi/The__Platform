import React, { useContext, useEffect, useState } from "react";
import "./Sexplore.scss";
import { FaHeart } from "react-icons/fa";
import { Link } from "react-router-dom";
import { Homecontext } from "../../Context/Home";

const HomeContent = () => {
  const [cart, setCart] = useState([]);

  const ItemClicked = (id) => {
    setCart((prevCart) =>
      prevCart.includes(id)
        ? prevCart.filter((item) => item !== id)
        : [...prevCart, id]
    );
  };

  const [posts, setPosts] = useState([]);
  const Data = posts;
  console.log(posts);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const limit = 1; // Number of posts per page
  const [loader, setLoader] = useState(true);
  const [isFetching, setIsFetching] = useState(true);
  const [allDataFetched, setAllDataFetched] = useState(false); // Track if all data is fetched
  useEffect(() => {
    const fetchPosts = async () => {
      // if (isFetching || currentPage > totalPages) return;
      await new Promise((resolve) => setTimeout(resolve, 500));
      try {
        const res = await fetch(
          `http://localhost:5000/auth/Getdata?page=${currentPage}&limit=${limit}`,
          {
            method: "GET",
            credentials: "include",
          }
        );
        const data = await res.json();
        console.log(data.data);
        setPosts((prevData) => [...prevData, ...data.data]);
        setLoader(false);
        setTotalPages(data.totalPages); // Use `data` instead of `res` to set total pages

        // Check if all data is fetched based on total pages and fetched data length
        if (currentPage >= data.totalPages) {
          setAllDataFetched(true);
          setIsFetching(false);
        }
        console.log("king", currentPage, totalPages);
      } catch (err) {
        console.error(err);
      } finally {
        setIsFetching(false); // Ensure isFetching is reset even on errors
      }
    };

    fetchPosts();
  }, [currentPage, totalPages, isFetching]);
  const HandleInfiniteScroll = async () => {
    // console.log("scrollHeight", document.documentElement.scrollHeight);
    // console.log("innerHeight", window.innerHeight);
    // console.log("scrolltop", document.documentElement.scrollTop);
    // if (isFetching) return;
    try {
      const foooterHeight =
        document.querySelector(".footer")?.offsetHeight || 0;
      if (
        window.innerHeight + document.documentElement.scrollTop + 50 >=
        document.documentElement.scrollHeight - foooterHeight
      ) {
        // Avoid increasing the page if all data is fetched
        if (!allDataFetched && !isFetching) {
          setCurrentPage((prev) => prev + 1);
          setLoader(true);
        }
      }
      console.log("hello");
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    // if (isFetching) return;
    window.addEventListener("scroll", HandleInfiniteScroll);
    return () => window.removeEventListener("scroll", HandleInfiniteScroll);
  }, [allDataFetched, isFetching]);

  return (
    <>
      <div className="flex">
        {Data.map((f) => (
          <div key={f.id} className="gand">
            <div className="imageContent">
              <Link to={`/moreinfo/${f._id}`}>
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
              <img className="profile" src={f.UserProfileImage} alt="Profile" />
              <p className="overlayText">{f.creator.username}</p>
              <span className="">0</span>
              <FaHeart
                onClick={() => ItemClicked(f.id)}
                className="like"
                style={{
                  fontSize: "20px",
                  color: cart.includes(f.id) ? "red" : "gray",
                }}
              />
            </div>
          </div>
        ))}
      </div>
      {loader && (
        <div className="Loader">
          <div className="loader"></div>
        </div>
      )}

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
