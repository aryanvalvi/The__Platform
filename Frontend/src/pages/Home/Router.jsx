import React, { useContext } from "react";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
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
import MoreInfo from "../SmallExplore/MoreInfo";

const Index = () => {
  return (
    <BrowserRouter>
      <RouterContent />
    </BrowserRouter>
  );
};

const RouterContent = () => {
  const location = useLocation();
  const isHome = location.pathname === "/";

  return (
    <>
      <div className={`${isHome ? "Router" : ""}`}>
        <Navbar />

        <Routes>
          <Route path="/" element={<Home />}>
            <Route index element={<HomeContent />} />
            <Route path="/id:" element={<HomeContent />} />
          </Route>
          <Route path="/bigExplore/:id" element={<BigSexplore />} />
          <Route path="/upload" element={<Upload />} />
          <Route path="/Explore" element={<Explore />} />
          <Route path="/myproject" element={<Myproject />} />
          <Route path="/profile/:id" element={<Profile />} />
          <Route path="/moreinfo/:id" element={<MoreInfo />} />
        </Routes>
        <Footer />
      </div>
    </>
  );
};

export default Index;
