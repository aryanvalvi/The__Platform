"use client"
import Image from "next/image"
import Link from "next/link"
import React, {useEffect, useState} from "react"
import {useAppDispatch, useAppSelector} from "@/ReduxStore/hook/CustomHook"
import {fetchUserData, logoutUser} from "@/ReduxStore/slices/dataFetchSlice"
import "./Navbar.scss"
import {RxHamburgerMenu} from "react-icons/rx"

const Navbar = () => {
  const [isHovered, setIsHovered] = useState(false)
  const dispatch = useAppDispatch()
  const {user} = useAppSelector(state => state.UserDataFetchReducer.userData)
  const [ham, setHam] = useState(false)

  console.log("Ham state:", ham) // Debug log

  const HandleLogin = () => {
    window.location.href = "http://localhost:5001/auth/google"
  }

  const handleLogout = async () => {
    const res = await fetch("http://localhost:5001/auth/logout", {
      method: "GET",
      credentials: "include",
    })
    const data = await res.json()
    console.log("Logout", data)
    dispatch(logoutUser())
  }

  useEffect(() => {
    if (!user) dispatch(fetchUserData())
  }, [dispatch, user])

  return (
    <div className="NavContainer">
      {/* Backdrop overlay with dynamic class */}
      <div
        className={`backdrop ${ham ? "active" : ""}`}
        onClick={() => setHam(false)}
        aria-hidden={ham}
      ></div>
      <div className="NavbarContain">
        <div>
          <Link href="/">
            <Image
              className="Navlogo"
              width={200}
              height={100}
              src="/image/logo.svg"
              alt="Logo"
            />
          </Link>
        </div>
        <div>
          <nav>
            <span className="ham">
              <RxHamburgerMenu
                onClick={() => setHam(prev => !prev)}
                aria-label="Toggle menu"
                aria-expanded={ham}
              />
            </span>
            <ul className={`navbarElements ${ham ? "open" : ""}`}>
              <Link href="/" className="Link">
                <li className="home">home</li>
              </Link>
              <Link href="/test" className="Link Explore">
                <li>Publish</li>
              </Link>
              <Link className="Link" href="/">
                <li className="Learn">Learn</li>
              </Link>
            </ul>
          </nav>
        </div>
        <div>
          <nav>
            <ul className="navbarElement">
              {user === null || user === false ? (
                <li>
                  <button onClick={HandleLogin} className="sign">
                    log in
                  </button>
                </li>
              ) : (
                <div
                  onMouseEnter={() => setIsHovered(true)}
                  onMouseLeave={() => setIsHovered(false)}
                  className="NavProfile"
                >
                  <div className="pname">
                    <Link href={`/user/profile/${user._id}`}>
                      <img
                        className="profile-picture"
                        src={user.userImage || "/image/fallback.png"}
                        alt="Profile picture"
                      />
                    </Link>
                    <p className="profile-name">{user.username}</p>
                    {isHovered && (
                      <button onClick={handleLogout} className="logout">
                        LogOut
                      </button>
                    )}
                  </div>
                </div>
              )}
            </ul>
          </nav>
        </div>
      </div>
    </div>
  )
}

export default Navbar
