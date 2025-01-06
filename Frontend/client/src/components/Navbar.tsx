"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import Logo from "../../public/image/logo.png";
import { useAppDispatch, useAppSelector } from "@/ReduxStore/hook/CustomHook";
import { fetchUserData } from "@/ReduxStore/slices/dataFetchSlice";
import "./Navbar.scss";
const Navbar = () => {
  const [isHovered, setIsHovered] = useState(false);
  const dispatch = useAppDispatch();
  const userdata = useAppSelector(
    (state) => state.UserDataFetchReducer.userData
  );
  const HandleLogin = () => {};
  const handleLogout = () => {};

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
            <Link href="/Explore" className="Link Explore">
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
            {userdata === null ? (
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
                  <Link href={`/profile/${userdata._id}`}>
                    {userdata && (
                      <img
                        className="profile-picture"
                        src={`${userdata.userImage || Logo}`}
                      />
                    )}
                  </Link>
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
  );
};

export default Navbar;
