import React, { useContext, useEffect, useState } from "react";
import "./Sexplore.scss";
import Explore2 from "./explore2";
import { FaHeart } from "react-icons/fa";
import { Link, Outlet } from "react-router-dom";
import { Homecontext } from "../../Context/Home";

const HomeContent = () => {
  const homecontext = useContext(Homecontext);
  const Data = homecontext.HomeState.data;
  const [showItem, setShowItem] = useState(5);
  const handleExplore = () => {
    setShowItem((e) => e + 5);
  };
  const [cart, setCart] = useState([]);
  const [id, setId] = useState("");
  console.log(homecontext);

  const ItenClicked = (id) => {
    if (cart.includes(id)) {
      setCart(cart.filter((item) => item !== id));
    } else {
      setCart([...cart, id]);
    }
    setColor("red");

    const PerItemData = [...data];
    const dataItem = PerItemData.find((item) => item.id === id);
    if (dataItem) {
      console.log(dataItem);
    }
  };
  return (
    <>
      <div className="flex">
        {Data.slice(0, showItem).map((f) => (
          <div className="gand">
            <Link to={`/bigExplore/${f.id}`}>
              <div className="imageContent">
                <div>
                  <img
                    className="mgand"
                    src={`http://localhost:5000${f.pandya}`}
                  />
                </div>

                <div className="content">
                  <p>{f.des}</p>
                </div>
              </div>
            </Link>
            <img
              className="profile"
              src={`http://localhost:5000${f.profile}`}
            />

            <p className="p">{f.title}</p>

            <FaHeart
              onClick={() => ItenClicked(f.id)}
              className="like"
              style={{
                fontSize: "30px",
                color: cart.includes(f.id) ? "red" : "gray",
              }}
            ></FaHeart>

            <img className="likee" src={`http://localhost:5000${f.view}`} />
          </div>
        ))}
      </div>
      <div className="exploreButton">
        {<button onClick={handleExplore}>Show More</button>}
      </div>
      {/* <Outlet></Outlet> */}
    </>
  );
};

export default HomeContent;
