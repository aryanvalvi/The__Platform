  "use client";
  import Image from "next/image";
  import Link from "next/link";
  import React, { use, useEffect, useState } from "react";
  import Logo from "../../public/image/logo.png";
  import { useAppDispatch, useAppSelector } from "@/ReduxStore/hook/CustomHook";
  import { fetchUserData, logoutUser } from "@/ReduxStore/slices/dataFetchSlice";
  import "./Navbar.scss";
  const Navbar = () => {
    const [isHovered, setIsHovered] = useState(false);
    const dispatch = useAppDispatch();
    const {user} = useAppSelector(
      (state) => state.UserDataFetchReducer.userData
    );
    console.log(user)
    const HandleLogin = () => {
      window.location.href = "http://localhost:5001/auth/google";
    };
    const handleLogout =async () => {
    const res = await  fetch("http://localhost:5001/auth/logout",{
        method:"GET",
        credentials:"include"
      })
      const data = await res.json()
      console.log("Logout",data)
      dispatch(logoutUser())
      
    };
  useEffect(()=>{
    dispatch(fetchUserData())
  },[dispatch])
    return (
      <div className="NavbarContaine">
        <Link href="/">
          <div>
            <Image src={Logo} alt="Logo"></Image>
          </div>
        </Link>
        <div className="NavbarContainer RightPart">
          <nav>
            <ul className="navbarElements">
              <Link href="/" className="Link">
                <li className="home">home</li>
              </Link>
              <Link href="/createPost" className="Link Explore">
                <li>Explore</li>
              </Link>
            </ul>
          </nav>
          <div className="NavSearchBar">
            <input placeholder="Search the project" type="text" />
            <img src="/image/search.svg" />
          </div>
          <nav>
            <ul className="navbarElements">
              <li className="Learn">Learn</li>
              {user === null || user ===false ? (
                <li>
                  <button onClick={HandleLogin} className="btn sign">
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
                    <Link href={`/user/profile/${user._id}`}>
                      {user && (
                        <img
                          className="profile-picture"
                          src={`${user.userImage || Logo}`}
                        />
                      )}
                    </Link>
                    <p className="profile-name">{user.username}</p>
                    {isHovered && (
                      
                        <button onClick={handleLogout} className="logout">
                          LogOut
                        </button>
                      
                    )}
                  </div>
                </>
              )}
            </ul>
          </nav>
        </div>
      </div>
    );
  };

  export default Navbar;
