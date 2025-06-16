"use client"
import Image from "next/image"
import Link from "next/link"
import React, {use, useEffect, useState} from "react"
import Logo from "../../public/image/logo.png"
import {useAppDispatch, useAppSelector} from "@/ReduxStore/hook/CustomHook"
import {fetchUserData, logoutUser} from "@/ReduxStore/slices/dataFetchSlice"
import "./Navbar.scss"
const Navbar = () => {
  const [isHovered, setIsHovered] = useState(false)
  const dispatch = useAppDispatch()
  const {user} = useAppSelector(state => state.UserDataFetchReducer.userData)
  console.log(user)
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
    dispatch(fetchUserData())
  }, [dispatch])
  return (
    <div className="NavContainer">
      <div className="NavbarContain">
        <div>
          <Link href="/">
            <Image className="Navlogo" src={Logo} alt="Logo"></Image>
          </Link>
        </div>
        <div>
          <nav>
            <ul className="navbarElements">
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
            <ul className="navbarElements">
              <>
                {user === null || user === false ? (
                  <li>
                    <button onClick={HandleLogin} className="sign">
                      log in
                    </button>
                  </li>
                ) : (
                  <>
                    <div
                      onMouseEnter={() => setIsHovered(true)}
                      onMouseLeave={() => setIsHovered(false)}
                      className="NavProfile"
                    >
                      <div className="pname">
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
                    </div>
                  </>
                )}
              </>
            </ul>
          </nav>
        </div>
      </div>
    </div>
  )
}

export default Navbar
