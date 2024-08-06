import React from "react";
import "./Explore.scss";
import { Link } from "react-router-dom";

const Explore = () => {
  return (
    <>
      <div className="EContainer">
        <p>
          Welcome to The Platform, the ultimate platform for showcasing your
          creative projects in a visually captivating manner. Our user-friendly
          interface empowers you to effortlessly upload, share, and describe
          your projects with a dynamic combination of images and text. Whether
          you're an artist, designer, photographer, or creator of any kind, The
          Platform provides a dedicated space for you to bring your projects to
          life. Share the story behind your work, highlight key features, and
          engage your audience with compelling image descriptions.
        </p>
        <Link to="/upload">
          <button>Upload Your Own Project</button>
        </Link>
      </div>
    </>
  );
};

export default Explore;
