import React from "react";
import "./Footer.scss";
const Footer = () => {
  return (
    <div className="footer">
      <div className="footerimg">
        <img className="fimg" src="/image/footer.png" />

        <div className="Navlogo">
          <img src="/image/logof.png" />
        </div>

        <div className="sections">
          <p>Fields</p>
          <p>Find Talent</p>
          <p>about</p>
        </div>
        <div className="contact">
          <p className="c">Contact us</p>
          <div className="social">
            <img src="/image/facebook.png" />
            <p>Facebook</p>
          </div>
          <div className="social">
            <img src="/image/youtube.png" />
            <p>Youtube</p>
          </div>
          <div className="social">
            <img src="/image/instagram.png" />
            <p>Instagram</p>
          </div>
          <div className="social">
            <img src="/image/githab.png" />
            <p>Github</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
