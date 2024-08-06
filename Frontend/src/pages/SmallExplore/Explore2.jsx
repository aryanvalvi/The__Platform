import React, { useEffect, useState } from "react";
import "./Sexplore.scss";
import Explore3 from "./Explore3";
import { Link, Outlet } from "react-router-dom";

const Explore2 = () => {
  const [data, setData] = useState([]);
  const [explore, setExplore] = useState(false);
  const [button, setButton] = useState(true);

  const getdata = async () => {
    const res = await fetch("http://localhost:5000/explore");
    const data = await res.json();
    setData(data);
    console.log(data);
  };
  useEffect(() => {
    getdata();
  }, []);
  const f = () => {
    setExplore(true);
    setButton(false);
  };
  return (
    <>
      {" "}
      <div className="flex secondflex">
        {data.map((f) => {
          return (
            <>
              <div className="fc">
                <div className="gand">
                  <Link to={`/bigExplore/${f.id}`}>
                    <div className="imageContent">
                      <img
                        className="mgand"
                        src={`http://localhost:5000${f.pandya}`}
                      />
                      <div className="content">
                        <p>{f.des}</p>
                      </div>
                    </div>
                  </Link>
                  {/* <div className="pn"> */}
                  <img
                    className="profile"
                    src={`http://localhost:5000${f.profile}`}
                  />
                  <p className="p">{f.title}</p>
                  {/* </div> */}
                  {/* <div className="clike"> */}
                  <img
                    className="like"
                    src={`http://localhost:5000${f.like}`}
                  />
                  {/* </div> */}
                  {/* <div className="cview"> */}
                  <img
                    className="likee"
                    src={`http://localhost:5000${f.view}`}
                  />
                  {/* </div> */}
                  {/* <img src={`http://localhost:5000${f.save}`} /> */}
                </div>
              </div>
            </>
          );
        })}
      </div>
      <div className="exploreButton">
        {button && <button onClick={f}>Show More</button>}
      </div>
      {explore && <Explore3></Explore3>}
    </>
  );
};

export default Explore2;
