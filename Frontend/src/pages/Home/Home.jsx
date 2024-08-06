import React, { useEffect, useState } from "react";
import "./Home.scss";
import { animateScroll as scroll } from "react-scroll";
import { Outlet } from "react-router-dom";
import axios from "axios";
const Home = () => {
  const [file, setfile] = useState(null);
  const handlefilechange = (e) => {
    setfile(e.target.files[0]);
  };
  const handlesubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("avatar", file);
    try {
      const res = await axios.post(
        "http://localhost:5000/auth/uploadImg",
        formData,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log(res.data);
    } catch (error) {
      console.log("error while uploading the img", error);
    }
  };
  const [explore, setExplore] = useState(false);
  const [button, setButton] = useState(true);
  const [data, setData] = useState([]);
  const [cart, setCart] = useState([]);
  const [color, setColor] = useState("");
  const getdata = async () => {
    const res = await fetch("http://localhost:5000/explore");
    const data = await res.json();
    setData(data);
    // console.log(data);
  };
  useEffect(() => {
    getdata();
  }, []);

  const f = () => {
    setExplore(true);
    setButton(false);
  };

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

  const scrollButoon = () => {
    scroll.scrollTo(700);
  };
  return (
    <div className="Homecontainer">
      {/* <Login></Login> */}
      <div className="HomeContent">
        <p className="HomeP">ThePlatForm</p>
        <p className="HomeP2">Show your talent to the world</p>
        <button onClick={scrollButoon} className="HomeButton">
          See What People have made
        </button>

        <form onSubmit={handlesubmit}>
          <input type="file" name="avatar" onChange={handlefilechange} />
          <button type="submit">Upload</button>
        </form>
      </div>
      <Outlet></Outlet>
    </div>
  );
};

export default Home;
