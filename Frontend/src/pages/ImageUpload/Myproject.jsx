import React, { useContext, useEffect, useState } from "react";
import "./Myproject.scss";
import { Homecontext } from "../../Context/Home";
const Myproject = () => {
  const [data, setData] = useState([]);
  // console.log(data);

  const homeContext = useContext(Homecontext);
  console.log(homeContext);
  const getdata = async () => {
    try {
      const res = await fetch("http://localhost:5000/myproject");
      const resData = await res.json();
      setData(resData);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getdata();
  }, []);
  return (
    <div>
      {/* {data.map((f) => {
        return (
          <div className="MyprojectCainer">
            <img src={`http://localhost:5000${f.image}`} alt="" />
            {console.log(`http://localhost:5000${f.image}`)}
            {f.des}
          </div>
        );
      })} */}
    </div>
  );
};

export default Myproject;
