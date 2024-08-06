import React, { useContext } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./Home";
import Navbar from "../navbar/Navbar";
import BigSexplore from "../detailSexplore/BigSexplore";
import HomeContent from "../SmallExplore/HomeContent";
import Footer from "../Footer/Footer";
import Upload from "../ImageUpload/Upload";
import Explore from "../Explore/Explore";
import Myproject from "../ImageUpload/Myproject";
import { Homecontext, HomeContextProvider } from "../../Context/Home";
import Profile from "../navbar/Profile";
const index = () => {
  return (
    <>
      <div className="Router">
        <BrowserRouter>
          <Navbar></Navbar>
          <Routes>
            <Route path="/" element={<Home />}>
              <Route index element={<HomeContent />} />
              <Route path="/id:" element={<HomeContent />} />
            </Route>
            <Route
              path="/bigExplore/:id"
              element={<BigSexplore></BigSexplore>}
            ></Route>
            <Route path="/upload" element={<Upload></Upload>}></Route>
            <Route path="/Explore" element={<Explore></Explore>}></Route>
            <Route path="/myproject" element={<Myproject></Myproject>}></Route>
            <Route path="/profile" element={<Profile></Profile>}></Route>
          </Routes>
        </BrowserRouter>
        <Footer></Footer>
        {/* <Sexplore></Sexplore> */}
        {/* <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home></Home>}></Route>
          <Route
            path="/bigExplore"
            element={<BigSexplore></BigSexplore>}
          ></Route>
        
        </Routes>
      </BrowserRouter> */}
      </div>
    </>
  );
};

export default index;
