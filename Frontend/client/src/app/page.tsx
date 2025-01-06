"use client";
import Image from "next/image";
import { animateScroll as scroll } from "react-scroll";
import "./Home.scss";
import HomeContent from "./homeContent/page";

export default function Home() {
  const scrollButoon = () => {
    scroll.scrollTo(700);
  };
  return (
    <>
      <div className="Homecontainer">
        <div className="HomeContent">
          <p className="HomeP">ThePlatForm</p>
          <p className="HomeP2">Show your talent to the world</p>
          <button onClick={scrollButoon} className="HomeButton">
            See What People have made
          </button>
        </div>
      </div>
      <HomeContent></HomeContent>
    </>
  );
}
