import React, { useContext, useEffect, useState } from "react";
import "./Navbar.scss";
import axios from "axios";
import { Link, useLocation } from "react-router-dom";

import { Homecontext } from "../../Context/Home";
const Navbar = () => {
  const homecontext = useContext(Homecontext);
  // console.log(homecontext.HomeState.userInfo.username);
  let userdata = homecontext.HomeState.userInfo;

  console.log(userdata);

  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    axios
      .get("http://localhost:5000/auth/getuserdata", {
        withCredentials: true,
      })
      .then((res) => {
        homecontext.HomeDispatch({ type: "Userdata", value: res.data.user });
        console.log(res.data);
      })
      .catch((err) => console.log(err.message));
  }, []);

  const HandleLogin = () => {
    window.location.href = "http://localhost:5000/auth/google";
  };
  const handleLogout = () => {
    axios.get("http://localhost:5000/auth/logout", {
      withCredentials: true,
    });
  };
  const GetUser = async () => {
    axios
      .get("http://localhost:5000/auth/getuserdata", {
        withCredentials: true,
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "Access-Control-Allow-Credentials": true,
        },
      })
      .then((res) => console.log(res.data));
  };
  return (
    <div>
      {/* <Popup></Popup> */}

      <div className="NavbarContaine">
        <Link to="/">
          <div>
            <img className="Navlogo" src="/image/logo.png" alt="" srcset="" />
          </div>
        </Link>
        <div className="NavbarContainer RightPart">
          <nav>
            <ul className="navbarElements">
              <Link to="/" className="Link">
                <li className="home">home</li>
              </Link>
              <Link to="/Explore" className="Link Explore">
                <li>Explore</li>
              </Link>
            </ul>
          </nav>
          <div className="NavSearchBar">
            <input placeholder="Search the project" type="text" />
            <img src="/image/search.svg" alt="" srcset="" />
          </div>
          <nav>
            <ul className="navbarElements">
              <li className="Learn">Learn</li>
              {userdata === null ? (
                <li>
                  <button o onClick={HandleLogin} className="btn sign">
                    log in
                  </button>
                </li>
              ) : (
                <>
                  <div
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                    className="profile"
                  >
                    {console.log(userdata.GanduKiImage)}
                    <a href="/profile">
                      <img
                        className="profile-picture"
                        src={`${userdata.GanduKiImage}`}
                        alt=""
                      />
                    </a>
                    <p className="profile-name">{userdata.username}</p>
                    {isHovered && (
                      <a href="/googleLogin">
                        <button onClick={handleLogout} className="logout">
                          LogOut
                        </button>
                      </a>
                    )}
                  </div>
                </>
              )}
            </ul>
          </nav>
        </div>
      </div>
      <button
        onClick={() =>
          axios
            .get("http://localhost:5000/auth/faf", {
              withCredentials: true,
              headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                "Access-Control-Allow-Credentials": true,
              },
            })
            .then((res) => console.log(res.data))
        }
      >
        Click
      </button>
    </div>
    // <>
    //   <button onClick={HandleLogin}>Login</button>
    //   <button onClick={handleLogout}>LogOut</button>
    //   <button onClick={GetUser}>GetUser</button>
    // </>
  );
};

export default Navbar;
