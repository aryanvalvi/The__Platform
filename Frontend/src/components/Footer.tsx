import React from "react"
import "./Footer.scss"
const Footer = () => {
  return (
    <div className="footer">
      <div className="footerimg">
        <img className="fimg" alt="/image/footer.png" src="/image/footer.png" />

        <div className="Navlogo">
          <img alt="/image/logof.png" src="/image/logof.png" />
        </div>

        <div className="sections">
          <p>Fields</p>
          <p>Find Talent</p>
          <p>about</p>
        </div>
        <div className="contact">
          <p className="c">Contact us</p>
          <div className="social">
            <img alt="/image/facebook.png" src="/image/facebook.png" />
            <p>Facebook</p>
          </div>
          <div className="social">
            <img alt="/image/youtube.png" src="/image/youtube.png" />
            <p>Youtube</p>
          </div>
          <div className="social">
            <img alt="/image/instagram.png" src="/image/instagram.png" />
            <p>Instagram</p>
          </div>
          <div className="social">
            <img alt="/image/githab.png" src="/image/githab.png" />
            <p>Github</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Footer
