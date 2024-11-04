import React, { useEffect, useState } from "react";
import "./SexploreBig.scss";
import { useParams } from "react-router-dom";
import { FaHeart } from "react-icons/fa";
import Explore2 from "../SmallExplore/Explore2";
// import Explore1 from "../SmallExplore/Explore1";

const BigSexplore = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const [explore, setExplore] = useState(false);
  const [button, setButton] = useState(true);
  const [color, setColor] = useState("grey");
  const [cart, setCart] = useState([]);
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

  const { id } = useParams();
  const [data, setData] = useState([]);

  const getdata = async () => {
    const res = await fetch(`http://localhost:5000/explore`);
    const data = await res.json();
    const filteredData = data.filter((item) => item.id.toString() === id);
    setData(filteredData);
    // console.log(data);
  };

  useEffect(() => {
    getdata();
  }, [id]);

  console.log(id);
  const f = () => {
    setExplore(true);
    setButton(false);
  };

  return (
    <div className="BigContainer">
      {data.map((f) => {
        return (
          <div className="bigContainer">
            <div key={f.id} className="bigImage">
              <img
                src={`http://localhost:5000${f.bigPandya}`}
                alt=""
                srcset=""
              />
            </div>
            <div className="info">
              <p>{f.bigDes}</p>
            </div>
            <div className="sideInfo">
              <img
                className="profile"
                src={`http://localhost:5000${f.profile}`}
              />
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
          </div>
        );
      })}
      <div className="exploreButton">
        {button && <button onClick={f}>Show More</button>}
      </div>
      {explore && <Explore2></Explore2>}
    </div>
  );
};

export default BigSexplore;
