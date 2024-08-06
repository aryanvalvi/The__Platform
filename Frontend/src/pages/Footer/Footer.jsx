import React from "react";
import "./Footer.scss";

const Footer = () => {
  return (
    <div className="footer">
      <div className="footerimg">
        <img className="fimg" src="/image/footer.png" alt="" srcset="" />

        <div className="Navlogo">
          <img src="/image/logof.png" alt="" srcset="" />
        </div>

        <div className="sections">
          <p>Fields</p>
          <p>Find Talent</p>
          <p>about</p>
        </div>
        <div className="contact">
          <p className="c">Contact us</p>
          <div className="social">
            <img src="/image/facebook.png" alt="" srcset="" />
            <p>Facebook</p>
          </div>
          <div className="social">
            <img src="/image/youtube.png" alt="" srcset="" />
            <p>Youtube</p>
          </div>
          <div className="social">
            <img src="/image/instagram.png" alt="" />
            <p>Instagram</p>
          </div>
          <div className="social">
            <img src="/image/githab.png" alt="" srcset="" />
            <p>Github</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
